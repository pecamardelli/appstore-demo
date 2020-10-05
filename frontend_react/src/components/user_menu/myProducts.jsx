import React, { useState, useEffect } from 'react';
import { getMyProducts }    from './../../services/myService';
import { toast }            from 'react-toastify';

function MyProducts(props) {
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
        async function getProducts() {
            try {
                const { data: myProducts }  = await getMyProducts();
                setProducts(myProducts);
            }
            catch (ex) {
                toast.error(`Could not get product list: ${ex}`);
            }
        }

        getProducts();
    }, [ setProducts ]);

    function renderProductList() {
        if (Array.isArray(products)) {
            return products.map(p => <li key={p.id}>{p.displayName}</li>)
        }
        else console.log(products);
    }

    return (
        <div>
            <ul>
                { products.map(p => <li key={p.id}>{p.displayName}</li>) }
            </ul>
        </div>
    );
}

export default MyProducts; 