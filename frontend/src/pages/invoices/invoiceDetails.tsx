import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceById, getProductsByInvoiceId } from "../../services/otherApi";
import { Client } from "../clients/Client";

export interface Invoice {
    id: number;
    price: string;
    contact: string;
}

export interface Product {
    id: number;
    price: string;
    name: string;
}

function InvoiceDetails () {
    const [invoice, setInvoice] = useState<Invoice>();
    const [client, setClient] = useState<Client>();
    const [products, setProducts] = useState<Product[]>();
    const { id } = useParams();
    
    useEffect(() => {
        getInvoiceById(id).then((res) => {
            setInvoice(res.data);
            setClient(res.data.client)
        });
        getProductsByInvoiceId(id).then((res) => {
            setProducts(res.data);
        });

      }, []);

    return(
    <div className="flex justify-center">
      <div className="w-4/5 bg-[#6bb5ce] rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-black">Invoice File</h1>
        <h3>#{invoice?.id} - {client?.firstName} {client?.lastName}</h3>
        <table className="table-auto w-full">
            <tbody>
                <tr className="border-b border-gray-300">
                <th className="text-left p-2 pb-12">Contact</th>
                <td className="pt-4 p-2">
                    {client?.firstName} <br />
                    {client?.email} <br />
                    {client?.phone} <br />
                </td>
                </tr>
                <tr className="border-b border-gray-300">
                <th className="text-left p-2">Price</th>
                <td className=" p-2">{invoice?.price} $</td>
                </tr>
                <tr className="border-gray-300">
                <th className="text-left p-2">Contained</th>
                </tr>
            </tbody>
        </table>
        <ul className="list-disc ml-10">
                    {products?.map((product, index) => (
                        <li key={index}>{product.name} {product.price}</li>
                    ))}
                </ul>
      </div>
    </div>
    );
}
export default InvoiceDetails;
