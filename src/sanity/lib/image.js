import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '../env';

// Building CDN image URLs needs only public identifiers, never a read token.
const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source) {
  return builder.image(source);
}
