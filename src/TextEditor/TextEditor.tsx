import { Box } from "@chakra-ui/layout";
import { Editor } from "draft-js";
import { FC } from "react";
import { BLOCK_RENDER_MAP, CUSTOM_INLINE_MAP } from "./config";
import { useEditorApi } from "./context";

interface ITextEditorProps {}

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
};

export default TextEditor;
