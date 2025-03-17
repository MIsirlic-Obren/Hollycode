/// <reference types="cypress" />


// We use mochha

// description for test suit
describe("Test Home Page h1 header",() => {

    // Individual test start with it.

    //Positive scenario

    it("Should be able to verify h1 header on Hollycode home page",()=> {
        cy.visit('https://www.holycode.com/').wait(2000);
        

        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();

        cy.get('h1').invoke('text').should('include', 'Tech Solutions to scale');
    })

    

    // Negative scenario

  

        it('Should fail if the h1 title contains unexpected text', () => {
            cy.visit('https://www.holycode.com/').wait(2000);
       
            // Proverava da naslov ne sadrži reč "Error"
            cy.get('h1').should('not.contain', 'Error'); // Proverava da naslov ne sadrži reč "Error"
        });
        
    })

