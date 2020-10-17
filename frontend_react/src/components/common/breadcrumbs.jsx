import React    from 'react';
import { Link } from 'react-router-dom';

function BreadCrumbs(props) {
    const breadcrumbs   = window.location.pathname.split('/');
    const entryProps    = {
        key:        '',
        className:  'breadcrumb-item'
    };

    const getPath   = (part) => {
        entryProps.key  = part;
        let path        = '';

        for (let p of breadcrumbs) {
            if (p) path += `/${p}`;
            if (p === part) {
                if (breadcrumbs.indexOf(p) === breadcrumbs.length - 1) {
                    entryProps.className    += ' active';
                    entryProps[ 'aria-current' ]  = 'page';
                }
                    
                return <li { ...entryProps } >
                            <Link to={path.toString()}>{part}</Link>
                        </li>;
            }
        }
    };

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-light">
            You are here:
                { breadcrumbs.map(
                    b => getPath(b)
                )}
            </ol>
        </nav> 
    );
}

export default BreadCrumbs;