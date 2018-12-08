import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
    palette: {
        primary: {
            main: "#ff4400",
        },
        secondary: {
            light: "#0066ff",
            main: "#0044ff",
            contrastText: "#ffcc00",
        }
    },
    typography: {
        useNextVariants: true,
    }
});