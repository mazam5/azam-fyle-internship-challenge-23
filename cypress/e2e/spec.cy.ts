describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Welcome to GitHub Repos Search Engine')
  })
  it('Searches for a user', () => {
    cy.visit('/')
    cy.get('input').type('johnpapa')
    cy.get('button').click()
    cy.contains('145 Public Repos')
  })
  it('Searches for a user and navigates to the second page', () => {
    cy.visit('/')
    cy.get('input').type('johnpapa')
    cy.get('button').click()
    cy.get('#nextButton').contains('Next').click()
    cy.contains('2')
  })
  it('Change the number of repos per page', () => {
    cy.visit('/')
    cy.get('input').type('mazam5')
    cy.get('button').click()
    cy.get('#perPage').select('25')
    cy.contains('1')
  })
})
