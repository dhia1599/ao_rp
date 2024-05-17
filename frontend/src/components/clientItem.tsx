import React from 'react';
import { Client } from '../pages/clients/Client';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

interface ClientItemProps {
  client: Client;
  backgroundColor: string;
}

const ClientItem: React.FC<ClientItemProps> = ({ client, backgroundColor }) => {
  return (
    <div
      className="p-4 rounded-md mb-4 flex justify-between items-center"
      style={{ backgroundColor }}
    >
      <div>
        <p className="text-black">
            {client.firstName} <span className="font-bold">{client.lastName}</span>
        </p>
      </div>
      <div className="flex space-x-2">
        <MailOutlineIcon />
        <p className="text-black">{client.email}</p>
        <PhoneIcon />
        <p className="text-black">{client.phone}</p>
      </div>
    </div>
  );
};

export default ClientItem;
