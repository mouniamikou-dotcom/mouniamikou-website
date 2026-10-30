export const articleCategories = [
  { id: 'All', en: 'All', fr: 'Tous' },
  { id: 'business', en: 'Corporate', fr: 'Société' },
  { id: 'real-estate', en: 'Real Estate', fr: 'Immobilier' },
  { id: 'tax', en: 'Tax', fr: 'tax' },
  { id: 'visa-portugal', en: 'Immigration', fr: 'Immigration' },
];
export function articleCategoryLabel(id, language) {
  return articleCategories.find(category => category.id === id)?.[language] || id;
}
