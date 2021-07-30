// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import 'cypress-file-upload';
import 'cypress-xpath';
import 'cypress-promise/register'
import 'cypress-metamask'
import { configure } from '@testing-library/cypress';

configure({ testIdAttribute: 'data-testid' });

Cypress.on('window:before:load', win => {
	cy.stub(win.console, 'error').callsFake(message => {
		cy.now('task', 'error', message);
		// fail test on browser console error
		// throw new Error(message);
	});
});