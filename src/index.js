const PATH = '$__path';

const unfalcor = (graph) => {
    return handleSwitch(graph);
};

const handleObject = (obj) => {
    const result = {};

    Object.keys(obj).forEach((key) => {
        if (key !== PATH) {
            const val = obj[key];

            result[key] = handleSwitch(val);
        }
    });

    return result;
};

const handleArray = (arr) => {
    const result = [];

    Object.keys(arr).forEach((key) => {
        const index = parseInt(key, 10);

        if (!isNaN(index)) {
            const val = arr[key];

            result[index] = handleSwitch(val);
        }
    });

    return result;
};

const handleSwitch = (thing) => {
    if (isArray(thing)) {
        return handleArray(thing);
    } else if (typeof thing === 'object') {
        if (isLeaf(thing)) {
            return thing.value;
        }

        return handleObject(thing);
    }
};

const isArray = (thing) => {
    // Because strings also have a length.
    return typeof thing === 'object' && thing.length !== undefined;
};

const isLeaf = (obj) => {
    return obj.type === 'atom';
};

module.exports = unfalcor;
