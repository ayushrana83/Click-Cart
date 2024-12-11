export function createUser(userData) {
  return new Promise(async(resolve , reject) => {
    try
    {
      const response = await fetch("http://localhost:8080/back/auth/signup",{
        method : 'POST',
      body : JSON.stringify(userData),
      headers : {"content-type" : "application/json"}
    });
    const data = await response.json();
    resolve({data}); 
  }
  catch(err)
  {
    reject(err);
    console.log(err);
  }
});
}

export function checkUser(userData) {
  return new Promise(async(resolve , reject) => {
    // console.log(userData);
    try
    {
    const response = await fetch("http://localhost:8080/back/auth/login",{
      method : 'POST',
      body : JSON.stringify(userData),
      headers : {"content-type" : "application/json"}
    });
    const data = await response.json();
    if(response.ok)
    {
      // console.log("login frotend")
      resolve({data});
    }
    else
    {
      reject({message : "user not found"});
    }
  }
  catch(err)
  {
    reject(err);
    console.log(err);
  }
})}


export const logoutUser = () => {
  return new Promise (async (resolve) => {
    const response = await fetch("http://localhost:8080/back/auth/logout")
    const data = await response.json();
    resolve({data});
  })
}

export const checkAuth = () =>{
  return new Promise(async(resolve , reject)=>{
    try {
      const response = await fetch("http://localhost:8080/back/auth/check");
      const data = await response.json();
      resolve({data});
    } catch (error) {
     reject({error}); 
    }
  })
}

export const resetPasswordRequest = (email) => {
  return new Promise(async(resolve , reject) => {
    try {
      const response = await fetch("http://localhost:8080/back/auth/passwordReset-request",{
        method : "POST",
        body : JSON.stringify(email),
        headers : {"content-type" : "application/json"}
      })
      const data = await response.json();
      resolve({data});
    } catch (error) {
      reject({error});
    }
  })
}

export const resetPassword = async(data) =>
{
  return new Promise(async(resolve , reject) =>{
    try {
      const response = await fetch("http://localhost:8080/back/auth/reset-password" ,{
        method : "POST",
        body : JSON.stringify(data),
        headers : {"content-type" : "application/json"},
      })
      const res = await response.json();
      resolve({res});
    } catch (error) {
      reject({error});
    }
  })
}


