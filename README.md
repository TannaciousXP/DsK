# DsK Tech Challenge

Task to use an API endpoint for the following product IDS 143249,142593,141975,150605. Can enter one id or multiple separated by a comma.

Pictures and logo are from DsK website.

## To Run

Open up the index.html in the browser.

### Notes

**Funcs:**

Functions that relates to the DOM are in scripts.js. Functions that don't relate to the DOM are in helperFuncs.js

**Input:**

The input field for ids is only accepts [0-9] and comma

It will only type out **_6 numbers or (numsPressed % 6 === 0)_**, after that it will preventDefault until you use a comma.

**Fetch Request:**

Currently, for the ids provided they all have 0 stock so I included some dummy data for the sorting button.

Please refer to scripts.js ln 232 - 278 and uncomment SIMILATE for the sort btns and comment out the FETECH

**Libraries and Frameworks:**

None, I decided to use vanilla JS, HTML, and CSS because I believe this will best display my capabilities.

### Tasks

- [x] After submitting the form the user should be able to see all the existent sizes for that product(s) classified in 2 groups: in stock (qty > 0) and out of stock (qty = 0).

- [x]  Also make sure to list the available quantity for each size in front of the size.

- [x] The form should also work with a collection of products, i.e 143249,142593,141975,150605 instead of one single id and should produce the same result for each product.

- [x] The sizes must be shown sorted by quantity. Also add an option so the user can sort the sizes on ascending and descending order based on the quantity.

- [x] The user should be able to submit the form by hitting a submit button and by hitting the enter key on the input field.

- [x] Make sure that the form validates the type of data entered. Your function should only accept integer numbers for product id’s.

- [x] Also it’s important that the web form and listed results are easy for the user to see on any type of device including smartphones.
