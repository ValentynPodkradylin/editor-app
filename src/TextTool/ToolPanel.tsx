import React, { FC } from 'react';
import { InlineStyle, BlockType } from '../TextEditor/config';
import { useEditorApi } from '../TextEditor/context';
import "./ToolPanel.sass";

const INLINE_STYLES_CODES = Object.values(InlineStyle);
const BLOCK_TYPE_CODES = Object.values(BlockType);

interface IToolPanelProps { }

const ToolPanel: FC<IToolPanelProps> = (props) => {
  const { } = props;
  const { toggleInlineStyle, toggleBlockType } = useEditorApi();
  return (
    <div>
      <div>
        {
          BLOCK_TYPE_CODES.map((code: BlockType) => {
            const onMouseDown = (e: { preventDefault: () => void; }) => {
              e.preventDefault();
              toggleBlockType(code)
            };

            return (
              <button
                key={code}
                onMouseDown={onMouseDown}
              >
                {code}
              </button>
            )
          })
        }
      </div>
      <div>
        {
          INLINE_STYLES_CODES.map((code) => {
            const onMouseDown = (e: { preventDefault: () => void; }) => {
              e.preventDefault();
              toggleInlineStyle(code);
            };

            return (
                <button
                  type="button"
                  key={code}
                  onMouseDown={onMouseDown}
                >
                  {code}
                </button>

            )
          })
        }
      </div>
    </div>

  )
}

export default ToolPanel;
