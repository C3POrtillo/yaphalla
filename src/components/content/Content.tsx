'use client';

import type { ContentBodyProps } from '@/components/content/ContentBody';
import type { ContentKickerProps } from '@/components/content/ContentKicker';
import type { ContentTitleProps } from '@/components/content/ContentTitle';
import type { CtaProps } from '@/components/content/Cta';
import type { ImageType } from '@/components/image/types';
import type { FC, PropsWithChildren } from 'react';

import ContentBody from '@/components/content/ContentBody';
import ContentKicker from '@/components/content/ContentKicker';
import ContentTitle from '@/components/content/ContentTitle';
import CtaContainer from '@/components/content/Cta';
import ImageComponent from '@/components/image/Image';
import { classMerge } from '@/utils/utils';

interface ContentProps extends ContentKickerProps, ContentTitleProps, ContentBodyProps, CtaProps, PropsWithChildren {
  image?: ImageType;
  imageAlt?: string;
  className?: string;
}

const Content: FC<ContentProps> = ({ kicker, title, body, image, imageAlt, cta, className, children }) => (
  <div className={classMerge('content-box pb-4', className)}>
    <ContentKicker kicker={kicker} />
    <ContentTitle title={title} />
    {children}
    <ContentBody body={body} />
    <CtaContainer cta={cta} />
    <ImageComponent image={image} imageAlt={imageAlt} />
  </div>
);

export default Content;
