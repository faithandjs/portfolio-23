import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='flex justify-between text-xl py-9 px-7'>
      <h4>
        <Link href={'/'}>FAITH</Link>
      </h4>
      <ul className='flex gap-10'>
        {['about-me', 'projects', 'contact'].map((item, key) => (
          <li key={key} className='after capitalize'>
            {item.split('-').join(' ')}
            <Link href={item} className='absolute inset-0 z-[4000]'></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

