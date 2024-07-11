import React, { useEffect, useState, useContext } from 'react'
import { 
    ArrowDownUp ,
    Trash2 ,
 } from 'lucide-react';
 import { axiosClient } from "../../api/axios"
 import {  toast } from 'react-toastify';
 import { Link, useNavigate } from 'react-router-dom';
 import { authContext } from '../../contexts/AuthWrapper';
 import io from 'socket.io-client';
 const socket = io('http://localhost:5555');

 
export default function Sheets() {
    const userContext = useContext(authContext);
    const [ sheets, setSheets ] = useState([]);
    async function getAllSheets() {
        try {
            const employeeId = userContext.user._id;
            const  response = await axiosClient.get(`/sheet/employee?employeeId=${employeeId}`);
            setSheets(response.data);
        } catch (error) {
            console.error("Failed to fetch sheets:", error);
            toast.error("Failed to fetch sheets. Please try again later.");
        }
    }
    useEffect(() => {
      socket.emit('joinRoom', userContext.user._id); 
      socket.on('notification', (notification) => {
        getAllSheets();
      });
      return () => {
        socket.off('notification');
        socket.emit('leaveRoom', userContext.user._id);
      };
    }, [userContext.user]);
  
    useEffect(() => {
      if(userContext.user._id !== undefined){
        getAllSheets()
      }
    }, [userContext.user._id]);
    const handleOpen = async (url,sheetId) => {
      try {
        // Sending the request
        const  response = await axiosClient.post(`/sheet/view`,{sheetId});
  
        if (response.status === 200) {
          // If the request was successful, navigate to the URL
          const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        } else {
          // Handle error
          toast.error('Request failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error:', error);
      }
    };
  return (
    <div className="flex flex-col py-24 pl-24 p-3 pr-5 h-screen">
      <div className="flex items-center justify-between py-5">
          <h5 className="text-3xl text-[#414141] font-semibold">Hey {userContext.user.fullName}</h5>
          <div className='flex items-center justify-between gap-5'>
              <div className="flex gap-2 items-center">
                 <div className="w-4 h-4 bg-red-700"></div>
                 <p>No orders</p>
              </div>
              <div className="flex gap-2 items-center">
                 <div className="w-4 h-4 bg-green-700"></div>
                 <p>New orders</p>
              </div>
          </div>
       </div>
        <div className="w-full ">
            <div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {/* <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"> id</th> */}
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">link</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">last order date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sheets.map(sheet => (
              <tr className={`${sheet.newOrder ? 'bg-green-200' : 'bg-red-200'} `} key={sheet._id} >
                {
                    sheet.newOrder ? 
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 cursor-pointer"  onClick={()=>{handleOpen(sheet.sheetUrl,sheet._id)}} > 
                         Open
                      </td>
                    :
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 cursor-pointer" > 
                      <a href={sheet.sheetUrl} target="_blank" rel="noopener noreferrer">
                        Open
                      </a>
                    </td>
                }
                
                <td className={`px-6 py-4 whitespace-nowrap rounded p-2 ${sheet.newOrder ? 'text-green-900' : 'text-red-700'} text-lg font-semibol`}>{sheet.lastorderDate}</td>
              </tr>        
             ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </div>
    </div>
  )
}
