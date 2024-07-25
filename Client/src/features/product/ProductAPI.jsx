export function fetchAllPorducts() {
  return new Promise(async (resolve) => {
    //Dummy api  -- change it later with db
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json();
    // console.log(data);
    resolve({ data })
  }
  );
}



export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //Dummy api  -- change it later with db
    console.log("id : ",id);
    const response = await fetch('http://localhost:8080/products/'+id)
    const data = await response.json();
    console.log("Details : ",data);
    resolve({ data })
  }
  );
}





export function fetchAllPorductsByFilter(filter, sort, pagination) {
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastcategoryValues = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastcategoryValues}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  // console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    // console.log("Q : ",queryString);  
    const response = await fetch('http://localhost:8080/products?' + queryString)
    let data = await response.json();
    const totalItems = data.items;
    // console.log("Product items",data.items);
    console.log("Product data", data);
    data = data.data;
    resolve({ data: { products: data, totalItems: +totalItems } })
  });
}






export function fetchCategories() {
  return new Promise(async (resolve) => {
    //Dummy api  -- change it later with db
    const response = await fetch('http://localhost:8080/categories')
    const data = await response.json();
    // console.log("Cate : ", data);
    resolve({ data })
  }
  );
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    //Dummy api  -- change it later with db
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json();
    // console.log("Brand : ", data);

    resolve({ data})
  }
  );
}