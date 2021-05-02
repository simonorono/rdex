import React, { useEffect } from 'react'
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Index from './components/Index'
import NotFound from './components/NotFound'
import RDex from './RDex'
import { fetchPokedexList } from './store'
import { useAppDispatch } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => { dispatch(fetchPokedexList()) }, [])

  return (
    <Router>
      <RDex>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </RDex>
    </Router>
  )
}

export default App
