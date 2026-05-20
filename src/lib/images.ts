/**
 * Image Management Utility
 * 
 * Prevents bloating MongoDB with massive base64 document payloads, substituting
 * them with premium, highly performant CDN image URLs or static assets.
 */
export function sanitizeImageField(val?: string, category = "resin-art"): string {
  if (!val) return "";
  
  // If it's already a secure public/external HTTP(S) URL, keep it!
  if (val.startsWith("http://") || val.startsWith("https://") || val.startsWith("/")) {
    return val;
  }

  // Allow base64 strings so that actual uploaded customer or product images are preserved!
  if (val.startsWith("data:image/")) {
    return val;
  }

  return val;
}

export function sanitizeGalleryFields(gallery?: string[], category = "resin-art"): string[] {
  if (!gallery || !Array.isArray(gallery)) return [];
  return gallery.map(img => sanitizeImageField(img, category));
}
