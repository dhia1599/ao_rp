import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useEffect, useState } from 'react';
import { decode, getToken } from '../helpers/jwt';

const Sidebar = () => {
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        const token = getToken();
        const decodedToken = decode(token);
        setIsConnected(decodedToken !== null);
      }, []);
      
    return (
        <div
        className="fixed top-16 left-0 h-full w-16 flex flex-col items-center"
        style={{ background: 'linear-gradient(to bottom, #6bb5ce, #5e87c6, #493488)' }}
        >
            {isConnected && (
                <div className="flex flex-col mt-6 items-center space-y-6">
                    <PeopleOutlineIcon className="h-20 w-20 cursor-pointer hover:text-gray-300 transition duration-300" />
                    <ReceiptIcon className="m-3 h-20 w-20 cursor-pointer hover:text-gray-300 transition duration-300" />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
