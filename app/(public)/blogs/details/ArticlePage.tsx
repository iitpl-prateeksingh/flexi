"use client";

import React, { useEffect, useState } from "react";

// ✅ Generate ID
const createId = (text: string) =>
  text?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function ArticlePage({ post, banner }: any) {
  const [tableOfContents, setTableOfContents] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");

  // ✅ Generate TOC when post comes
  useEffect(() => {
    if (!post?.sections) return;

    const toc = post.sections.map((section: any) => ({
      id: createId(section.heading),
      title: section.heading,
    }));

    setTableOfContents(toc);

    if (toc.length) {
      setActiveSection(toc[0].id);
    }
  }, [post]);

  console.log("POST IN ARTICLE PAGE:", post); // IGNORE

  // ✅ Scroll spy
  useEffect(() => {
    if (!tableOfContents.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    tableOfContents.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tableOfContents]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-gray-800 font-sans">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 relative">

        {/* MAIN */}
        <main className="w-full lg:w-2/3 xl:w-3/4">
          <header className="mb-10">
            <div className="mb-4 flex gap-2">
              <div
                className="html-editor text-4xl md:text-5xl font-playfair font-bold text-gray-900 tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: banner?.title?.replace(/&nbsp;/g, " ") || "",
                }}
              />

              <h3 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900  tracking-tight">
                {post?.title}
              </h3>
            </div>
            <p className="text-gray-600 text-sm font-medium">
              {post?.createdAt
                ? new Date(post.createdAt).toDateString()
                : ""}{" "}
              • {post?.readTime} min read
            </p>
          </header>

          <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">

            {/* ✅ Dynamic Sections */}
            {post?.sections?.map((section: any, index: number) => {
              const id = createId(section.heading);

              return (
                <section
                  key={index}
                  id={id}
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-2xl font-playfair font-bold mb-4">
                    {section.heading}
                  </h2>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: section.content.replace(/&nbsp;/g, " ") || "",
                    }}
                  />
                </section>
              );
            })}
          </article>
        </main>

        {/* TOC */}
        <aside className="hidden lg:block lg:w-1/3 xl:w-1/4">
          <div className="sticky top-12 bg-[#F785320A] border border-[#f7853247] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-4">
                In this article
              </h3>

              <nav className="flex flex-col relative">
                {tableOfContents.map((item, index) => {
                  const isActive = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleScroll(item.id)}
                      className={`
    text-left py-3 px-4 text-sm transition-colors duration-200 block border-l-2 w-full
    ${isActive
                          ? "border-[#F28B46] border-l-3 rounded-xl text-[#F28B46] font-semibold bg-[#FFF9F3]"
                          : "border-transparent text-gray-600 rounded-xl hover:text-gray-900"
                        }
    ${index !== tableOfContents.length - 1
                          ? "border-b border-b-gray-100"
                          : ""
                        }
  `}
                      style={{
                        borderLeftColor: isActive ? "#F28B46" : "transparent",
                        borderBottomColor:
                          index !== tableOfContents.length - 1
                            ? "#f3f4f6"
                            : "transparent",
                      }}
                    >
                      {item.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}