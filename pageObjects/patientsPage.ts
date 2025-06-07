import { Page, Locator, expect } from '@playwright/test';
import LoginPage from '../pageObjects/LoginPage';
const testData = JSON.parse(JSON.stringify(require("../testData/patient_data.json"))) 

export default class PatientsPage extends LoginPage {

    readonly page: Page;
    readonly patients_tab: Locator;
    readonly add_new_btn: Locator;
    readonly new_patient_btn: Locator;
    readonly first_name_locator: Locator;
    readonly last_name_locator: Locator;
    readonly date_of_birth_locator: Locator;
    readonly close_btn_locator: Locator;
    readonly gender_locator: Locator;
    readonly save_button_locator: Locator;
    readonly search_bar_locator: Locator;
    readonly table_data_first_locator: Locator;
    readonly table_data_values: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.patients_tab = page.locator('li');
        this.add_new_btn = page.getByRole('link', { name: 'Add New' })
        this.new_patient_btn = page.getByRole('button', { name: 'Start a Patient myself' })
        this.first_name_locator = page.locator('input#FirstName');
        this.last_name_locator = page.locator('input#LastName');
        this.date_of_birth_locator = page.locator('input#DateOfBirth');
        this.close_btn_locator = page.getByRole('button', { name: 'Close' });
        this.gender_locator = page.locator('select#gender-select');
        this.save_button_locator  = page.getByRole('button',{name: 'Save'});
        this.search_bar_locator = page.locator('input#searchBar');
        this.table_data_first_locator = page.locator('table#patientTable tr th a');
        this.table_data_values = page.locator('table#patientTable')

        
    }


   async generateTimeStamp(){
        return Math.floor(Date.now() / 1000);
    }

    async enterPatientFormDetails() {
       
        const timestamp =  await this.generateTimeStamp();
        const last_name = testData.LastName + timestamp
        await this.first_name_locator.fill(testData.FirstName);
        await this.last_name_locator.fill(last_name);
        await this.date_of_birth_locator.fill(testData.DateOfBirth);
        await this.last_name_locator.click();
        await this.gender_locator.selectOption(testData.Gender);
        return last_name;
    }

}