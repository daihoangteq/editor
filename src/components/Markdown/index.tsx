import React, { useEffect, useRef, useState } from "react";
import "simplemde/dist/simplemde.min.css";
import { toolbarEditor } from "./config";
const EditorComponent = () => {
  const [toggle, setToggle] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef();
  useEffect(() => {
    (async () => {
      const SimpleMDE = require("simplemde/dist/simplemde.min.js");
      editorRef.current = new SimpleMDE({
        element: textareaRef.current,
        spellChecker: false,
        toolbar: [
          ...toolbarEditor,
          {
            name: "custom",
            action: function customFunction(editor: any) {
              // Add your own code
              const cm = editor.codemirror;
              const startPoint = cm.getCursor("start");
              console.log(cm.getCursor("start"));
              console.log(cm.getCursor("end"));
              cm.replaceRange(`![Yes](https://i.imgur.com/sZlktY7.png)`, {
                line: startPoint.line,
                ch: startPoint.ch,
              });
              setToggle(true);
            },
            className: "fa fa-upload",
            title: "Custom Button",
          },
        ],
        // toolbar:["bold","italic"]
        // toolbar: [
        //   {
        //     name: "bold",
        //     action: SimpleMDE.toggleBold,
        //     className: "fa fa-bold",
        //     title: "Bold",
        //   },
        // {
        //   name: "custom",
        //   action: function customFunction(editor: any) {
        //     // Add your own code
        //     const cm = editor.codemirror;
        //     const startPoint = cm.getCursor("start");
        //     console.log(cm.getCursor("start"));
        //     console.log(cm.getCursor("end"));
        //     cm.replaceRange(`![Yes](https://i.imgur.com/sZlktY7.png)`, {
        //       line: startPoint.line,
        //       ch: startPoint.ch,
        //     });
        //     setToggle(true);
        //   },
        //   className: "fa fa-star",
        //   title: "Custom Button",
        // },
        //   {
        //     name: "preview",
        //     action: SimpleMDE.togglePreview,
        //     className: "fa fa-eye no-disable",
        //     title: "Toggle Preview",
        //     default: true,
        //   },
        // ],
      });
      console.log(editorRef.current);
    })();
  }, []);
  return (
    <div className="main-content">
      <div onClick={() => setToggle(false)}>{toggle ? "done" : "none"}</div>
      <button>Submit</button>
      <textarea ref={textareaRef} />
    </div>
  );
};

export default EditorComponent;
