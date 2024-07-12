import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`flex flex-col h-full bg-blue-900 text-white ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
            <div className="flex items-center justify-start pl-8 p-4 h-16 border-b border-white">
                <button onClick={() => setIsOpen(!isOpen)} className="">
                    <FaBars />
                </button>
            </div>
            <nav className="flex-grow">
                <ul className="">
                    <li className="flex items-center p-2 m-4 h-10 hover:bg-customOrange">
                        <NavLink to="/dashboard" className='flex w-full'>
                        <RxDashboard className="ml-2 self-center" />
                        {isOpen && <span className="ml-4">Dashboard</span>}
                        </NavLink>
                    </li>
                    <li className="flex items-center p-2 m-4 h-10 hover:bg-customOrange">
                        <NavLink to="/users" className='flex w-full'>
                            <FaRegUser className="ml-2 self-center" />
                            {isOpen && <span className="ml-4">Users</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
