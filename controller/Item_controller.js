import Item_modul from "../models/Item_modul.js";

import {item_array} from "../db/database.js";


// loard item

const loadItemTable = () => {
$('#itemTableBody').empty();
item_array.map((item,) =>{

    let data=`<tr><td>${item.item_code}</td><td>${item.item_name}</td><td>${item.item_description}</td><td>${item.item_price}</td><td>${item.item_qty}</td></tr>`
    $("#itemTableBody").append(data);

})
}

// Add Item
$("#item_add_btn").on("click", function() {
    // Assuming item_code is auto-generated, remove the input field for it
    let item_name = $('#saveItemNameField').val().trim();
    let item_description = $('#saveItemDescriptionField').val().trim();
    let item_price = parseFloat($('#saveItemPriceField').val().trim());
    let item_qty = parseInt($('#saveItemQtyField').val().trim());

    // Validate input fields
    if (!item_name) {
        Swal.fire({
            title: "Empty Field",
            text: "Item name cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    } else if (!item_description) {
        Swal.fire({
            title: "Empty Field",
            text: "Item description cannot be empty.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    } else if (isNaN(item_price) || item_price <= 0) {
        Swal.fire({
            title: "Invalid Price",
            text: "Item price must be a valid number greater than zero.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    } else if (isNaN(item_qty) || item_qty < 0) {
        Swal.fire({
            title: "Invalid Quantity",
            text: "Item quantity must be a valid number greater than or equal to zero.",
            icon: "error",
            showCloseButton: true,
            confirmButtonText: "OK",
            customClass: {
                title: 'error-title',
                content: 'error-content'
            }
        });
        return; // Exit if validation fails
    }

    // Auto-generate item code
    let item_code = generateItemCode(); // Implement this function to generate a unique item code

    // Create the item and push to the array
    let item = new Item_modul(item_code, item_name, item_description, item_price, item_qty);
    item_array.push(item);

    loadItemTable();
    cleanForm();

    // Show success alert
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Added Successfully",
        text: "The item has been added to the list.",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            title: 'success-title',
            content: 'success-content'
        }
    });
});

// Function to generate a unique item code
function generateItemCode() {
    // Example: Generate a code like 'item_0001', 'item_0002', etc.
    const prefix = "item_";
    const count = item_array.length + 1; // Assuming item_array holds all the items
    const paddedCount = count.toString().padStart(4, '0'); // Pad with leading zeros
    return prefix + paddedCount;
}


// clear
$("#btn_clear_item").on('click',function (){

    cleanForm();


});

//clear
const cleanForm=()=>{


    $('#saveItemIdField').val("");
    $("#saveItemNameField").val("");
    $("#saveItemDescriptionField").val("");
    $("#saveItemPriceField").val("");
    $("#saveItemQtyField").val("")
}






// Load Item Search Table
const loadItem_searchTable = (items) => {
    $('#item_searchTableBody').empty();
    items.forEach(item => {
        let data = `<tr>
                        <td>${item.item_code}</td>
                        <td>${item.item_name}</td>
                        <td>${item.item_description}</td>
                        <td>${item.item_price}</td>
                        <td>${item.item_qty}</td>
                    </tr>`;
        $("#item_searchTableBody").append(data);
    });
};

let search;
let filteredItems;

// Search button click event
$('#btn_search').on('click', function () {
    search = $('#input-search').val().trim();
    let searchField = $('#cmbSearchBy').val();

    filteredItems = item_array.filter(item => {
        switch (searchField) {
            case 'Item Code':
                return item.item_code === search;
            case 'Name':
                return item.item_name === search;
            default:
                return false;
        }
    });

    if (filteredItems.length === 0) {
        Swal.fire({
            title: "Item Not Found",
            text: "No items match your search criteria.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }
    $('#table-display').show();
    loadItem_searchTable(filteredItems);
});

// Clear button functionality
$("#btn_clear_item_first").on('click', function () {
    $('#input-search').val("");
    $('#cmbSearchBy').val("");
    $('#table-display').css('display', 'none');
});

// Update item on button click
$("#btn_update_item").on('click', function () {
    let item_code = $('#updateItemIdField').val().trim();

    const index = item_array.findIndex(item => item.item_code === item_code);

    // Check if item exists in the array
    if (index === -1) {
        cleanForm_update();
        Swal.fire({
            title: "Item Not Found",
            text: "The item with the given code does not exist.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    // Retrieve the original item from the array
    let updatedItem = { ...item_array[index] }; // Copy current item data

    // Update only the fields that have a value
    let item_name = $('#updateItemNameField').val().trim();
    if (item_name) updatedItem.item_name = item_name;

    let item_description = $('#updateItemDescriptionField').val().trim();
    if (item_description) updatedItem.item_description = item_description;

    let item_price = $('#updateItemPriceField').val().trim();
    if (item_price) {
        const priceValue = parseFloat(item_price);
        if (isNaN(priceValue) || priceValue <= 0) {
            Swal.fire({
                title: "Invalid Price",
                text: "Please enter a valid price greater than zero.",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
        updatedItem.item_price = priceValue;
    }

    let item_qty = $('#updateItemQtyField').val().trim();
    if (item_qty) {
        const qtyValue = parseInt(item_qty);
        if (isNaN(qtyValue) || qtyValue < 0) {
            Swal.fire({
                title: "Invalid Quantity",
                text: "Please enter a valid quantity (0 or more).",
                icon: "warning",
                confirmButtonText: "OK"
            });
            return;
        }
        updatedItem.item_qty = qtyValue;
    }

    // Update the item in the array at the found index
    item_array[index] = updatedItem;

    // Reload the item table with updated data
    loadItemTable();
    cleanForm_update();
    Swal.fire({
        title: "Item Updated Successfully",
        text: "The item has been updated in the list.",
        icon: "success",
        confirmButtonText: "OK"
    });
});

//clear update
const cleanForm_update=()=>{


    $('#updateItemIdField').val("");
    $("#updateItemNameField").val("");
    $("#updateItemDescriptionField").val("");
    $("#updateItemPriceField").val("");
    $("#updateItemQtyField").val("")
}
// Delete Item
$('#btn_delete_item').on('click', function () {
    let item_code = $('#deleteItemIdField').val().trim();

    const index = item_array.findIndex(item => item.item_code === item_code);

    // Check if item exists in the array
    if (index === -1) {
        cleanForm_update();
        Swal.fire({
            title: "Item Not Found",
            text: "The item with the given code does not exist.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    // Confirm deletion
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            item_array.splice(index, 1);
            loadItemTable();
            cleanForm();
            Swal.fire({
                title: "Deleted!",
                text: "The item has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK"
            });
            $('#deleteItemIdField').val("");
        }
    });
});
