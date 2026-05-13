import React from 'react'
import Navbar from './_components/Navbar';

export default function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar></Navbar>
    {children}</>
  )
}
