// This working branch must never connect to the production dataset.
exports.workingSanityConfig = function workingSanityConfig(projectId, dataset) {
  const selectedProject = projectId || 'bfaunxy0';
  const selectedDataset = dataset || 'refonte_fr_en';
  if (selectedProject !== 'bfaunxy0' || selectedDataset === 'production') {
    throw new Error('Refonte: use project bfaunxy0 and a separate working dataset. Production is forbidden.');
  }
  if (!/^[a-z0-9_][a-z0-9_-]*$/.test(selectedDataset)) {
    throw new Error('Refonte: invalid working dataset name.');
  }
  return { projectId: selectedProject, dataset: selectedDataset };
}
