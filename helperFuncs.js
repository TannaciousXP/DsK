const ascendBySize = (a, b) => {
  return a[0] < b[0] ? -1 : 1;
}

const descendBySize = (a, b) => {
  return a[0] < b[0] ? 1 : -1;
}

const sortByName = (a, b) => {
  return a.name < b.name ? -1 : 1;
}

const parseBlobInfo = (infoBlob, id, outOfStock, inStock) => {
  const inInfo = {
    id,
    sizes: [],
    name: ''
  }

  const outInfo = {
    id,
    sizes: [],
    name: ''
  }

  // Checks
  let ids = !Array.isArray(infoBlob) ? Object.keys(infoBlob) : [];

  // Iterate over the ids or infoBlob base on if Blob is Object or Array
  for (let id = 0; id < (!Array.isArray(infoBlob) ? ids.length : infoBlob.length); id++) {
    const key = !Array.isArray(infoBlob) ? ids[id] : id;
    const { display_brand, size_text, quantity } = infoBlob[key];
    if (id === 0) {
      if (outInfo.name === '') {
        outInfo.name = display_brand;
      }
      if (inInfo.name === '') {
        inInfo.name = display_brand;
      }
    }

    // Check for quantity to push into inInfo or outInfo sizes array
    if (quantity === 0) {
      outInfo.sizes.push([quantity, size_text]);
    } else {
      inInfo.sizes.push([quantity, size_text]);
    }
  }


  // Check to push into inStock array if sizes length is greater than 0
  if (inInfo.sizes.length > 0) {
    inInfo.sizes.sort(ascendBySize);
    inStock.push(inInfo);
  }

  // Check to push into outOfStock array if sizes length is greater than 0
  if (outInfo.sizes.length > 0) {
    outOfStock.push(outInfo);
  }

}

