/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // Memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // Klik tombol login tanpa mengisi email
    cy.get('button').contains(/^Login$/).click();

    // Memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // Isi email
    cy.get('input[placeholder="Email"]').type('testing@testing.com');

    // Klik tombol login tanpa mengisi password
    cy.get('button').contains(/^Login$/).click();

    // Memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window.alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // Isi email
    cy.get('input[placeholder="Email"]').type('testing@testing.com');

    // Isi password yang salah
    cy.get('input[placeholder="Password"]').type('wrongpassword');

    // Tekan tombol login
    cy.get('button').contains(/^Login$/).click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // Isi email
    cy.get('input[placeholder="Email"]').type('dicoding666@dicoding.org');

    // Isi password
    cy.get('input[placeholder="Password"]').type('dicoding');

    // Tekan tombol login
    cy.get('button').contains(/^Login$/).click();

    // Memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav').contains(/^Home$/).should('be.visible');
    cy.get('nav').contains(/^Leaderboard$/).should('be.visible');
    cy.get('button').contains(/^Logout$/).should('be.visible');
  });
});
