/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { workingSanityConfig } from './src/sanity/policy.cjs'

const { projectId, dataset } = workingSanityConfig(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  process.env.NEXT_PUBLIC_SANITY_DATASET,
)

export default defineCliConfig({ api: { projectId, dataset } })
