import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Sofas & Cushion Materials",
    products: [
      {
        name: "Customized Sofas",
        image: "/images/products/customised_sofa.png",
        description:
          "Crafted to perfection, our customized sofas are designed to suit your unique taste and space. Choose your fabric, foam, size, and style — and bring home a luxurious seating experience that’s uniquely yours.",
      },
      {
        name: "Various Types of Foams",
        image: "/images/products/types_of_foams.png",
        description:
          "From high-resilience to memory and PU foam, we offer a wide variety tailored for comfort, support, and longevity. Ideal for cushions, sofas, mattresses, and commercial furniture needs.",
      },
      {
        name: "Velvet & Sofa Fabrics",
        image: "/images/products/velvet.png",
        description:
          "Explore an elegant range of premium velvet and textured fabrics to upgrade your interiors. Whether you're reupholstering or designing new furniture, our materials promise both luxury and durability.",
      },
      {
        name: "Rexine",
        image: "/images/products/rexine.png",
        description:
          "A perfect leatherette alternative, our rexine offers a stylish look with waterproof, scratch-resistant durability — ideal for modern sofas, chairs, car interiors, and more.",
      },
      {
        name: "Adhesive",
        image: "/images/products/adhesive.png",
        description:
          "Our high-strength adhesive bonds foam, wood, and fabrics seamlessly. Designed for professional-grade upholstery work, it dries fast and holds strong for long-lasting furniture.",
      },
      {
        name: "Hitlon",
        image: "/images/products/hitlon.png",
        description:
          "Hitlon provides soft yet firm cushioning that retains shape and comfort over time. It's perfect for sofa backrests, arm support, and designer cushions that need a premium touch.",
      },
    ],
  },
  {
    id: 2,
    title: "Mattress & Accessories",
    products: [
      {
        name: "Ready And Customised Mattresses",
        image: "/images/products/Customized_Mattress.png",
        description:
          "Say goodbye to back pain with our range of orthopedic, memory foam, and custom-sized mattresses. Designed to align your spine and support deep, refreshing sleep every night.",
      },
      {
        name: "Pillows",
        image: "/images/products/Pillow.png",
        description:
          "Sink into blissful comfort with our plush pillows. Available in multiple densities, they cradle your neck and shoulders to relieve stress and improve sleep quality.",
      },
      {
        name: "Customized Headboard Cushions",
        image: "/images/products/headboard_cusion.png",
        description:
          "Add a plush, stylish backrest to your bed with our customized headboard cushions. These soft, upholstered accents offer superior comfort while reading, relaxing, or watching TV.",
      },
    ],
  },
  {
    id: 3,
    title: "Curtains & Accessories",
    products: [
      {
        name: "Ready and Customised Curtains",
        image: "/images/products/Curtains.png",
        description:
          "Give your windows a makeover with our wide selection of ready-made and custom-designed curtains. Choose from blackout, sheer, and decorative fabrics to match your interiors perfectly.",
      },
      {
        name: "Custom Pipes and Brackets",
        image: "/images/products/Customized_Brackets.png",
        description:
          "Support your curtains with stylish, sturdy pipes and brackets available in various finishes. Designed for seamless movement and long-lasting performance even with daily use.",
      },
      {
        name: "M-Track and All Other Type of Curtain Tracks",
        image: "/images/products/m_track.png",
        description:
          "Smooth, silent, and durable — our M-tracks and other modern tracking systems ensure flawless curtain flow. Ideal for homes, offices, hotels, and large panel windows.",
      },
    ],
  },
  {
    id: 4,
    title: "Window Blinds",
    products: [
      {
        name: "Virtical Blinds",
        image: "/images/products/v_blinds.png",
        description:
          "Control light and privacy with precision using our stylish vertical blinds. Ideal for wide windows and patios, these add modern elegance to your interiors.",
      },
      {
        name: "Roller Blinds",
        image: "/images/products/Roller_Blinds.png",
        description:
          "Roller blinds offer a sleek, minimalist look while providing complete control over sunlight and privacy. Available in a wide range of fabrics and finishes.",
      },
      {
        name: "Roman Blinds",
        image: "/images/products/Roman_Blinds.png",
        description:
          "Classic charm meets modern design. Roman blinds add a soft, luxurious touch to any room and come in bold prints, solids, or subtle textures.",
      },
      {
        name: "Wooden Venetian Blinds",
        image: "/images/products/Wooden_blinds.png",
        description:
          "Crafted from premium wood, these blinds bring a timeless natural beauty to your space. Perfect for cozy homes and rustic interiors.",
      },
      {
        name: "Zebra Blinds",
        image: "/images/products/Zebra_Blinds.png",
        description:
          "With alternating sheer and opaque stripes, zebra blinds allow flexible light filtering while adding a modern, layered look to your windows.",
      },
      {
        name: "Honeycomb Blinds",
        image: "/images/products/HoneyComb_Blinds.png",
        description:
          "Insulate your room from heat and noise with honeycomb blinds. Their cellular design traps air, keeping you comfortable all year round.",
      },
      {
        name: "Sky Light Blinds",
        image: "/images/products/skylight_blinds.png",
        description:
          "Custom-fitted for skylights, these blinds offers glare reduction and heat protection while allowing you to control natural light beautifully.",
      },
      {
        name: "Monsoon Blinds",
        image: "/images/products/Mansoon_Blinds.png",
        description:
          "Built to withstand heavy rains and high winds, our monsoon blinds protect balconies and outdoor spaces while maintaining visibility and ventilation.",
      },
      {
        name: "Bamboo Chip Blinds",
        image: "/images/products/Bamboo_Chip_Blinds.png",
        description:
          "Add an earthy, natural vibe with our handcrafted bamboo chip blinds. They’re eco-friendly, durable, and perfect for tropical or Zen-inspired interiors.",
      },
      {
        name: "Customized Blinds",
        image: "/images/products/Customized_Blinds.png",
        description:
          "Personalize your space with blinds crafted to your exact needs — from color to size, texture, and mechanism, we design it all.",
      },
    ],
  },
  {
    id: 5,
    title: "Vinyle Flooring & Wallpapers",
    products: [
      {
        name: "All Types of Vinyle Flooring",
        image: "/images/products/All_Vinely_Flooring.png",
        description:
          "Vinyle flooring is the perfect combination of function and style. Waterproof, slip-resistant, and easy to clean — it's ideal for both homes and commercial use.",
      },
      {
        name: "GYM Rubber Flooring",
        image: "/images/products/Gym_flooring.png",
        description:
          "Absorb impact and reduce injury with our rugged gym rubber flooring. It’s non-slip, shock-absorbent, and perfect for heavy workout zones.",
      },
      {
        name: "Kids Playarea Flooring",
        image: "/images/products/Kids_playarea_Flooring.png",
        description:
          "Colorful, cushioned, and child-safe — our flooring is specially designed to make play areas fun, hygienic, and fall-safe for little ones.",
      },
      {
        name: "Hospital OT Flooring",
        image: "/images/products/Hospital_OT_Florring.png",
        description:
          "Our anti-microbial, static-resistant flooring is made for cleanroom environments like hospital OTs, labs, and diagnostics areas where hygiene is critical.",
      },
      {
        name: "All Types of Ready and Customized Wallpapers",
        image: "/images/products/Customized_Wallpaper.png",
        description:
          "Transform your walls with stunning 3D wallpapers, textured prints, and artistic designs — all tailored to your space and personality.",
      },
    ],
  },
];

