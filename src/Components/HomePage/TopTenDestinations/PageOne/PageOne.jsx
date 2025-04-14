import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sparkles from "./Sparkle";
import "./PageOne.css";



const img1 = "./assets/images/home-images/img1.png";
const img2 = "./assets/images/home-images/img2.jpg";
const img3 = "./assets/images/home-images/img3.jpg";

const homeImages = [
  { src: img1, alt: "starting" },
  { src: img2, alt: "Temple Entrance" },
  { src: img3, alt: "Cave Exploration" },
];


const PageOne = ({scrollPercentage}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showText, setShowText] = useState(false);

  const [showSecondImage, setShowSecondImage] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const windowHeight = window.innerHeight;

      // Switch images when scrolling down
      if (position > 100) {
        setShowSecondImage(true);
       
      } else {
        setShowSecondImage(false);
        
      }
    }

    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timer;

    if (currentImage === 0) {
      // After the first image zooms out, show "A" after 1.5 seconds
      timer = setTimeout(() => {
        setShowText(true);
      }, 1500);
    }

    // Change image every 3 seconds
    const imageTimer = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev === 0) setShowText(true); // Hide "A" before transitioning
        return prev < homeImages.length - 1 ? prev + 1 : prev;
      });
    }, 4000);

    return () => {
      clearInterval(imageTimer);
      clearTimeout(timer);
    };
  }, [currentImage]);

  return (
    
      
      
      <div className="home-container">
        

        {!showSecondImage &&
          homeImages.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className="home-image "
              initial={{ opacity: 0 }}
              animate={
                currentImage === index
                  ? index === 0
                    ? { scale: [1.5, 1], opacity: 1 }
                    : { opacity: [0.3, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{ display: index === 2 && scrollPercentage > 0 ? 'none' : 'block' }}
            />
          ))}


        {/*-----Text in Home Page-------*/}
        {!showSecondImage && showText && (
          <motion.div
            className="home-text"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="home-heading">
            
              {" "}
              
              Explore <br />
              <Sparkles style = {{color:"#FFF"}}>
              Andhra Pradesh{" "}
              </Sparkles>
            </h1>
            <p className="home-content">
              "Land of ancient glory and modern marvels,
              <br />
              Where tradition thrives and progress sparkles."
            </p>
          </motion.div>
        )}
      </div>

      
    
  );
};

export default PageOne;
