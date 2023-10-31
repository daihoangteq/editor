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
import { Image, ImageResizeEditing, ImageResizeButtons, ImageToolbar, ImageResizeHandles, ImageStyle, ImageUpload } from "@ckeditor/ckeditor5-image";
import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { Table, TableToolbar } from "@ckeditor/ckeditor5-table";
declare class Editor extends ClassicEditor {
    static builtinPlugins: (typeof Alignment | typeof Autoformat | typeof Essentials | typeof FontBackgroundColor | typeof FontColor | typeof Image | typeof Paragraph | typeof Bold | typeof Italic | typeof ImageResizeEditing | typeof ImageResizeButtons | typeof ImageToolbar | typeof ImageResizeHandles | typeof ImageStyle | typeof Table | typeof TableToolbar | typeof ImageUpload)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        language: string;
        image: {
            toolbar: string[];
        };
        table: {
            contentToolbar: string[];
        };
    };
}
export default Editor;
