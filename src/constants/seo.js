export const SEO_SLUG_TO_PAGE = {
  'blood-test-at-home': 'seo-blood-test-at-home',
  'cbc-test': 'seo-cbc-test',
  'thyroid-profile-test': 'seo-thyroid-profile-test',
  'full-body-checkup': 'seo-full-body-checkup',
  'vitamin-d-test': 'seo-vitamin-d-test',
  'hba1c-test': 'seo-hba1c-test',
  'dengue-test': 'seo-dengue-test',
  'blood-test-at-home-in-hyderabad': 'seo-blood-test-at-home-in-hyderabad',
};
export const SEO_PAGE_TO_SLUG = Object.fromEntries(Object.entries(SEO_SLUG_TO_PAGE).map(([slug, page]) => [page, slug]));
