import { test, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
import PatientsPage from '../pageObjects/patientsPage';
const testData = JSON.parse(JSON.stringify(require("../testData/patient_data.json")))

let patientPage: PatientsPage;

test.use({ storageState: 'playwright-auth.json' });

test.beforeEach('Setup Suite', async ({ page }) => {

    patientPage = new PatientsPage(page);
    await page.goto('https://forms.okrxapp.ca/16b5660a-0386-4d84-b324-61685071d644/FormInstance');
})
test.skip('Validate the Form Instance Page is Displayed', async ({ page }) => {


    await expect(page.locator('h2')).toHaveText('Forms');

});

test('Create a new Patient and Verify Patient Details is Displayed', async ({ page }) => {


    await expect(page.locator('h2')).toHaveText('Forms');
    await patientPage.patients_tab.filter({ hasText: 'Patients' }).first().click();
    await patientPage.add_new_btn.isVisible();
    await patientPage.add_new_btn.click();
    await patientPage.new_patient_btn.click();
    const last_name = await patientPage.enterPatientFormDetails();
    await patientPage.save_button_locator.click();
    await patientPage.search_bar_locator.fill(last_name);
    await patientPage.search_bar_locator.press('Enter');
    await expect(page.locator('table#patientTable').getByRole('row')).toHaveCount(1);
    const patient_table_data = await patientPage.table_data_first_locator.innerText();
    expect(patient_table_data).toBe(testData.FirstName);
    expect(patient_table_data).toBe(testData.LastName);
    expect(patient_table_data).toBe(testData.DateOfBirth);
    expect(patient_table_data).toBe(testData.Email);


})

test('Edit Patient Details', async ({ page }) => {

    const timestamp = await patientPage.generateTimeStamp();
    console.log(timestamp);
    await patientPage.patients_tab.filter({ hasText: 'Patients' }).first().click();
    await patientPage.search_bar_locator.fill(testData.LastName);
    await patientPage.search_bar_locator.press('Enter');
    await page.getByRole('link', { name: 'View' }).first().click();
    await page.getByRole('link', { name: 'Edit Patient' }).click();
    await patientPage.last_name_locator.clear();
    await patientPage.last_name_locator.fill(testData.LastName + timestamp);;
    await patientPage.save_button_locator.click();
    const patient_table_data = await patientPage.table_data_first_locator.innerText();
    expect(patient_table_data).toBe(testData.FirstName);
    expect(patient_table_data).toBe(testData.LastName + timestamp);
    expect(patient_table_data).toBe(testData.DateOfBirth);
    expect(patient_table_data).toBe(testData.Email);

})

test('Change Theme to Dark and Verify', async ({ page }) => {

    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByText('Dark').click();
    await page.locator('button[aria-label="Close"]').last().click();
    expect(await page.locator("input#theme-mode-dark+span").innerText()).toBe('Dark');


})

test('Change Theme to Light and Verify', async ({ page }) => {

    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByText('Light').click();
    await page.locator('button[aria-label="Close"]').last().click();
    expect(await page.locator("input#theme-mode-dark+span").innerText()).toBe('Light');


})


test.afterEach('tear down', async ({ page }) => {

    await page.close();
})


