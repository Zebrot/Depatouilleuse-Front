import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  TextFormatType,
  $isTextNode
} from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import '../../style/css/toolbar.css';
import { useCallback, useEffect, useState } from 'react';
import {mergeRegister} from '@lexical/utils';
import { $patchStyleText } from '@lexical/selection';
import { HexColorPicker } from "react-colorful";
type fontSize = 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [fontSize, setFontSize] = useState<fontSize>('medium');
  const [fontColor, setFontColor] = useState("#aabbcc");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
          const node = selection.anchor.getNode();

      if ($isTextNode(node)) {
        const style = node.getStyle(); // returns inline styles string like 'font-size: 16px; font-weight: bold;'
        const fontSizeMatch = style.match(/font-size:\s?([^\s;]+)/);

        if (fontSizeMatch){ 
          const size = fontSizeMatch[1] as fontSize;
          setFontSize(size);
        }
      }
    }
  }, []);

  const exitColorful = (e : Event) => {
    const colorful = document.getElementsByClassName('react-colorful')[0];
    if (colorful)
      colorful.classList.remove('active');
  }

  document.onclick = exitColorful;
  document.onkeydown = (e) => {
    if(e.key === 'Escape')
      exitColorful(e);
  }
  function fontSizeChange(e : React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as fontSize;
    editor.update(()=> {
      const selection = $getSelection();
      if ($isRangeSelection(selection)){
        $patchStyleText(selection, {'font-size' : value});
      }
    })
  }
  function applyColor(value : string){
    setFontColor(value);
    editor.update(()=> {
      const selection = $getSelection();
      if ($isRangeSelection(selection)){
        $patchStyleText(selection, {'color' : value});
      }
    })
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value : TextFormatType) : void {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, value);
  };
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="toolbar">

      <div className='toolbar__inlineButtons'>
        <h3>Style et effets</h3>
        <ul className='buttonList'>

          <li>
            <button className = {'toolbarButton toolbar__inlineButtons__bold' + (isBold? ' active' : '')} onClick={(e) => {handleClick(e, 'bold')}}>
              <i className={"fa fa-bold"} aria-hidden="true"></i>
            </button>
          </li>

          <li>
            <button className = {'toolbarButton toolbar__inlineButtons__italic' + (isItalic? ' active' : '')} onClick={(e) => {handleClick(e, 'italic')}}>
              <i className={"fa fa-italic"} aria-hidden="true"></i>
            </button>
          </li>

          <li>
            <button className = {'toolbarButton toolbar__inlineButtons__underline' + (isUnderline? ' active' : '')} onClick={(e) => {handleClick(e, 'underline')}}>
              <i className={"fa fa-underline"} aria-hidden="true"></i>
            </button>
          </li>

          <li>
            <button className = {'toolbarButton toolbar__inlineButtons__strikethrough' + (isStrikethrough? ' active' : '')} onClick={(e) => {handleClick(e, 'strikethrough')}}>
              <i className={"fa fa-strikethrough"} aria-hidden="true"></i>
            </button>
          </li>
          <li>
            <select value = {fontSize} onChange = {(e) => fontSizeChange(e)} name = 'fontSize' id='fontSize' className={'toolbarButton'}>
              <option value = 'x-small'>XS</option>
              <option value = 'small'>S</option>
              <option value = 'medium'>M</option>
              <option value = 'large'>L</option>
              <option value = 'x-large'>XL</option>
            </select>
          </li>
          <li>
            <button className='toolbarButton toolbar__inlineButtons__fontColor' style={{'background' : fontColor, color:'var(--background-color)'}} 
              onClick={(e)=>{
                e.stopPropagation();
                e.preventDefault();
                document.getElementsByClassName('react-colorful')[0].classList.toggle('active')
                }}>
              <i className='fa fa-paint-brush'></i>
            </button>
            <HexColorPicker onSubmit= {(e)=>{e.preventDefault()}} onClick = {(e)=>{e.stopPropagation();}}color={fontColor} onChange={applyColor} />
          </li>
        </ul>
      </div>

      <div className='toolbar__blockButtons'>
        <h3>Insérer</h3>
        <ul className='buttonList'>
          <li>
            <button className='toolbarButton' onClick={(e) => {handleClick(e, 'bold')}}>
              <i className="fa fa-header" aria-hidden="true"></i>
            </button>
          </li>
          
          <li>
            <button className='toolbarButton' onClick={(e) => {handleClick(e, 'bold')}}>
              <i className="fa fa-header fa-lg" aria-hidden="true"></i>
            </button>          
          </li>

          <li>
            <button className='toolbarButton' onClick={(e) => {handleClick(e, 'bold')}}>
              <i className="fa fa-paragraph fa-lg" aria-hidden="true"></i>
            </button>          
          </li>

          <li>
            <button className='toolbarButton' onClick={(e) => {handleClick(e, 'bold')}}>
              <i className="fa fa-image" aria-hidden="true"></i>
            </button>          
          </li>
        </ul>
      </div>

    </div>
  );
}

export default Toolbar;