import httpClient from './httpClient'

export const subscribeNewsletter = async (email: string) => {
  const { data } = await httpClient.post('/api/newsletters', { email })
  return data
}
