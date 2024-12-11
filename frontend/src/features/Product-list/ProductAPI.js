
export function getProductsByfilter({ filter, sort, pagination , admin }) {
  // filter = {"category" : ["smartphone" , "laptop"]}
  // sort = {_sort : 'price' , _order : 'desc'}
  // pagination = {_page : 1 , limit : 10}
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if(categoryValues.length)
    queryString += `${key}=${categoryValues}&`;
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  // console.log(queryString);

  // console.log('http://localhost:8080/back/products?'+queryString);

  if(admin) 
  {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/back/products?" + queryString
    );
    const data = await response.json();
    // console.log(data);
    const products = data.data;
    const totalItems = data.items;
    resolve({data:{products,totalItems}})
  });
}


export async function getAllBrands() {
  try {
    const response = await fetch("http://localhost:8080/back/brands");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Failed to fetch brands:", error);
    return { data: [], error: error.message 
  }
}
}

export async function getAllCategories() {
  try { 
    const response = await fetch("http://localhost:8080/back/categories");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { data: [], error: error.message };
  }
}

export async function getProductById(id) {
  try {
    const response = await fetch(`http://localhost:8080/back/products/${id}`)
    // console.log("called");
    const data = await response.json();
    // console.log(data);
    return {data};
  } catch (error) {
    console.log(error);
    return {data : [] , error : error.message};
  }
}


export function addProduct(product)
{
  return new Promise(async (resolve)=>{
    const response = await fetch("http://localhost:8080/back/products", {
      method : "POST",
      body : JSON.stringify(product),
      headers : {"content-type" : "application/json"}
    })
    const data = await response.json();
    resolve({data});
  })
}

export function updateProduct(update)
{
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/back/products/"+update.id,{
      method : "PATCH",
      body : JSON.stringify(update),
      headers : {"content-type" : "application/json"}
    });

    const data = await response.json();
    resolve({data});
  })
}


export function searchProduct(pro)
{
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/back/products/search/"+pro);
    const data = await response.json();
    resolve({data}); 
  })
}