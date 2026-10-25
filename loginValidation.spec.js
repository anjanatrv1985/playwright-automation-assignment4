const { test, expect } = require('@playwright/test');

test('Test case 1',async({page})=>
{
    //Test Case 1: Empty Login Attempt
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.getByRole('button',{name:'Sign in'}).click();
    await expect(page.locator('.errorMessage')).toHaveText('Email and Password is required');

})

test('Test Case 2',async({page})=>
{   
    //Test Case 2: Login with Email Only
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.locator('#email1').fill('sibi@gmail.com');
    await page.getByRole('button',{name:'Sign in'}).click();
    await expect(page.locator('.errorMessage')).toHaveText('Password is required');

})

test('Test Case 3',async({page})=>
{   
    //Test Case 3: Login with Passowrd Only
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.locator('#password1').fill('sibi@gmail.com');
    await page.getByRole('button',{name:'Sign in'}).click();
    await expect(page.locator('.errorMessage')).toHaveText('Email is required');

})

test('Test Case 4',async({page})=>
{   
    //Test Case 4: Login with invalid credentials
    await page.goto('https://freelance-learn-automation.vercel.app/login');
    await page.locator('#email1').fill('sibi@gmail.com');
    await page.locator('#password1').fill('sibi@gmail.com');
    await page.getByRole('button',{name:'Sign in'}).click();
    await expect(page.locator('.errorMessage')).toHaveText(/USER Email Doesn't Exist/i);

})

    
