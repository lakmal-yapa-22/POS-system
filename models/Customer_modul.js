export default class Customer_modul {
    constructor(cus_id, cus_name, cus_address, cus_salary) {
        this._cus_id = cus_id;
        this._cus_name =  cus_name;
        this._cus_address =  cus_address;
        this._cus_salary =  cus_salary;
    }

    // Getter and Setter for ID
    get cus_id() {
        return this._cus_id;
    }

    set cus_id(value) {
        this._cus_id = value;
    }

    // Getter and Setter for Name
    get cus_name() {
        return this._cus_name;
    }

    set cus_name(value) {
        this._cus_name = value;
    }

    // Getter and Setter for Address
    get cus_address() {
        return this._cus_address;
    }

    set cus_address(value) {
        this._cus_address =value;
    }

    // Getter and Setter for Salary
    get cus_salary() {
        return this._cus_salary;
    }

    set cus_salary(value) {
        this._cus_salary =value;
    }
}
