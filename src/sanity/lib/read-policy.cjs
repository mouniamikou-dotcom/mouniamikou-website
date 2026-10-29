exports.privateReadConfig = function privateReadConfig(token) {
  if (!token || !token.trim()) {
    throw new Error('Refonte: SANITY_API_READ_TOKEN is required on the server to read the private working dataset.');
  }
  return { token, useCdn: false, perspective: 'published' };
};
