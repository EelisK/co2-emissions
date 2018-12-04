import React from "react";

class PerCapita extends React.Component {
    render() {
        return (
            <input type="checkbox" checked={this.props.checked} onChange={this.props.toggleChecked} />
        );
    }
}

export default PerCapita;