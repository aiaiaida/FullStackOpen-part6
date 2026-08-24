import { create } from 'zustand'

const useGoodStore = create(set => ({
  goodCounter:0,
  increment: () => set(state => ({ goodCounter: state.goodCounter + 1 }))
}))
const useNeutralStore = create(set => ({
  neutralCounter:0,
  increment: () => set(state => ({ neutralCounter: state.neutralCounter + 1}))
}))
const useBadStore = create(set => ({
  badCounter:0,
  increment: () => set(state => ({ badCounter: state.badCounter + 1 }))
}))

export const useGoodCounter = () => useGoodStore(state => state.goodCounter)
export const useNeutralCounter = () => useNeutralStore(state => state.neutralCounter)
export const useBadCounter = () => useBadStore(state => state.badCounter)

export const useGoodIncrement = () => useGoodStore(state => state.increment)
export const useNeutralIncrement = () => useNeutralStore(state => state.increment)
export const useBadIncrement = () => useBadStore(state => state.increment)