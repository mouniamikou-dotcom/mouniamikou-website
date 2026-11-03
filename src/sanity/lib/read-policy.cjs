exports.privateReadConfig = function privateReadConfig(token, dataset, environment) {
  if (dataset === 'production' && environment === 'production') return { useCdn: true, perspective: 'published' };
  if (!token || !token.trim()) {
    throw new Error('Refonte: SANITY_API_READ_TOKEN is required on the server to read the private working dataset.');
  }
  return { token, useCdn: false, perspective: 'published' };
};
