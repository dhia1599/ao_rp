import axios from 'axios';

const urlBase = "http://localhost:3001"

export const getAllClients = async () =>{
    const response = await axios.get(urlBase+'/clients');
    return response;
};

export const getAllInvoices = async () =>{
  const response = await axios.get(urlBase + '/invoices');
  return response;
}


