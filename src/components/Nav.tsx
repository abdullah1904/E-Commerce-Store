"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps } from 'react'

type Props = {
    children: React.ReactNode
}

export const Nav = ({children}: Readonly<Props>) => {
  return (
    <div className='bg-primary text-primary-foreground flex justify-center px-4'>
        {children}
    </div>
  )
}

export const NavLink = (props: Omit<ComponentProps<typeof Link>,"className">)=>{
    const pathName = usePathname();
    return (
        <Link {...props} className={cn(`p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground`, pathName == props.href && "bg-background text-foreground")}/>
    )
}