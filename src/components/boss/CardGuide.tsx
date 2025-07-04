'use client';
import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

interface CardGuideProps {
  src: string;
  label: string;
}

const CardGuide: FC<CardGuideProps> = ({ src, label }) => (
  <Link
    href={src}
    target="_blank"
    className="group container-primary input-secondary flex flex-col items-center justify-center !p-0 rounded-lg overflow-hidden"
  >
    <div className="relative size-64 group-hover:brightness-125">
      <Image src={src} alt={src} fill={true} objectFit="cover" />
    </div>
    <h2 className="text-base p-1">{label}</h2>
  </Link>
);

export default CardGuide;
