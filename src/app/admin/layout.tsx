import { Nav, NavLink } from '@/components/Nav'
import { Metadata } from 'next'
import React from 'react'
export const dynamic = "force-dynamic"

type Props = {
    children: React.ReactNode
}
export const metadata: Metadata = {
    title: "Admin | E-Commerce Store",
};

const layout = ({ children }: Readonly<Props>) => {
    return (
        <>
            <Nav>
                <NavLink href='/admin'>Dashboard</NavLink>
                <NavLink href='/admin/products'>Products</NavLink>
                <NavLink href='/admin/users'>Customers</NavLink>
                <NavLink href='/admin/orders'>Sales</NavLink>
            </Nav>
            <div className='container my-6'>{children}</div>
        </>
    )
}

export default layout