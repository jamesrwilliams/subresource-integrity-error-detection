# Can we capture invalid SRI events with JavaScript!?

Question is also posed on SO: ["Is it possible to log client-side sub-resource integrity errors 
with javascript?"](https://stackoverflow.com/questions/69320904/is-it-possible-to-log-client-side-sub-resource-integrity-errors-with-javascript)

We're trying to log SRI errors to [Sentry](https://sentry.io/welcome/). In the head of this HTML 
document is a html element that looks like this:

`<link href="style.css" id="target" rel=" stylesheet"integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvo" crossorigin="anonymous">`

The integrity hash for this element is `INVALID` and should trigger a security warning in your 
browsers console, saying something like: "The hash contained in the integrity attribute has the wrong
length and:

> None of the “sha384” hashes in the integrity attribute match the content of the subresource.

## Approaches

### 1. Client-side

Browser consoles are not directly readable and SRI errors don't seem to get captured by 
`window.onError` style events or are they discernible using 
[`MutationObservers`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

### 2. Headless

Can we consume the console values from a headless testing framework like selenium?

## See also

- [Handling load error within subresource integrity check](https://stackoverflow.com/questions/40408636/handling-load-error-within-subresource-integrity-check#answer-54147581)
- [cyph/sri-fallback](https://github.com/cyph/sri-fallback/blob/master/sri-fallback.js)

## Demo Page

1. Change into the `demo-page` directory
2. Install dependencies with `yarn install`
3. Run `npx webpack serve`
