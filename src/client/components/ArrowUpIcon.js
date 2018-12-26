import React from "react";
import { SvgIcon } from "@material-ui/core";

const ArrowUpIcon = props => {
    return (
        <SvgIcon {...props}>
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
        </SvgIcon>
    );
};

export default ArrowUpIcon;