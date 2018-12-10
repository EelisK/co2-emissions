/**
 * Unescapes special xml characters like so:
 * &amp; → & (ampersand, U+0026)
 * &lt; → < (less-than sign, U+003C)
 * &gt; → > (greater-than sign, U+003E)
 * &quot; → " (quotation mark, U+0022)
 * &apos; → ' (apostrophe, U+0027)
 * (https://en.wikipedia.org/wiki/Character_encodings_in_HTML#XML_character_references)
 * @param {*} str string to be unescaped
 */
const unescapeXML = str => {
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, "\"")
        .replace(/&apos;/g, "'");
};

export default unescapeXML;