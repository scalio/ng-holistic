/// <reference types="cypress" />

import { getGreeting } from '../support/app.po';

describe('Hello Nx', () => {
    beforeEach(() => cy.visit('/'));

    it('should display welcome message', () => {
        getGreeting().contains('Welcome to clr-list-sandbox!');
    });
});