import {test, expect} from '@playwright/test';

//Declare the Constants that will be used:
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
//const ZIP = 'Zombie';
//const LAST_NAME = 'Nator';
//const PHONE = '1234567890';

test('TC-1 inicio de sesión valido', async ({page}) => {
    //Get into Website
    await page.goto("https://www.saucedemo.com");
    //Capture, Expect, and Validate URL
    const pageURL= page.url();
    console.log('Page URL is:', pageURL);
    await expect (page).toHaveURL("https://www.saucedemo.com");
    await page.close();

    //Add Username
    //await page.locator (#user-name);

    //get('input[name="username"]').type(`${USERNAME}`);
    //#user-name
    //Add Password
    //get('input[name="password"]').type(`${PASSWORD}`);
    //#password
    //Click Login


});


test('TC-2 Inicio de sesión contraseña incorrecta', async ({page}) => {

});


test('TC-3 Inicio de sesión Usuario no registrado', async ({page}) => {

});


test('TC-4 Inicio de sesión campos vacios', async ({page}) => {

});


test('TC-5 Cerrar sesión', async ({page}) => {

});


test('TC-6 Añadir Producto al Carrito', async ({page}) => {

});


test('TC-7 Añadir Producto al Carrito del detalle', async ({page}) => {

});


test('TC-8 Eliminar Producto del Carrito', async ({page}) => {

});


test('TC-9 Eliminar Producto del Carrito del detalle', async ({page}) => {

});


test('TC-10 Eliminar Producto del Carrito desde Carrito', async ({page}) => {

});


test('TC-11 Proceso de Checkout', async ({page}) => {

});


test('TC-12 Proceso de Checkout sin productos', async ({page}) => {

});