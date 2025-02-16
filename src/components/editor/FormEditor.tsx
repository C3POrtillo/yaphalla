import type { FC } from 'react';

import { useFormation } from '@/components/editor/FormationProvider';
import MarkdownEditor from '@/components/inputs/markdown/MarkdownEditor';
import Text from '@/components/inputs/text/Text';

const FormEditor: FC = () => {
  const { author, setAuthor, additionalNotes, setAdditionalNotes } = useFormation();

  return (
    <div className="m-2 flex h-144 w-11/12 flex-col items-center justify-center gap-2 rounded-lg border-2 border-black bg-neutral-800 p-4 shadow-lg shadow-black lg:w-full">
      <Text label="Author" value={author} setState={setAuthor} />
      <MarkdownEditor value={additionalNotes} onChange={setAdditionalNotes} />
    </div>
  );
};

export default FormEditor;
