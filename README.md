# find-uses-of

Find uses of a Node module inside subdirectories.
```bash
    ~/dev > find-uses-of eslint
    Finding packages depending on eslint...
    benson
    find-uses-of
    jestas
    wappuapp-backend
    wappuapp-client
    yet-another-redux-example
```

Starting from the current working directory, finds Node modules that have a given module as either a "dependency" or "devDependency" in their package.json.

Only walks the directory tree up to the first package.json, then moves to the next directory.


## Install

    $ npm install -g find-uses-of

**Requires Node 6** for its ES6 syntax support (spread, generators). Tested on Node v6.6.0.


## Acknowledgements

This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities).


## License

[MIT](https://github.com/mieky/find-uses-of/blob/master/LICENSE)
