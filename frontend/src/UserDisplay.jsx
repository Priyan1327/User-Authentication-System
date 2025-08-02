import React from 'react'
import { CgProfile } from "react-icons/cg";
import imgage from "../src/assets/walpaper2.jpg"


function UserDisplay( {profile} ) {

 // --------------------------------------------------------------------------------------------
  const deletfunction = async () => {

    const token = localStorage.getItem("token");

    try{

      const res = await fetch("http://localhost:5000/api/datas/delete",{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    
    const result = await res.json();

    if(res.ok){
      alert("User Details Deleated")
    }
    else{
      alert("failed to Delete User Details" + result.message);
    }

    }catch(err){
          console.error(err)
          alert("Delete error:",err)
    }
         
  };

//------------------------------------------------------------------------------------------------------
  return ( 

          <div className='flex items-center  justify-center min-h-screen bg-cover bg-no-repeat bg-center' style={{backgroundImage : `url(${imgage})`}}>

            <div className='bg-transprent/10  backdrop-blur-lg boder rounded-2xl shadow-lg p-8 w-full max-w-md text-white border-white/30 border-2 '>

                <h2 className='text-4xl font-extrabold text-center font-serif hover:cursor-pointer text-sky-500 mb-6'> PROFILE</h2>

                <hr className='text-gray-950 '/>

                <form className='space-y-4 w-full max-w-max'>

                   <div className='flex flex-col rounded-2xl w-full max-w-md cursor-pointer'>

                      <div className='flex justify-center-safe '>
                            <h1 className=' ml-10 items-center p-2 text-9xl border-0 text-gray-950 w-fit h-fit'> <CgProfile/> </h1>
                      </div>


                        <h2 className='font-extrabold font-semi text-gray-900 text-3xl'>Name : {profile.username}</h2>
                        <h3 className='font-extrabold font-semi  text-gray-400 text-xl'>Email : {profile.email}</h3>
                        <h4 className=' font-bold  text-gray-400 text-2xl'> Phone : {profile.phonenumber}</h4>
                        <h5 className=' font-bold  text-gray-400 text-2xl'>Address : {profile.address}</h5>
                        <h5 className=' font-bold  text-gray-400 text-2xl' >Pincode : {profile.pincode}</h5>

                   </div>                            
                </form>
                 <hr className='text-gray-950 mt-5'/>
                 <button className= 'bg-red-600 font-bold font-sans hover:bg-red-800 p-2 border-0 rounded-xl ml-2 w-full mb-0.5 mt-4' onClick={deletfunction}>Delete</button>

            </div>
               
          </div>

   )
}

export default UserDisplay;