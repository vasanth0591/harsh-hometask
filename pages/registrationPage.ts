import { Page, Locator } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly streetInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryDropdown: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  readonly firstnameError: Locator;
  readonly lastnameError: Locator;
  readonly dobError: Locator;
  readonly streetError: Locator;
  readonly postal_codeError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly countryError: Locator;
  readonly phoneError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  readonly alertMessage: Locator;
  readonly strengthBar: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.locator("#first_name");
    this.lastNameInput = page.locator("#last_name");
    this.dobInput = page.locator("#dob");
    this.streetInput = page.locator("#street");
    this.postalCodeInput = page.locator("#postal_code");
    this.cityInput = page.locator("#city");
    this.stateInput = page.locator("#state");
    this.countryDropdown = page.locator("#country");
    this.phoneInput = page.locator("#phone");
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.submitButton = page.locator('[data-test="register-submit"]');

    this.firstnameError = page.locator('[data-test="first-name-error"]');
    this.lastnameError = page.locator('[data-test="last-name-error"]');
    this.dobError = page.locator('[data-test="dob-error"]');
    this.streetError = page.locator('[data-test="street-error"]');
    this.postal_codeError = page.locator('[data-test="postal_code-error"]');
    this.cityError = page.locator('[data-test="city-error"]');
    this.stateError = page.locator('[data-test="state-error"]');
    this.countryError = page.locator('[data-test="country-error"]');
    this.phoneError = page.locator('[data-test="phone-error"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');

    this.alertMessage = page.locator(".alert");
    this.strengthBar = page.locator(".strength-bar .fill");
  }

  async setFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async setLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async setDOB(dob: string) {
    await this.dobInput.fill(dob);
  }

  async setStreet(street: string) {
    await this.streetInput.fill(street);
  }

  async setPostalCode(postal_code: string) {
    await this.postalCodeInput.fill(postal_code);
  }

  async setCity(city: string) {
    await this.cityInput.fill(city);
  }

  async setState(state: string) {
    await this.stateInput.fill(state);
  }

  async setCountry(country: string) {
    await this.countryDropdown.selectOption(country);
  }

  async setPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async setEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async setPassword(password: string) {
    await this.passwordInput.fill(password);
  }
}