import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const menu = ['about-me', 'projects', 'contact'];

  const [data, setdata] = useState(menu);

  // const [data, setdata] = useState(() => {
  //   if (!menu.includes(router.pathname.substring(1))) return menu;

  //   if (router.pathname.substring(1) === 'menu') return ['close'];

  //   return ['menu'];
  // });

  useEffect(() => {
    setdata(() => {
      if (!menu.includes(router.pathname.substring(1))) return menu;

      if (router.pathname.substring(1) === 'menu') return ['close'];

      return ['menu'];
    });
  }, [router]);
  return (
    <nav className='flex justify-between text-xl py-9 px-7'>
      <h4>
        <Link href={'/'}>FAITH</Link>
      </h4>
      <ul className='flex gap-10'>
        {data.map((item, key) => (
          <li key={key} className='after capitalize'>
            {item.split('-').join(' ')}
            <Link href={item} className='absolute inset-0 z-[4000]'></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

