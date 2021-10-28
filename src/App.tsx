import TextEditor from './TextEditor';
import { TextEditorProvider } from "./TextEditor/context";
import ToolPanel from './TextTool/ToolPanel';


const App = () => {
  return (
    <TextEditorProvider>
      <ToolPanel />
      <TextEditor />
    </TextEditorProvider>

  )
}

export default App;
