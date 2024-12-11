export function addOrder(order) {
  return new Promise(async(resolve) => {
    const response = await fetch("http://localhost:8080/back/order",
      {
        method : "POST",
        body : JSON.stringify(order),
        headers :{"content-type" : "application/json"}
      }
    );
    const data = response.json();
    resolve({data}); 
});
}


export function getAllOrders({sort , pagination})
{
  
  let queryString = '';
  for (const key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  for (const key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  return new Promise(async(resolve) => {
    const response = await fetch("http://localhost:8080/back/order?" + queryString);
    // console.log(queryString);
    const data = await response.json();
    const orders = data.data;
    const totalOrders = data.items;
    resolve({data : {orders , totalOrders}});
  })
}

export function updateOrder(update)
{
  return new Promise(async(resolve) => {
    // console.log(update);
    const response = await fetch("http://localhost:8080/back/order/"+update._id, {
      method : "PATCH",
      body : JSON.stringify(update),
      headers : {"content-type" : "application/json"},
    });
    const data = await response.json();
    resolve({data});
  })
}