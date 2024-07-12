import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/type';

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    const navigate = useNavigate();

    const renderTableData = () => {
        return users.map((user) => (
            <tr key={user.id} className="bg-white cursor-pointer" onClick={() => navigate(`/users/${user.id}`)}>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex items-center">
                    <img
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-8 h-8 rounded-full mr-2"
                    />
                    {user.firstName} {user.lastName}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.email}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.phone}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.age}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.ssn}</td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.department}</td>
            </tr>
        ));
    };

    return (
        <div className="overflow-auto">
            <table className="w-full">
                <thead className="bg-[#ebf2ff] border-b-2 border-gray-200">
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Age</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">SSN</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">Department</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;