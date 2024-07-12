import React from 'react';

interface Props {
    children: React.ReactNode;
}

const Main : React.FC<Props>= ({children}) => {
  return (
    <div className="flex-grow p-4 overflow-auto h-full" style={{ backgroundColor: '#f0f0f0' }}>
        {children}
    </div>
  );
};

export default Main;
