import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly cards: Locator;
    readonly navbar: Locator;
    readonly categoriesMenu: Locator;
    readonly categoryOptions: Locator;
    readonly homeButton: Locator;
    readonly languageDropdown: Locator;
    readonly languageOptions: Locator;
    readonly contactButton: Locator;
    readonly userMenu: Locator;
    readonly userMenuOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cards = page.locator(".card");
        this.navbar = page.locator(".navbar-nav");
        this.categoriesMenu = page.locator("[data-test='nav-categories']");
        this.categoryOptions = page.locator("[aria-label='nav-categories']>li");
        this.homeButton = page.locator("[data-test='nav-home']");
        this.languageDropdown = page.locator("#language");
        this.languageOptions = page.locator("#dropdown-animated>li");
        this.contactButton = page.locator('[data-test="nav-contact"]');
        this.userMenu = page.locator("[data-test='nav-menu']");
        this.userMenuOptions = page.locator("[aria-labelledby='menu']>li");
    }
}