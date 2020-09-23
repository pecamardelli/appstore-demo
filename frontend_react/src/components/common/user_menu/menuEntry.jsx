import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import React    from 'react';

const MenuEntry = (props) => {
    const iconSize  = '1.5em';

    const renderTooltip = (overlayProps) => (
        <Tooltip id="button-tooltip" { ...overlayProps }>
          { props.tip }
        </Tooltip>
      );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
            { props.icon }
        </OverlayTrigger>
    );
}

export default MenuEntry;