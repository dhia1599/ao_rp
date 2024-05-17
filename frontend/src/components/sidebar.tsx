import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useEffect, useState } from 'react';
import { decode, getToken } from '../helpers/jwt';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        const decodedToken = decode(token);
        setIsConnected(decodedToken !== null);
      }, []);

      const handleNavigate = (path: string) => {
        navigate(path);
      };
      
    return (
        <div
        className="fixed top-16 left-0 h-full w-16 flex flex-col items-center"
        style={{ background: 'linear-gradient(to bottom, #6bb5ce, #5e87c6, #493488)' }}
        >
            {isConnected && (
                <div className="flex flex-col mt-6 items-center space-y-6">
                    <PeopleOutlineIcon
                        className="h-20 w-20 cursor-pointer hover:text-gray-300 transition duration-300"
                        onClick={() => handleNavigate('/clients')}
                    />
                    <ReceiptIcon
                        className="h-20 w-20 cursor-pointer hover:text-gray-300 transition duration-300"
                        onClick={() => handleNavigate('/invoices')}
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
