import { create } from 'zustand'
import noteService from './services/notes'
import { devtools } from 'zustand/middleware'

// const logger = (config) => (set, get) => config(
//   (...args) => {
//     console.log('prev state', get())
//     set(...args)
//     console.log('next state', get())
//   }
// )

// const useCounterStore = create(set => ({
//   counter: 0,
//   actions: {
//     increment: () => set(state => ({ counter: state.counter + 1 })),
//     decrement: () => set(state => ({ counter: state.counter - 1 })),
//     zero: () => set(() => ({ counter: 0 }))
//   }
// }))

const useNoteStore = create(devtools((set, get) => ({
  notes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newNote = await noteService.createNew(content)
      set(state => ({ notes: state.notes.concat(newNote) }))
    },
    toggleImportance: async (id) => {
      const note = get().notes.find(n => n.id === id)
      const updated = await noteService.update(id, { ...note, important: !note.important })
      set(state => ({
        notes: state.notes.map(n => n.id === id ? updated : n)
      }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const notes = await noteService.getAll()
      set(() => ({ notes }))
    }
  }
})))

// export const useCounter = () => useCounterStore(state => state.counter)
// export const useCounterActions = () => useCounterStore(state => state.actions)

// export default useCounterStore

// export const useNotes = () => useNoteStore(state => state.notes)
export const useFilter = () => useNoteStore((state) => state.filter)
export const useNotesActions = () => useNoteStore(state => state.actions)

export default useNoteStore
export const useNotes = () => {
  const notes = useNoteStore((state) => state.notes)
  const filter = useNoteStore((state) => state.filter)
  if (filter === 'important') return notes.filter(n => n.important)
  if (filter === 'nonimportant') return notes.filter(n => !n.important)
  return notes
}