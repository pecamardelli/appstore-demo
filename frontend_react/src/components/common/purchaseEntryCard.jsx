import React, { useState, useEffect }   from 'react';
import { getPurchaseDetail }            from './../../services/myService';
import ToolTipEntry from '../user_menu/toolTip';
import Icons        from '../user_menu/userIcons';
import noImage      from '../../assets/images/image_not_found.png';
import { toast }    from 'react-toastify';

function PurchaseEntryCard({ data: purchase }) {
    const [ content, setContent ]                   = useState([]);

    useEffect(() => {
        async function call() {
            try {
                const result    = await getPurchaseDetail(purchase.id);
                console.log(result)
                setContent(result.data);
            }
            catch(ex) {
                toast.error(ex);
            }
        }

        call();
    }, [ setContent ]);
    return (
        <center>
            <div className="card w-90">
                <div className="card-body">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col" colSpan='2'>Invoice <strong>#{purchase.id}</strong></th>
                                <th scope="col">{new Date(purchase.updatedAt).toDateString()}</th>
                                <th scope="col">{purchase.Wishes.length} items</th>
                                <th scope="col">Sale total ${purchase.total}</th>
                                <th scope="col">
                                    <span role='button'>
                                        <ToolTipEntry icon={Icons.receiptIcon()} tip='Get receipt' />
                                    </span>
                                    <span role='button'>
                                        <ToolTipEntry icon={Icons.eyeIcon()} tip='View details' />
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {content.map(item =>
                            <tr key={item.Product.id}>
                                <td style={{ width: '7%' }}>
                                    <img
                                        className="card-img"
                                        src={`${process.env.REACT_APP_API_URL}/images/products/${item.Product.id}.png`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            // This conditional prevents an infinite fallback loop
                                            // when noImage is not available or undefined
                                            if(noImage) e.target.src=noImage;
                                            else e.target.src=''
                                        }}
                                        alt={item.Product.displayName}
                                    />
                                </td>
                                <td>
                                    <h6 style={{ margin: '2px 0 0 0'}}>
                                        <strong>{item.Product.displayName}</strong>
                                    </h6>
                                </td>
                                <td>
                                    {item.Product.Category.displayName}
                                </td>
                                <td>
                                    <h5 style={{ margin: '2px 0 0 0'}}>
                                        ${item.salePrice}
                                    </h5>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </center>
    );
}

export default PurchaseEntryCard;

/*

                */