import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const MENU_LIST=[{name:"Explore",path:"/explore"},{name:"Trips",path:"/trips"},{name:"Community",path:"/community"},{name:"Pricing",path:"/pricing"}, ] 
function Navbar() {
  return (
    <div className='sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 backdrop-blur-md py-4 px-8 md:px-16 transition-all'>
                       {/* logo */}
      <Link href={'/'}
      className='flex items-center gap-2 cursor-pointer'
      ><Image src="/logo.svg" alt="logo" width={30} height={30} />
      <span className='text-2xl font-bold'>Tripma</span>
      </Link>  

      {/* menu list  */}
      <div className='hidden md:flex gap-6'>       
      {MENU_LIST.map  ((item,index)=>{
        return <Link href={item.path} key={index}>
       <h2 className='hover:text-primary font-semibold text-lg '> 
         {item.name}
       </h2>
        </Link>
      }) 
      }
      </div>  
      {/* get started btn */}
      <div>
        <Button className="bg-primary text-white">Get Started</Button>
      </div>
    </div>
  );
}

export default Navbar