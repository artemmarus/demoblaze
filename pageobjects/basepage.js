// @ts-check

const { expect } = require("@playwright/test");

class BasePage {
    constructor(page){
        this.page = page;
    }

    checkThatItemsIsDisplayed = async (category) => {
        const itemFromCategoriesList = await this.page.locator('.list-group-item', {hasText: category});
        await itemFromCategoriesList.click();
        await this.page.waitForLoadState("load");

        const itemsInChosenCategory = await this.page.locator('.col-lg-9 .col-lg-4');
        for (let i = 0; i < await itemsInChosenCategory.count(); i++){
            expect(await itemsInChosenCategory.nth(i)).toBeVisible();
        }
    }

    addItemToTheCart = async () => {
        const itemFromCategoriesList = await this.page.locator('//div[@id="contcont"]//div[@id="tbodyid"]//a[contains(text(), "Samsung galaxy s6")]');
        await expect(itemFromCategoriesList).toBeVisible();
        await itemFromCategoriesList.click();
        
        await expect(this.page).toHaveURL('https://demoblaze.com/prod.html?idp_=1');

        const buttonToBuyItem = this.page.locator('//h2[contains(text(), "Samsung galaxy s6")]/..//a[contains(text(), "Add to cart")]');
        await buttonToBuyItem.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Product added');
            await dialog.accept();
        });
    }
    addItemToTheCart2 = async () => {
        await this.page.goto('https://demoblaze.com/')
        const itemFromCategoriesList = await this.page.locator('//div[@id="contcont"]//div[@id="tbodyid"]//a[contains(text(), "Samsung galaxy s7")]');
        await expect(itemFromCategoriesList).toBeVisible();
        await itemFromCategoriesList.click();
        
        await expect(this.page).toHaveURL('https://demoblaze.com/prod.html?idp_=4');

        const buttonToBuyItem = this.page.locator('//h2[contains(text(), "Samsung galaxy s7")]/..//a[contains(text(), "Add to cart")]');
        await buttonToBuyItem.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Product added');
            // await dialog.accept();
        });
    }

    deleteItemsFromTheCart = async () => {
        const itemCartInTheNav = await this.page.locator('//div[@class="navbar-collapse"]//a[contains(text(),"Cart")]');
        await itemCartInTheNav.click();
        expect(this.page).toHaveURL('https://demoblaze.com/cart.html');

        const itemsInTHeCart = await this.page.locator('//h2[contains(text(), "Products")]/..//tr[@class="success"]');
        for(let itemIndex = 0; itemIndex < itemsInTHeCart.count(); itemIndex++){
            await expect(itemsInTHeCart.nth(itemIndex)).toBeVisible();
        }

        const buttonToDeleteItemFromTheCart = await this.page.locator('//h2[contains(text(), "Products")]/..//a[contains(text(), "Delete")]');
        for(let buttonIndex = 0; buttonIndex < itemsInTHeCart.count(); buttonIndex++){
            await expect(buttonToDeleteItemFromTheCart.nth(buttonIndex)).toBeVisible();
            await (buttonToDeleteItemFromTheCart.nth(buttonIndex)).click();
        }

        await expect(itemsInTHeCart).not.toBeVisible();

    }


    // Not ready part
    clickButtonToChangePrevImage = async () => {
        const btnCarouselPrevImg = await this.page.locator('carousel-control-prev');
        btnCarouselPrevImg.click();
    }
    clickButtonToChangeNextImage = async () => {
        const btnCarouselNextImg = await this.page.locator('carousel-control-prev');
        btnCarouselNextImg.click();
    }

    checkThatCarouselInnerHaveImage = async () => {
        const carouselItem = await this.page.locator('.carousel-item img');
        console.log(carouselItem)
        // expect(await carouselItem.length).toBeGreaterThan(1);
        // for (let i = 0; i < await carouselItem.count(); i++){
        //     expect(await carouselItem.nth(i)).toBeVisible();
        // }
    }

}

module.exports = BasePage;