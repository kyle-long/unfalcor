const PATH = '$__path';

const unfalcor = (graph) => {
    return handleSwitch(graph);
};

const handleValue = (result, key, val) => {
    const convertedVal = handleSwitch(val);

    if (convertedVal !== undefined) {
        result[key] = convertedVal;
    }
};

const handleObject = (obj) => {
    const result = Object.keys(obj).reduce((accumulator, key) => {
        if (key !== PATH) {
            const val = obj[key];
            handleValue(accumulator, key, val);
        }

        return accumulator;
    }, {});

    if (Object.keys(result).length < 1) {
        return undefined;
    }

    return result;
};

const handleArray = (arr) => {
    const result = Object.keys(arr).reduce((accumulator, key) => {
        const index = parseInt(key, 10);

        if (!isNaN(index)) {
            const val = arr[key];
            handleValue(accumulator, key, val);
        }

        return accumulator;
    }, []);

    if (result.length < 1) {
        return undefined;
    }

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
    return obj.$type === 'atom';
};

module.exports = unfalcor;
