import type { FC } from 'react';

import Container from '@/components/container/Container';
import Link from '@/components/link/Link';
import Logo from '@/components/link/Logo';
import { socials } from '@/utils/paths';

const Index: FC = () => (
  <>
    <Container className="container-primary my-4 flex flex-col !p-4 items-center w-fit">
      <h1 className="flex flex-row gap-2 items-center text-tertiary-600">
        Welcome to
        <Logo alt="Yaphalla" />
      </h1>
    </Container>
    <Container className="my-4 flex flex-col sm:flex-row items-start w-full max-w-11/12 lg:max-w-2/3 4xl:max-w-2/5">
      <div className="flex flex-col gap-4 w-full">
        <div className="container-primary flex flex-col items-center gap-2 text-center">
          <h2 className="text-tertiary-600">Announcements</h2>
          <div className="inset-secondary flex flex-col items-center w-full gap-2 whitespace-normal">
            <h3 className="flex flex-row whitespace-pre items-center">
              Now introducing{' '}
              <Link href="/editor" className="bg-primary input-primary size-base text-tertiary-600">
                YapBuilder!
              </Link>
            </h3>
            <p>
              Use{' '}
              <Link href="/editor" className="input-link inline">
                YapBuilder
              </Link>{' '}
              to create your own custom formations including enemy placements or Arena/Supreme Arena defenses!
            </p>
            <p>
              Please report any issues to{' '}
              <Link
                href="https://discord.com/channels/1332082220013322240/1332814583781523529"
                className="input-link inline"
              >
                #feature-requests
              </Link>
              {' on Discord!'}
            </p>
          </div>
        </div>
        <div className="container-primary flex flex-col items-center gap-2">
          <h2 className="text-tertiary-600">About Us</h2>
          <div className="inset-secondary flex flex-col items-center w-full text-center">
            <p>
              Yaphalla is a community focused on creating high quality, accurate PVE AFK Journey content, and of course
              yapping about all things AFK Journey!
            </p>
          </div>
        </div>
      </div>
      <div className="container-primary flex flex-col gap-2 items-center w-full sm:w-fit">
        <h2 className="text-tertiary-600">Join us on:</h2>
        <div className="flex flex-row sm:flex-col gap-2">
          {Object.entries(socials).map(([label, { site, href }]) => (
            <Link
              key={label}
              href={href}
              className="w-full bg-secondary input-secondary size-base gap-2 text-lg md:text-xl justify-center"
            >
              <i className={`fab fa-${site} fa-lg`} />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  </>
);

export default Index;
