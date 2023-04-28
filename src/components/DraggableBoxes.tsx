import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { IoClose } from 'react-icons/io5';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

export default function DraggableBoxes({
  name,
  year,
  keys,
  img,
  alt,
  id,
  x,
  y,
  a,
}: {
  name: string;
  year: number;
  keys: Array<string>;
  img: string;
  alt: string;
  id: number;
  x?: number | string;
  y?: number | string;
  a: string;
}) {
  gsap.registerPlugin(Draggable);
  const isBrowser = typeof window === 'object' ? true : false;
  const accessor = `.drag${id}`;
  const [isActive, setIsActive] = useState(false);

  const remove = () => {
    gsap.to(accessor, {
      opacity: 0,
      duration: 1,
      ease: 'ease-in',
      delay: 0.1,
    });

    setTimeout(() => {
      document.querySelector(accessor)?.classList.add('delete');
    }, 1100);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const liftText = (delay = 0) =>
        gsap.to('.text', { zIndex: 2000, duration: 1, ease: 'ease-in', delay });
      const dropText = (delay = 0) =>
        gsap.to('.text', { zIndex: -1, duration: 0, ease: 'ease-in', delay });
      // dropText();

      //INITIAL ANIMATION
      const tl1 = gsap.timeline();
      tl1.to(accessor, { opacity: 0, x, y, scale: 0.5 }).to(accessor, {
        opacity: 1,
        scale: 1,
        delay: 0.7 + id / 2,
        duration: 0.5,
        ease: 'ease-in',
      });

      //REMOVE BOX

      const tl = gsap.timeline({ paused: true });
      tl.to('#drag', {
        duration: 0.6,
        opacity: 1,
        ease: 'ease-in',
      }).to('#drag', {
        duration: 0.5,
        opacity: 0.3,
        ease: 'ease-in',
      });

      let timeoutId = setTimeout(function () {
        // tl.play();
        // liftText(1);
      }, 7000);

      const fadeOut = () => {
        if (!isActive) {
          setTimeout(function () {
            console.log(isActive, 'drop');
            liftText(1);
            tl.play();
          }, 5000);
        }
      };

      // THIS WORKS
      // document
      //   .querySelector('#container')!
      //   .addEventListener('click', function () {
      //     clearTimeout(timeoutId);
      //     timeoutId = setTimeout(function () {
      //       tl.reverse();
      //       dropText();
      //     }, 400);
      //     fadeOut();
      //   });

      Draggable.create('#drag', {
        type: 'x,y',
        edgeResistance: 0.65,
        bounds: '#container',
        inertia: true,
        zIndexBoost: true,
        // onDragStart: () => {
        //   setIsActive(true);
        //   console.log('draggiing', isActive);
        // },
        // onDragEnd: () => {
        //   console.log('end', isActive);
        //   setIsActive(false);
        //   setTimeout(function () {
        //     fadeOut();
        //   }, 200);
        // },
      });
    });

    return () => ctx.revert();
  }, [isBrowser ? document : '']);

  return (
    <div
      id='drag'
      className={`py-0 px-2 bg-[#F6F6F6] w-[260px]  text-[#1B1919] drag${id} opacity-0 relative`}>
      <span className='flex justify-between  py-2 uppercase px-1'>
        {name}
        <button
          className='border-2 border-primary  rounded-full w-6 h-6 flex justify-center items-center '
          onClick={remove}>
          <IoClose className='color-primary' />
        </button>
      </span>

      <div className='bg-blue-400  relative'>
        <Image
          className=''
          src={`/assets/images/drag-bg${id % 2 === 0 ? '1' : '2'}.png`}
          alt={
            id % 2 === 0
              ? 'plastic cherry on a purple background'
              : 'vintage picture of clouds'
          }
          width={260}
          height={192}
        />
        <Image
          className=' absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'
          src={img}
          alt={alt}
          width={200}
          height={192}
        />
      </div>

      <span className='flex justify-between  pt-2 pb-4 px-1'>
        <span>
          {year}&nbsp;&#8226;&nbsp;
          <span className=' '>{keys.join(', ')}</span>
        </span>
        <Link
          href={a}
          className='hover:child:rotate-0 flex items-center after:duration-400 after:h-[1px] after:!bg-[#1B1919] see-live after'>
          see live
          <AiOutlineArrowRight className='-rotate-45 arrow transition-all duration-200' />
        </Link>
      </span>
    </div>
  );
}

