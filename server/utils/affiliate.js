/**
 * Affiliate Link Generator
 * 
 * This utility wraps the raw product URLs scraped from various stores
 * with your affiliate network's tracking links (like vCommission, Cuelinks, etc.).
 */

function generateAffiliateLink(platform, rawUrl) {
  // If no raw URL is provided, return empty
  if (!rawUrl) return '';

  const encodedUrl = encodeURIComponent(rawUrl);

  // =====================================================================
  // TODO: Add your vCommission (or other network) tracking details below
  // =====================================================================
  
  // Example for vCommission (you will need to replace this with your actual format)
  // const VCOMMISSION_BASE = 'https://track.vcommission.com/click';
  // const AFFILIATE_ID = 'YOUR_AFF_ID_HERE';
  // return `${VCOMMISSION_BASE}?camp=YOUR_CAMPAIGN_ID&pub=${AFFILIATE_ID}&url=${encodedUrl}`;


  // Example for platform-specific affiliate links:
  // switch(platform.toLowerCase()) {
  //   case 'amazon':
  //     // e.g. return `${rawUrl}&tag=YOUR_AMAZON_ASSOCIATE_ID`;
  //     break;
  //   case 'flipkart':
  //     // e.g. return `https://affiliate.flipkart.com/track?id=YOUR_ID&url=${encodedUrl}`;
  //     break;
  // }

  // Fallback: If no affiliate program is configured, just return the raw URL so the buttons still work
  return rawUrl;
}

module.exports = { generateAffiliateLink };
