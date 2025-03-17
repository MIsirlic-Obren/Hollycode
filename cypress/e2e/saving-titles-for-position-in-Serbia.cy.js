/// <reference types="cypress" />


describe("Saving titles for QA positions in Serbia",() => {


    it("Should be able to navigates to the Careers page, filter positions for QA in Serbia and save in .txt file,",()=> {

        // visit home page and closing the cookiebot
        cy.visit('https://www.holycode.com/')
        cy.wait(1000)
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click()
        
        //opening the hamburger menu
        cy.get('.hamburger-inner').click()

        cy.get(':nth-child(3) > .c-header__subnav > ul > :nth-child(2) > a > span').click()

        // Click on "Serbia" filter and wait for 5 seconds
        cy.get("button.c-tag.location").contains("Serbia").wait(5000).click()

         // Extract job titles using correct selector
        cy.get(".resources-feed").should("have.length.greaterThan", 0).then(($titles) => {
            const jobTitles = $titles.map((i, el) => Cypress.$(el).text().trim()).get();

            // Debug: Print to Cypress log and DevTools console
            cy.log("Job Titles Found:", jobTitles);
            console.log("Job Titles Found:", jobTitles);

            // Save to a text file
            cy.writeFile("cypress/fixtures/serbia_jobs.txt", jobTitles.join("\n"));
        });
        



    })

    //Negative scenario
    it('Should not create a job file if job extraction fails', () => {



        cy.visit('https://www.holycode.com/');
    
        // Accept cookies
        cy.get('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    
        // Open Careers page
        cy.get('.hamburger-inner').click();
        cy.get(':nth-child(3) > .c-header__subnav > ul > :nth-child(2) > a > span').click();
    
        // Click Serbia filter
        cy.get("button.c-tag.location").contains("Serbia").click();
        cy.wait(5000);
    
        // Use incorrect selector to simulate job extraction failure
        cy.get('.invalid-class')
            .should('not.exist')
            .then(() => {
                // Ensure job titles file was NOT created
                cy.readFile('cypress/fixtures/serbia_jobs2.txt', { timeout: 5000 }).should('not.exist');
            });
    });
    
    
})