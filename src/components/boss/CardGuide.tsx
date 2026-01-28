'use client';
import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import IconDetail from '@/components/unit-data/IconDetail';
import { RavagedRealmMap } from '@/utils/hero-data/types';

interface CardGuideProps {
  src: string;
  label: string;
  difficulty: string;
}

const CardGuide: FC<CardGuideProps> = ({ src, ...props }) => {
  const { label, difficulty } = props;
  const ravagedRealmFaction = RavagedRealmMap[label as keyof typeof RavagedRealmMap];
  const title = ravagedRealmFaction ? `${label} Squad` : Object.values(props).filter(Boolean).join(' - ');

  return (
    <Link
      href={src}
      target="_blank"
      className="group container-primary input-secondary flex flex-col items-center justify-center border-1 border-primary-900 !p-0 rounded-lg overflow-hidden"
    >
      <h2 className="w-full inline-flex gap-2 items-center justify-center text-base p-1 border-b-1 border-tertiary-600">
        <IconDetail src={ravagedRealmFaction || difficulty} size="sm" />
        {title}
      </h2>
      <div className="relative size-64 group-hover:brightness-125">
        <Image src={src} alt={src} fill objectFit="cover" objectPosition="top" />
      </div>
    </Link>
  );
};

export default CardGuide;
