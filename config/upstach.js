import { Client as WorkflowClient } from '@upstash/workflow'
import { QSTACH_URL, QSTACH_TOKEN } from './env.js'

export const workflowClient = new WorkflowClient({
  baseUrl: QSTACH_URL,
  token: QSTACH_TOKEN,
})
