import { Popover, OverlayTrigger } from 'react-bootstrap';
import React    from 'react';

const PopOverEntry = ({ icon, title, content: Component }) => {
    const popover = (
        <Popover id="popover-basic" style={{ width: '200px' }}>
            { title ? <Popover.Title as="h3">{ title }</Popover.Title> : '' }
            <Popover.Content>
                <Component />
            </Popover.Content>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            { icon }
        </OverlayTrigger>
    );
}

export default PopOverEntry;