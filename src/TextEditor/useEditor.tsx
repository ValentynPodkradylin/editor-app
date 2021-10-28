import {
  DraftEditorCommand,
  DraftHandleValue,
  EditorState,
  RichUtils,
} from "draft-js";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { BlockType, InlineStyle} from "./config";

export interface SyntheticKeyboardEvent {
  type: KeyboardEvent;
};

export type EditorApi = {
  /** это объект состояния верхнего уровня для редактора */
  state: EditorState;
  /**Функция onChange, которая будет выполняться редактором при редактировании и изменении выбора */
  onChange: Dispatch<SetStateAction<EditorState>>;
  toggleBlockType: (blockType: BlockType) => void;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  currentBlockType: BlockType;
  handleKeyCommand: (command: DraftEditorCommand, editorState: EditorState) => DraftHandleValue;
  hasInlineStyle: (inlineStyle: InlineStyle) => boolean;
}

export const useEditor = (): EditorApi => {
  const [state, setState] = useState(() => EditorState.createEmpty());

  const toggleBlockType = useCallback((blockType: BlockType) => {
    setState(currentState => RichUtils.toggleBlockType(currentState, blockType));
  }, []);

  const hasInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    const currentStyle = state.getCurrentInlineStyle();
    return currentStyle.has(inlineStyle);
  }, [state]);

  const toggleInlineStyle = useCallback((inlineStyle: InlineStyle) => {
    setState((currentState) => RichUtils.toggleInlineStyle(currentState, inlineStyle));
  }, [])

  const handleKeyCommand =
    useCallback((command: DraftEditorCommand, editorState: EditorState): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setState(newState)
        return "handled"
      }

      return "not-handled"
    }, [])

  const currentBlockType = useMemo(() => {
    const selection = state.getSelection();
    const content = state.getCurrentContent();
    const block = content.getBlockForKey(selection.getStartKey())

    return block.getType() as BlockType;
  }, [state]);

  return useMemo(() => ({
    state,
    onChange: setState,
    toggleBlockType,
    toggleInlineStyle,
    currentBlockType,
    hasInlineStyle,
    handleKeyCommand,
  }), [
    currentBlockType,
    handleKeyCommand,
    hasInlineStyle,
    state,
    toggleBlockType,
    toggleInlineStyle
  ]);

}

