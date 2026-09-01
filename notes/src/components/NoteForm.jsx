import { useNotesActions } from "../store"
// import noteService from '../services/notes'

const NoteForm = () => {
  const { add } = useNotesActions()
  // const generateId = () => Number((Math.random() * 1000000).toFixed(0))
  const addNote = async (e) => {
    e.preventDefault()
    const content = e.target.note.value
    // const newNote = await noteService.createNew(content)
    await add(content)
    e.target.reset()
  }

  return (
    <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
    </form>
  )
}

export default NoteForm