import 'server-only';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';
import { privateReadConfig } from './read-policy.cjs';

// This module must never be imported by a client component.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  ...privateReadConfig(process.env.SANITY_API_READ_TOKEN),
});
