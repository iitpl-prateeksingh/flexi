'use client';

import React, { useEffect, useState } from 'react';


const tableOfContents = [
  { id: 'exploring-ai', title: 'Exploring Generative AI in Content Creation' },
  { id: 'steering-clear', title: 'Steering Clear of Common AI Writing Pitfalls' },
  { id: 'understanding-chatgpt', title: 'Understanding ChatGPT Capabilities - Define Your Style' },
  { id: 'understand-readers', title: 'Understand Your Readers' },
  { id: 'creating-quality', title: 'Creating Quality AI-powered Blogs that Stand Out' },
  { id: 'conclusion', title: 'Conclusion: Embracing AI in Blog Creation' },
  { id: 'afterword', title: 'Afterword: The AI Behind This Article' },
];

export default function ArticlePage() {
  const [activeSection, setActiveSection] = useState<string>(tableOfContents[0].id);

  // Intersection Observer to highlight the active TOC item on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' } // Adjusts when the section is considered "active"
    );

    tableOfContents.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F3] text-gray-800 font-sans">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 relative">
        
        <main className="w-full lg:w-2/3 xl:w-3/4">
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4 tracking-tight">
              <span className="text-[#F28B46]">Weekly</span> Flexi Wrap (title)
            </h1>
            <p className="text-gray-600 text-sm font-medium">Oct 19 • 10 min read</p>
          </header>

          <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed">
            
            {/* Section 1 */}
            <section id="exploring-ai" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-playfair font-bold mb-4">Exploring Generative AI in Content Creation</h2>
              <p className="mb-4">
                Hello there! As a marketing manager in the SaaS industry, you might be looking for innovative ways to engage your audience. I bet generative AI has crossed your mind as an option for creating content. Well, let me share from my firsthand experience.
              </p>
              <p className="mb-4">
                Google encourages high-quality blogs regardless of whether {"they're "}<span className="text-[#F28B46] font-medium cursor-pointer hover:underline">written by humans or created using artificial intelligence</span> like ChatGPT. {"Here's what"} matters: producing original material with expertise and trustworthiness based on Google <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">E-E-A-T principles</span>.
              </p>
              <p className="mb-4">
                This means focusing more on people-first writing rather than primarily employing AI tools to manipulate search rankings. There comes a time when many experienced professionals want to communicate their insights but get stuck due to limited writing skills – {"that's"} where <strong>Generative AI</strong> can step in.
              </p>
              <p>
                So, together,{" we're "}going explore how this technology could help us deliver valuable content without sounding robotic or defaulting into mere regurgitations of existing materials (spoiler alert – common pitfalls!). Hang tight - {"it'll"} be a fun learning journey!
              </p>
            </section>

            {/* Section 2 */}
            <section id="steering-clear" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Steering Clear of Common AI Writing Pitfalls</h2>
              <p className="mb-4">
                Jumping headfirst into using AI, like <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">ChatGPT</span>, without a content strategy can lead to some unfortunate results. One common {"pitfall I've"} seen is people opting for <strong>quantity over quality</strong> - they churn out blogs, but each one feels robotic and soulless, reading just like countless others on the internet.
              </p>
              <p className="mb-4">
                Another fault line lies in <strong>creating reproductions</strong> rather than delivering unique perspectives that offer value to readers; it often happens if you let an AI tool write your full blog unrestrained! Trust me on this – Ask any experienced marketer or writer about their takeaways from using generative AI tools. {"They'll all"} agree that adding a human touch and following specific guidelines are key when implementing these tech pieces.
              </p>
              <p>
                Remember, our goal here {"isn't"} merely satisfying search engines but, more importantly, <strong>knowledge-hungry humans seeking reliable information online</strong>. {"So keep your audience's needs at heart while leveraging technology's assistance!"}
              </p>
            </section>

           
            <section id="understanding-chatgpt" className="mb-12 scroll-mt-24 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Understanding ChatGPT Capabilities - Define Your Style</h2>
              <p className="mb-4">
                Jumping headfirst into using AI, like <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">ChatGPT</span>, without a content strategy can lead to some unfortunate results. One common {"pitfall I've"} seen is people opting for <strong>quantity over quality</strong> - they churn out blogs, but each one feels robotic and soulless, reading just like countless others on the internet.
              </p>
              <p className="mb-4">
                Another fault line lies in <strong>creating reproductions</strong> rather than delivering unique perspectives that offer value to readers; it often happens if you let an AI tool write your full blog unrestrained! Trust me on this – Ask any experienced marketer or writer about their takeaways from using generative AI tools. {"They'll all"} agree that adding a human touch and following specific guidelines are key when implementing these tech pieces.
              </p>
              <p>
                Remember, our goal here {"isn't"} merely satisfying search engines but, more importantly, <strong>knowledge-hungry humans seeking reliable information online</strong>. {"So keep your audience's needs at heart while leveraging technology's assistance!"}
              </p>
            </section>

            <section id="understand-readers" className="mb-12 scroll-mt-24 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Understand Your Readers</h2>
              <p className="mb-4">
                Jumping headfirst into using AI, like <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">ChatGPT</span>, without a content strategy can lead to some unfortunate results. One common {"pitfall I've"} seen is people opting for <strong>quantity over quality</strong> - they churn out blogs, but each one feels robotic and soulless, reading just like countless others on the internet.
              </p>
              <p className="mb-4">
                Another fault line lies in <strong>creating reproductions</strong> rather than delivering unique perspectives that offer value to readers; it often happens if you let an AI tool write your full blog unrestrained! Trust me on this – Ask any experienced marketer or writer about their takeaways from using generative AI tools. {"They'll all"} agree that adding a human touch and following specific guidelines are key when implementing these tech pieces.
              </p>
              <p>
                Remember, our goal here {"isn't"} merely satisfying search engines but, more importantly, <strong>knowledge-hungry humans seeking reliable information online</strong>. {"So keep your audience's needs at heart while leveraging technology's assistance!"}
              </p>
            </section>

            <section id="creating-quality" className="mb-12 scroll-mt-24 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Creating Quality AI-powered Blogs that Stand Out</h2>
              <p className="mb-4">
                Jumping headfirst into using AI, like <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">ChatGPT</span>, without a content strategy can lead to some unfortunate results. One common {"pitfall I've"} seen is people opting for <strong>quantity over quality</strong> - they churn out blogs, but each one feels robotic and soulless, reading just like countless others on the internet.
              </p>
              <p className="mb-4">
                Another fault line lies in <strong>creating reproductions</strong> rather than delivering unique perspectives that offer value to readers; it often happens if you let an AI tool write your full blog unrestrained! Trust me on this – Ask any experienced marketer or writer about their takeaways from using generative AI tools. {"They'll all"} agree that adding a human touch and following specific guidelines are key when implementing these tech pieces.
              </p>
              <p>
                Remember, our goal here {"isn't"} merely satisfying search engines but, more importantly, <strong>knowledge-hungry humans seeking reliable information online</strong>. {"So keep your audience's needs at heart while leveraging technology's assistance!"}
              </p>
            </section>

            <section id="conclusion" className="mb-12 scroll-mt-24 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Conclusion: Embracing AI in Blog Creation</h2>
              <p className="mb-4">
                Jumping headfirst into using AI, like <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">ChatGPT</span>, without a content strategy can lead to some unfortunate results. One common {"pitfall I've"} seen is people opting for <strong>quantity over quality</strong> - they churn out blogs, but each one feels robotic and soulless, reading just like countless others on the internet.
              </p>
              <p className="mb-4">
                Another fault line lies in <strong>creating reproductions</strong> rather than delivering unique perspectives that offer value to readers; it often happens if you let an AI tool write your full blog unrestrained! Trust me on this – Ask any experienced marketer or writer about their takeaways from using generative AI tools. {"They'll all"} agree that adding a human touch and following specific guidelines are key when implementing these tech pieces.
              </p>
              <p>
                Remember, our goal here {"isn't"} merely satisfying search engines but, more importantly, <strong>knowledge-hungry humans seeking reliable information online</strong>. {"So keep your audience's needs at heart while leveraging technology's assistance!"}
              </p>
            </section>

            <section id="afterword" className="mb-12 scroll-mt-24 min-h-[300px]">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Afterword: The AI Behind This Article</h2>
              <p className="mb-4">
                Jumping headfirst into using AI, like <span className="text-[#F28B46] font-medium cursor-pointer hover:underline">ChatGPT</span>, without a content strategy can lead to some unfortunate results. One common {"pitfall I've"} seen is people opting for <strong>quantity over quality</strong> - they churn out blogs, but each one feels robotic and soulless, reading just like countless others on the internet.
              </p>
              <p className="mb-4">
                Another fault line lies in <strong>creating reproductions</strong> rather than delivering unique perspectives that offer value to readers; it often happens if you let an AI tool write your full blog unrestrained! Trust me on this – Ask any experienced marketer or writer about their takeaways from using generative AI tools. {"They'll all"} agree that adding a human touch and following specific guidelines are key when implementing these tech pieces.
              </p>
              <p>
                Remember, our goal here {"isn't"} merely satisfying search engines but, more importantly, <strong>knowledge-hungry humans seeking reliable information online</strong>. {"So keep your audience's needs at heart while leveraging technology's assistance!"}
              </p>
            </section>

          </article>
        </main>

        {/* RIGHT COLUMN: Sticky Table of Contents */}
        <aside className="hidden lg:block lg:w-1/3 xl:w-1/4">
          {/* The sticky container */}
          <div className="sticky top-12 bg-[#F785320A] border border-[#f7853247] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-4">In this article</h3>
              
              <nav className="flex flex-col relative">
                {tableOfContents.map((item, index) => {
                  const isActive = activeSection === item.id;
                  
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`
                        py-3 px-4 text-sm transition-colors duration-200 block border-l-2
                        ${isActive 
                          ? 'border-[#F28B46] border-l-3 rounded-xl text-[#F28B46] font-semibold bg-[#FFF9F3]' 
                          : 'border-transparent text-gray-600 rounded-xl hover:text-gray-900 '
                        }
                        ${index !== tableOfContents.length - 1 ? 'border-b border-b-gray-100' : ''}
                      `}
                      // Resetting border-left logic so border-bottom doesn't interfere
                      style={{ 
                         borderLeftColor: isActive ? '#F28B46' : 'transparent',
                         borderBottomColor: index !== tableOfContents.length - 1 ? '#f3f4f6' : 'transparent'
                      }}
                    >
                      {item.title}
                    </a>
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