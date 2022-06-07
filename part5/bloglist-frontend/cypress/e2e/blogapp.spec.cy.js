describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "Mikko Sipola",
      username: "msipola",
      password: "salainen",
    }
    cy.request("POST", "http://localhost:3003/api/users", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get(".loginform").find("input:first").type("msipola")
      cy.get(".loginform").find("input:last").type("salainen")
      cy.get(".loginform").find("button:first").click()

      cy.contains("Login successful")
    })

    it("fails with wrong credentials", function () {
      cy.get(".loginform").find("input:first").type("msipola")
      cy.get(".loginform").find("input:last").type("vääräsalasana")
      cy.get(".loginform").find("button:first").click()

      cy.contains("Login failed")
      cy.get("#errorDiv").should("have.css", "color", "rgb(216, 0, 12)")
    })

    describe("When logged in", function () {
      beforeEach(function () {
        cy.login({ username: 'msipola', password: 'salainen' })
        cy.createBlog({ 
          title: 'Luin Silmarillionin kannesta kanteen - alkuperäiskiellellään', 
          author: 'Miisa Mikänen',
          url: 'https://mikahost/mikaroute/luinsilmarillionin' 
        })
      })

      it("A blog can be created", function () {
        cy.get('#openBlogFormButton').click()
        cy.get('#titleInput').type("Tenavien tähtikokous järjestetään, oletko valmis")
        cy.get('#authorInput').type("Jaska Jokunen")
        cy.get('#urlInput').type('http://jokunenhost.fi/jokunenroute/jokusenpostaukset/tahdet')
        cy.get('#blogSubmitButton').click()

        cy.contains('Tenavien tähtikokous järjestetään, oletko valmis')
      })

      it("user can like a blog", function () {
        cy.get('#showDetailsButton').click()
        cy.get('#likeBlogButton').click()
        cy.get('.blogsDiv').contains('Likes: 1')
      })
    })
  })
})
