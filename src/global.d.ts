declare module 'pokedex-promise-v2'

interface Document {
  lazyLoadInstance: any
}

declare interface PokedexEntry {
  pokedexNumber: number,
  pokemonSpeciesId: number,
}

declare interface Pokedex {
  code: string,
  name: string,

  pokemonEntries: PokedexEntry[],
}

declare interface Pokemon {
  id: number,
  code: string,
  name: string,
  typeIds: number[],
  speciesId: number,
}

declare interface PokemonSpecies {
  id: number,
  code: string,
  name: string,
  pokemonIds: number[],
}

declare interface Name {
  name: string,
  lang: string
}

declare interface Type {
  id: number,
  code: string,
  name: string,
  damageRelationships?: DamageRelationShip[]
}

declare interface DamageRelationShip {
  factor: number,
  typeId: number,
}
