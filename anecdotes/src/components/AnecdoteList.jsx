import { useAnecdotes, useFilter, useAnecdotesActions } from "../store"
import { useNotificationActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const filter = useFilter()
  const { setNotification } = useNotificationActions()
  
  const filtered = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  const sorted = filtered.toSorted((a,b) => b.votes - a.votes)
  const { vote, removeAnecdote } = useAnecdotesActions()
  const voteAnecdote = (id, content) => {
    vote(id)
    setNotification(`You voted '${content}'`)
  }
  const deleteAnecdote = (id, content) => {
    removeAnecdote(id)
    setNotification(`You deleted '${content}'`)
  }
  return (
    <div>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id, anecdote.content)}>vote</button>
          </div>
          <div>
            <button onClick={() => deleteAnecdote(anecdote.id, anecdote.content)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList