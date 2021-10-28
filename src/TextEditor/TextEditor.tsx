import React, { FC } from 'react';
import { Editor } from 'draft-js';
import { useEditorApi } from './context';
import { BLOCK_RENDER_MAP, CUSTOM_INLINE_MAP, } from './config';
import { Box } from '@chakra-ui/layout';

interface ITextEditorProps { }

const TextEditor: FC<ITextEditorProps> = (props) => {
  const {} = props;
  const editorApi = useEditorApi();

  return (
    <Box p="10px">
      <Editor
        editorState={editorApi.state}
        onChange={editorApi.onChange}
        blockRenderMap={BLOCK_RENDER_MAP}
        customStyleMap={CUSTOM_INLINE_MAP}
        handleKeyCommand={editorApi.handleKeyCommand}
      />
    </Box>

  );
}

export default TextEditor;
