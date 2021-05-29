import React from 'react'
import { useParams } from 'react-router'
import { useAppSelector } from '../store/hooks'

export default function Pokemon() {
  const params = useParams<{ id: string }>()

  const id = parseInt(params.id)

  const pokemon = useAppSelector(state => state.pokemon.speciesById[id])

  return (
    <>
      {pokemon && (
        <p>{pokemon.name}</p>
      )}
    </>
  )
}
