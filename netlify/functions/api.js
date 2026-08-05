import * as serverModule from '../../server.js'
import serverless from 'serverless-http'

const NETLIFY_FUNCTION_PREFIX = '/.netlify/functions/api'

let expressApp = serverModule.default || serverModule
while (
  expressApp &&
  typeof expressApp !== 'function' &&
  typeof expressApp === 'object' &&
  'default' in expressApp
) {
  expressApp = expressApp.default
}

const proxy = serverless(expressApp)

export const handler = async (event, context) => {
  if (event.path && event.path.startsWith(NETLIFY_FUNCTION_PREFIX)) {
    event.path = '/api' + event.path.slice(NETLIFY_FUNCTION_PREFIX.length)
  }
  if (event.rawPath && event.rawPath.startsWith(NETLIFY_FUNCTION_PREFIX)) {
    event.rawPath = '/api' + event.rawPath.slice(NETLIFY_FUNCTION_PREFIX.length)
  }

  return proxy(event, context)
}
