import React from 'react'

interface ContainerProps {
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className='w-11/12 mx-auto px-4 xl:px-10 md:px-6'>
        {children}
    </div>
  )
}

export default Container