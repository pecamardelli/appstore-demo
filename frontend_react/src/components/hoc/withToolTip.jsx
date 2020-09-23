import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const withTooltip = (Component) => {
    return class withTooltip extends React.Component {

        renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                {props.tip}
            </Tooltip>
        );

        render() {
            return (
                <OverlayTrigger
                    placement="bottom"
                    tip="Hello World!"
                    delay={{ show: 150, hide: 200 }}
                    overlay={renderTooltip}
                >
                    <Component { ...this.props } showTooltip={this.state.showTooltip} />
                </OverlayTrigger>
            );
        }
    }
};

export default withTooltip;