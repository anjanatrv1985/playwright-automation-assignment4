const { test,expect } = require("@playwright/test");

test('Flight Purchase',async({page})=>
{
    //Step 1: Open the BlazeDemo Website
    await page.goto('https://blazedemo.com/');
    await page.selectOption('select[name="fromPort"]','Boston');
    await expect(page.locator('select[name="fromPort"]')).toHaveValue('Boston');
    await page.selectOption('select[name="toPort"]','New York');
    await expect(page.locator('select[name="toPort"]')).toHaveValue('New York');
    await page.getByRole('button',{name:'Find Flights'}).click();
 
    //Step 2: Select a Flight
    const luftansa= page.getByRole('row').filter({hasText:'Lufthansa'});
    await expect()
    await luftansa.getByRole('button',{name:'Choose This Flight'}).click();
    
    //Step 3: Verify the Purchase Page
    await expect(page).toHaveURL(/purchase/);
    await expect(page).toHaveTitle(/purchase/i);

    //Step 4: Verify Flight Details
    await expect.soft(page.locator('p',{hasText:"Airline"})).toContainText("Airline: United");
    await expect.soft(page.locator('p',{hasText:"Flight Number"})).toContainText("Flight Number: UA954");
    await expect.soft(page.locator('p',{hasText:"Price"})).toContainText("Price: 400");
    await expect.soft(page.locator('p',{hasText:"Arbitrary Fees and Taxes"})).toContainText("Arbitrary Fees and Taxes: 514.76");
    await expect.soft(page.locator('p',{hasText:"Total Cost: "})).toContainText("Total Cost: 914.76");


    //Step 5: Fill in the Passenger and Payment Details
    await page.fill('#inputName','Playwright JS');
    await page.fill('#address','Bangalore');
   // await page.fill('#city','Karnataka');
    await page.fill('#state','Karnataka');
   // await page.fill('#zipCode','')
   await page.selectOption('#cardType',{label:'American Express'});
   await page.fill('#creditCardNumber','556622337788');
   await page.fill('#creditCardYear','2025');
   await page.fill('#nameOnCard','Playwright By Microsoft')

   await expect(page.locator('#inputName')).toHaveValue('Playwright JS');
   await expect(page.locator('#address')).toHaveValue('Bangalore');
   await expect(page.locator('#state')).toHaveValue('Karnataka');
   await expect(page.locator('#cardType')).toHaveValue('amex');
   await expect(page.locator('#creditCardNumber')).toHaveValue('556622337788');
   await expect(page.locator('#creditCardYear')).toHaveValue('2025');
   await expect(page.locator('#nameOnCard')).toHaveValue('Playwright By Microsoft');

   //Step 6: Verify the Remember Me Checkbox
   const rememberme=page.locator('#rememberMe');
   await rememberme.click();
   await expect(rememberme).toBeChecked();

   //Step 7: Purchase the Flight
   await page.getByRole('button',{name:'Purchase Flight'}).click();
   await expect(page).toHaveURL(/confirmation/i);

   //Step 8: Verify the Confirmation Page
   const OrderID=await page.locator('td').nth(1).textContent();
   expect (OrderID).not.toBeNull();
   expect (OrderID.trim()).not.toBe('');
   console.log('Generated Order ID:',OrderID);
})