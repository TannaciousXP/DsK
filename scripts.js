const dummyData = {
  "141975": [
    {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "141989",
      "color_id": "3564",
      "color_text": "BLUE",
      "size_id": "3392",
      "size_text": "ONE SIZE",
      "quantity": 0,
      "display_brand": "3 AM Imports"
    },
    {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "141989",
      "color_id": "3564",
      "color_text": "BLUE",
      "size_id": "3392",
      "size_text": "Small",
      "quantity": 3,
      "display_brand": "3 AM Imports"
    },
    {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "141989",
      "color_id": "3564",
      "color_text": "BLUE",
      "size_id": "3392",
      "size_text": "Large",
      "quantity": 10,
      "display_brand": "3 AM Imports"
    }
  ],
  "142593": {
    "1": {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "142605",
      "color_id": "3563",
      "color_text": "BLUE",
      "size_id": "158",
      "size_text": "ONE SIZE",
      "quantity": 0,
      "display_brand": "Leg Avenue"
    }
  },
  "143249": {
    "3": {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "143257",
      "color_id": "3563",
      "color_text": "BLUE",
      "size_id": "2898",
      "size_text": "Small",
      "quantity": 0,
      "display_brand": "Leg Avenue"
    },
    "4": {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "143258",
      "color_id": "3563",
      "color_text": "BLUE",
      "size_id": "2901",
      "size_text": "Medium",
      "quantity": 0,
      "display_brand": "Leg Avenue"
    },
    "5": {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "143259",
      "color_id": "3563",
      "color_text": "BLUE",
      "size_id": "2904",
      "size_text": "Large",
      "quantity": 0,
      "display_brand": "Leg Avenue"
    }
  },
  "150605": {
    "2": {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "150619",
      "color_id": "3563",
      "color_text": "BLUE",
      "size_id": "158",
      "size_text": "ONE SIZE",
      "quantity": 1,
      "display_brand": "In Your Dreams"
    },
    "8": {
      "amlabel_image": "",
      "amlabel_width": "",
      "amlabel_height": "",
      "simple_id": "150619",
      "color_id": "3563",
      "color_text": "BLUE",
      "size_id": "158",
      "size_text": "Small",
      "quantity": 3,
      "display_brand": "In Your Dreams"
    }
  }
}

const URL = `https://www.dollskill.com/codetest/api.php?ids=143249,142593,141975,150605&op=get_size_attributes`;

const d = document;
// const addBtn = d.querySelector('[name=add]');
// Form's elements
const searchBtn = d.querySelector('[name=search]');
const form = d.querySelector('.inquire');
const inputIds = d.querySelector('input[name=ids]');
const contents = d.querySelectorAll('article.content');

// Keep track of num strs
let numsPressed = 0;
// Allow to type
let canType = true;
// Track window.getSelection.toString();
let selection = '';
// Track last character pressed
let prevChar;
// Track the last character in inputIds.value
let lastChar;

// Information coming backing
let outOfStock = [];
let inStock = [];

