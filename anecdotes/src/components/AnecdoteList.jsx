import { useAnecdotes, useAnecdotesActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const sorted = anecdotes.toSorted((a,b) => b.votes - a.votes)
  
  const { vote } = useAnecdotesActions()
  const voteAnecdote = (id) => {
    vote(id)
  }

  return (
    <div>
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList