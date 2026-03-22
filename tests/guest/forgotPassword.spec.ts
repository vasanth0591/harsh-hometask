import {test, expect} from "@playwright/test";
import dotenv from "dotenv"

dotenv.config();

test.describe("Forgot Password Functionalities", ()=>{

    // TC-009
    test("Providing Unregistered email", async ({page})=>{
        await page.goto("/auth/forgot-password");
        await page.locator("#email").fill(process.env.USER_UNREGISTERED_USERNAME!);
        await page.locator(".btnSubmit").click();
        await expect(page.locator(".alert")).toBeVisible();
        await expect(page.locator(".alert-danger")).toBeVisible();
        expect(page.locator(".alert")).toContainText("The selected email is invalid")

    })

    // TC-010
    test("Providing Registered email", async ({ page }) => {
        await page.goto("/auth/forgot-password");
        await page.locator("#email").fill(process.env.USER_USERNAME!);
        await page.locator(".btnSubmit").click();
        await expect(page.locator(".alert")).toBeVisible();
        await expect(page.locator(".alert-success")).toBeVisible();
        expect(page.locator(".alert")).toContainText("Your password is successfully updated!")
    })
})