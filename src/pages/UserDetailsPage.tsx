import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  age: number;
  birthDate: string;
  ssn: string;
  department: string;
  address: {
    address : string;
    city: string;
    postalCode: string;
    stateCode: string;
    country: string;
  };
  company: {
    name: string;
    title: string;
    department: string;
  }
}

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://dummyjson.com/users/${id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  if(!user){
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">{`${user?.firstName} ${user?.lastName} `}</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-90">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Basic Details</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex flex-col min-w-[150px]">
              <strong>Name</strong>
              <p>{`${user?.firstName} ${user?.lastName} `}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Email</strong>
              <p>{user?.email}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>{user?.gender}</strong>
              <p>Female</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Age</strong>
              <p>{user?.age}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Phone</strong>
              <p>{user?.phone}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>BirthDate</strong>
              <p>{user?.birthDate}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Address Details</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex flex-col min-w-[150px]">
              <strong>Address</strong>
              <p>{user?.address?.address}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>City</strong>
              <p>{user?.address?.city}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>State Code</strong>
              <p>{user?.address?.stateCode}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Postal Code</strong>
              <p>{user?.address?.postalCode}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Country</strong>
              <p>{user?.address?.country}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Company Details</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex flex-col min-w-[150px]">
              <strong>Name</strong>
              <p>{user?.company?.name}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Title</strong>
              <p>{user?.company?.title}</p>
            </div>
            <div className="flex flex-col min-w-[150px]">
              <strong>Department</strong>
              <p>{user?.company?.department}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
