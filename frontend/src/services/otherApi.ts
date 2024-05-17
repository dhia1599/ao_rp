import axios from 'axios';
export interface Client {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  }
const urlBase = "http://localhost:3001"
export const getAllClients = async () =>{
    const response = await axios.get(urlBase+'/clients');
    return response;
};
