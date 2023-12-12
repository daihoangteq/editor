import React, { useEffect, useRef, useState } from "react";
import "simplemde/dist/simplemde.min.css";
import { toolbarEditor } from "./config";
import { EditorFromTextArea } from "codemirror";
const MarkdownEditor = () => {
  const [toggle, setToggle] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<{ codemirror: EditorFromTextArea } | null>(null);
  useEffect(() => {
    (async () => {
      const SimpleMDE = require("simplemde/dist/simplemde.min.js");
      editorRef.current = new SimpleMDE({
        element: textareaRef.current,
        spellChecker: false,
        // status: [],
        toolbar: [],
        toolbarTips: true,
      });
      console.log(editorRef.current);
    })();
  }, []);
  function countWords(paragraph: string) {
    // Split the paragraph into an array of words (assuming spaces as separators)
    const words = paragraph.split(/\s+/);

    // Return the length of the array (number of words)
    return words.length;
  }
  const handleGetValue = () => {
    if(editorRef.current) {
      console.log(countWords(editorRef.current.codemirror.getValue()));
    }
  };
  const handleInputFile = () => {
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
          fetch("https://api.cloudinary.com/v1_1/dfnpcxlkn/image/upload", {
            method: "post",
            body: body,
          })
            .then((res) => res.json())
            .then((res) => {
              const cm = editorRef.current?.codemirror;
              if (cm) {
                const startPoint = cm.getCursor("start");
                cm.replaceRange(`![image](${res.url})`, {
                  line: startPoint.line,
                  ch: startPoint.ch,
                });
                setToggle(false);
              }
            })
            .catch((err) => {
              console.log(err);
              setToggle(false);
            });
        }
      },
      false
    );
  };
  const toggleHeading = () => {
    if(editorRef.current) {
      const cm = editorRef.current?.codemirror;
      const startPoint = cm.getCursor("start");
      const endPoint = cm.getCursor("end");
      console.log(startPoint, endPoint);
      let value = cm.getLine(startPoint.line)
      const currHeadingLevel = value.search(/[^#]/);
      console.log(currHeadingLevel);
      if(currHeadingLevel <= 0) {
        value = "## " + value;
      } else if(currHeadingLevel === 3) {
        value = value.substr(2)
      } else {
        value = "#" + value;
      }
      console.log(value);
      cm.replaceRange(value, {
				line: startPoint.line,
				ch: 0
			}, {
				line: endPoint.line,
				ch: 99999999999999
			});
      cm.focus();
    }
  }
  return (
    <div className="main-content">
      <div className="flex">
        <button onClick={() => editorRef.current.toggleBold()}>Bold</button>
        <button onClick={() => editorRef.current.toggleItalic()}>Italic</button>
        <button onClick={() => editorRef.current.toggleStrikethrough()}>
          strikethrough
        </button>
        <button onClick={() => editorRef.current.toggleHeadingBigger()}>
          Bigger
        </button>
        <button onClick={() => editorRef.current.toggleHeadingSmaller()}>
          Smaller
        </button>
        <button onClick={() => toggleHeading()}>
          Heading
        </button>
        <button onClick={() => handleInputFile()}>Input File</button>
      </div>
      {toggle && <div>Loading......</div>}
      <textarea ref={textareaRef} />
      <button onClick={() => handleGetValue()}>Submit</button>
    </div>
  );
};

export default MarkdownEditor;
