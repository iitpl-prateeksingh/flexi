export default function SectionCard({ title, data, fileHandler, removeImage, onChange }) {
    return (
        <div className="bg-white border border-gray-300  rounded-xl p-6 space-y-4">

            <h2 className="text-lg font-semibold">{title}</h2>

            {/* IMAGE */}
            <div className="flex items-center gap-4">

                {data.image ? (
                    <div className="relative group">
                        <img
                            src={data.image}
                            className="h-24 w-24 rounded-xl object-cover border border-gray-300"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="h-24 w-24  border border-gray-300-dashed flex items-center justify-center text-gray-400">
                        No Image
                    </div>
                )}

                <label className="cursor-pointer">
                    <div className="px-4 py-2 border border-gray-300 rounded-lg">
                        Upload
                    </div>
                    <input type="file" className="hidden" onChange={fileHandler} />
                </label>
            </div>

            <input
                placeholder="Title"
                value={data.title}
                onChange={(e) => onChange("title", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
            />

            <textarea
                placeholder="Detail"
                value={data.detail}
                onChange={(e) => onChange("detail", e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
            />
        </div>
    );
}