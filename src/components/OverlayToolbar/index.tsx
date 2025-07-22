import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { SELECTION_CHANGE_COMMAND, $getSelection, $isRangeSelection, COMMAND_PRIORITY_LOW, TextFormatType, FORMAT_TEXT_COMMAND } from "lexical";
import { useState } from "react";
import '../../style/css/overlayToolbar.css'

function OverlayToolbar() {
    const [isVisible, setVisible] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [position, setPosition] = useState({top : 0, left : 0})
    const [editor] = useLexicalComposerContext();

    editor.registerCommand(SELECTION_CHANGE_COMMAND, (()=> { 
        const selection = $getSelection();
        if($isRangeSelection(selection)) {
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));
        }
        if($isRangeSelection(selection) && (selection.anchor.offset != selection.focus.offset)){
            const domSelection = window.getSelection();
            const range = domSelection?.getRangeAt(0);
            if(range){
                const rect = range.getBoundingClientRect();
                setPosition({top : rect.top + window.scrollY - 35, left : rect.left + rect.width / 2});
            }
            setVisible(true);

        }
        else{
            setVisible(false)
        }
        

        return true;
    }), COMMAND_PRIORITY_LOW)

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, value : TextFormatType) : void {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, value);
  }
    return(
        <div className={`overlayToolbar ${isVisible && 'visible'}`} style={{top : position.top, left: position.left}}>
            <ul className='buttonList'>
            <li>
                <button className = {'toolbarButton overlayToolbar__bold' + (isBold? ' active' : '')} onClick={(e) => {handleClick(e, 'bold')}}>
                <i className={"fa fa-bold"} aria-hidden="true"></i>
                </button>
            </li>

            <li>
                <button className = {'toolbarButton overlayToolbar__italic' + (isItalic? ' active' : '')} onClick={(e) => {handleClick(e, 'italic')}}>
                <i className={"fa fa-italic"} aria-hidden="true"></i>
                </button>
            </li>

            <li>
                <button className = {'toolbarButton overlayToolbar__underline' + (isUnderline? ' active' : '')} onClick={(e) => {handleClick(e, 'underline')}}>
                <i className={"fa fa-underline"} aria-hidden="true"></i>
                </button>
            </li>

            <li>
                <button className = {'toolbarButton overlayToolbar__strikethrough' + (isStrikethrough? ' active' : '')} onClick={(e) => {handleClick(e, 'strikethrough')}}>
                <i className={"fa fa-strikethrough"} aria-hidden="true"></i>
                </button>
            </li>
            </ul>
        </div>
    )
}
export default OverlayToolbar