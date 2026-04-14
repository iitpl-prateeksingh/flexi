import ExploreCard from "@/app/components/ExploreCard";

export default function ExploreOther({ blogs }: any) {
  if (!blogs || blogs.length === 0) return null;
  return (
    <div className="min-h-screen bg-[#FFF9F3] text-gray-800 font-sans">
      <div className="container mx-auto px-6 py-12  relative">
        <h2 className="text-2xl font-bold mb-4 font-playfair">Explore other </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {blogs.map((blog: any, index: number) => (
            <ExploreCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  )
}
