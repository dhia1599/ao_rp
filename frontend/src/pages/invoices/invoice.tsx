import { useEffect, useState } from "react";
import { getAllInvoices } from "../../services/otherApi";
import { EyeIcon } from "../../assets/img/eye";
import { useNavigate } from 'react-router-dom';

export interface Invoice {
    id: number;
    price: string;
    contact: string;
}

function Invoice () {
    const [invoices, setInvoices] = useState<Invoice[]>();
    const navigate = useNavigate();

    useEffect(() => {
        getAllInvoices().then((res) => {
            setInvoices(res.data);
        });
      }, []);

    const handleClick = (id:number) => {
        navigate('/invoices/'+id)
    }
    
    return(
    <div className="flex justify-center">
      <div className="w-4/5 bg-[#6bb5ce] rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Invoice list</h1>
        <table className="table-auto" width="100%">
        <tbody>
            {invoices?.map((invoice) => (
                <tr className="border-b border-gray-300">
                    <td>#{invoice.id}</td>
                    <td>{invoice.contact}</td>
                    <td>
                        <button onClick={() => handleClick(invoice.id)}>
                            <EyeIcon/>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
    );
}
export default Invoice;
