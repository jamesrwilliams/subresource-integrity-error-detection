# Can we capture invalid SRI events with JavaScript!?

I have also posed this question to the fine folks on StackOverflow: ["Is it possible to log 
client-side 
sub-resource 
integrity 
errors 
with javascript?"](https://stackoverflow.com/questions/69320904/is-it-possible-to-log-client-side-sub-resource-integrity-errors-with-javascript)

We're trying to log SRI errors to [Sentry](https://sentry.io/welcome/). In the head of this HTML 
document is a html element that looks like this:

`<link href="style.css" id="target" rel=" stylesheet"integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvo" crossorigin="anonymous">`

The integrity hash for this element is `INVALID` and should trigger a security warning in your 
browsers console, saying something like: "The hash contained in the integrity attribute has the wrong
length and:

> None of the “sha384” hashes in the integrity attribute match the content of the subresource.

## Approaches

### 1. Client-side detection

Browser consoles are not directly readable and SRI errors don't seem to get captured by 
`window.onError` style events or are they discernible using 
[`MutationObservers`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

### 2. Headless

Can we consume the console values from a headless testing framework like selenium?

### 3. Service

Monitor sub-resources periodically verifying the hash value is still correct by comparing a new 
hash calculation with the stored value. Trigger alerts if validated?

## See also

- [Peter Major's post on subresource-integrity](https://aldaris.github.io/dev/security/2018/03/05/subresource-integrity.html)
- [Handling load error within subresource integrity check](https://stackoverflow.com/questions/40408636/handling-load-error-within-subresource-integrity-check#answer-54147581)
- [cyph/sri-fallback](https://github.com/cyph/sri-fallback/blob/master/sri-fallback.js)

## Demo Page

This project has a demo page setup to try out some various SRI detection methods against, it 
requires webpack currently for me to import [Sentry's](https://sentry.io/welcome) SDK.

### Usage

1. Change into the `demo-page` directory
2. Install dependencies with `yarn install`
3. Run `npx webpack serve` or `npx webpack --watch` and open the `index.html` in your browser.
