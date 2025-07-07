import {
  FORMAT_TEXT_COMMAND,
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import '../../style/css/toolbar.css';

function Toolbar() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className="toolbar">
      <button onClick={(e) => {
        e.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');}}>
        Bold
      </button>
      <button onClick={(e) => {
        e.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}}>
        Italic
      </button>
      <button onClick={(e) => {
        e.preventDefault();
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}}>
        Underline
      </button>
    </div>
  );
}

export default Toolbar;