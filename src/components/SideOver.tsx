import React, { Fragment, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Navigation from './Navigation'
import { APP_NAME } from '../utils'

export default function SideOver() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex h-full items-center rounded-full text-white focus:outline-none"
      >
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="h-8 w-8" aria-hidden="true" />
      </button>

      <Transition show={open}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="absolute inset-0 overflow-hidden">
            <TransitionChild
              enter="transition-opacity duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-black bg-opacity-60" />
            </TransitionChild>

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transition-transform ease-linear duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform ease-linear duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="w-screen max-w-sm">
                  <div className="flex h-full flex-col overflow-y-scroll bg-primary-800 py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-white">
                          {APP_NAME} menu
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            className={[
                              'rounded-md bg-primary-700 text-gray-200 hover:text-white',
                              'focus:outline-none ',
                            ].join(' ')}
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div className="relative flex-1 px-4 sm:px-6">
                      <Navigation onLinkClicked={() => setOpen(false)} />
                    </div>
                  </div>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
