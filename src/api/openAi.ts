import request from '../utils/request'

export function getResponse(prompt: string) {
  return request.post('/engines/davinci/completions', {
    prompt,
    max_tokens: 150,
    n: 1,
    stop: '\n',
  })
}




