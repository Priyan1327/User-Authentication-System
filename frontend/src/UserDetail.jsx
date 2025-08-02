import React, {  useState } from 'react'
import imgage from "../src/assets/walpaper2.jpg"



function UserDetail({setIslogedin,setUserprofile}) {

// User Profile details------------------------------------------------------------------------------------
// Stte managment for New User
  const [username,setUsername] = useState("");  const [firstname,setFirstname] = useState("");  
  const [lastname,setLastname] = useState("");  const [password,setPassword] = useState("");
  const [address,setAddress] = useState("");    const [email,setEmail] = useState("");
  const [pincode,setPincode] = useState("");    const [phonenumber,setPhonenumber] = useState("");

// State managment for Register user
  const [loginuser,setLoginuser] = useState("");
  const [loginpassword,setLoginpassword] = useState("");
 
// User detais Block----------------------------------------------------------------------------------------
const addfunction = async (e) => {

  e.preventDefault();

  if(!username || !password || !firstname || !lastname || !pincode || !address || !email || !phonenumber ){

    return  alert("Please Provide All Values")};

 try { // Fetching the data from backend.. using fetch
        console.log("Sending request to backend...");

        const response = await fetch("http://localhost:5000/api/datas/newuser", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ username , email , password , address , lastname , firstname , pincode , phonenumber})
        });
        
        // Converting the API in a json method by using a variable called data. the data is a variable that store the recived data.
        const data = await response.json();
        console.log("Response from backend:", data);
        
        // if data is sucesss the message should be poped in a way 
        if (response.ok && data.success) {
            alert("Welcome Registration Successful!😊");
        } else {
            alert("Registratin is UnSucessfull.😑 ");
        }
    } // print the try block is not working..
      catch (err) {
        console.error("Error:", err);
        alert("Server Error. Please try again 😑 ");
      }  
};

//------Get User Block-------------------------------------------------------------------------------------------
const loginfunction = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Login and get token
    const loginRes = await fetch("http://localhost:5000/api/datas/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: loginuser,
        password: loginpassword,
      }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok || !loginData.token) {
      alert("Invalid Credentials");
      return;
    }

    const token = loginData.token;
    localStorage.setItem("token", token); //  Save to localStorage

    // Step 2: Fetch profile using token
    const profileRes = await fetch("http://localhost:5000/api/datas/profileuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // Step 3 :  Converting into json
    const profileData = await profileRes.json().catch( error => {
    console.error("Error parsing profile JSON:", error);
    throw new Error("Invalid profile JSON");
});

    if (!profileRes.ok) {
      alert("Could not fetch Profile");
      return;
    }

    // Step 3: Set profile and login state
    setUserprofile(profileData);
    setIslogedin(true);

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. See console for details.");
  }
};


//--------------------------------------------------------------------------------------------------------------------
  return (
    <>
    <div className='bg-amber-400 flex min-h-screen flex-row justify-around bg-cover bg-no-repeat bg-center' style={{backgroundImage : `url(${imgage})`}}>
  

       {/* User Detail adding Block */}

      <div className="m-6 ">
        <div className="bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-xl border-2 boder-white/30">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">User Profile Details</h2>
          <form className="space-y-4 flex flex-wrap m-8 gap-4 ">

            <div>
              <label className="block text-gray-900 font-medium mb-1" htmlFor="name">FirstName</label>
              <input
                onChange={(e) =>setFirstname(e.target.value)}
                type="text"
                id="Firstname"
                value={firstname}
                placeholder="Enter your Firstname"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1" htmlFor="name">LastName</label>
              <input
                onChange={(e) =>setLastname(e.target.value)}
                type="text"
                value={lastname}
                id="Lastname"
                placeholder="Enter your Lastname"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div >
              <label className="block text-gray-900 font-medium mb-1" htmlFor="username">UserName</label>
               <input  
                 onChange={(e) =>setUsername(e.target.value)}
                 type="text"
                 value={username}
                 id="username"
                 placeholder="Enter your UserName"
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
            </div>


             <div >
                <label className="block text-gray-900 font-medium mb-1" htmlFor="password">Password</label>
                <input  
                 value={password}
                 onChange={(e) =>setPassword(e.target.value)}
                 type="password"
                 id="password"
                 placeholder="Enter Yor Password"
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1" htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1" htmlFor="address">Address</label>
              <input
                value={address}
                onChange={(e) =>setAddress(e.target.value)}
                type="text"
                id="address"
                placeholder="Enter your address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1" htmlFor="pincode">Pincode</label>
              <input
                value={pincode}
                onChange={(e) =>setPincode(e.target.value)}
                type="text"
                id="pincode"
                placeholder="Enter your pincode"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-1" htmlFor="phonenumber">Phone Number</label>
              <input
                value={phonenumber}
                onChange={(e) =>setPhonenumber(e.target.value)}
                type="text"
                id="phonenumber"
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>

            <button
              onClick={addfunction}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-950 transition duration-300 cursor-pointer"
            >
              Save
            </button>

          </form>
        </div>
      </div>

      {/* User Getting Block */}

      <div className='flex items-center justify-center min-h-screen '>

            <div className='bg-transparent backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md border-2 backdrop-blur-4xl'>

              <h1 className='text-2xl font-bold text-center text-gray-800 mb-6'>Get User</h1>

              <form className='' >

                <div >
                  <label className="block text-gray-900 font-medium mb-1" htmlFor="username">UserName</label>
                  <input 
                   value={loginuser}
                   onChange={(e)=>setLoginuser(e.target.value)} 
                   type="text"
                   id="phoneNumber"
                   placeholder="Enter your UserName"
                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                </div>
                
                <div >
                  <label className="block text-gray-900 font-medium mb-1" htmlFor="password">Password</label>
                  <input 
                   value={loginpassword} 
                   onChange={(e)=>setLoginpassword(e.target.value)}
                   type="password"
                   id="passsword"
                   placeholder="Enter your Password"
                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                </div>

                  <button className='w-full py-3 bg-blue-500 mt-5 text-center rounded-lg p-2 
                          font-semibold text-white cursor- pointer hover:bg-emerald-700 transition duration-300' type="submit"
                           onClick={loginfunction}> Get 
                  </button>

              </form>
              
            </div>

      </div>
  </div>
        
  </>
  );
}

export default UserDetail;
