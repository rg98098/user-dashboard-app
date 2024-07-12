import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-center items-center h-5/6"
    >
      <button className='text-xl font-bold cursor-pointer p-4 rounded hover:bg-[#8baff2]' onClick={() => navigate('/users')}>Go to Users</button>
    </div>

  );
};

export default DashboardPage;
