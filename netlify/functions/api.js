import serverless from 'serverless-http'
import app from '../../server.js'

const proxy = serverless(app)
const NETLIFY_FUNCTION_PREFIX = '/.netlify/functions/api'

export const handler = async (event, context) => {
  if (event.path && event.path.startsWith(NETLIFY_FUNCTION_PREFIX)) {
    event.path = '/api' + event.path.slice(NETLIFY_FUNCTION_PREFIX.length)
  }
  if (event.rawPath && event.rawPath.startsWith(NETLIFY_FUNCTION_PREFIX)) {
    event.rawPath = '/api' + event.rawPath.slice(NETLIFY_FUNCTION_PREFIX.length)
  }

  return proxy(event, context)
}
