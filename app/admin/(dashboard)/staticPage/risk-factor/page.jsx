"use client";

import { useEffect, useState } from "react";
import Editor from "../../../../component/QuillEditor";
import { getStaticPageService, saveStaticPageService } from "../../../../services/staticService";
import toast from "react-hot-toast";

export default function RiskFactors() {

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPage();
  }, []);

  const fetchPage = async () => {
    try {
      setLoading(true);

      const res = await getStaticPageService("risk-factor");

      const data = res?.data;

      if (data?.contentRef?.content) {
        setContent(data.contentRef.content);
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to load page");
    } finally {
      setLoading(false);
    }
  };

  // ✅ SAVE
  const handleSave = async () => {
    try {
      if (!content.trim()) {
        toast.error("Content cannot be empty");
        return;
      }

      toast.loading("Saving...", { id: "save" });

      await saveStaticPageService({
        title: "Risk Factor",
        content,
        pageType: "risk-factor"
      });

      toast.success("Saved successfully", { id: "save" });

    } catch (err) {
      console.error(err);
      toast.error("Failed to save", { id: "save" });
    }
  };

  return (
    <div className="p-1">

      <div className="bg-white shadow rounded-lg  p-6">

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Risk Factor
          </h2>
          <p className="text-gray-500 text-sm">
            Edit and save your Risk Factor content.
          </p>
        </div>

        {/* Editor */}
        <Editor
          value={content}
          onChange={setContent}
          height="250px"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          Save Content
        </button>

      </div>

    </div>
  );
}