'use client';
import { type FC, useState } from 'react';

import Container from '@/components/container/Container';
import Button from '@/components/inputs/button/Button';
import MarkdownEditor from '@/components/inputs/markdown/MarkdownEditor';
import Text from '@/components/inputs/text/Text';
import Toggle from '@/components/inputs/toggle/Toggle';

const Index: FC = () => {
  const [md, setMd] = useState('');
  const hierarchies = ['primary', 'secondary', 'tertiary', 'warning'] as const;
  const toggles = ['checkbox', 'switch'] as const;
  const input = ['With Label', 'No Label'] as const;

  return (
    <>
      <Container className="m-0 flex w-full max-w-4/5 flex-col">
        <div className="w-full flex flex-row flex-wrap gap-4 justify-center items-center">
          <div className="h-min flex flex-col bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
            <h2>Buttons</h2>
            <div className="flex flex-row gap-2">
              {hierarchies.map(hierarchy => (
                <Button key={hierarchy} hierarchy={hierarchy}>
                  {hierarchy}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-min flex flex-col bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
            <h2>Text</h2>
            <div className="flex flex-row gap-2 items-end">
              {input.map((label, i) => (
                <Text key={label} label={label} placeholder={label} hideLabel={!!i} />
              ))}
            </div>
          </div>
          <div className="h-min flex flex-col bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
            <h2>Toggles</h2>
            {toggles.map(variant => (
              <div key={variant} className="flex flex-row gap-2">
                {hierarchies.map(hierarchy => (
                  <Toggle variant={variant} key={hierarchy} value={hierarchy} hierarchy={hierarchy} defaultChecked />
                ))}
              </div>
            ))}
          </div>
          <div className="w-full h-[500px] flex flex-col">
            <MarkdownEditor label="Markdown Editor" value={md} onChange={setMd} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Index;
