/// <reference types="cypress" />


describe('Test search QA position on home page', () => {

    //Positive scenario 
    describe('Test search QA position on home page', () => {
        it('Should navigate to the Careers page and filter positions for QA', () => {
            cy.visit('https://www.holycode.com/');
    
            // Accept cookies if necessary
            cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
                .should('exist')
                .click();
    
            // Open the menu and click Careers
            cy.get('.hamburger-inner').click();
            cy.contains('Open positions').click();
    
            // Wait for the Careers page to load and search for "QA"
            cy.get('#search-careers').type('QA');
    
            // Validate that "Senior QA Specialist" exists under the correct team
            cy.contains('Senior QA Specialist')
                .parentsUntil('.job-listing') // Ensures we are in the right section
                .contains('Team: EtonDigital')
                .should('be.visible');
        });
    });
    

    // Negative scenario

    describe('Negative Test - Searching for a non-existent QA position', () => {
        it('Should display no results when searching for an invalid job title', () => {
            cy.visit('https://www.holycode.com/');
    
            // Accept cookies
            cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll')
                .should('exist')
                .click();
    
            // Open the menu and navigate to Careers
            cy.get('.hamburger-inner').click();
            cy.contains('Open positions').click();
    
            // Search for a job title that does not exist
            cy.get('#search-careers').type('NonExistentQAJob');
    
            // Assert that no results are shown
            cy.contains('No open positions').should('be.visible'); 
        });
    });
    
});
