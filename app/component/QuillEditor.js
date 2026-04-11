"use client";

import dynamic from "next/dynamic";
import { useId } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false
});

export default function QuillEditor({
    value,
    onChange,
    height = "200px",
    placeholder = "Write something..."
}) {

    const editorId = useId(); // ✅ unique per editor

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["link"],
            ["clean"]
        ]
    };

    const formats = [
        "header",
        "bold", "italic", "underline", "strike",
        "color", "background",
        "list",
        "align",
        "link"
    ];

    return (
        <div className={`quill-wrapper-${editorId}`}>
            <ReactQuill
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />

            {/* ✅ Scoped styling (fixes your issue) */}
            <style jsx global>{`
                .quill-wrapper-${editorId} .ql-toolbar {
                    border-radius: 8px 8px 0 0;
                }

                .quill-wrapper-${editorId} .ql-container {
                    min-height: ${height};
                    border-radius: 0 0 8px 8px;
                }

                .quill-wrapper-${editorId} .ql-editor {
                    min-height: ${height};
                    padding: 12px;
                }
                    .ql-editor {
  background-color: #7c7c7c7c; /* dark background */
}
            `}</style>
        </div>
    );
}