const API_BASE = 'http://localhost:3001/api';

export async function searchProductsLive(query) {
  const response = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchFeaturedProducts() {
  const response = await fetch(`${API_BASE}/featured`);
  if (!response.ok) {
    throw new Error(`Featured fetch failed: ${response.statusText}`);
  }
  return response.json();
}

export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) return false;
    const data = await response.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}
