import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { HomePage } from "../../pages/homePage";

test.describe("Homepage and Navigation Functionalities", () => {

    // TC-011
    test("View homepage using screenshot", async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto("");
        await expect(homePage.cards.first()).toBeVisible();
        await expect(page).toHaveScreenshot("screenshots/homepage.png");
    });

    // TC-012
    test("Access navigation menu", async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto("");
        await expect(homePage.navbar).toBeVisible();
    });

    // TC-013
    test("Navigate to product categories from menu", async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto("");

        await homePage.categoriesMenu.click();
        const options = await homePage.categoryOptions.all();

        for (let option of options) {
            if (await option.innerText() === "") {
                continue;
            }

            await option.click();
            expect(page).toHaveURL(await option.locator("a").getAttribute("href") as string);

            await homePage.homeButton.click();
            await homePage.categoriesMenu.click();
        }
    });

    // TC-014
    test("Navigate to Language from menu", async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto("");
        await homePage.languageDropdown.click();

        const languages = await homePage.languageOptions.all();
        expect(languages.length).toBe(6);
    });

    // TC-015
    test("Access user account menu", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await page.goto("/auth/login");
        await loginPage.login(process.env.USER_USERNAME!, process.env.USER_PASSWORD!);
        await expect(loginPage.page).toHaveURL("/account");

        await homePage.userMenu.click();
        const options = await homePage.userMenuOptions.all();

        for (let option of options) {
            if (
                (await option.innerText()) === "" ||
                (await option.innerText()) === "Sign out"
            ) {
                continue;
            }

            await option.click();
            await loginPage.page.waitForLoadState();

            expect(page).toHaveURL(await option.locator("a").getAttribute("href") as string);

            await homePage.homeButton.click();
            await homePage.userMenu.click();
        }
    });

    // TC-016
    test("Contact Us", async ({ page }) => {
        const homePage = new HomePage(page);

        await page.goto("");
        await homePage.contactButton.click();

        await expect(page).toHaveURL("/contact");
    });
});