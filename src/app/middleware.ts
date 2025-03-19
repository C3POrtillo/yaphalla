import { NextResponse } from 'next/server';

import { redirects } from '@/utils/paths';

export const middleware = async (req: Request) => {
  const { pathname } = new URL(req.url);
  const redirectLink = pathname.slice(1);

  const target = Object.values(redirects).find(item => item.redirect === `/${redirectLink}`);

  if (target?.href) {
    return NextResponse.redirect(target.href, 301);
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/:redirectLink*',
};
