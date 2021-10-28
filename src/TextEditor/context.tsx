import React, {createContext, FC, useContext} from "react";
import {EditorApi, useEditor} from "./useEditor";


const TextEditorContext = createContext<EditorApi | undefined>(undefined);

export const useEditorApi = () => {
    const context = useContext(TextEditorContext);
    if(context === undefined) {
        throw new Error('useEditorApi must be used within TextEditorProvider');
    }

    return context;
}

export const TextEditorProvider: FC = (props) => {
    const {children} = props;
    const editorApi = useEditor();
    const { Provider } = TextEditorContext;
    
    return ( 
        <Provider value={editorApi}>
            {children}
        </Provider>
    );
}