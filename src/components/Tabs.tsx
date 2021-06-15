import React, { ReactNode, useState } from 'react'

interface Tab {
  value: string,
  label: string,
  component: ReactNode
}

interface Props {
  tabs: Tab[],
}

export default function Tabs(props: Props) {
  const { tabs } = props

  const [selected, setSelected] = useState(tabs[0].value)

  return (
    <>
      <div className={tabs.length === 1 ? 'hidden' : ''}>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Pokédex list
          </label>
          <select
            id="tabs"
            name="tabs"
            className={[
              "block w-full pl-3 pr-10 py-2 text-base border-gray-300",
              "focus:outline-none focus:ring-indigo-500 focus:border-indigo-500",
              "sm:text-sm rounded-md"
            ].join(' ')}
            value={selected}
            onChange={event => setSelected(event.target.value)}
          >
            {tabs.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(({ value, label }) => (
                <a
                  key={value}
                  className={[
                    value === selected
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
                  ].join(' ')}
                  onClick={() => setSelected(value)}
                  aria-current={value === selected ? 'page' : undefined}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className='pt-8'>
        {tabs.map(tab => (
          <div className={tab.value !== selected ? 'hidden' : ''}>
            {tab.component}
          </div>
        ))}
      </div>
    </>
  )
}