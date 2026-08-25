import { useAnecdotesActions } from '../store'

const AnecdoteForm = () => {

  const { add } = useAnecdotesActions()
  
  const createNew = (e) => {
    e.preventDefault()
    const newAnecdote = e.target.input.value
    add(newAnecdote)
    e.target.reset()
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div>
          <input name="input" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm