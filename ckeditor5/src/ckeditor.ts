/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from "@ckeditor/ckeditor5-editor-classic";
import { Bold, Italic } from "@ckeditor/ckeditor5-basic-styles";
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { FontBackgroundColor, FontColor } from "@ckeditor/ckeditor5-font";
import {
  Image,
  ImageResizeEditing,
  ImageResizeButtons,
  ImageToolbar,
  ImageResizeHandles,
  ImageStyle,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class Editor extends ClassicEditor {
  public static override builtinPlugins = [
    Alignment,
    Autoformat,
    Essentials,
    FontBackgroundColor,
    FontColor,
    Image,
    Paragraph,
    Bold,
    Italic,
    ImageResizeEditing,
    ImageResizeButtons,
    ImageToolbar,
    ImageResizeHandles,
    ImageStyle,
    Table,
    TableToolbar,
    ImageUpload,
  ];

  public static override defaultConfig = {
    toolbar: {
      items: [
        "alignment", // Displaying the proper UI element in the toolbar.
        "heading",
        "|",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "imageUpload",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "undo",
        "redo",
      ],
    },
    language: "en",
    image: {
      toolbar: [
        "resizeImage",
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };
}

export default Editor;
