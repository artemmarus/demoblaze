// @ts-check
const {expect} = require("@playwright/test");
const HomePage = require("./basepage");

class UserModalIcons extends HomePage {
    constructor(page){
       super(page);
    }

    // methods to open different icons in the nav
    openUserModalIcon = async (userModalIconSelector) => {
        const itemInNavBar = await this.page.locator(userModalIconSelector);
        await itemInNavBar.click();
        await this.page.waitForLoadState("networkidle");

        switch(await userModalIconSelector){
            case "#signin2" :
                await expect( await this.page.locator('#signInModalLabel') ).toBeVisible();
                break;

            case "#login2" :
                await expect( await this.page.locator('#logInModalLabel') ).toBeVisible();
                break;

            case "[data-target=#exampleModal]":
                await expect( await this.page.locator('#exampleModalLabel') ).toBeVisible();
                break;

            case "[data-target=#videoModal]":
                await expect( await this.page.locator('#videoModalLabel') ).toBeVisible();
                break;
        }
    }

    closeUserModalIcon = async () => {
        // const btnToCloseIcon = await this.page.locator(".close");
        // await btnToCloseIcon.click();
        const buttonToCloseIcon = await this.page.locator('[data-dismiss="modal"]', { hasText: "Close"});
        await buttonToCloseIcon.click();
    }

    submitUserModalIcon = async (headerModalIconSelector) => {
        const headerModalIcon = await this.page.locator(headerModalIconSelector);
        await expect(headerModalIcon).toBeVisible();
        
        switch(headerModalIconSelector){
            case '#signInModalLabel' :
                await (await this.page.locator('.btn-primary', { hasText: 'Sign up'})).click();
                break;
            case '#logInModalLabel' :
                await (await this.page.locator('.btn-primary', { hasText: 'Log in'})).click();
                break;
            case '#exampleModalLabel' :
                await (await this.page.locator('.btn-primary', { hasText: 'Send message'})).click();
                break;
            case '#videoModalLabel' :
                await (await this.page.locator('[data-dismiss="modal"]', { hasText: "Close"})).click();
                break;
        }
    }
}

module.exports = UserModalIcons