import { useState, useEffect } from "react";
import Image from "next/image";

export default function Slide() {
  const images = [
    "/image/slideIMAGE.jpeg",
    "/image/bannersite.png",
    "/image/slideIMAGE.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000); // Muda a cada 3 segundos
    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="relative w-full h-60 sm:h-80 md:h-96 overflow-hidden">
      {/* Imagem do slider */}
      <div className="absolute inset-0">
        <Image
          src={images[currentIndex]}
          alt={`Imagem do slide ${currentIndex + 1}`}
          className="object-cover"
          width={50001}
          height={5000}
          priority
        />
      </div>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100 focus:outline-none z-10"
        aria-label="Slide anterior"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full opacity-50 hover:opacity-100 focus:outline-none z-10"
        aria-label="Próximo slide"
      >
        &#10095;
      </button>

      {/* Indicadores de slide (pontos) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full bg-white opacity-50 cursor-pointer hover:opacity-100 ${
              currentIndex === index ? "opacity-100" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
