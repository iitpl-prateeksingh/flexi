interface CardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}
export default function TabCard({ cardData }: { cardData: CardData[] }) {
  return (
    <>
      {cardData.map((card) => (
        <div
          key={card.id}
          className="group relative w-full h-[400px] overflow-hidden bg-gray-900  cursor-pointer"
        >
         <img
            src={card.imageUrl}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

        <div className="absolute bottom-0 left-0 w-full px-4 py-4 flex flex-col justify-end bg-[#00000038] backdrop-blur-[28px] ">
         
            <h3 className="text-white text-md font-serif tracking-wide ">
              {card.title}
            </h3>

            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
              <div className="overflow-hidden">
                <p className="text-gray-200 text-sm leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
