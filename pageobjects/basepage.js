// @ts-check

const { expect } = require("@playwright/test");

class BasePage {
    constructor(page){
        this.page = page;
    }

    checkThatItemsIsDisplayed = async (category) => {
        const itemFromCategoriesList = await this.page.locator('.list-group-item', {hasText: category});
        await itemFromCategoriesList.click();
        await this.page.waitForLoadState("networkidle");

        const itemsInChosenCategory = await this.page.locator('.col-lg-9 .col-lg-4');
        for (let i = 0; i < await itemsInChosenCategory.count(); i++){
            expect(await itemsInChosenCategory.nth(i)).toBeVisible();
        }
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