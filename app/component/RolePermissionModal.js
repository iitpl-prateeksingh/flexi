"use client";

export default function RolePermissionModal({ role, onClose }) {

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

            <div className="bg-white rounded-lg p-6 w-[500px]">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        {role.name} Permissions
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">

                    {role.permissions.map((perm, i) => (

                        <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 rounded text-sm"
                        >
                            {perm.replace("_", " ")}
                        </span>

                    ))}

                </div>

            </div>

        </div>
    );
}