const App = () => {
  const scrollRefs = useRef({});
  const [scrollVisible, setScrollVisible] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect runs only once when the component mounts
    // It sets isLoaded to true after a slight delay to trigger the on-load animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

    useEffect(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
  
      elements.forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, []);

  useEffect(() => {
    const checkScrollVisibility = () => {
      const newState = {};
      categories.forEach((category) => {
        const el = scrollRefs.current[category.id];
        if (el) {
          newState[category.id] = el.scrollWidth > el.clientWidth;
        }
      });
      setScrollVisible(newState);
    };

    checkScrollVisibility();
    window.addEventListener("resize", checkScrollVisibility);
    return () => window.removeEventListener("resize", checkScrollVisibility);
  }, [categories]);

  const scroll = (id, direction) => {
    const container = scrollRefs.current[id];
    if (container) {
      container.scrollBy({
        left: direction === "right" ? 300 : -300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-100 p-5 md:p-10 font-sans">
      <h1 className={`text-center text-4xl sm:text-5xl font-extrabold mb-10 text-gray-800 animate-on-load ${isLoaded ? 'is-visible' : ''}`}>Our Products</h1>
      
      {categories.map((category) => (
        <div key={category.id} className="mb-12 animate-on-scroll">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 border-l-4 border-indigo-600 pl-4 animate-on-scroll">
            {category.title}
          </h2>

          <div className="relative">
            {scrollVisible[category.id] && (
              <>
                <button
                  className="absolute top-1/2 -translate-y-1/2 left-5 z-10 bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-black/80 hover:scale-110 hover:shadow-2xl"
                  onClick={() => scroll(category.id, "left")}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute top-1/2 -translate-y-1/2 right-5 z-10 bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-black/80 hover:scale-110 hover:shadow-2xl"
                  onClick={() => scroll(category.id, "right")}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <div
              className="flex overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden gap-6 px-1"
              ref={(el) => (scrollRefs.current[category.id] = el)}
            >
              {category.products.map((product, index) => (
                <div 
                  className="flex-none w-60 sm:w-52 md:w-64 h-[410px] sm:h-[380px] md:h-[410px] bg-white rounded-xl p-4 flex flex-col items-start shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl snap-center animate-on-scroll" 
                  key={index}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg mb-2"
                    loading="lazy"
                  />
                  <h3 className="text-lg font-semibold mb-1 text-gray-800 min-h-[40px] overflow-hidden">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-tight flex-grow overflow-hidden text-ellipsis">
                    {product.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;