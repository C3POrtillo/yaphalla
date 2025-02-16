'use client';
import { type FC, useState } from 'react';

import Accordion from '@/components/accordion/accordion';
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
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-row gap-2 flex-wrap">
                  {hierarchies.map(hierarchy => (
                    <Button key={hierarchy} hierarchy={hierarchy} disabled={!!i}>
                      {hierarchy}
                    </Button>
                  ))}
                </div>
              ))}
          </div>
          <div className="h-min flex flex-col bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
            <h2>Text</h2>
            <div className="flex flex-row gap-2 items-end flex-wrap">
              {input.map((label, i) => (
                <Text key={label} label={label} placeholder={label} hideLabel={!!i} />
              ))}
            </div>
          </div>
          <div className="h-min flex flex-col bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
            <h2>Toggles</h2>
            {Array(2)
              .fill(0)
              .map((_, i) =>
                toggles.map(variant => (
                  <div key={`${i}-${variant}`} className="flex flex-row flex-wrap justify-center gap-2">
                    {hierarchies.map((hierarchy, j) => (
                      <Toggle
                        variant={variant}
                        key={hierarchy}
                        value={`${i ? 'disabled' : 'enabled'}-${hierarchy}`}
                        hierarchy={hierarchy}
                        defaultChecked={!!(j % 2)}
                        disabled={!!i}
                      />
                    ))}
                  </div>
                )),
              )}
          </div>
          <div className="w-full h-[500px] flex flex-col">
            <MarkdownEditor label="Markdown Editor" value={md} onChange={setMd} />
          </div>
          <div className="h-min flex flex-col bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
            <h2>Accordions</h2>
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {hierarchies.map(hierarchy => (
                    <Accordion
                      key={hierarchy}
                      label={`Label${i ? '' : ' Not'} Clickable (${hierarchy})`}
                      hierarchy={hierarchy}
                      labelIsClickable={!i}
                    >
                      <div className="inset p-2 max-h-24 overflow-auto bg-primary-750">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                      </div>
                    </Accordion>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Index;
