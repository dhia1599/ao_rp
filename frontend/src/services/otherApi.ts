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

export const getInvoiceById = async (id : string | undefined) =>{
  const response = await axios.get(urlBase + '/invoices/' + id);
  return response;
}

export const getProductsByInvoiceId = async (id : string | undefined) =>{
  const response = await axios.get(urlBase + '/products/with-invoice/' + id);
  return response;
}


