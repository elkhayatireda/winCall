import React, { useState, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import { axiosClient } from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { authContext } from '../../contexts/AuthWrapper';
import Loading from "../../pages/loading"
import {
  Pencil,
  Eye,
  EyeOff,
  EllipsisVertical,
  Heart,
  X,
  Bell,
  ChevronDown,
  LogOut,
  LogIn,
  ChevronUp,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
const socket = io('http://localhost:5555');




export default function TopNav() {
  const userContext = useContext(authContext);
 
 
  

 
 
  // const [notifications, setNotifications] = useState([]);
  // const getAllNotifications = async () => {
  //   try {
  //     const response = await axiosClient.get('/notification');
  //     setNotifications(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('Error getting notifications. Please try again later.');
  //   }
  // };

  // useEffect(() => {
  //   if (userContext.isLoggedIn) {
  //     getAllNotifications();
  //   }
  //   socket.emit('joinRoom', userContext.user?._id);
  //   socket.on('notification', (notification) => {
  //     setNotifications((prevNotifications) => [...prevNotifications, notification.message]);
  //     toast(notification.message.message);
  //     viewNotification(notification.message);
  //   });
  //   return () => {
  //     socket.off('notification');
  //     socket.emit('leaveRoom', userContext.user?._id);
  //   }; 
  // }, [userContext.user]);


  // const viewNotification = async (notification) => {
  //   try {
  //     const response = await axiosClient.post('/notification/read', { notification });
  //     getAllNotifications();
  //     if (notification.link !== null) {
  //       navigate(notification.link)
  //     }
  //   } catch (error) {
  //     toast.error('Error reading notifications. Please try again later.');
  //   }
  // }
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
      if (window.scrollY > 0) {
          setIsScrolled(true);
      } else {
          setIsScrolled(false);
      }
  };

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
 
  
  return (
  <div className={`${isScrolled ? 'shadow-md ' : ''} bg-[#F5F5F5] transition-shadow duration-300 marker:w-full fixed top-0 right-0 left-0 z-10`}>
    <div className={`flex items-center justify-between w-full max-w-7xl mx-auto h-16 py-10`}>
      <div className="basis-2/3 flex items-center justify-start h-16 gap-10">
        <div className="h-12">
          <img src={'/assets/logo11.png'} alt="logo" className="h-full" />
        </div>
        <ul className="flex items-center">
          <li className="mr-8 text-md  font-semibold hover:text-[#FEBC11] cursor-pointer">
            <ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink>
          </li>
          <li className="mr-8 text-md  font-semibold hover:text-[#FEBC11] cursor-pointer">
          <ScrollLink to="about" smooth={true} duration={500}>About</ScrollLink>
          </li>
          <li className="mr-8 text-md  font-semibold hover:text-[#FEBC11] cursor-pointer">
            <ScrollLink to="services" smooth={true} duration={500}>Services</ScrollLink>
          </li>
          <li className="mr-8 text-md  font-semibold hover:text-[#FEBC11] cursor-pointer">
            <ScrollLink to="projects" smooth={true} duration={500}>Projects</ScrollLink>
          </li>
          <li className="mr-8 text-md  font-semibold hover:text-[#FEBC11] cursor-pointer">
            <ScrollLink to="contact" smooth={true} duration={500}>Contact Us</ScrollLink>
          </li>
        </ul>
      </div>
      <div className="basis-1/2 flex items-center justify-end gap-3">
        <button className='bg-[#5F2874] border-[#5F2874] border-[2px] text-white text-md   py-3 px-12 text-md font-bold w-fit rounded'>Register</button>
        <button className='border-[#5F2874] border-[2px] text-[#5F2874] text-md   py-3 px-12 text-md font-bold w-fit rounded'>Login</button>
        <DropdownMenu >
          <DropdownMenuTrigger asChild >
            <img src={'/assets/uk.png'} alt="logo" className="h-10 w-10 rounded-full cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white p-0">
          <DropdownMenuItem className="p-0" >
          <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer flex items-center gap-3'>
          <img src={'/assets/uk.png'} alt="logo" className="h-7 w-7 rounded-full" />
            <p className='text-md font-medium'>english</p>
          </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0" >
          <div className='w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-md cursor-pointer flex items-center gap-3'>
          <img src={'/assets/morocco.png'} alt="logo" className="h-7 w-7 rounded-full" />
            <p className='text-md font-medium'>arabic</p>
          </div>
          </DropdownMenuItem>
        
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    {/* scroll up component */}
    <div 
      className={`${isScrolled ? 'fixed' : 'hidden'} bottom-5 right-5 w-14 h-14 bg-[#fff600] rounded-full flex items-center justify-center cursor-pointer `} 
      onClick={scrollToTop}
    >
      <ChevronUp  color='#000' size={40}/>
    </div>
  </div>
  )
}
