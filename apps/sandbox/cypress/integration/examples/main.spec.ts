context('Main Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('on load', () => {
        it('should contain welcome', () => {
            cy.get('h1').should('contain.text', 'Welcome to sandbox!');
        });
    });
});
