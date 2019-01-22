gocache
=======
Get-Or-CACHEd
Caching structure, that returns a result of provided callback invocation with caching it for specified time.
_Expiration is not precise and may vary due to callback call duration._

Usage
-----
```javascript
let myCachedObject = new GOCache(5000, () => {
    return Date.now();
})
setInterval(() => console.log(myCachedObject.get()), 1000) 
// expected to print same number 5 times

```
with [express.js](https://http://expressjs.com/), [request-promise-native](https://github.com/request/request-promise-native)
```javascript
let router = require('express').Router();
const GOCache = require("gocache");
const request = require('request-promise-native');
const TIME = 10000;

let CachedPage = new GOCache(TIME, async () => await request("https://google.com"))
Router.get('/cached-page', async (req, res) => res.send(CachedPage.get()));
```

FAQ
===
1. `.get()` returns undefined or something else unwanted.
    > Make sure your callback **exactly** returns  data you want, not `pending promise` or something.
