export function addProductToCart(item)
{
  return new Promise(async(resolve) => {
    const response = await fetch("http://localhost:8080/back/cart" , {
      method : "POST",
      body : JSON.stringify(item),
      headers : {"content-type" : "application/json"},
    })
    const data = await response.json();
    resolve({data});
  })
}


export function getUserCart()
{
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/back/cart",{
      method : "GET",
    });
    // console.log(userId);
    const data = await response.json();
    // console.log(data);
    resolve({data});
  })
}

export function updateCart(update)
{
  return new Promise(async (resolve) =>{
    // console.log(update);

  const response = await fetch("http://localhost:8080/back/cart/" + update.cartId,{
    method : "PATCH",
    body : JSON.stringify(update),
    headers : {"content-type" : "application/json"},
  });
  const data = await response.json();
  resolve({data});
});
}

export function deleteItemIncart(itemId)
{
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/back/cart/single/"+itemId , {
      method : "DELETE",
      headers : {"content-type" : "application/json"},
    });
    const data = await response.json();
    resolve({data : itemId});
  })
}

export function resetCart()
{
  return new Promise (async (resolve , reject) => {
    const response = await fetch("http://localhost:8080/back/cart/clear", {
      method : "DELETE",
      headers : {"content-type" : "application/json"},
    });
    if(response.ok)
    resolve({message : "success"});
    else
    reject({message : "failed"});
  });
}


