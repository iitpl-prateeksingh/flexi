import ExploreCard from "@/app/components/ExploreCard";

export default function ExploreOther() {
  return (
    <div className="container mx-auto px-4 py-8 bg-[#FFF9F3]">
        <h2 className="text-2xl font-bold mb-4 font-playfair">Explore other (title)</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </div>
    </div>
  )
}
