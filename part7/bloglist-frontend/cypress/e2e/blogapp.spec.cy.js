describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const users = [
      {
        name: 'Mikko Sipola',
        username: 'msipola',
        password: 'salainen',
      },
      {
        name: 'Freija Sipola',
        username: 'fsipola',
        password: 'salainen'
      }
    ]
    cy.request('POST', 'http://localhost:3003/api/users', users[0])
    cy.request('POST', 'http://localhost:3003/api/users', users[1])
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('.loginform').find('input:first').type('msipola')
      cy.get('.loginform').find('input:last').type('salainen')
      cy.get('.loginform').find('button:first').click()

      cy.contains('Login successful')
    })

    it('fails with wrong credentials', function () {
      cy.get('.loginform').find('input:first').type('msipola')
      cy.get('.loginform').find('input:last').type('vääräsalasana')
      cy.get('.loginform').find('button:first').click()

      cy.contains('Login failed')
      cy.get('#errorDiv').should('have.css', 'color', 'rgb(216, 0, 12)')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'msipola', password: 'salainen' })
        cy.createBlog({
          title: 'Luin Silmarillionin kannesta kanteen - alkuperäiskielellään',
          author: 'Miisa Mikänen',
          url: 'https://mikahost/mikaroute/luinsilmarillionin',
        })
        cy.createBlog({
          title: 'Mitä lapsi tarvitsee hyvään kasvuun',
          author: 'Jari Sinkkonen',
          url: 'https://.../...',
        })
        cy.createBlog({
          title: 'Maan voimaa',
          author: 'Deborah',
          url: 'https://.../...',
        })
      })

      it('A blog can be created', function () {
        cy.get('#openBlogFormButton').click()
        cy.get('#titleInput').type('Tenavien tähtikokous järjestetään, oletko valmis')
        cy.get('#authorInput').type('Jaska Jokunen')
        cy.get('#urlInput').type('http://jokunenhost.fi/jokunenroute/jokusenpostaukset/tahdet')
        cy.get('#blogSubmitButton').click()

        cy.contains('Tenavien tähtikokous järjestetään, oletko valmis')
      })

      it('user can like a blog', function () {
        cy.get('#showDetailsButton').click()
        cy.get('#likeBlogButton').click()
        //Might be a problem later. Should get blog id or similar
        cy.get('#detailsVisible').contains('Likes: 1')
      })

      it('User who created a blog can delete it', function () {
        cy.contains('Luin Silmarillionin')
          .parent()
          .find('#showDetailsButton')
          .click()
        cy.contains('Luin Silmarillionin')
          .parent()
          .next()
          .find('#deleteButton')
          .click()
        cy.contains('Blog Luin Silmarillionin kannesta kanteen - alkuperäiskielellään deleted')
      })

      it.only('Blogs are arranged in descending order by likes', function () {
        cy.contains('Luin Silmarillionin')
          .parent()
          .find('#showDetailsButton')
          .click()
          .parent()
          .next() //Next div (details shown)
          .find('#likeBlogButton')
          .click().wait(1000).click()
        cy.contains('Maan voimaa')
          .parent()
          .find('#showDetailsButton')
          .click()
          .parent()
          .next() //Next div (details shown)
          .find('#likeBlogButton')
          .click()
        cy.get('.blogDiv').eq(0).should('contain', 'Luin Silmarillionin')
        cy.get('.blogDiv').eq(1).should('contain', 'Maan voimaa')
        cy.get('.blogDiv').eq(2).should('contain', 'Mitä lapsi')
      })

      describe('When another user is logged in', function () {
        beforeEach(function () {
          cy.login({ username: 'fsipola', password: 'salainen' })
        })

        it('Other user cannot delete other users blog', function () {
          cy.get('#showDetailsButton').click()
          cy.contains('Luin Silmarillionin').should('not.contain', 'Remove')
        })
      })
    })
  })
})
