import React, { useEffect, useState } from 'react';
import { getAllClients } from '../services/otherApi';

export interface Client {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

function ClientsList() {
  const [clients, setClients] = useState<Client[]>();

  const getRandomLightColor = () => {
    const letters = '89ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  useEffect(() => {
    getAllClients().then((res) => {
      setClients(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="w- full flex justify-center">
      <div className="w-full bg-[#6bb5ce] rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Clients list</h1>
        {clients?.map((client) => (
        <div
          key={client.id}
          className="p-4 rounded-md mb-4"
          style={{ backgroundColor: getRandomLightColor() }}
        >
          {client.firstName} {client.lastName}
        </div>
        ))}
      </div>
    </div>
  );
}

export default ClientsList;
