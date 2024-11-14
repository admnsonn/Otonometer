import React, { useState, useEffect } from 'react';
import '../style/Carousel.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Carousel = () => {
  const MySwal = withReactContent(Swal);
  const handleLensaClick = () => {
    MySwal.fire({
      title: "Perhatian!",
      text: "Fitur Lensa sedang dalam tahap pengembangan.",
      showCancelButton: true,
      cancelButtonText: "Tutup",
      cancelButtonColor: "#24445a",
      customClass: {
        title: "title-icon-errorr",
        text: "text-icon",
        cancelButton: "cancel-icon",
        popup: "swal2-popup",
      },
      showConfirmButton: false,
    });
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [targetIndex, setTargetIndex] = useState(0);

  const imageSources = [
    { src: require('../assets/jelajah.png'), href: '/Jelajah'},
    { src: require('../assets/utak.png'), href: '/Utak-Atik' },
    { src: require('../assets/berkaca.png'), href: '/Berkaca' },
    { src: require('../assets/lens.png'), handleClick: handleLensaClick }
  ];

  useEffect(() => {
    const id = setInterval(() => {
      rotateCarousel();
    }, 3000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [activeIndex]);

  const rotateCarousel = () => {
    const newIndex = (activeIndex + 1) % imageSources.length;
    const rotationDegree = newIndex * 90;
    document.querySelector(".carousel").style.transform = `rotate(${rotationDegree}deg)`;
    setActiveIndex(newIndex);
  };

  const handleControlClick = (index) => {
    clearInterval(intervalId);
    setTargetIndex(index);
  };

  const animateToTargetIndex = () => {
    if (targetIndex !== activeIndex) {
      const rotationDegree = (targetIndex * 90);
      document.querySelector(".carousel").style.transform = `rotate(${rotationDegree}deg)`;
      setActiveIndex(targetIndex);
    }
  };

  useEffect(() => {
    if (targetIndex !== null) {
      const animationIntervalId = setInterval(() => {
        animateToTargetIndex();
      }, 30);

      return () => clearInterval(animationIntervalId);
    }
  }, [targetIndex]);

  return (
    <div className="slideshow">
      <div className="carousel">
      {imageSources.map(({ src, href, handleClick }, indexnya) => (
          <div key={indexnya} className={`slide ${indexnya === activeIndex ? "active" : ""}`}>
            <a 
              href={href || "#"}
              target="_self"
              rel="noopener noreferrer"
              onClick={handleClick ? handleClick : null}
            >
              <img src={src} alt={`Slide ${indexnya ++}`} />
            </a>
          </div>
        ))}
      </div><div className="controls">
        {imageSources.map((_, index) => (
          <a
            key={index}
            href="#"
            data-index={index}
            className={`${index === activeIndex? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              handleControlClick(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
