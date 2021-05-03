import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getPokedexList } from '../api'

interface PokedexState {
  all: Array<Pokedex>,
  loaded: boolean,
  current?: Pokedex,
}

const initialState: PokedexState = {
  all: [],
  loaded: false,
}

const performInitialLoad = createAsyncThunk(
  'pokedex/perform-initial-load',
  async (_, { dispatch }) => {
    const pokedexList = await getPokedexList()

    dispatch(setCurrentPokedex(pokedexList[0]))

    return pokedexList
  }
)

const setCurrentPokedex = createAsyncThunk(
  'pokedex/set-current-pokedex',
  async (pokedex: Pokedex, { dispatch }) => {
    dispatch(actions.setCurrent(pokedex))
  }
)

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Pokedex>) => {
      state.current = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      performInitialLoad.fulfilled,
      (state, action: PayloadAction<Array<Pokedex>>) => {
        state.all = action.payload
        state.loaded = true
      }
    )
  }
})

const { actions, reducer } = pokedexSlice

export { performInitialLoad, setCurrentPokedex }

export default reducer
