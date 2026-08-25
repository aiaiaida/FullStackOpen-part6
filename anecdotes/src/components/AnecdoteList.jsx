import { useAnecdotes, useAnecdotesActions } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  
  const { vote } = useAnecdotesActions()
  const voteAnecdote = (id) => {
    vote(id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
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