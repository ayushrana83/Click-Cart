export function getAllUserOrders() {
  return new Promise(async(resolve) => {
    const response = await fetch("http://localhost:8080/back/order/own");
    const data = await response.json();
    // console.log(data);
    resolve({data}); 
});
}

export function getUserInfo()
{
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/back/user/own");
    const data = await response.json();
    resolve({data});
  })
}

export function updateUser(update)
{
  return new Promise(async(resolve) => {
    // console.log(update);
    const response = await fetch("http://localhost:8080/back/user/" , {
      method : "PATCH",
      body : JSON.stringify(update),
      headers :{"content-type" : "application/json"},
    });
    // console.log(update);
    const data = await response.json();
    resolve({data});
  })
}


