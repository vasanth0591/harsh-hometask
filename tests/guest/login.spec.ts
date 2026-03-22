import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import dotenv from "dotenv";

dotenv.config();

test.describe("Login functionalities", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/auth/login");
  });

  // TC-001
  test("Login with empty fields", async () => {
    await loginPage.login("", "");
    await expect(loginPage.emailError).toHaveText("Email is required");
    await expect(loginPage.passwordError).toHaveText("Password is required");
  });

  // TC-002
  test("Login with invalid email format", async () => {
    await loginPage.login("ksajcscn", "a,s,clj");
    await expect(loginPage.emailError).toHaveText("Email format is invalid");
  });

  // TC-002
  test("Login with invalid credentials", async () => {
    await loginPage.login("example@gmail.com", "password123");
    await expect(loginPage.loginError).toHaveText("Invalid email or password");
  });

  // TC-003
  test("Login with valid credentials", async () => {
    await loginPage.login(
      process.env.USER_USERNAME!,
      process.env.USER_PASSWORD!
    );
    await expect(loginPage.page).toHaveURL("/account");
  });
});