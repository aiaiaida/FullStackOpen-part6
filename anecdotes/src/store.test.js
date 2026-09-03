import { describe, beforeEach, it, vi, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./service/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn()
  }
}))

import anecdotesService from './service/anecdotes'
import useAnecdoteStore, {useAnecdotes, useAnecdotesActions, useFilter } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdotesActions', () => {
  it('initializes with backend anecdotes', async () => {
    const mockAnecdotes = [{ id: 1, content: 'A', votes: 0}]
    anecdotesService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdotesActions())
    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})