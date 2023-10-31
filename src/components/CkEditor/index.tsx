import React, { useEffect, useRef } from "react";
import Editor from "@ckeditor/ckeditor5-core/src/editor/editor";
import { FileLoader } from "@ckeditor/ckeditor5-upload";
const EazyEditor = () => {
  function uploadAdapter(loader: FileLoader) {
    return {
      upload: () => {
        return new Promise(
          (resolve: (value: { default: string }) => unknown, reject) => {
            const body = new FormData();
            loader.file.then((file: File | null) => {
              if (!file) throw new Error("Not img");
              body.append("file", file);
              body.append("upload_preset", "demoupload");
              body.append("cloud_name", "dfnpcxlkn");
              fetch("https://api.cloudinary.com/v1_1/dfnpcxlkn/image/upload", {
                method: "post",
                body: body,
              })
                .then((res) => res.json())
                .then((res) => {
                  resolve({ default: res.url });
                })
                .catch((err) => {
                  reject(err as string);
                });
            });
          }
        );
      },
    };
  }
  function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: FileLoader
    ) => {
      return uploadAdapter(loader);
    };
  }
  const editorRef = useRef<HTMLDivElement | null>(null);
  const editorStateRef = useRef<Editor | null>(null);
  useEffect(() => {
    (async () => {
      if (!editorRef.current) return;
      const ClassicEditor = await import("eazy-editor/build/ckeditor").then(
        (mod) => mod.default
      );
      ClassicEditor.create(editorRef.current, {
        extraPlugins: [uploadPlugin],
      })
        .then((editor) => {
          editorStateRef.current = editor;
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  const handleGetData = () => {
    console.log(editorStateRef.current?.data.get());
  };
  return (
    <div>
      <div ref={editorRef}></div>
      <button
        className={`p-[5px] mt-5 ml-1 border-solid border-[2px] border-black `}
        onClick={() => handleGetData()}
      >
        Show Value
      </button>
    </div>
  );
};

export default EazyEditor;
