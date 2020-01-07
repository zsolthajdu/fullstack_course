describe('Bloglist ', function() {

  beforeEach( function() {
    cy.visit( 'http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')

    cy.get( '#username' )
      .type('mulder')

    cy.get( '#password' )
      .type( 'trustno1' )

    cy.contains( 'Login')
      .click()

    cy.contains( 'Fox Mulder logged in' )
  })
})


