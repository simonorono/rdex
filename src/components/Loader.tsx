import React from 'react'

interface Props {
  className?: string
}

export default function Loader({ className }: Props) {
  return (
    <div className={`flex justify-center align-middle ${className}`}>
      <div className="spinner" />
    </div>
  )
}
