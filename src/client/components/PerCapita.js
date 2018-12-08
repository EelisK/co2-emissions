import React from "react";
import { FormControlLabel, Switch } from "@material-ui/core";

const PerCapita = props => {
    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={props.checked}
                        onChange={props.toggleChecked}
                        color="primary"
                    />
                }
                label="Per capita"
            />
        </div>
    );
};

export default PerCapita;