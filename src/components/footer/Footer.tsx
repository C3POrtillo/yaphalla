import type { FC } from 'react';

import Socials from '@/components/socials/Socials';
import { TITLE } from '@/utils/types';

const Footer: FC = () => (
  <>
    <footer className="footer">
      <div className="flex flex-col justify-around gap-2 items-center">
        <Socials variant="full" className="grid grid-cols-3" />
        <p className="text-sm w-full whitespace-pre-wrap text-wrap text-center">© 2025 {TITLE}</p>
      </div>
    </footer>
  </>
);

export default Footer;
