const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)

  if (!response) {
      throw new Error('Failed to fetch')
  }
    return await response.json()
}