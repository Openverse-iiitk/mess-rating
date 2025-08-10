'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';

export default function FloatingCockroach() {
  const cockroachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cockroach = cockroachRef.current;
    if (!cockroach) {
      return;
    }

    // Initial animation - slide in from right
    gsap.fromTo(cockroach, 
      { 
        x: 100, 
        opacity: 0,
        scale: 0.5
      },
      { 
        x: 0, 
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "bounce.out",
        delay: 2 // Delay the entrance for 2 seconds
      }
    );

    // Continuous floating animation
    const floatAnimation = gsap.to(cockroach, {
      y: -10,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Wiggle animation
    const wiggleAnimation = gsap.to(cockroach, {
      rotation: 5,
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(cockroach, {
        scale: 1.2,
        rotation: 15,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cockroach, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    };

    cockroach.addEventListener('mouseenter', handleMouseEnter);
    cockroach.addEventListener('mouseleave', handleMouseLeave);

    // Click animation
    const handleClick = () => {
      gsap.to(cockroach, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    };

    cockroach.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      floatAnimation.kill();
      wiggleAnimation.kill();
      cockroach.removeEventListener('mouseenter', handleMouseEnter);
      cockroach.removeEventListener('mouseleave', handleMouseLeave);
      cockroach.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div 
      ref={cockroachRef}
      className="fixed bottom-4 right-4 z-50 cursor-pointer group"
      title="View bad mess images"
    >
      <Link href="/bad-mess" className="block">
        <div className="relative w-20 h-20 drop-shadow-lg">
          <Image
            src="/fat-cockroach-eating-cookie-vector-600nw-1618836004.png"
            alt="Report bad mess"
            fill
            className="object-contain filter drop-shadow-md"
          />
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            View bad mess images 🤢
            <div className="absolute top-full right-4 border-4 border-transparent border-t-black"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}
