// Public reads are allowed only in a real production deployment; previews stay isolated.
exports.workingSanityConfig = function workingSanityConfig(projectId, dataset, environment = process.env.VERCEL_ENV) {
  const selectedProject = projectId || 'bfaunxy0';
  const selectedDataset = dataset || 'refonte_fr_en';
  if (selectedProject !== 'bfaunxy0' || (selectedDataset === 'production' && environment !== 'production')) {
    throw new Error('Refonte: use project bfaunxy0 and a separate working dataset. Production is forbidden.');
  }
  if (!/^[a-z0-9_][a-z0-9_-]*$/.test(selectedDataset)) {
    throw new Error('Refonte: invalid working dataset name.');
  }
  return { projectId: selectedProject, dataset: selectedDataset };
}

// Studio edits must appear on the private preview at the next page request.
// Preserve the existing production caching policy.
exports.editorialFetchOptions = function editorialFetchOptions(environment) {
  return environment === 'production' ? { next: { revalidate: 3600 } } : { cache: 'no-store' };
};
