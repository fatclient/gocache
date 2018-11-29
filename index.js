'use strict'

const MAX_AGE = Symbol('maxAge');
const CREATED_AT = Symbol('createdAt');
const PAYLOAD = Symbol('payload');
const REFRESH_FUNC = Symbol('refreshFunction');
const DEFAULT_LIFESPAN = 100;
// Get-Or-CACHE plain caching structure
// "FRESHNESS" of payload may vary due to refresh duration
// @maxAge optional : takes  maxAge in milliseconds
// @refreshFunction takes  a refresh function, that will be called in constructor, and after expiration ,
// should return desired object

// TODO: switchable instant update on initialization

class GOCache {
    constructor(maxAge, refreshFunction) {
        if (typeof refreshFunction !== 'function')
            throw new TypeError('Expected a refresh function as second argument, got: ', typeof refreshFunction);

        if (!maxAge)
            maxAge = DEFAULT_LIFESPAN;

        this[REFRESH_FUNC] = refreshFunction;
        this[CREATED_AT] = Date.now();
        this[MAX_AGE] = maxAge;
        this.refresh();
    }

    async refresh() {
        this[CREATED_AT] = Date.now();
        this[PAYLOAD] = await this[REFRESH_FUNC]();
    }

    set maxAge(maxAge) {
        if (typeof maxAge !== 'number')
            throw new TypeError('maxAge must be a non-negative number')
        this[MAX_AGE] = maxAge
    }

    get maxAge() {
        return this[MAX_AGE]
    }

    get() {
        if ((this[CREATED_AT] + this[MAX_AGE]) < Date.now())
            this.refresh()
        return this[PAYLOAD]
    }
}


module.exports = GOCache;