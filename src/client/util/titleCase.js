/**
 * Converts a string to title case
 * @param {*} str The string that is converted
 */
const titleCase = str => {
    return str.replace(/\w\S*/g, x =>
        `${x.charAt(0).toUpperCase()}${x.substr(1).toLowerCase()}`)
};

export default titleCase;