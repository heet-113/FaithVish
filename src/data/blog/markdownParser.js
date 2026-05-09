/**
 * Lightweight Markdown → Content Sections Parser
 * 
 * Converts standard Markdown (with a few custom extensions) into
 * the section-based JSON format consumed by BlogPostPage.jsx.
 * 
 * Supported syntax:
 *   ## Heading        → { type: "heading" }
 *   ### Subheading    → { type: "subheading" }
 *   :::tip ... :::    → { type: "tip" }
 *   > quote           → { type: "quote", author? }
 *   - item            → { type: "list" }
 *   1. item           → { type: "numbered-list" }
 *   ![alt](src)       → { type: "image", src, alt, caption? }
 *   :::cta[text](url) → { type: "cta", text, link }
 *   ---               → { type: "divider" }
 *   plain text        → { type: "paragraph" }
 */

export function parseMarkdownToSections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      i++;
      continue;
    }

    // --- Divider ---
    if (/^---+$/.test(trimmed)) {
      sections.push({ type: 'divider' });
      i++;
      continue;
    }

    // ## Heading
    if (/^## /.test(trimmed) && !/^### /.test(trimmed)) {
      sections.push({ type: 'heading', text: trimmed.replace(/^## /, '') });
      i++;
      continue;
    }

    // ### Subheading
    if (/^### /.test(trimmed)) {
      sections.push({ type: 'subheading', text: trimmed.replace(/^### /, '') });
      i++;
      continue;
    }

    // :::tip block (multi-line)
    if (/^:::tip\s*$/.test(trimmed) || /^:::tip\s+/.test(trimmed)) {
      // Inline tip: :::tip Some text here
      const inlineText = trimmed.replace(/^:::tip\s*/, '');
      if (inlineText && !inlineText.startsWith(':::')) {
        // Check if this is a single-line tip (text after :::tip on same line)
        // Collect until we hit a closing :::
        let tipLines = [inlineText];
        i++;
        while (i < lines.length && lines[i].trim() !== ':::') {
          tipLines.push(lines[i].trim());
          i++;
        }
        sections.push({ type: 'tip', text: tipLines.join(' ').trim() });
        if (i < lines.length) i++; // skip closing :::
        continue;
      }
      // Block tip: collect lines until :::
      let tipLines = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') {
        tipLines.push(lines[i].trim());
        i++;
      }
      sections.push({ type: 'tip', text: tipLines.join(' ').trim() });
      if (i < lines.length) i++; // skip closing :::
      continue;
    }

    // :::product[id]
    const productMatch = trimmed.match(/^:::product\[(.+?)\]$/);
    if (productMatch) {
      sections.push({ type: 'product', id: productMatch[1] });
      i++;
      continue;
    }

    // :::cta[text](link)
    const ctaMatch = trimmed.match(/^:::cta\[(.+?)\]\((.+?)\)$/);
    if (ctaMatch) {
      sections.push({ type: 'cta', text: ctaMatch[1], link: ctaMatch[2] });
      i++;
      continue;
    }

    // > Blockquote (can be multi-line, last line with "— Author" becomes author)
    if (/^> /.test(trimmed)) {
      let quoteLines = [];
      while (i < lines.length && /^> /.test(lines[i].trim())) {
        quoteLines.push(lines[i].trim().replace(/^> /, ''));
        i++;
      }
      const fullQuote = quoteLines.join('\n');
      // Check for author pattern: last line is "— Author Name"
      const quoteLineParts = fullQuote.split('\n');
      const lastLine = quoteLineParts[quoteLineParts.length - 1];
      const authorMatch = lastLine.match(/^[—–-]\s*(.+)$/);
      if (authorMatch && quoteLineParts.length > 1) {
        sections.push({
          type: 'quote',
          text: quoteLineParts.slice(0, -1).join(' ').replace(/^[""]|[""]$/g, '').trim(),
          author: authorMatch[1].trim(),
        });
      } else {
        sections.push({
          type: 'quote',
          text: fullQuote.replace(/^[""]|[""]$/g, '').trim(),
        });
      }
      continue;
    }

    // Image: ![alt](src "caption") or ![alt](src)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)$/);
    if (imgMatch) {
      const section = { type: 'image', src: imgMatch[2], alt: imgMatch[1] };
      if (imgMatch[3]) section.caption = imgMatch[3];
      sections.push(section);
      i++;
      continue;
    }

    // Numbered list: lines starting with 1. 2. 3. etc.
    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i++;
      }
      sections.push({ type: 'numbered-list', items });
      continue;
    }

    // Unordered list: lines starting with - or *
    if (/^[-*]\s/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s/, ''));
        i++;
      }
      sections.push({ type: 'list', items });
      continue;
    }

    // Regular paragraph — collect consecutive non-empty, non-special lines
    let paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^#{2,3} /.test(lines[i].trim()) &&
      !/^:::/.test(lines[i].trim()) &&
      !/^> /.test(lines[i].trim()) &&
      !/^!\[/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !/^[-*]\s/.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      sections.push({ type: 'paragraph', text: paraLines.join(' ') });
    }
  }

  return sections;
}
