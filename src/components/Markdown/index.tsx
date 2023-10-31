import React, { useEffect, useRef, useState } from "react";
import "simplemde/dist/simplemde.min.css";
import { toolbarEditor } from "./config";
import { EditorFromTextArea } from "codemirror";
const MarkdownEditor = () => {
  const [toggle, setToggle] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<{codemirror:EditorFromTextArea} | null>(null);
  useEffect(() => {
    (async () => {
      const SimpleMDE = require("simplemde/dist/simplemde.min.js");
      editorRef.current = new SimpleMDE({
        element: textareaRef.current,
        spellChecker: false,
        toolbar: [
          ...toolbarEditor,
          {
            name: "upload image",
            action: function customFunction(editor: {
              codemirror: EditorFromTextArea;
            }) {
              const newInputFile = document.createElement("input");
              newInputFile.type = "file";
              newInputFile.click();
              newInputFile.addEventListener(
                "change",
                (e) => {
                  if (newInputFile.files && newInputFile.files[0]) {
                    setToggle(true);
                    const body = new FormData();
                    setToggle(true);
                    const file = newInputFile.files[0];
                    body.append("file", file);
                    body.append("upload_preset", "demoupload");
                    body.append("cloud_name", "dfnpcxlkn");
                    fetch(
                      "https://api.cloudinary.com/v1_1/dfnpcxlkn/image/upload",
                      {
                        method: "post",
                        body: body,
                      }
                    )
                      .then((res) => res.json())
                      .then((res) => {
                        const cm = editor.codemirror;
                        const startPoint = cm.getCursor("start");
                        cm.replaceRange(`![image](${res.url})`, {
                          line: startPoint.line,
                          ch: startPoint.ch,
                        });
                        setToggle(false);
                      })
                      .catch((err) => {
                        console.log(err);
                        setToggle(false);
                      });
                  }
                },
                false
              );
            },
            className: "fa fa-image",
            title: "Upload Image",
          },
        ],
      });
      console.log(editorRef.current);
    })();
  }, []);
  const handleGetValue = () => {
    console.log(editorRef.current?.codemirror.getValue());
  }
  return (
    <div className="main-content">
      {/* {toggle && (
        <div>
          <input type="file" autoFocus /> <button>Upload</button>
        </div>
      )} */}
      {toggle && <div>Loading......</div>}
      <textarea ref={textareaRef} />
      <button onClick={()=>handleGetValue()}>Submit</button>
    </div>
  );
};

export default MarkdownEditor;
