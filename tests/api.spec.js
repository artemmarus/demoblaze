// @ts-check
const {test, expect, request} = require('@playwright/test');
const items = require('../fixtures/items.json')

test.describe("demoblaze api", () => {
    test.only("should display all phones", async({request}) => {
        const response = await request.get("https://api.demoblaze.com/entries")
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseJson = await response.json()
        expect(responseJson).toEqual(items);
        expect(responseJson["Items"].length).toEqual(9);
    })
})