// Create Li with reusability
function createLi (liInfo, idx, isInStock, isNewUl = true, currBtn = null) {
  const { id, sizes, name } = liInfo;
  // Default btnName ascend
  let btnName = 'ascend';
  let liOrUl;

  // Checks to see it needs to add the ul element or not, default true
  if (!isNewUl) {
    // Get the currBtn name
    btnName = currBtn.name
    // Get all the buttons
    const [ascendBtn, descend] = d.querySelectorAll(`button[data-info="${id} ${idx}"]`);
    // Sort the sizes by ascending or descending
    currBtn.name === 'ascend' ? sizes.sort(ascendBySize) : sizes.sort(descendBySize);
  }

  // Make the list with the information
  const listOfItems = sizes.map((size, i) => {
    return `<li>${size[0]} ${size[1]}</li>`
  }).join('');

  // Create the buttons
  const buttons = `<div class="btns">
                    <button onclick="sortLi(event)" value="${btnName}" name="ascend" data-info="${id} ${idx}" class="sort-btn">↑</button>
                    <button onclick="sortLi(event)" value="${btnName}" name="descend" data-info="${id} ${idx}" class="sort-btn">↓</button>
                  </div> `;

  // Checks isNewUl
  if (isNewUl) {
    // Include ul
    liOrUl =  `
                <ul class="id-info" data-id="${id}">
                  <div class="sort">
                    <p class="id">ID: ${id}</p>
                    ${isInStock ? buttons : ''}
                  </div>
                  <hr class="breaker">
                  <li class="name">Brand: ${name}</li>
                  ${listOfItems}
                </ul>
              `
  } else {
    // Exclude ul
    liOrUl = `        
              <div class="sort">
                <p class="id">ID: ${id}</p>
                ${buttons}
              </div>
              <hr class="breaker">
              <li class="name">Brand: ${name}</li>
              ${listOfItems}
            `
  }
  return liOrUl;
}

// Sort Li
function sortLi(e) {
  // Grab currBtn
  const currBtn = e.target;
  // Only sort if the value and name don't match
  if (currBtn.value !== currBtn.name) {
    // Grab the info from dataset
    let info = (currBtn.dataset.info).split(' ');
    // Split it up into id and idx
    const currIdInfo = inStock[parseInt(info[1])];
    // Pass in the nescessary info
    const newLi = createLi(currIdInfo, info[1], true, false, currBtn);

    const stockInUl = d.querySelector(`.content.in .id-info[data-id="${info[0]}"]`);
    stockInUl.innerHTML = newLi;
  }
}

// render Search info that takes in either out of stock
function renderInfo(stockInfoArr, isInStock) {
  const stockDiv = d.querySelector(`${isInStock ? '.stock.in .info-list' : '.stock.out .info-list'}`)
  const infoArrCopy = stockInfoArr
    .slice()
    .map((stockInfo, i) => {
      return createLi(stockInfo, i, isInStock);
    }).join('');

  stockDiv.innerHTML = infoArrCopy;
}

// Search sizes logic
function searchSizes(e) {
  e.preventDefault();
  // Checks to see if there is 6 numbers to search
  if (numsPressed % 6 === 0) {
    outOfStock = [];
    inStock = [];
    // Handle the comma at the end
    let input = inputIds.value;
    if (input.endsWith(',')) {
      input = input.slice(0, -1);
    }
    // Transition the article element where the infomation will be displayed
    contents.forEach(content => {
      !content.classList.contains('open-active') ? content.classList.toggle('open-active') : '';
    });

    // *** Uncomment out between Fetch and Similate
    
    // FETCH CURRENTLY EVERYTHING HAS NO STOCK
    fetch(`https://www.dollskill.com/codetest/api.php?ids=${input}&op=get_size_attributes`)
      .then(blob => blob.json())
      .then(sizesResults => {
        console.log(sizesResults);
        for (let key in sizesResults) {
          // *** parseBlobInfo from helperFuncs.js
          parseBlobInfo(sizesResults[key], key, outOfStock, inStock);
        }

        // *** sortByName is from helperFuncs.js
        outOfStock.sort(sortByName);
        inStock.sort(sortByName);

        renderInfo(outOfStock, false);
        renderInfo(inStock, true);

        numsPressed = 0;
        inputIds.value = '';
        canType = true;
        form.reset();
      
      })
      // FETCH END
      
      
      // // SIMILATE FETCH FOR SORT FUNC with dummy data
      // for (let key in dummyData) {
      //   // *** parseBlobInfo from helperFuncs.js
      //   parseBlobInfo(dummyData[key], key, outOfStock, inStock);
      // }
  
      // // *** sortByName is from helperFuncs.js
      // outOfStock.sort(sortByName);
      // inStock.sort(sortByName);
  
      // renderInfo(outOfStock, false);
      // renderInfo(inStock, true);
      
      // numsPressed = 0;
      // inputIds.value = '';
      // canType = true;
      // form.reset()
      // // SIMULATE END
  }
  
}




