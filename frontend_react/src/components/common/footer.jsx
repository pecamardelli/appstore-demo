import React from 'react';

function Footer(props) {
    return (
        <footer className="footer mt-auto py-3 text-center">
            <div className="container">
                <span className="text-muted">
                    AppStore © 2020 |&nbsp;
                    <a href='https://github.com/pecamardelli/appstore-demo' target='_blank' rel="noopener noreferrer">GitHub repo</a>
                </span>
            </div>
        </footer>
    );
}

export default Footer;