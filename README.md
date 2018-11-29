gocache
=======
Get-Or-CACHEd
Caching structure, that returns a result of provided callback invocation with caching it for specified time.
Expiration is not precise and may vary due to callback call duration.

Usage
-----
```javascript
let myCachedObject = new GOCache(5000, () => {
    return Date.now();
})
setInterval(() => console.log(myCachedObject.get()), 5000) 
// expected to print same number 5 times

```
