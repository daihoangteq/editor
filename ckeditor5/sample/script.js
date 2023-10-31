ClassicEditor.create(document.querySelector(".editor"), {
  // Editor configuration.
})
  .then((editor) => {
    window.editor = editor;
  })
  .catch(handleSampleError);

function handleSampleError(error) {
  const issueUrl = "https://github.com/ckeditor/ckeditor5/issues";

  const message = [
    "Oops, something went wrong!",
    `Please, report the following error on ${issueUrl} with the build id "2k04rfv0tjq9-esu0kilwwpeu" and the error stack trace:`,
  ].join("\n");

  console.error(message);
  console.error(error);
}
document.querySelector( '#submit' ).addEventListener( 'click', () => {
  const editorData = editor.getData();
  console.log(editorData);
  // ...
} );
