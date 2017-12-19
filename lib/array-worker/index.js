const getMaxOfArray = array => Math.max.apply(null, array);

const getMinOfArray = arrya => Math.min.apply(null, arrya);

const getAscendingArray = array => array.slice(0).sort();

const getDescendingArray = array => getAscendingArray(array).reverse();

const getPositiveItems = array => array.filter(item => item > 0);

const getNegativeItems = array => array.filter(item => item < 0);

module.exports = {
    getMaxOfArray,
    getMinOfArray,
    getAscendingArray,
    getDescendingArray,
    getPositiveItems,
    getNegativeItems
}