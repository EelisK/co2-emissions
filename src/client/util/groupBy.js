/**
 * Groups an array of items with given keys
 * @param {*} arr The array that is grouped
 * @param {*} key The function that returns keys
 * for given array items
 */
const groupBy = (arr, key) => {
    return arr.reduce((group, next) => {
        const nextKey = key(next);
        if (group[nextKey])
            group[nextKey].push(next);
        else
            group[nextKey] = [next];
        return group;
    }, {});
};

export default groupBy;