import Customer_modul from "../models/Customer_modul.js";
import {customer_array, item_array} from "../db/database.js";

// Load Customer Table
const loadCustomerTable = () => {
    $('#customerTableBody').empty();
    customer_array.map((item) => {
        let data = `<tr><td>${item.cus_id}</td><td>${item.cus_name}</td><td>${item.cus_address}</td><td>${item.cus_salary}</td></tr>`;
        $("#customerTableBody").append(data);
    });
};

// Validate Customer ID Format
const validationId = (cus_id) => /^cus_\d{4}$/.test(cus_id);

// Add Customer Button
$("#customer_add_btn").on("click", function() {
    let cus_id = $('#customerId').val().trim();
    let cus_name = $('#customerName').val().trim();
    let cus_address = $('#customerAddress').val().trim();
    let cus_salary = parseFloat($('#customerSalary').val().trim());

    if (!validationId(cus_id)) {
        Swal.fire({
            title: "Invalid Customer ID",
            text: "Please enter a valid Customer ID.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    } else if (!cus_name) {
        Swal.fire({
            title: "Name Required",
            text: "Please enter your name.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    } else if (!cus_address) {
        Swal.fire({
            title: "Address Required",
            text: "Please enter your address.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    } else if (isNaN(cus_salary)) {
        Swal.fire({
            title: "Invalid Salary",
            text: "Please enter a valid salary amount.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'alert-title',
                content: 'alert-content'
            }
        });
    } else {
        let customer = new Customer_modul(cus_id, cus_name, cus_address, cus_salary);
        customer_array.push(customer);
        clearForm();
        loadCustomerTable();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Customer Saved Successfully!",
            text: "The customer details have been added.",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                title: 'success-title',
                content: 'success-content'
            }
        });
    }

});

// Clear Form Fields
const clearForm = () => {
    $('#customerId, #customerName, #customerAddress, #customerSalary').val("");
};

$('#customer_clear_btn').on('click', clearForm);

$('#customer_clear_search_clear').on('click', () => {
    $('#customer_search').val("");
    clearForm();
});
// Delete Customer
$('#customer_delete_btn').on("click", function() {
    let cus_id = $('#customerId').val().trim();

    // Find the index of the customer with the given ID
    const index = customer_array.findIndex(item => item.cus_id === cus_id);

    // Check if the item exists in the array
    if (index === -1) {
        clearForm();
        Swal.fire({
            title: "Item Not Found",
            text: "No customer found with the given ID.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return;
    }

    // Delete the customer
    customer_array.splice(index, 1);
    loadCustomerTable();
    clearForm();


    // Show success alert
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Deleted Successfully",
        text: "The customer has been removed from the list.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            title: 'success-title',
            content: 'success-content'
        }
    });

    // Clear the customer ID input field
    $('#customerId').val("");
});

// Search Customer
let search_selector;
$('#customer_search_btn').on('click', function() {
    let search = $('#customer_search').val().trim();
    let searchField = $('#customer_search_selector').val().trim();

    const index = customer_array.findIndex(customer => {
        switch (searchField) {
            case 'Customer ID':
                return customer.cus_id === search;
            case 'Name':
                return customer.cus_name === search;
            case 'Address':
                return customer.cus_address === search;
            case 'Salary':
                return customer.cus_salary === parseFloat(search);
            default:
                return false;
        }
    });

    if (index === -1) {
        // Show SweetAlert for customer not found
        Swal.fire({
            title: "Customer Not Found",
            text: "No customer found with the provided details.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return;
    }

    search_selector = index;
    let customer = customer_array[index];
    $('#customerId').val(customer.cus_id);
    $('#customerName').val(customer.cus_name);
    $('#customerAddress').val(customer.cus_address);
    $('#customerSalary').val(customer.cus_salary);
});

// Update Customer
$('#customer_update_btn').on('click', function() {
    let cus_id = $('#customerId').val().trim();
    let cus_name = $('#customerName').val().trim();
    let cus_address = $('#customerAddress').val().trim();
    let cus_salary = parseFloat($('#customerSalary').val().trim());

    // Validate input fields and show SweetAlerts instead of alerts
    if (!validationId(cus_id)) {
        Swal.fire({
            title: "Invalid Customer ID",
            text: "Customer ID format is incorrect. It should be in the format: cus_XXXX (e.g., cus_1234).",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else if (!cus_name) {
        Swal.fire({
            title: "Empty Field",
            text: "Customer name cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else if (!cus_address) {
        Swal.fire({
            title: "Empty Field",
            text: "Customer address cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else if (isNaN(cus_salary)) {
        Swal.fire({
            title: "Invalid Salary",
            text: "Customer salary must be a valid number.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
    } else {
        let updatedCustomer = new Customer_modul(cus_id, cus_name, cus_address, cus_salary);
        customer_array[search_selector] = updatedCustomer;
        loadCustomerTable();
        clearForm();

        // Show success alert
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Customer Updated Successfully",
            text: "The customer details have been updated.",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                title: 'success-title',
                content: 'success-content'
            }
        });
    }
});
