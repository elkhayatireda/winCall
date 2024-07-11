// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// const images = [
//   '/assets/landing1.png',
//   '/assets/landing2.png',
//   '/assets/landing3.png',
//   '/assets/landing1.png',
//   '/assets/landing2.png',
//   '/assets/landing3.png',
// ];

// const SPRING_OPTIONS = {
//   type: "spring",
//   mass: 3,
//   stiffness: 400,
//   damping: 50,
// };

// export const SwipeCarousel = () => {
//   const [width, setWidth] = useState(0);
//   const carousel = useRef();

//   useEffect(() => {
//     setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
//   }, []);

//   return (
//     <motion.div ref={carousel} className="carousel cursor-grab overflow-hidden mx-20">
//       <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel flex">
//         {images.map((imgSrc, idx) => (
//           <ScrollableImage src={imgSrc} key={idx}  />
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// const ScrollableImage = ({ src }) => {
//   const controls = useAnimation();
//   const [imgHeight, setImgHeight] = useState(0);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     if (imgRef.current) {
//       setImgHeight(imgRef.current.clientHeight);
//     }
//   }, []);

//   const startScrolling = () => { 
//       controls.start({
//         y: -(imgHeight - 550), // Move the image up to reveal its full height
//         transition: {
//           ease: "linear",
//           duration: (imgHeight - 550) / 200, // Adjust duration based on image height
//         },
//       });
//   };

//   const stopScrolling = () => {
//     controls.stop();
//     controls.set({ y: 0 }); // Reset position when hover ends
//   };

//   return (
//     <motion.div className="item h-[550px] min-w-[350px] p-5 overflow-hidden">
//       <motion.img
//         src={src}
//         alt=""
//         className="w-full h-auto"
//         animate={controls}
//         onHoverStart={startScrolling}
//         onHoverEnd={stopScrolling}
//         ref={imgRef}
//       />
//     </motion.div>
//   );
// };
///////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useRef, useState } from "react";
// import { motion, useAnimation } from "framer-motion";

// const images = [
//   '/assets/landing1.png',
//   '/assets/landing2.png',
//   '/assets/landing3.png',
//   '/assets/landing1.png',
//   '/assets/landing2.png',
//   '/assets/landing3.png',
// ];

// const SPRING_OPTIONS = {
//   type: "spring",
//   mass: 3,
//   stiffness: 400,
//   damping: 50,
// };

// export const SwipeCarousel = () => {
//   const [width, setWidth] = useState(0);
//   const carousel = useRef();

//   useEffect(() => {
//     setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
//   }, []);

//   return (
//     <motion.div ref={carousel} className="carousel cursor-grab overflow-hidden mx-20">
//       <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel flex">
//         {images.map((imgSrc, idx) => (
//           <ScrollableImage src={imgSrc} key={idx} />
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// const ScrollableImage = ({ src }) => {
//   const xControls = useAnimation();
//   const yControls = useAnimation();
//   const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
//   const imgRef = useRef(null);

//   useEffect(() => {
//     if (imgRef.current) {
//       const { width, height } = imgRef.current.getBoundingClientRect();
//       setImgDimensions({ width, height });
//     }
//   }, []);

//   const startScrollingX = () => {
//     xControls.start({
//       x: -(imgDimensions.width - 350), // Adjust 350 to fit your container width
//       transition: {
//         ease: "linear",
//         duration: (imgDimensions.width - 350) / 200, // Adjust duration based on image width
//       },
//     });
//   };

//   const stopScrollingX = () => {
//     xControls.stop();
//     xControls.set({ x: 0 });
//   };

//   const startScrollingY = () => {
//     yControls.start({
//       y: -(imgDimensions.height - 550), // Adjust 550 to fit your container height
//       transition: {
//         ease: "linear",
//         duration: (imgDimensions.height - 550) / 200, // Adjust duration based on image height
//       },
//     });
//   };

//   const stopScrollingY = () => {
//     yControls.stop();
//     yControls.set({ y: 0 });
//   };

//   return (
//     <motion.div
//       className="item h-[550px] min-w-[350px] p-5 overflow-hidden"
//       onHoverStart={startScrollingX}
//       onHoverEnd={stopScrollingX}
//       onMouseDown={(event) => event.stopPropagation()}
//     >
//       <motion.img
//         src={src}
//         alt=""
//         className="w-full h-auto"
//         animate={yControls}
//         drag="y"
//         dragConstraints={{ top: 0, bottom: -(imgDimensions.height - 550) }} // Adjust 550 to fit your container height
//         onDragStart={startScrollingY}
//         onDragEnd={stopScrollingY}
//         ref={imgRef}
//       />
//     </motion.div>
//   );
// };

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const images = [
  '/assets/landing1.png',
  '/assets/landing2.png',
  '/assets/landing3.png',
  '/assets/landing1.png',
  '/assets/landing2.png',
  '/assets/landing3.png',
];

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};



export const SwipeCarousel = () => {
  const [width, setWidth] = useState(0);
  const [widthZ, setWidthZ] = useState(-1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  const [currentIndex, setCurrentIndex] = useState(selectedImage);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    setCurrentIndex(selectedImage);
  }, [selectedImage]);

  return (
    <>
    <div>
      <motion.div ref={carousel} className="carousel cursor-grab overflow-hidden mx-20">
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel flex">
          {images.map((imgSrc, idx) => (
            <motion.div className="item h-[550px] min-w-[350px] p-5" key={idx}>
              {/* <img
                src={imgSrc}
                alt=""
                className="w-full pointer-events-auto cursor-pointer"
                onClick={() => handleImageClick(idx)}
              /> */}
              <div className="overflow-y-scroll w-full h-full hide-scrollbar"  onDoubleClick={() => handleImageClick(idx)}>
                <img
                  src={imgSrc}
                  alt=""
                  className="w-full pointer-events-none "
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </div>
      {lightboxOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
          className="absolute top-5 right-5 text-white z-50 cursor-pointer bg-gray-800"
          onClick={()=>closeLightbox()}
        >
          Close
        </button>
        <motion.div className="relative w-full h-full flex items-center justify-center">
          <button className="absolute left-5 text-white z-60" onClick={()=>handlePrev()}>
            Prev
          </button>
          {widthZ !== -1 && 

            <div className="overflow-y-scroll h-full z-50 w-[400px] hide-scrollbar">
            <img src={images[currentIndex]} alt="" className="w-full  z-50" />
            </div>
          }
          {widthZ == -1 && 
         
          <img src={images[currentIndex]} alt="" className="max-w-full max-h-full z-50" onDoubleClick={()=>setWidthZ(11)} />
        
          }
          <button className="absolute right-5 text-white z-60" onClick={()=>handleNext()}>
            Next
          </button>
        </motion.div>
      </div>
    
    )}
    </>
  );
};
