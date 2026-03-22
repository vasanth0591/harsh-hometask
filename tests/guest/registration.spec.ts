import { expect, test } from "@playwright/test";
import { DummyDataGenerator } from "../../utils/dummyDataGenerator";
import { RegistrationPage } from "../../pages/RegistrationPage";
import dotenv from "dotenv";

dotenv.config();

test.describe("Customer Registration Functionalities", () => {
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await page.goto("/auth/register");
    });

    async function fillForm(data: any) {
        await registrationPage.setFirstName(data.firstName);
        await registrationPage.setLastName(data.lastName);
        await registrationPage.setDOB(data.dob);
        await registrationPage.setStreet(data.street);
        await registrationPage.setPostalCode(data.postalCode);
        await registrationPage.setCity(data.city);
        await registrationPage.setState(data.state);
        await registrationPage.setCountry(data.country);
        await registrationPage.setPhone(data.phone);
        await registrationPage.setEmail(data.email);
        await registrationPage.setPassword(data.password);
    }

    // TC-004
    test("Register with empty fields", async () => {
        await registrationPage.submitButton.click();

        await expect(registrationPage.firstnameError).toHaveText(" First name is required ");
        await expect(registrationPage.lastnameError).toHaveText(" Last name is required ");
        await expect(registrationPage.dobError).toContainText(" Date of Birth is required");
        await expect(registrationPage.streetError).toHaveText(" Street is required ");
        await expect(registrationPage.postal_codeError).toHaveText(" Postcode is required ");
        await expect(registrationPage.cityError).toHaveText(" City is required ");
        await expect(registrationPage.stateError).toHaveText(" State is required ");
        await expect(registrationPage.countryError).toHaveText(" Country is required ");
        await expect(registrationPage.phoneError).toHaveText(" Phone is required. ");
        await expect(registrationPage.emailError).toHaveText(" Email is required ");
        await expect(registrationPage.passwordError).toContainText(" Password is required ");
    });

    // TC-005
    test("Register with an invalid password", async () => {
        const data = DummyDataGenerator.validData();
        data.password = "abc";

        await fillForm(data);
        await registrationPage.submitButton.click();

        await expect(registrationPage.passwordError).toBeVisible();
    });

    // TC-006
    test("Register with valid details", async () => {
        const data = DummyDataGenerator.validData();

        await fillForm(data);
        await registrationPage.submitButton.click();

        await expect(registrationPage.page).toHaveURL(/login/);
    });

    // TC-007
    test("Register with existing email", async ({ page, request }) => {
        const data = DummyDataGenerator.validData();
        data.email = process.env.USER_USERNAME!;

        await request.post("/api/register", { data });

        await fillForm(data);
        await registrationPage.submitButton.click();

        await expect(registrationPage.alertMessage).toContainText(/already/i);
        await expect(registrationPage.page).toHaveURL(/register/);
    });

    // TC-008
    test.fixme("Password strength updates dynamically", async () => {
        const barL = registrationPage.strengthBar;

        await expect(barL).toHaveCSS("width", "0px");
        await registrationPage.setPassword("A");
        await expect(barL).toHaveCSS("width", "20px");
        await registrationPage.setPassword("b");
        await expect(barL).toHaveCSS("width", "40%");
        await registrationPage.setPassword("#");
        await expect(barL).toHaveCSS("width", "60%");
        await registrationPage.setPassword("1");
        await expect(barL).toHaveCSS("width", "80%");
        await registrationPage.setPassword("kladf");
        await expect(barL).toHaveCSS("width", "100%");
    });
});