import React, { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { useAppSelector } from '../store/hooks'
import { types } from '../utils'

interface Props {
  onLinkClicked?: () => void
}

interface LinkProps {
  name: string
  href: string
}

interface SeveralLinksProps {
  name: string
  children?: ReactNode
}

export default function Navigation({ onLinkClicked }: Props) {
  const location = useLocation()

  const games = useAppSelector(state => state.pokedex.allGames)

  const researchTasks = ['Galar', 'Kanto']

  function SingleLink({ name, href }: LinkProps) {
    const current = href === location.pathname

    return (
      <Link
        to={href}
        className={[
          current
            ? 'bg-primary-600 text-white'
            : 'text-white hover:bg-gray-50 hover:text-gray-900',
          'flex items-center rounded-md px-3 py-2 text-sm font-medium',
        ].join(' ')}
        onClick={onLinkClicked}
      >
        <span className="truncate">{name}</span>
      </Link>
    )
  }

  function SeveralLinks({ name, children }: SeveralLinksProps) {
    return (
      <Disclosure as="div" className="space-y-1">
        {({ open }) => (
          <>
            <Disclosure.Button
              className={[
                'group flex w-full items-center py-2 pr-2 text-left text-sm',
                'rounded-md font-medium text-white focus:outline-none',
              ].join(' ')}
            >
              <svg
                className={[
                  open ? 'rotate-90 text-gray-400' : 'text-gray-300',
                  'mr-2 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
                ].join(' ')}
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
              </svg>
              {name}
            </Disclosure.Button>
            <Disclosure.Panel>{children}</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      <SingleLink name="Home" href="/" />
      <SeveralLinks name="Pok??dex">
        {games &&
          games.map(game => (
            <SingleLink
              key={game.code}
              name={game.name}
              href={`/pokedex/${game.code}`}
            />
          ))}
      </SeveralLinks>

      <SeveralLinks name={'Types'}>
        {types &&
          types.all.map(type => (
            <SingleLink
              key={type.code}
              name={type.name}
              href={`/type/${type.code}`}
            />
          ))}
      </SeveralLinks>

      <SeveralLinks name={'Research Tasks'}>
        {researchTasks.map(researchTask => (
          <SingleLink
            key={researchTask.toLowerCase()}
            name={`${researchTask} Research Tasks`}
            href={`/research-task/${researchTask.toLowerCase()}`}
          />
        ))}
      </SeveralLinks>

      <SingleLink name="Search Pok??mon By Type" href="/search-by-type" />

      <SingleLink name={"Who's that Pok??mon?"} href="/whos-that-pokemon" />

      <SingleLink name="About" href="/about" />
    </nav>
  )
}
