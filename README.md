# Can we capture invalid SRI events with JavaScript!?

When sub-resource integrity hashes are invalid, is a Javascript detection method/API we can use to 
ensure the asset has loaded and that they haven't thrown an error? I have posed this question to 
the fine 
folks on 
StackOverflow: ["Is it possible to log 
client-side 
sub-resource 
integrity 
errors 
with javascript?"](https://stackoverflow.com/questions/69320904/is-it-possible-to-log-client-side-sub-resource-integrity-errors-with-javascript)

![](./assets/sri-examples.png)

## Current working theory: <mark>Not possible client-side</mark>

This isn't possible as SRI errors are considered network-level issues and cannot be detected by 
client-side javascript.

## Background

We're trying to log SRI errors to [Sentry](https://sentry.io/welcome/). In the head of this HTML 
document is a html element that looks like this:

`<link href="style.css" id="target" rel=" stylesheet"integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvo" crossorigin="anonymous">`

The integrity hash for this element is `INVALID` and should trigger a security warning in your 
browsers console, saying something like: "The hash contained in the integrity attribute has the wrong
length and:

> None of the “sha384” hashes in the integrity attribute match the content of the subresource.

## Approaches

### 1. Client-side detection

Below is a table of attempted, client-side detection methods:

| Method                    | Note |
| --------------------------|------|
| `window.onError`          | Browser consoles are not directly readable and SRI errors don't seem to get captured |
| `MutationObservers`       | Nothing captured by [`MutationObservers`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) |
| `document.styleSheets`    | Doesn't give us any insights for CSS files that are not loading. |
| `securitypolicyviolation` | This experimental event doesn't file (unsurprisingly) as SRI invalidations are not considered CSP things |

### 2. Headless

- Untested - Can we consume the console values from a headless testing framework like selenium.
- Untested - Visual regression.

### 3. Service

- Monitor sub-resources periodically verifying the hash value is still correct by comparing a new 
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

## Updates

### 2021-10-12

While on StackOverflow I found [this answer](https://stackoverflow.com/questions/37503444/does-javascript-subresource-integrity-check-protect-from-client-side-editing#answer-37503514) to a question mentioning that SRI invalidation errors 
are throwing at the network level in the browser, not the document level. From the MDN page 
section ["How browsers handle subresource Integrity"](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity#how_browsers_handle_subresource_integrity) paragraph two:

> f the script or stylesheet doesn't match its associated integrity value, the browser must refuse 
> to execute the script or apply the stylesheet, and must instead return a network error indicating
> that fetching of that script or stylesheet failed.

