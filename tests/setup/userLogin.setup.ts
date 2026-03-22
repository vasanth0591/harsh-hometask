import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import dotenv from "dotenv";

dotenv.config();

setup("Setup User Login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("/auth/login");
    await loginPage.login(
        process.env.USER_USERNAME!,
        process.env.USER_PASSWORD!
    );

    await expect(loginPage.page).toHaveURL("/account");

    await page.context().storageState({
        path: ".auth/userLogin.json",
    });
});