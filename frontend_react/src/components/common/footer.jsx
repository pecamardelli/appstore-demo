import React from 'react';

function Footer(props) {
    const digApony = (e) => {
        console.log(e.target)
    }

    return (
        <footer className="footer mt-auto py-3 text-center" onClick={digApony}>
            <div className="container">
                <span className="text-muted">
                    AppStore © 2020 |
                    &nbsp;<a href='https://github.com/pecamardelli/appstore-demo/blob/master/LICENSE' target='_blank' rel="noopener noreferrer">License</a>
                    &nbsp;| <a href='https://github.com/pecamardelli/appstore-demo' target='_blank' rel="noopener noreferrer">Get the repo</a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;