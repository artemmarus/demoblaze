// @ts-check
const { expect } = require("@playwright/test");
const userJson = require('../fixtures/users.json');

class BasePage {
    constructor(page){
        this.page = page;
    }

    checkThatItemsIsDisplayed = async (category) => { 
        // shows items in chosen category: phones, laptops, monitors
        // then check that this items had been displayed 
        const categoryFromList = await this.page.locator('.list-group-item', {hasText: category});
        await categoryFromList.click();
        await this.page.waitForLoadState("load");

        const itemsInChosenCategory = await this.page.locator('.col-lg-9 .col-lg-4');
        for (let i = 0; i < await itemsInChosenCategory.count(); i++){
            expect(await itemsInChosenCategory.nth(i)).toBeVisible();
        }
    }

    addItemToTheCart = async () => {
        // add some item to the cart
        const itemInChosenCategory = await this.page.locator('//div[@id="contcont"]//div[@id="tbodyid"]//a[contains(text(), "Samsung galaxy s6")]');
        await expect(itemInChosenCategory).toBeVisible();
        await itemInChosenCategory.click();
        
        await expect(this.page).toHaveURL('https://demoblaze.com/prod.html?idp_=1');

        const buttonToBuyItem = this.page.locator('//h2[contains(text(), "Samsung galaxy s6")]/..//a[contains(text(), "Add to cart")]');
        await buttonToBuyItem.click();

        this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Product added');
            await dialog.accept();
        });
    }

    deleteItemsFromTheCart = async () => {
        // open cart, then find button "Delete" and delete item from the cart
        const itemCartInTheNav = await this.page.locator('//div[@class="navbar-collapse"]//a[contains(text(),"Cart")]');
        await itemCartInTheNav.click();
        expect(this.page).toHaveURL('https://demoblaze.com/cart.html');

        const itemsInTheCart = await this.page.locator('//h2[contains(text(), "Products")]/..//tr[@class="success"]');
        for(let itemIndex = 0; itemIndex < itemsInTheCart.count(); itemIndex++){
            await expect(itemsInTheCart.nth(itemIndex)).toBeVisible();
        }

        const buttonToDeleteItemFromTheCart = await this.page.locator('//h2[contains(text(), "Products")]/..//a[contains(text(), "Delete")]');
        for(let buttonIndex = 0; buttonIndex < itemsInTheCart.count(); buttonIndex++){
            await expect(buttonToDeleteItemFromTheCart.nth(buttonIndex)).toBeVisible();
            await (buttonToDeleteItemFromTheCart.nth(buttonIndex)).click();
        }
        await expect(itemsInTheCart).not.toBeVisible();

    }

    createOrderWithItems = async () => {
        const itemCartInTheNav = await this.page.locator('//div[@class="navbar-collapse"]//a[contains(text(),"Cart")]');
        await itemCartInTheNav.click();
         expect(this.page).toHaveURL('https://demoblaze.com/cart.html');

         const buttonPlaceOrder = await this.page.locator('//button[contains(text(), "Place Order")]');
         await buttonPlaceOrder.click();

         await expect(await this.page.locator('//h5[@id="orderModalLabel"]/../../../div')).toBeVisible();
        // check that all fields have been displayed and have own values  
         const fieldForName = await this.page.locator('//h5[@id="orderModalLabel"]/../..//input[@id="name"]');
         await fieldForName.fill(userJson.name);
         await expect(fieldForName).toHaveValue(userJson.name);

         const fieldForCountry = await this.page.locator('//h5[@id="orderModalLabel"]/../..//input[@id="country"]');
         await fieldForCountry.fill(userJson.country);
         await expect(fieldForCountry).toHaveValue(userJson.country);

         const fieldForCity = await this.page.locator('//h5[@id="orderModalLabel"]/../..//input[@id="city"]');
         await fieldForCity.fill(userJson.city);
         await expect(fieldForCity).toHaveValue(userJson.city);

         const fieldForCreditCard = await this.page.locator('//h5[@id="orderModalLabel"]/../..//input[@id="card"]');
         await fieldForCreditCard.fill(userJson.creditCart);
         await expect(fieldForCreditCard).toHaveValue(userJson.creditCart);

         const fieldForMonth = await this.page.locator('//h5[@id="orderModalLabel"]/../..//input[@id="month"]');
         await fieldForMonth.fill(userJson.year);
         await expect(fieldForMonth).toHaveValue(userJson.year);

         const fieldForYear = await this.page.locator('//h5[@id="orderModalLabel"]/../..//input[@id="year"]');
         await fieldForYear.fill(userJson.month);
         await expect(fieldForYear).toHaveValue(userJson.month);

         const buttonPurchase = await this.page.locator('//h5[@id="orderModalLabel"]/../..//button[contains(text(), "Purchase")]');
         await buttonPurchase.click();
         
         const orderIcon = await this.page.locator('//h2[contains(text(), "Thank you for your purchase!")]/..')
         await expect(orderIcon).toBeVisible();

         const orderDescription = await this.page.locator('//h2[contains(text(), "Thank you for your purchase!")]/../p');
        
         await expect(orderDescription).toBeVisible();
        }

    openContactModalIcon = async () => {
        const itemContactInTheNav = await this.page.locator('//div[@id="navbarExample"]//a[contains(text(), "Contact")]');
        await itemContactInTheNav.click();

        const modalIconContact = await this.page.locator('//div[@id="exampleModal"]//div[@class="modal-content"]');
        await expect(modalIconContact).toBeVisible();
    }

    sendMessageToContact = async () => {
        const fieldForUserName = await this.page.locator('//input[@id="recipient-email"]');
        await fieldForUserName.fill(userJson.login);

        const fieldForContactName = await this.page.locator('//input[@id="recipient-name"]');
        await fieldForContactName.fill(userJson.name);

        const fieldForMessage = await this.page.locator('//textarea[@id="message-text"]')
        await fieldForMessage.fill(userJson.message);

        const buttonToSendMessage = await this.page.locator('//div[@id="exampleModal"]//button[contains(text(), "Send message")]');
        await buttonToSendMessage.click();

         this.page.on('dialog', async (dialog) => {
            await expect(await dialog.type()).toContain('alert');
            await expect(await dialog.message()).toContain('Thanks for the message!!');
            await dialog.accept();
        });
    }

    checkInfoModalIcon = async () => {
        const itemAboutUsInTheNav = await this.page.locator('//div[@id="navbarExample"]//a[contains(text(), "About us")]');
        await itemAboutUsInTheNav.click();

        const aboutUsModalIcon = await this.page.locator('//div[@id="videoModal"]//div[@class="modal-content"]');
        await expect(aboutUsModalIcon).toBeVisible();

        const buttonPlayVideo = await this.page.locator('//div[@id="videoModal"]//button[@title="Play Video"]');
        await buttonPlayVideo.click();

        const btnToCloseModalIcon = await this.page.locator('//h5[@id="videoModalLabel"]/../..//button[contains(text(), "Close")]');
        await btnToCloseModalIcon.click();
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