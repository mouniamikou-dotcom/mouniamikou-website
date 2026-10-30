import legacyPaths from './legacy-paths.json';

export const SITE_URL = 'https://mouniamikou.com';

// Existing English URLs remain unchanged. French pages have their own URLs.
export const frenchRoutes = {
  '/': '/fr',
  '/about': '/fr/a-propos',
  '/corporate-legal-services-portugal': '/fr/accompagnement-juridique-societes-portugal',
  '/settling-in-portugal': '/fr/installation-portugal',
  '/real-estate': '/fr/immobilier-portugal',
  '/business-creation-portugal': '/fr/creation-entreprise-portugal',
  '/blogs': '/fr/articles',
  '/contact': '/fr/contact',
  '/privacy': '/fr/confidentialite',
  '/cookies': '/fr/cookies',
  '/terms': '/fr/conditions-utilisation',
  '/contact/installation': '/fr/contact/installation',
  '/contact/real-estate': '/fr/contact/immobilier',
  '/contact/business': '/fr/contact/entreprise',
  '/contact/other': '/fr/contact/autre',
};

export function englishPath(pathname) {
  const path = pathname.replace(/\/$/, '') || '/';
  const entry = Object.entries(frenchRoutes).find(([, fr]) => fr === path);
  let canonical = entry ? entry[0] : path;
  if (path.startsWith('/fr/articles/')) canonical = '/blogs/' + path.slice('/fr/articles/'.length);
  try { canonical = decodeURI(canonical); } catch { /* Preserve malformed input for normal 404 handling. */ }
  return legacyPaths[canonical] || canonical;
}

export function hasFrenchRoute(pathname) {
  const path = englishPath(pathname);
  return Boolean(frenchRoutes[path]) || path.startsWith('/blogs/');
}

export function localizedPath(href, language) {
  if (typeof href !== 'string' || href.startsWith('#')) return href;
  if (href === 'mm@mouniamikou.com') return 'mailto:' + href;
  let relative = href;
  if (/^https?:\/\/(?:www\.)?mouniamikou\.com(?:\/|$)/i.test(href)) {
    const url = new URL(href);
    relative = url.pathname + url.search + url.hash;
  }
  if (!relative.startsWith('/') || relative.startsWith('//')) return href;
  const suffixIndex = relative.search(/[?#]/);
  const pathname = suffixIndex < 0 ? relative : relative.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? '' : relative.slice(suffixIndex);
  const path = englishPath(pathname);
  if (language !== 'fr') return path + suffix;
  if (frenchRoutes[path]) return frenchRoutes[path] + suffix;
  if (path.startsWith('/blogs/')) return '/fr/articles/' + path.slice('/blogs/'.length) + suffix;
  return href;
}

export function pageAlternates(pathname, language, hasFrench = true) {
  const path = englishPath(pathname);
  const en = SITE_URL + path;
  const fr = hasFrench && hasFrenchRoute(path) ? SITE_URL + localizedPath(path, 'fr') : null;
  return {
    canonical: language === 'fr' && fr ? fr : en,
    ...(fr && { languages: { en, fr, 'x-default': en } }),
  };
}
