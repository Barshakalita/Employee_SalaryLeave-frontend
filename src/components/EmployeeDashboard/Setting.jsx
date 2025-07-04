import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
const Setting=()=>{
    const navigate=useNavigate();
    const {user}=useAuth();
    const [setting,setSetting]=useState({
        userId:user._id,
        oldPassword:"",
        newPassword:"",
        confirmPassword:"",
    });
    const [error, setError]=useState(null);

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setSetting({ ...setting, [name]:value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(setting.newPassword !== setting.confirmPassword){
            setError("Password not matched");
        }else{
            try{
                const response = await axios.put(
                    "https://employee-salary-leave-api-nn9s.vercel.app/api/setting/change-password",
                    setting,
                    {
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if(response.data.success){
                    navigate("/employee-dashboard");
                    setError("");
                }
            }catch(error){
                if(error.response && !error.response.data.success){
                    setError(error.response.data.error);
                }
            }
        }
    }
    return(
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Change Password</h2>
                
                {/* Display error message */}
                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
                        {error}
                    </div>
                )}

                 <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">Old Password</label>
                           <input 
                               type="password" 
                               name="oldPassword"
                               className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
                               placeholder="Old password" 
                               onChange={handleChange}
                               required 
                            />
                     </div>

                     <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                             <input 
                               type="password" 
                               name="newPassword"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
                                 placeholder="New password" 
                                  onChange={handleChange}
                                  required 
                              />
                    </div>

                    <div className="mb-6">
                         <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                <input 
                                   type="password" 
                                   name="confirmPassword"
                                   className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
                                   placeholder="Confirm password" 
                                    onChange={handleChange}
                                    required 
                                />
                    </div>

                    <div>
                        <button 
                           type="submit" 
                           className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md"
                        >
                              Change Password
                         </button>
                    </div>
                </form>


            </div>
        
    )
};
export default Setting;