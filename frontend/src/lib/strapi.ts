import axios from 'axios';
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const api = axios.create({ baseURL: `${STRAPI_URL}/api`, timeout: 8000 });

export async function getCollection<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await api.get(path, { params: { populate: '*', sort: 'createdAt:desc' } });
    return response.data.data as T;
  } catch { return fallback; }
}

export function mediaUrl(url?: string | null) {
  if (!url) return null;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}
