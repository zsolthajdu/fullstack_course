describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'johndoe',
      password: 'trustno1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  describe( "When Logged in", function() {

    it('user can login',function(){
      cy.get( '#username' )
        .type('johndoe')

      cy.get( '#password' )
        .type( 'trustno1' )

      cy.contains( 'Login')
        .click()

      cy.contains( 'John Doe logged in' )
    })

    it('Can add new blog entry', function() {
      cy.contains('add blog')
        .click()

      cy.get('#title')
        .type('Slashdot')
      cy.wait( 500 )

      cy.get('#author')
        .type( 'Anonymous Coward' )
      cy.wait( 500 )

      cy.get('#URL')
        .type( 'http://slashdot.org' )
      cy.wait( 500 )

      cy.get( '#addBlog')
        .click()

      cy.wait( 500 )

      cy.contains( 'by Anonymous Coward' )
    })
  })
})