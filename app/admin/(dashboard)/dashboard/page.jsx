
import { users } from "../../mock/user"



export default function DashboardPage() {

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">


                <div className="bg-white p-6 shadow">
                    <p className="text-gray-500">Total Users</p>
                    <h2 className="text-2xl">{users.length}</h2>
                </div>

                <div className="bg-white p-6 shadow">
                    <p className="text-gray-500">Website Visitors</p>
                    <h2 className="text-2xl">320</h2>
                </div>

            </div>

        </div>
    );
}