const { test,expect } = require("@playwright/test");

test('loginLogout',async({page})=>
    {   
        await page.goto('https://www.saucedemo.com/v1/index.html');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.getByRole('button',{name:'Login'}).click();
        await expect(page).toHaveURL(/inventory.html/);
        await page.locator('#react-burger-menu-btn').click();
        await page.locator('#logout_sidebar_link').click();
        await expect(page).toHaveURL(/demo/);
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();

    })