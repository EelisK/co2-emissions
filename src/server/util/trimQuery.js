/**
 * Takes a string and trims it to a more query friendly format
 * @param {*} string The string used in queries
 */
function trimQuery(string) {
    return string.replace(/\s+/g, " ").toLowerCase().trim();
}

module.exports = trimQuery;