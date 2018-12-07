const parser = require("fast-xml-parser");

/**
 * Parser API xml content to json
 * @param {*} xmlContent xml content as string
 * @param {*} fields field names that are used in the xml api schema
 */
function xml2Json(xmlContent, fields) {
    const json = parser.parse(xmlContent).Root;
    json.data.record = json.data.record
        .map(x => x.field)
        .map(x => fields ?
            x.reduce((curr, next, i) => ({ ...curr, [fields[i]]: next || null }), {}) : x);
    return parseObject(json);
}

/**
 * Parse object to a useful form for eg. queries
 * @param {*} object Object that is parsed
 */
function parseObject(object) {
    return JSON.parse(JSON.stringify(object).toLowerCase());
}

module.exports = xml2Json;