// FORM dirIC ***
function validForm(e) {
  let validate = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ','];
  lastChar = inputIds.value[inputIds.value.length - 1];
  // If the key pressed is not within validate
  if (!validate.includes(e.key)) {
    e.preventDefault();
  }

  // No repeats for ,
  if (e.key === ',' && e.key === inputIds.value[inputIds.value.length - 1]) {
    e.preventDefault();
  }

  // Only have comma when there are 6 index
  if (e.key === ',' && numsPressed % 6 !== 0) {
    e.preventDefault();
  }
  
  // Conditional to change canType to false;
  if (numsPressed % 6 === 0 && numsPressed !== 0 && canType && lastChar !== ',') {
    // console.log('False');
    canType = false;
  } 

  // PreventDefault if all conditionals pass
  if (numsPressed % 6 === 0 && numsPressed !== 0 && !canType && e.key !== ',' && lastChar !== ',') {
    // console.log('Prevent');
    e.preventDefault();
  }

  // Conditional for canType = True;
  if (numsPressed % 6 === 0 && !canType && e.key === ',') {
    canType = true;
  }

  // Add to numsPressed
  if (canType) {
    if (validate.includes(e.key) && e.key !== ',') {
      numsPressed += 1;
    }
  }


  // Delete logic
  if (e.key === 'Backspace' || e.key === 'Delete') {
    selection = window.getSelection().toString();
    // Delete from the back if selection is empty
    console.log(e.target.value);
    console.log(selection);
    if (selection === '') {
      lastChar !== ',' && numsPressed > 0 ? numsPressed -= 1 : '';
      inputIds.value = inputIds.value.slice(0, -1);
    } else {
      // Get the index where the selection starts 
      let index = inputIds.value.indexOf(selection);
      // Slice until that index
      inputIds.value = inputIds.value.slice(0, index);
      // Reset numsPressed
      numsPressed = 0;
      // Count all the characters that are not ','
      for (let i = 0; i < inputIds.value.length;  i++) {
        if (inputIds.value[i] !== ',') {
          numsPressed += 1;
        }
      }
      // Reassign last char to see validate the form;
      lastChar = inputIds.value[inputIds.value.length - 1];
    }
    
    numsPressed % 6 === 0 && 
    numsPressed > 0 && 
    lastChar !== ',' ? canType = false : canType = true;
  }
  
  // Submit logic
  if (e.key === 'Enter') {
    if (numsPressed % 6 === 0 && numsPressed > 0) {
      const submit = d.createEvent('Event');
      submit.initEvent('submit', true, true);
      form.dispatchEvent(submit);
    }
  }

  // Select all logic
  if (prevChar === 'Meta' && e.key === 'a') {
    window.document.execCommand('selectAll');
  }
  
  prevChar = e.key;
  // console.log(numsPressed);
}
// FORM LOGIC END ***


// Detect if stock is wrapped
function detectWrap(e) {
  const stocksInfo = [...d.querySelectorAll('.stock')];
  const [stockOut, stockIn] = [stocksInfo[0].getBoundingClientRect(), stocksInfo[1].getBoundingClientRect()];

  // add wrapped class if stock out top < stock in top
  if (stockOut.top < stockIn.top) {
    stocksInfo.map(stockInfo => {
      !stockInfo.classList.contains("wrapped") ? stockInfo.classList.toggle("wrapped") : '';
    });
  } 
  if (window.innerWidth / 2 > 360) {
    stocksInfo.map(stockInfo => {
      stockInfo.classList.contains("wrapped") ? stockInfo.classList.toggle("wrapped") : '';
    });
  } 
}

// Add event listeners
inputIds.addEventListener('keydown', validForm);
form.addEventListener('submit', searchSizes);
// Resizing events
window.addEventListener('load', detectWrap);
window.addEventListener('resize', detectWrap);
