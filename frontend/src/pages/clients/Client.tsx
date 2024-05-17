import React, { useEffect, useState } from 'react';
import { getAllClients } from '../../services/otherApi';
import ClientItem from '../../components/clientItem';

export interface Client {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

function Client() {
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
    <div className="flex justify-center">
      <div className="w-4/5 bg-[#6bb5ce] rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Clients list</h1>
        {clients?.map((client) => (
          <ClientItem
            key={client.id}
            client={client}
            backgroundColor={getRandomLightColor()}
          />
        ))}
      </div>
    </div>
  );
}

export default Client;
