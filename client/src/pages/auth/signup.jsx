import React, { useEffect, useState, useContext } from 'react'
import { FcGoogle } from "react-icons/fc"
import { TiArrowSortedDown } from "react-icons/ti";
import { axiosClient } from "../../api/axios"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../../firebase';
import { authContext } from '../../contexts/AuthWrapper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {
  const userContext = useContext(authContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [disabledFlag, setDisabledFlag] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const sendData = async (formData) => {
    try {
      const { firstName, lastName, email, password, phoneNumber } = formData; 
      
      const response = await axiosClient.post('http://localhost:5555/auth/signup', {firstName, lastName, email, password, phoneNumber});
      
      return true; 
    } catch (error) {
      console.error('Error sending data:', error);
      return false; 
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if(formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.password === "" ){
      toast.error("all feilds are required")
      setLoading(false);
      return;
    }
    if(formData.password.length < 8){
      toast.error("password must contain 8 characters or more");
      setLoading(false);
      return;
    }
    if(formData.phoneNumber.length !== 0){
      if(formData.phoneNumber.length < 10){
        toast.error("invalid phone number");
        setLoading(false);
        return;
      }
    }
    const success = await sendData(formData);
    setLoading(false);
    if (success){
     setFormData({
       firstName: "",
       lastName: "",
       email: "",
       password: "",
       phoneNumber: "",
     });

      
      navigate("signin");
     
    } else {
      toast.error("Email already exist");
    }
  }
  useEffect(()=>{
    if(formData.firstName && formData.lastName && formData.email && formData.password){
      setDisabledFlag(false);
    }else{
      setDisabledFlag(true);
    }
  },[formData]);
  const handleGoogleClick = async (e) => {
    try {
     e.preventDefault();
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result.user)
      const splitNames = result.user.displayName.split(" "); 
      const firstName = splitNames[0];
      const lastName = splitNames.slice(1).join(" "); 

      
      const res = await axiosClient.post('http://localhost:5555/auth/google',{
        firstName: firstName,
        lastName: lastName,
        email: result.user.email,
      });   
    
      localStorage.setItem('token',res.data.token);
      userContext.getUser();
      userContext.setIsLoggedIn(true);
      navigate("/dashboard");

    } catch (error) {
      toast.error('something went wrong');
    }
  };
  return (
    <div className="max-w-6xl  mx-auto">
      <div className='flex items-center justify-center  p-4'>
      <ToastContainer />
       <div className='basis-1/2 w-3/4 lg:h-screen justify-end hidden lg:flex'>
         <div className='relative h-full'>
           <img src="/assets/signup.svg" alt="" className='h-full rounded-xl '/>
         </div>
       </div>

       <div className='basis-2/2 w-full md:basis-1/2 lg:ml-16 flex flex-col lg:mr-10 pb-16 lg:pb-0  '>
         <div> 
         
           <h2 className='text-5xl font-medium mb-4'>Sign up</h2>
           <Link to={"signin"} className='flex items-center mb-6'>
             <p className='text-sm text-gray-500'>Already have an account?</p>
             <p className='ml-1 text-xl font-bold cursor-pointer text-[#5F2874]'>Sign In</p>
           </Link>
           <div className='flex flex-col lg:flex-row items-center lg:mb-3'>
              <div className='w-full mb-3 lg:mb-0 lg:mr-6'>
                <label htmlFor="fname" className='block text-[#6d6c6c] text-md mb-1'>First Name</label>
                <input 
                    type="text" 
                    id="fname" 
                    placeholder='First Name' 
                    className='py-2 pl-5 w-full outline-none border-2 border-gray-200 rounded-xl'
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    value={formData?.firstName}
                />
              </div>
              <div className='w-full mb-3 lg:mb-0'>
                <label htmlFor="lname" className='block text-[#6d6c6c] text-md mb-1'>last Name</label>
                <input 
                    type="text" 
                    id="lname" 
                    placeholder='last Name' 
                    className='py-2 pl-5 w-full  outline-none border-2 border-gray-200 rounded-xl'
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    value={formData?.lastName}
                />
              </div>
           </div>
           <div className=' mb-3'>
              <label htmlFor="email" className='block text-[#6d6c6c] text-md mb-1'>email</label>
              <input 
                  type="email" 
                  id="email" 
                  placeholder='example@gmail.com' 
                  className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  value={formData?.email}
              />
           </div>
           <div className='  mb-4'>
              <label htmlFor="password" className='block text-[#6d6c6c] text-md mb-1'>password</label>
              <input 
                  type="password" 
                  id="password" 
                  placeholder='password' 
                  className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  value={formData?.password}
              />
           </div>
           <div className='  mb-4'>
              <label htmlFor="nmb" className='block text-[#6d6c6c] text-md mb-1'>phone number</label>
              <input 
                  type="text" 
                  id="nmb" 
                  placeholder='phone number' 
                  className='py-2 pl-5  outline-none border-2 border-gray-200 rounded-xl w-full'
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  value={formData?.phoneNumber}
              />
           </div>
           <div className=' mb-4'>
              <button 
              className={`py-3   outline-none text-white text-xl font-medium rounded-xl w-full bg-[#5F2874] ${disabledFlag ? 'cursor-not-allowed opacity-50' : ""}`}
              onClick={handleSubmit}
              disabled={disabledFlag} 
              >
                Sign Up
                { loading
                && 
                <div className="inline-block h-5 w-5 ml-3 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"></div>
              }
                </button>
           </div>
           <div className=''>
              <div  onClick={handleGoogleClick} className='border-2 border-gray-200 rounded-xl flex items-center justify-center py-3 w-full cursor-pointer '>
                <FcGoogle /> 
                <p className='ml-2 text-lg'>Sign Up with Google</p>
              </div>
           </div>
         </div>
       </div>
     </div>
    </div>
  )
}
