import React, { useState } from 'react'
import { images } from '../utils'
import Loader from './Loader'
import BaseStats from './pokemon_data/BaseStats'
import PokemonDetails from './pokemon_data/PokemonDetails'
import TypeDefenses from './pokemon_data/TypeDefenses'

const MAX_IMAGE_DIMENSION = 450

const pokemons = import.meta.glob('../../data/raw/pokemon/*.json')

const key = (id: string) => `../../data/raw/pokemon/${id}.json`

const imageContainerStyle = {
  '--aspect-ratio': '450/450',
} as React.CSSProperties

interface Props {
  pokemon: Pokemon
  pokemonData?: any
}

export default function PokemonData({ pokemon }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState(null as PokemonData | null)

  const dataFile = pokemons[key(String(pokemon.id))]

  if (dataFile) {
    dataFile().then(data => {
      setPokemonData(data as PokemonData)
      setIsLoading(false)
    })
  }

  const onImageLoad = ({ currentTarget }: React.SyntheticEvent) => {
    currentTarget.classList.remove('opacity-0')
  }

  return (
    <>
      {isLoading && <Loader />}

      {pokemon && pokemonData && (
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div
              className="min-w-[90%] border bg-gray-50 sm:min-w-[450px]"
              style={imageContainerStyle}
            >
              <img
                width={MAX_IMAGE_DIMENSION}
                height={MAX_IMAGE_DIMENSION}
                src={images.dataPageImage(pokemon.id)}
                alt={`artwork for ${pokemon.name}`}
                className="h-full w-full opacity-0 transition-opacity sm:min-w-[450px]"
                onLoad={onImageLoad}
              />
            </div>

            <div className="mt-10 flex w-full grow flex-col justify-center px-2 sm:px-10 md:mt-0">
              <PokemonDetails pokemon={pokemon} pokemonData={pokemonData} />
            </div>
          </div>

          <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 md:space-x-6">
            <BaseStats className="flex-1" pokemonData={pokemonData} />

            <TypeDefenses className="flex-1" pokemon={pokemon} />
          </div>
        </div>
      )}
    </>
  )
}
