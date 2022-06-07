describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: "Mikko Sipola",
      username: "msipola",
      password: "salainen",
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function () {
    it('succeeds with correct credentials', function() {
      cy.get('.loginform').find('input:first').type('msipola')
      cy.get('.loginform').find('input:last').type('salainen')
      cy.get('.loginform').find('button:first').click()

      cy.contains("Login successful")
    })

    it('fails with wrong credentials', function () {
      cy.get('.loginform').find('input:first').type('msipola')
      cy.get('.loginform').find('input:last').type('vääräsalasana')
      cy.get('.loginform').find('button:first').click()

      cy.contains("Login failed")
      cy.get('#errorDiv').should('have.css', 'color', 'rgb(216, 0, 12)')
    })
  })
})
