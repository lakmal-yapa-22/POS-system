export default class Item_modul {
    constructor(item_code, item_name, item_description, item_price,item_qty) {
        this._item_code = item_code;
        this._item_name = item_name;
        this._item_description = item_description;
        this._item_price = item_price;
        this._item_qty=item_qty;
    }

    // Getter for item_code
    get item_code() {
        return this._item_code;
    }

    // Setter for item_code
    set item_code(value) {
        this._item_code = value;
    }

    // Getter for item_name
    get item_name() {
        return this._item_name;
    }

    // Setter for item_name
    set item_name(value) {
        this._item_name = value;
    }

    // Getter for item_description
    get item_description() {
        return this._item_description;
    }

    // Setter for item_description
    set item_description(value) {
        this._item_description = value;
    }

    // Getter for item_price
    get item_price() {
        return this._item_price;
    }

    // Setter for item_price
    set item_price(value) {
        this._item_price = value;
    }

    // Getter for item_qty
    get item_qty() {
        return this._item_qty;
    }

    // Setter for item_qty
    set item_qty(value) {
        this._item_qty = value;
    }
}
