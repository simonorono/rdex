import { useAppSelector } from './hooks'

export function frontPokemonOfSpeciesByPredicate(
  predicate: (species: Pokemon) => boolean
): Pokemon[] {
  return useAppSelector(state => {
    if (!state.pokemon.loaded) {
      return []
    }

    const pokemonById = state.pokemon.pokemonById

    return state.pokemon.allSpecies
      .map(spcy => {
        let pkms = spcy.pokemonIds.map(id => pokemonById[id]).filter(predicate)

        return pkms.length > 0 ? pkms[0] : null
      })
      .filter(Boolean) as Pokemon[]
  })
}

let pokemonListForPokedexCache = {} as { [key: number]: Pokemon[] }

export function getPokemonListForPokedex(pokedex: Pokedex | null): Pokemon[] {
  return useAppSelector(state => {
    if (!pokedex) {
      return []
    }

    if (pokedex.id in pokemonListForPokedexCache) {
      return pokemonListForPokedexCache[pokedex.id]
    }

    const list = pokedex.entries.map((entry: PokedexEntry): Pokemon => {
      const species = state.pokemon.speciesById[entry.species]

      const pokemon = species.pokemonIds.map(
        id => state.pokemon.pokemonById[id]
      )

      const selectedByRegion = pokemon.find(pkm => {
        if (!pkm.code.includes('-')) {
          return null
        }

        // Regional variants are named with a dash, i.e. raichu-alolan
        const parts = pkm.code.split('-')

        if (parts[1] === pokedex.region) {
          return pkm
        }

        return null
      })

      return selectedByRegion || pokemon[0]
    })

    pokemonListForPokedexCache[pokedex.id] = list

    return list
  })
}
