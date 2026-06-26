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
    .replace(/&nbsp;|&#160;|&#xA0;/gi, " ")
    .replace(/\u00a0/g, " ")
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
  const onChangeRef = useRef(onChange);
  const codeInputCleanupRef = useRef(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    return () => {
      codeInputCleanupRef.current?.();
    };
  }, []);

  const syncEditorContents = (html) => {
    const nextValue = normalizeHtml(html);

    lastValueRef.current = nextValue;

    if (editorRef.current) {
      editorRef.current.setContents(nextValue);
    }
  };

  useEffect(() => {
    const nextValue = normalizeHtml(value);

    if (nextValue === lastValueRef.current) {
      return;
    }

    syncEditorContents(nextValue);
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
    onChangeRef.current?.(nextHtml);
  };

  const getCurrentEditorHtml = () => {
    const editor = editorRef.current;
    const codeEditor = editor?.core?.context?.element?.code;

    if (editor?.core?._variable?.isCodeView && codeEditor) {
      return codeEditor.value;
    }

    return editor?.getContents?.(true) || "";
  };

  const emitCurrentEditorHtml = () => {
    emitChange(getCurrentEditorHtml());
  };

  const syncCodeViewInput = (sunEditor) => {
    codeInputCleanupRef.current?.();

    const codeEditor = sunEditor?.core?.context?.element?.code;

    if (!codeEditor) {
      codeInputCleanupRef.current = null;
      return;
    }

    const handleCodeInput = () => {
      emitChange(codeEditor.value);
      window.setTimeout(() => {
        emitChange(codeEditor.value);
      }, 0);
    };

    ["input", "keyup", "paste", "change", "blur"].forEach((eventName) => {
      codeEditor.addEventListener(eventName, handleCodeInput);
    });

    codeInputCleanupRef.current = () => {
      ["input", "keyup", "paste", "change", "blur"].forEach((eventName) => {
        codeEditor.removeEventListener(eventName, handleCodeInput);
      });
    };
  };

  const syncCodeViewInputAfterRender = () => {
    window.setTimeout(() => {
      syncCodeViewInput(editorRef.current);
      emitCurrentEditorHtml();
    }, 0);
  };

  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-lg border border-gray-300 bg-white"
      style={{ minHeight: height, maxWidth: "100%" }}
    >
      <SunEditor
        getSunEditorInstance={(sunEditor) => {
          editorRef.current = sunEditor;
          syncEditorContents(value);
          syncCodeViewInputAfterRender();
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
        onInput={emitCurrentEditorHtml}
        onBlur={emitCurrentEditorHtml}
        onKeyUp={emitCurrentEditorHtml}
        toggleCodeView={syncCodeViewInputAfterRender}
      />
    </div>
  );
}
