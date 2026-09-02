import { useAnecdotesActions } from '../store'

const Filter = () => {
  const { setFilter } = useAnecdotesActions()
  const handleChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }
  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter
      <input data-testid="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter