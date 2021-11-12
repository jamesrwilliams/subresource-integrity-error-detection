const test_cases = require('../test-cases');

const BASE_PATH = window.location.origin;
const FIXTURE_PATH = '/cypress/fixtures/'
const ASSET_PATH = BASE_PATH + FIXTURE_PATH + 'assets/';
const TEMPLATE_PATH = FIXTURE_PATH + 'html';

const RESPONSES = {
  'INTEGRITY': `SRI issue with url: `,
  'OTHER': 'SECURITY issue with url: ',
  'NOT_FOUND': '404 for: ',
  'default': 'Unknown error for: '
}

describe('Dynamic test cases', () => {

  Object.entries(test_cases).forEach(([key, test]) => {

    it(test.title, () => {
      cy.visit(`..${TEMPLATE_PATH}/base.html`, {
        onBeforeLoad(win) {
          cy.stub(win.console, 'log').as('consoleLog')
        },
      }).window().then((win) => {

        win.document.getElementById('title').innerText = test.title;

        const ELM_MAP = {
          'script': 'src',
          'link': 'href',
        }

        const $script = win.document.createElement(test.tagName);

        if(test.contents) {
          $script.innerText = test.contents;
        }

        if(test.asset) {
          $script.integrity = test.asset.integrity;
          $script[ELM_MAP[test.tagName]] = `../assets/${test.asset.file}`;
          $script.onerror = win.monitorForSriError($script);
        }

        win.document.body.appendChild($script);

      });

      if(test.expectedErrorType !== 'NONE') {
        cy.get('@consoleLog')
          .should('be.calledOnceWith', RESPONSES[test.expectedErrorType] + ASSET_PATH + test.asset.file)
      } else {
        cy.get('@consoleLog').should('not.be.called');
      }

    });
  });

});
