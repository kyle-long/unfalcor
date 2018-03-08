# unfalcor
Silly debug utility that takes some of the fluff out of JSON Graph

**This should not be used for any production code**

**This only works with node leaf types of "atom"**

Install
=======

For now...

    npm install -g https://github.com/kyle-long/unfalcor


Usage
=====

    unfalcor file.json
    # or
    cat file.json | unfalcor


You can also use it as a library.

    const unfalcor = require('unfalcor');

    
    fs.readFile(fileName, (err, content) => {
        const obj = JSON.parse(content);
        const processedObject = unfalcor(obj);
        
        // Log the result and make it pretty.
        console.log(JSON.stringify(processedObject, null, 4));
    });


Why?
====

JSON Graph is great. I just wanted an easier way to read it for debugging perposes.
