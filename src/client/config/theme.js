import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            dark: "#303F9F",
            main: "#3F51B5",
            light: "#C5CAE9"
        },
        secondary: {
            main: "#FF9800",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#757575"
        },
        divider: "#BDBDBD"
    },
    typography: {
        useNextVariants: true
    }
});