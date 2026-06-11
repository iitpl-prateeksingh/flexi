"use client";

import dynamic from "next/dynamic";
import DOMPurify from "dompurify";
import { useEffect, useMemo, useRef } from "react";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function normalizeHtml(html) {
  const safeHtml = DOMPurify.sanitize(html || "", {
    USE_PROFILES: { html: true },
  });

  return safeHtml
    .replace(/<p>(\s|&nbsp;)*<\/p>/g, "")
    .replace(/^\s+|\s+$/g, "");
}

export default function QuillEditor({
  value,
  onChange,
  height = "200px",
  placeholder = "Write something...",
}) {
  const editorRef = useRef(null);
  const initialHtml = normalizeHtml(value);
  const lastValueRef = useRef(initialHtml);

  useEffect(() => {
    const nextValue = normalizeHtml(value);

    if (nextValue === lastValueRef.current) {
      return;
    }

    lastValueRef.current = nextValue;

    if (editorRef.current) {
      editorRef.current.setContents(nextValue);
    }
  }, [value]);

  const toolbar = useMemo(
    () => ({
      buttonList: [
        ["undo", "redo"],
        ["fontSize", "formatBlock"],
        ["bold", "underline", "italic", "strike"],
        ["fontColor", "hiliteColor"],
        ["align", "list", "table"],
        ["fullScreen", "codeView"],
      ],
    }),
    [],
  );

  const emitChange = (html) => {
    const nextHtml = normalizeHtml(html);
    lastValueRef.current = nextHtml;
    onChange?.(nextHtml);
  };

  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-lg border border-gray-300 bg-white"
      style={{ minHeight: height, maxWidth: "100%" }}
    >
      <SunEditor
        getSunEditorInstance={(sunEditor) => {
          editorRef.current = sunEditor;
        }}
        defaultValue={initialHtml}
        width="100%"
        setOptions={{
          height,
          width: "100%",
          defaultStyle: "background-color: grey;",
          placeholder,
          buttonList: toolbar.buttonList,
        }}
        setAllPlugins={true}
        onChange={emitChange}
      />
    </div>
  );
}
