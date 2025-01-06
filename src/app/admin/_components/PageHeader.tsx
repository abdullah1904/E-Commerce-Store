
import React from 'react'

type Props = {
    children: React.ReactNode
}

const PageHeader = ({children}: Props) => {
  return (
    <h1 className='text-4xl mb-4'>{children}</h1>
  )
}

export default PageHeader