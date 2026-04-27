export const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$|^[a-z0-9]$/;

export function isValidSlug(slug) {
  return typeof slug === 'string' && SLUG_PATTERN.test(slug);
}

export function assertValidSlug(slug, label = 'slug') {
  if (!isValidSlug(slug)) {
    throw new Error(`${label} must use lowercase letters, digits, and hyphens only (got: ${JSON.stringify(slug)})`);
  }
  return slug;
}

export function toSlug(input) {
  const raw = String(input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  let slug = raw
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) slug = 'wiki';
  if (slug.length > 63) slug = slug.slice(0, 63).replace(/-+$/g, '');
  if (!/^[a-z0-9]/.test(slug)) slug = `wiki-${slug}`;
  if (!/[a-z0-9]$/.test(slug)) slug = `${slug}0`;
  return slug;
}

export function titleFromSlug(slug) {
  assertValidSlug(slug);
  return slug
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function headingToAnchor(text, used = new Map()) {
  let base = String(text || '')
    .replace(/<[^>]*>/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .replace(/[\*_~]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\u2000-\u206f\u2e00-\u2e7f\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!base) base = 'section';
  const n = (used.get(base) || 0) + 1;
  used.set(base, n);
  return n === 1 ? base : `${base}-${n}`;
}
