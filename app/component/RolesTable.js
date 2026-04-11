"use client";

import { useState } from "react";
import Link from "next/link";

export default function RolesTable({ roles }) {

    const [selectedRole, setSelectedRole] = useState(null);

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Roles & Permissions
            </h1>

            <table className="w-full border shadow">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Role</th>
                        <th className="p-3 text-left">Permission Count</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {roles.map((role) => (

                        <tr key={role.id} className="border-b">

                            <td className="p-3 font-medium">
                                {role.name}
                            </td>

                            <td className="p-3">
                                {role.permissions.length}
                            </td>

                            <td className="p-3 flex gap-4">

                                {/* VIEW BUTTON */}
                                <button
                                    onClick={() => setSelectedRole(role)}
                                    className="text-blue-600"
                                >
                                    View
                                </button>

                                {/* EDIT PAGE */}
                                <Link
                                    href={`/admin/roles/${role.id}/edit`}
                                    className="text-green-600"
                                >
                                    Edit
                                </Link>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            {/* VIEW MODAL */}
            {selectedRole && (
                <RolePermissionModal
                    role={selectedRole}
                    onClose={() => setSelectedRole(null)}
                />
            )}

        </div>
    );
}