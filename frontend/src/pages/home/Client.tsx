import React, { useEffect, useState } from 'react';
import { getAllClients } from '../../services/otherApi';

export interface Client {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }

function Client() {

    const [clients, setClients] = useState<Client[]>();

    useEffect(() => {
        getAllClients().then((res) => {
            setClients(res.data)   
            console.log(res.data);
        })
    }, []);

  return (
    <div>
        <h1>List of Clients</h1>
        {clients?.map((client) => (
            <div>{client.email}</div>
        ))}
    </div>
  )
}

export default Client;
