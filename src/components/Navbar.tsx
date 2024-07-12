import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext'

const Navbar: React.FC = () => {
    const { loggedInUser, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
  
    const handleDropdownToggle = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
  
    useEffect(() => {
      if (dropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownOpen])
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 h-16 border-b border-gray-300" style={{ backgroundColor: '#f0f0f0' }}>
      <div></div>
      <div className="flex items-center space-x-4 mr-4">
        <div className='rounded-full bg-[#E1E3E7] p-3 hidden sm:block'>
        <FiBell className="text-xl" />
        </div>
        <div className="flex items-center space-x-2 relative " ref={dropdownRef}>
          <img src={`${loggedInUser?.image}`} alt="profile" className="w-10 h-10 rounded-full hidden sm:flex" />
          <div className="flex flex-col">
            <div className="font-semibold">{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</div>
            <div className="text-sm text-gray-600">{`${loggedInUser?.email}`}</div>
          </div>
          <div className="text-xl cursor-pointer arrow-down" onClick={handleDropdownToggle}>
          <FaChevronDown  tabIndex={0}  />
          </div>
          {dropdownOpen && (
            <div className="absolute top-5 right-0 mt-2 bg-white border rounded shadow-md w-48">
              <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
