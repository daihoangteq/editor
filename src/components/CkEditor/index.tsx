import React, { useEffect, useRef } from "react";
import type Editor from "@ckeditor/ckeditor5-core/src/editor/editor";
import type { PluginConstructor } from "@ckeditor/ckeditor5-core/src/plugin";
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
    // editor.plugins.get("FileRepository").createUploadAdapter = (loader: {
    //     file: Promise<File>;
    // }) => {
    //     return uploadAdapter(loader);
    // };
  }
  const editorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    (async () => {
      if (!editorRef.current) return;
      const ClassicEditor = await import("eazy-editor/build/ckeditor").then(
        (mod) => mod.default
      );
      console.log(ClassicEditor);
      ClassicEditor.create(editorRef.current, {
        // Editor configuration.
        extraPlugins: [uploadPlugin],
      })
        .then((editor) => {
          console.log(editor);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return <div ref={editorRef}></div>;
};

export default EazyEditor;
