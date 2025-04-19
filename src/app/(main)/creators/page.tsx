import 'flag-icons/css/flag-icons.min.css';
import type { FC } from 'react';

import Container from '@/components/container/Container';
import CardCreator from '@/components/creators/CardCreator';
import { sortCreators } from '@/components/creators/utils';
import { creators } from '@/utils/pathsCreators';

const Index: FC = () => (
  <>
    <Container className="my-2 px-4 w-fit">
      <div className="container-primary flex flex-col items-center gap-2">
        <h2 className="text-tertiary-500">Check out these amazing people!</h2>
      </div>
    </Container>
    <Container className="my-2 flex grow w-full max-w-4/5 flex-col justify-start items-center">
      <div className="flex flex-row flex-wrap gap-2 justify-center 4xl:max-w-2/3">
        {Object.entries(creators)
          .sort(sortCreators)
          .map(([slug, props]) => (
            <CardCreator key={slug} {...props} />
          ))}
      </div>
    </Container>
  </>
);

export default Index;
