import {
  PackageCheck,
  Box,
  Menu,
  Headset,
  Instagram,
  Clock,
  MessageCircleMore,
  MapPin,
} from "lucide-react";
import { HashLink  } from 'react-router-hash-link';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

import { Bell, X, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"


function LandingPage() {
  const [visibleAnswer, setVisibleAnswer] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const faqData = [
    {
      question: "What is your return policy?",
      answer: "Our return policy allows returns within 30 days of purchase.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order through the tracking link sent to your email.",
    },
    {
      question: "What is your return policy?",
      answer: "Our return policy allows returns within 30 days of purchase.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You can track your order through the tracking link sent to your email.",
    },
  ];


  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the sheet
  };




 





 

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    const { firstName, lastName, phoneNumber } = formData;

    if (!firstName || !lastName || !phoneNumber) {
      setError("tout les champs sont obligatoire");
      return;
    }

    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5555/contact",
        formData
      );
      if (response.status === 200) {
        console.log("Form submitted successfully");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
        });
      } else {
        console.error("Server error");
      }
    } catch (error) {
      console.error("Network error", error);
      setError("There was an error submitting the form");
    }
  };

  return (
    <div className="w-full">
      {/* <div className={`${isScrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} bg-[#23216c] transition-all duration-800 fixed top-0 right-0 left-0 z-50 `}>
                <div className="flex items-center justify-between py-2  gap-10 max-w-[1150px] mx-auto">
                    <div className="h-36 md:h-24 ">
                     <img src={'/assets/logo2.png'} alt="logo" className="h-full" />
                    </div>
                    <ul className="items-center hidden md:flex">
                        <li className="mr-8 text-lg text-white font-semibold hover:text-[#FEC802] cursor-pointer">
                            <ScrollLink to="home"  duration={500}>home</ScrollLink>
                        </li>
                        <li className="mr-8 text-lg text-white font-semibold hover:text-[#FEC802] cursor-pointer">
                        <ScrollLink to="about"  duration={500}>about</ScrollLink>
                        </li>
                        <li className="mr-8 text-lg text-white font-semibold hover:text-[#FEC802] cursor-pointer">
                            <ScrollLink to="services"  duration={500}>services</ScrollLink>
                        </li>
                        <li className="mr-8 text-lg text-white font-semibold hover:text-[#FEC802] cursor-pointer">
                            <ScrollLink to="projects"  duration={500}>FAQs</ScrollLink>
                        </li>
                        <li className="mr-8 text-lg text-white font-semibold hover:text-[#FEC802] cursor-pointer">
                            <ScrollLink to="contact"  duration={500}>contact us</ScrollLink>
                        </li>
                        <li className="mr-8 text-lg text-white font-semibold  cursor-pointer">
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild >
                                    <img src={'/assets/uk.png'} alt="logo" className="h-8 w-8 rounded-full cursor-pointer" />
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
                        </li>
                        <li className="mr-8 text-lg text-gray-500 cursor-pointer">
                            <ScrollLink to="contact"  duration={500}>
                                <button className='bg-[#FEC802] text-black text-md py-3 px-7 font-medium w-fit rounded'>Contact Us</button>
                            </ScrollLink>
                        </li>
                    </ul>
                    <div className="md:hidden flex items-center justify-center">
                        <Menu size={25}/>
                    </div>
                </div>
                </div> */}
      <div className={` bg-[#23216c] duration-300 marker:w-full z-40`} >
        <div className="flex items-center justify-between gap-10 max-w-[1150px] mx-auto px-3 xl:px-0 py-3">
          <div className="w-28 md:w-36 ">
            <img src={"/assets/logoW.jpg"} alt="logo" className="w-full" />
          </div>
          <ul className="items-center hidden lg:flex">
            <li className="ml-5 text-sm text-white font-medium hover:text-[#FEC802] cursor-pointer">
              <ScrollLink to="home"  duration={500}>
                accueil
              </ScrollLink>
            </li>
            <li className="ml-5 text-sm text-white font-medium hover:text-[#FEC802] cursor-pointer">
              <ScrollLink to="about"  duration={500}>
                à propos
              </ScrollLink>
            </li>
            <li className="ml-5 text-sm text-white font-medium hover:text-[#FEC802] cursor-pointer">
              <ScrollLink to="services"  duration={500}>
                services
              </ScrollLink>
            </li>
            <li className="ml-5 text-sm text-white font-medium hover:text-[#FEC802] cursor-pointer">
              <ScrollLink to="contact"  duration={500}>
                contactez-nous
              </ScrollLink>
            </li>
            <li className="ml-5 text-sm text-white font-medium  cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={"/assets/france.png"}
                    alt="logo"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white p-0">
                  <DropdownMenuItem className="p-0">
                    <Link to='/fr'>
                    <div className="w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-sm cursor-pointer flex items-center gap-3">
                      <img
                        src={"/assets/france.png"}
                        alt="logo"
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="text-sm font-medium">Frensh</p>
                    </div>
                    </Link>
                  </DropdownMenuItem>
                    <Link to='/en'>
                  <DropdownMenuItem className="p-0">
                    <div className="w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-sm cursor-pointer flex items-center gap-3">
                      <img
                        src={"/assets/uk.png"}
                        alt="logo"
                        className="h-7 w-7 rounded-full"
                      />
                      <p className="text-sm font-medium">English</p>
                    </div>
                  </DropdownMenuItem></Link>
                    <Link to='/ar'>
                    <DropdownMenuItem className="p-0">
                        <div className="w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-sm cursor-pointer flex items-center gap-3">
                        <img
                            src={"/assets/morocco.png"}
                            alt="logo"
                            className="h-7 w-7 rounded-full"
                        />
                        <p className="text-sm font-medium">Arabic</p>
                        </div>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li className="ml-5 text-lg text-gray-500 cursor-pointer">
              <ScrollLink to="contact"  duration={500}>
                <button className="bg-[#FEC802] text-black text-sm py-3 px-5 font-bold w-fit rounded">
                  contactez nous
                </button>
              </ScrollLink>
            </li>
          </ul>
          <div className="lg:hidden flex items-center justify-center cursor-pointer ">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
         <Menu size={35} color="white"/>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>

            </SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-4 mt-16">
            <li className="ml-5 text-sm text-black font-medium hover:text-[#FEC802] cursor-pointer">
              <HashLink href="/fr#home" onClick={handleLinkClick}>
                accueil
              </HashLink>
            </li>
            <li className="ml-5 text-sm text-black font-medium hover:text-[#FEC802] cursor-pointer">
              <HashLink to="/fr#about" >
                à propos
              </HashLink>
            </li>
            <li className="ml-5 text-sm text-black font-medium hover:text-[#FEC802] cursor-pointer">
            <HashLink to="/fr#services" onClick={handleLinkClick}>
             services
            </HashLink>
            </li>
            <li className="ml-5 text-sm text-black font-medium hover:text-[#FEC802] cursor-pointer">
              <HashLink to="/fr#projects" onClick={handleLinkClick}>
                FAQs
              </HashLink>
            </li>
            <li className="ml-5 text-sm text-black font-medium hover:text-[#FEC802] cursor-pointer">
              <HashLink to="/fr#contact" onClick={handleLinkClick}>
                contactez-nous
              </HashLink>
            </li>
            
            <li className="ml-5 text-lg text-gray-500 cursor-pointer">
              <HashLink to="/fr#contact" onClick={handleLinkClick}>
                <button className="bg-[#FEC802] text-black text-sm py-3 px-5 font-bold w-fit rounded">
                  contactez nous
                </button>
              </HashLink>
            </li>
          </ul>
      </SheetContent>
    </Sheet>
    <div className="ml-5 text-sm text-white font-medium  cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={"/assets/france.png"}
                    alt="logo"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white p-0">
                  <DropdownMenuItem className="p-0">
                    <Link to='/fr'>
                    <div className="w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-sm cursor-pointer flex items-center gap-3">
                      <img
                        src={"/assets/france.png"}
                        alt="logo"
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="text-sm font-medium">Frensh</p>
                    </div>
                    </Link>
                  </DropdownMenuItem>
                    <Link to='/en'>
                  <DropdownMenuItem className="p-0">
                    <div className="w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-sm cursor-pointer flex items-center gap-3">
                      <img
                        src={"/assets/uk.png"}
                        alt="logo"
                        className="h-7 w-7 rounded-full"
                      />
                      <p className="text-sm font-medium">English</p>
                    </div>
                  </DropdownMenuItem></Link>
                    <Link to='/ar'>
                    <DropdownMenuItem className="p-0">
                        <div className="w-full h-full rounded hover:bg-slate-200 py-2 px-3 text-sm cursor-pointer flex items-center gap-3">
                        <img
                            src={"/assets/morocco.png"}
                            alt="logo"
                            className="h-7 w-7 rounded-full"
                        />
                        <p className="text-sm font-medium">Arabic</p>
                        </div>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full pt-16 bg-[#23216c] pb-24 flex items-center justify-center gap-15">
        <div className=" flex flex-col md:flex-row items-center justify-center  gap-10 max-w-[1150px] mx-auto pt-5 px-3 md-px-0">
          <div className="basis-1/2 flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-extrabold text-[#fff] mb-3 text-center md:text-start">
              Transformez Vos Commandes en Ventes Réussies au{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-[#fff600] from-[#FEC802]">
                Maroc
              </span>
            </h1>
            <p className="text-gray-100 text-sm  mb-5 md:pr-0 text-center md:text-start">
              Nous Finalisons Vos Ventes avec un Service de Confirmation
              Téléphonique Efficace et Fiable
            </p>
            <button className="bg-[#FEC802] text-[#000] text-md py-3 px-8 font-bold w-fit rounded ">
              Contactez Nous
            </button>
          </div>
          <div className="basis-1/2 w-full  flex items-center justify-center ">
            <img src={"/assets/pic1.png"} alt="logo" className="w-full" />
          </div>
        </div>
      </div>
      <div className="w-full mt-10 " id="about"> 
        <div className="flex flex-col-reverse md:flex-row items-center justify-between  gap-10 max-w-[1150px] mx-auto pt-24 ">
          <div className="basis-1/2 flex items-center justify-center">
            <img src={"/assets/pic2.png"} alt="logo" className="h-full" />
          </div>
          <div className="basis-1/2 flex flex-col pl-5 md:pl-0 px-2">
            <p className="text-md font-extrabold text-[#23216c] ">
              Qui Nous Sommes
            </p>
            <h4 className="text-4xl font-bold text-[#000] mb-2">
              Votre Agence de Finalisation de Commandes au Maroc
            </h4>
            <p className="text-gray-600 text-sm font-medium mb-5">
              Chez WinCall, nous sommes spécialisés dans la confirmation des
              commandes pour les entreprises au Maroc. Notre équipe dédiée
              s'assure que chaque commande est confirmée avec précision, offrant
              ainsi une tranquillité d'esprit à nos clients. Avec une approche
              centrée sur le client et un service rapide, nous transformons vos
              commandes en ventes réussies. Faites confiance à notre expertise
              pour booster votre activité et améliorer votre taux de
              confirmation.
            </p>
            <button className="bg-[#000] text-[#fff] text-lg py-2 px-8 font-bold w-fit rounded">
              Contacter Nous
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#fff] pb-20">
        <div className="max-w-[1150px] mx-auto py-24 px-3">
          <p className="text-sm font-extrabold text-[#FEC802]">
            Ce Que Nous Faisons
          </p>
          <div className="flex flex-col lg:flex-row items-start lg:justify-between gap-2 lg:gap-16">
            <h4 className="text-4xl font-bold text-[#173c5f] basis-3/5">
              Développez la Confirmation de Vos Commandes E-commerce
            </h4>
            <p className="text-gray-600 text-md font-medium basis-2/5">
              Chez WinCall, nous nous spécialisons dans la finalisation des
              commandes, vous garantissant une expérience sans stress. Grâce à
              notre service rapide et fiable, vos clients bénéficient d'une
              confirmation instantanée, renforçant leur confiance et leur
              satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 w-full mt-10" id="services">
            <div className="group py-8 px-2 pl-8 rounded   bg-[#fff]  cursor-pointer flex flex-col lg:hover:scale-105 ">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center bg-[#f6f5f8] mb-4 ">
                <Headset color="#7823e7" size={30} className="" />
              </div>
              <div className="flex flex-col basis-2/3 ">
                <h3 className="text-xl font-bold mb-3 text-[#414141] ">
                  Confirmation de Commande
                </h3>
                <p className="text-md text-gray-600 ">
                  Finalisez chaque vente avec confiance.
                </p>
              </div>
            </div>
            <div className="group py-8 px-2 pl-8 rounded   bg-[#fff]  cursor-pointer flex flex-col lg:hover:scale-105 ">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center bg-[#f6f5f8] mb-4 ">
                <Box color="#7823e7" size={30} className="" />
              </div>
              <div className="flex flex-col basis-2/3 ">
                <h3 className="text-xl font-bold mb-3 text-[#414141] ">
                  Saisie des Commandes
                </h3>
                <p className="text-md text-gray-600 ">
                  Saisie efficace dans les plateformes de livraison.
                </p>
              </div>
            </div>
            <div className="group py-8 px-2 pl-8 rounded   bg-[#fff]  cursor-pointer flex flex-col lg:hover:scale-105">
              <div className="w-14 h-14 rounded-3xl flex items-center justify-center bg-[#f5f8f6] mb-4 ">
                <PackageCheck color="#7823e7" size={30} className="" />
              </div>
              <div className="flex flex-col basis-2/3 ">
                <h3 className="text-xl font-bold mb-3 text-[#414141] ">
                  Suivi et Vérification
                </h3>
                <p className="text-md text-gray-600 ">
                  Suivi des commandes jusqu'à la livraison.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FEC802]">
        <div className="flex items-center justify-between gap-10 max-w-[1150px] mx-auto ">
          <div className="lg:basis-1/2 flex flex-col w-full items-center  py-10 px-3">
            <h1 className="text-3xl lg:text-[45px]  font-bold text-[#000] mb-2 lg:leading-[3rem] text-center">
              Première Agence de Confirmation de Commandes
            </h1>
            <p className="text-gray-800 text-[17px] mb-3 text-center">
              Transformez vos ventes avec notre service fiable et rapide. Nous
              garantissons une expérience client inégalée à chaque étape.
            </p>
            <button className="bg-[#173c5f] text-[#fff] text-lg py-3 px-8 font-bold w-fit rounded">
              Contactez-nous
            </button>
          </div>
          <div className="basis-1/2  relative h-[400px] hidden lg:flex">
            <img
              src={"/assets/img1.png"}
              alt="logo"
              className="w-full min-h-[400px] absolute bottom-0 right-0"
            />
          </div>
        </div>
      </div>
      <div
        className="w-full"
        // style={{ backgroundImage: "url('/assets/ttten.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex items-center justify-center   max-w-[1150px] mx-auto py-24">
          <div className="flex flex-col items-center">
            <p className="text-sm font-bold text-[#23216c] ">
              CARACTÉRISTIQUES
            </p>
            <h4 className="text-4xl font-bold text-[#000] mb-3 text-center md:text-start">
              Pourquoi Choisir WinCall ?
            </h4>
            <p className="text-gray-800 text-[14px] w-full lg:w-2/3 mb-5 text-center px-4">
              Optez pour WinCall et bénéficiez d'une expertise inégalée dans la
              confirmation de commandes. Notre équipe dynamique assure une
              communication rapide et efficace avec vos clients, garantissant
              des ventes fluides et une satisfaction accrue. Faites le choix
              d'un service fiable qui propulse votre e-commerce vers le succès.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-16 w-full mt-10 px-2">
              <div className="group py- lg:py-8 px-4  rounded   bg-[#fff]  cursor-pointer flex flex-col lg:hover:scale-105 items-center">
                <div className="w-12 h-12 rounded-3xl flex items-center justify-center bg-[#24216c18] mb-4 ">
                  <MapPin color="#23216c" size={30} className="" />
                </div>
                <div className="flex flex-col basis-2/3 items-center">
                  <h3 className="text-xl font-medium mb-3 text-[#414141] ">
                    Expertise Locale
                  </h3>
                  <p className="text-sm text-gray-600 text-center  w-2/3 lg:w-full">
                    Avec une connaissance approfondie du marché marocain, nous
                    comprenons les attentes culturelles et commerciales,
                    assurant une communication efficace avec vos clients.
                  </p>
                </div>
              </div>
              <div className="group py- lg:py-8 px-4  rounded   bg-[#fff]  cursor-pointer flex flex-col lg:hover:scale-105 items-center">
                <div className="w-12 h-12 rounded-3xl flex items-center justify-center bg-[#24216c18] mb-4 ">
                  <MessageCircleMore color="#23216c" size={30} className="" />
                </div>
                <div className="flex flex-col basis-2/3 items-center">
                  <h3 className="text-xl font-medium mb-3 text-[#414141] ">
                    Support Proactif
                  </h3>
                  <p className="text-sm text-gray-600 text-center w-2/3 lg:w-full">
                    Notre équipe est disponible pour vous accompagner à chaque
                    étape, avec un suivi proactif des commandes et une
                    réactivité sans égal pour anticiper vos besoins.
                  </p>
                </div>
              </div>
              <div className="group py- lg:py-8 px-4  rounded   bg-[#fff]  cursor-pointer flex flex-col lg:hover:scale-105  items-center">
                <div className="w-12 h-12 rounded-3xl flex items-center justify-center bg-[#24216c18] mb-4 ">
                  <Clock color="#23216c" size={30} className="" />
                </div>
                <div className="flex flex-col basis-2/3 items-center">
                  <h3 className="text-xl font-medium mb-3 text-[#414141] ">
                    Rapidité de Service
                  </h3>
                  <p className="text-sm text-gray-600 text-center w-2/3 lg:w-full">
                    Nous garantissons un traitement rapide de vos commandes pour
                    assurer une expérience client fluide et efficace, minimisant
                    les délais d'attente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-10 lg:py-36 bg-[#23216c]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 max-w-[1150px] mx-auto px-3">
          <div className="basis-2/5 flex flex-col items-center md:items-start">
            <p className="text-md font-bold text-[#FEC802] mb-1">ETAPES</p>
            <h1 className="text-[45px] font-bold text-[#fff] mb-4 leading-[3.5rem] text-center md:text-start">
              Comment Ça Marche
            </h1>
            <p className="text-[#fff] text-[14px] mb-4 text-center md:text-start">
              Découvrez comment nous simplifions la confirmation de vos
              commandes pour maximiser votre succès e-commerce.
            </p>
            <button className="bg-[#FEC802] text-[#000] text-lg py-3 px-8 font-bold w-fit rounded">
              Commencez Maintenant
            </button>
          </div>
          <div className="basis-3/5 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="border-[2px] border-gray-100 px-6 py-5 flex flex-col rounded bg-[#fff] cursor-pointer hover:-translate-y-2 ">
              <div className="rounded w-12 h-12 flex items-center justify-center bg-[#FEC802] mb-4">
                <p className="text-[#000] text-xl font-bold">1</p>
              </div>
              <h4 className="text-[#000] text-[20px] font-semibold">
                Collecte des Commandes
              </h4>
              <p className="text-[#696868] text-[14px] font-medium">
                Rassemblez toutes vos commandes via notre feuille de calcul pour
                un suivi facile.
              </p>
            </div>
            <div className="border-[2px] border-gray-100 px-6 py-5 flex flex-col rounded bg-[#fff] cursor-pointer hover:-translate-y-2 ">
              <div className="rounded w-12 h-12 flex items-center justify-center bg-[#FEC802] mb-4">
                <p className="text-[#000] text-xl font-bold">2</p>
              </div>
              <h4 className="text-[#000] text-[20px] font-semibold">
                Confirmation des Commandes
              </h4>
              <p className="text-[#696868] text-[14px] font-medium">
                Notre équipe appelle vos clients pour confirmer chaque commande
                rapidement et efficacement.
              </p>
            </div>
            <div className="border-[2px] border-gray-100 px-6 py-5 flex flex-col rounded bg-[#fff] cursor-pointer hover:-translate-y-2 ">
              <div className="rounded w-12 h-12 flex items-center justify-center bg-[#FEC802] mb-4">
                <p className="text-[#000] text-xl font-bold">3</p>
              </div>
              <h4 className="text-[#000] text-[20px] font-semibold">
                Saisie des Commandes
              </h4>
              <p className="text-[#696868] text-[14px] font-medium">
                Nous saisissons les commandes dans vos plateformes de livraison
                pour assurer un traitement fluide.
              </p>
            </div>
            <div className="border-[2px] border-gray-100 px-6 py-5 flex flex-col rounded bg-[#fff] cursor-pointer hover:-translate-y-2 ">
              <div className="rounded w-12 h-12 flex items-center justify-center bg-[#FEC802] mb-4">
                <p className="text-[#000] text-xl font-bold">4</p>
              </div>
              <h4 className="text-[#000] text-[20px] font-semibold ">
                Suivi et Gestion
              </h4>
              <p className="text-[#696868] text-[14px] font-medium">
                Nous suivons vos commandes jusqu'à la livraison pour garantir la
                satisfaction de vos clients.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* section Contact  */}
      <div className="w-full pt-24  " >
        <div className="w-full max-w-[1150px] mx-auto flex flex-col items-center px-5 lg:px-15  ">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full mb-14">
            <div className="w-full basis-1/5 md:basis-2/5 flex items-center justify-center gap-4 lg:py-16">
              <img
                src={"/assets/girlCallCenter.jpg"}
                alt="logo"
                className="w-80 lg:h-73"
              />
            </div>
            <div className="w-full px-5 lg:px-0 lg:basis-1/2 flex flex-col " id="contact">
              <p className="text-4xl font-semibold text-[#495057] text-center lg:text-start">
                Contactez-Nous
              </p>
              {error !== "" && (
                <p className="text-red-600 bg-red-100 text-lg font-medium py-1 px-2 rounded mt-3">
                  {error}
                </p>
              )}
              <div className="flex flex-col lg:flex-row items-center lg:mb-3 mt-8">
                <div className="w-full mb-3 lg:mb-5 lg:mr-6">
                  <label
                    htmlFor="fname"
                    className="block text-[#000] text-md mb-1"
                  >
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Prénom"
                    className="py-2 pl-5 w-full outline-none bg-[#F3F6F9] rounded"
                    onChange={handleInputChange}
                    value={formData.firstName}
                  />
                </div>
                <div className="w-full mb-3 lg:mb-5">
                  <label
                    htmlFor="lname"
                    className="block text-[#6d6c6c] text-md mb-1"
                  >
                    Nom de Famille
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Nom de Famille"
                    className="py-2 pl-5 w-full outline-none bg-[#F3F6F9] rounded"
                    onChange={handleInputChange}
                    value={formData.lastName}
                  />
                </div>
              </div>
              <div className="w-full mb-5 lg:mb-5">
                <label
                  htmlFor="phone"
                  className="block text-[#6d6c6c] text-md mb-1"
                >
                  Numéro de Téléphone
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="Numéro de Téléphone"
                  className="py-2 pl-5 w-full outline-none bg-[#F3F6F9] rounded"
                  onChange={handleInputChange}
                  value={formData.phoneNumber}
                />
              </div>
              <button
                className="border-[3px] border-[#23216c]  text-white  bg-[#23216c] py-2 px-8 text-lg font-bold w-fit rounded"
                onClick={handleSubmit}
              >
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#23216c] " id="footer">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-16 px-5 pt-20">
  {/* First div alone in its own row on mobile, and full-width on smaller screens */}
  <div className="flex flex-col gap-5 col-span-3 md:col-span-1">
    <div>
      <img src={"/assets/logoW.jpg"} alt="logo" className="w-36" />
    </div>
    <p className="text-gray-200 text-sm font-medium">
      Chez WinCall, nous sommes spécialisés dans la confirmation des
      commandes e-commerce, offrant un service fiable pour garantir la
      satisfaction de vos clients. Notre équipe d'experts s'engage à
      optimiser chaque interaction, assurant une gestion efficace de vos
      commandes. Faites confiance à notre soutien pour renforcer la
      confiance et améliorer l'expérience client dans votre activité.
    </p>
    <div className="flex items-center gap-5 mt-2">
      <Link
        className="flex items-center justify-center bg-[#FEC802] rounded-full p-2 cursor-pointer"
        to={"https://wincreative.ma/"}
      >
        <Instagram color="#000" size={25} />
      </Link>
    </div>
  </div>

  {/* Second and Third divs in the same row on larger screens */}
  <div className="flex flex-col gap-3 col-span-1 ">
    <p className="font-bold text-lg text-[#fff] mb-3">Links</p>
    <p className="text-gray-200 text-sm font-medium cursor-pointer">
      <ScrollLink to="home"  duration={500}>
        accueil
      </ScrollLink>
    </p>
    <p className="text-gray-200 text-sm font-medium cursor-pointer">
      <ScrollLink to="about"  duration={500}>
        à propos
      </ScrollLink>
    </p>
    <p className="text-gray-200 text-sm font-medium cursor-pointer">
      <ScrollLink to="services"  duration={500}>
        services
      </ScrollLink>
    </p>
    <p className="text-gray-200 text-sm font-medium cursor-pointer">
      <ScrollLink to="contact"  duration={500}>
        contactez-nous
      </ScrollLink>
    </p>
  </div>

  <div className="flex flex-col gap-5 col-span-1">
    <p className="font-bold text-lg text-[#FEC802] mb-3">Contact Infos</p>
    <p className="text-gray-200 text-sm font-medium">06666666</p>
    <p className="text-gray-200 text-sm font-medium">Loremipsum@gmail.com</p>
  </div>
</div>

      </div>
      <div className="text-center text-gray-200 text-sm py-4 bg-[#23216c] pt-3">
        <p>© 2023 WinCall. All rights reserved.</p>
    </div>
    </div>
    
  );
}

export default LandingPage;
