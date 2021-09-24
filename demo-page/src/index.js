import * as Sentry from "@sentry/browser";
import {Integrations} from "@sentry/tracing";

/**
 * This sets up a MutationObserver on the document to see if we can see the SRI invalidation
 * changing
 * See also https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
new MutationObserver((mutations) => {

    console.groupCollapsed('Mutations')
    mutations.forEach(mutation => {
        console.log(mutation)
    });
    console.groupEnd()

}).observe(document, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
    attributeOldValue: true,
});

/**
 * Attempt to use window onerror to capture errors (no luck here)
 */
window.onerror = function (error, url, lineNumber) {
    console.log({error, url, lineNumber})
    return true;
};

/**
 * Attempt some after-page-load checks and event listeners...
 */
window.addEventListener('DOMContentLoaded', () => {

    console.log('DOMContentLoaded')

    // This is our Bootstrap css - with a valid hash
    document.head
        .querySelector('#target-1')
        .addEventListener('error', e => logError(e))

    // This is our own script with an invalid hash
    document.head
        .querySelector('#target-2')
        .addEventListener('error', e => logError(e))

    // This logs CSP errors
    document.addEventListener('securitypolicyviolation', e => {
        logError(e, 'securitypolicyviolation')
    })

    /**
     * Custom Error wrapper for introspection and sending to sentry
     */
    function logError(payload) {
        console.log(payload);
        Sentry.captureException(payload);
    }

    /**
     * Init Sentry for logging
     */
    Sentry.init({
        dsn: "https://2c4e5273cd944071b028dc6eba454b61@o571602.ingest.sentry.io/5923956",
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: 1.0,
    });

});
