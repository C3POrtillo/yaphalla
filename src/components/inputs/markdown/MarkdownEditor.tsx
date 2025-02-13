'use client';
import dynamic from 'next/dynamic';

import type { Dispatch, FC, SetStateAction } from 'react';
import 'react-markdown-editor-lite/lib/index.css';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
});

interface MarkdownEditorProps {
  label?: string;
  value: string;
  placeholder?: string;
  contentPlaceholder?: string;
  onChange: Dispatch<SetStateAction<string>>;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({ label, value, placeholder, contentPlaceholder, onChange }) => (
  <div className="flex flex-col size-full bg-primary-950/80 justify-center items-center rounded-lg p-4 gap-4">
    {label && <h2>{label}</h2>}
    <MdEditor
      className="markdown-styles size-full !rounded-lg overflow-hidden"
      plugins={[
        'header',
        'font-bold',
        'font-italic',
        'font-underline',
        'list-unordered',
        'list-ordered',
        'block-wrap',
        'link',
        'clear',
        'logger',
        'mode-toggle',
        'full-screen',
      ]}
      value={value}
      placeholder={placeholder ?? 'Markdown Content'}
      renderHTML={text => (
        <>
          <ReactMarkdown>{text || (contentPlaceholder ?? 'Content Preview')}</ReactMarkdown>
        </>
      )}
      onChange={({ text }) => onChange(text)}
    />
  </div>
);

export default MarkdownEditor;
