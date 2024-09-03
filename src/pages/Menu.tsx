/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";

import Filters from "@/components/filters";
import Card from "@/components/card";
import { beverages } from "@/lib/temp";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Custom Left Arrow
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} absolute -left-4 top-[40%] z-10 -translate-y-1/2 transform md:-left-8`}
      style={{ ...style }}
      onClick={onClick}
    >
      <ChevronLeft
        size={24}
        className="rounded-full bg-gray-300 p-0.5 text-white hover:bg-gray-400"
      />
    </button>
  );
}

// Custom Right Arrow
function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} absolute -right-4 top-[40%] z-10 -translate-y-1/2 transform md:-right-8`}
      style={{ ...style }}
      onClick={onClick}
    >
      <ChevronRight
        size={24}
        className="rounded-full bg-gray-300 p-0.5 text-white hover:bg-gray-400"
      />
    </button>
  );
}

export default function Menu() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const placeholder = "Need a quick bite? We've got you covered.";
  const beveragesData = beverages;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h1 className="text-xl font-bold leading-4">
        Your Coffee,
        <br />
        <span className="text-lg font-normal">Your Way, Your QR.</span>
      </h1>

      {/* Search and Filter Button */}
      <div className="my-4 flex items-stretch gap-2">
        <PlaceholdersAndVanishInput
          placeholder={placeholder}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
        <Button
          className={`h-12 rounded-xl ${
            showFilters ? "bg-zinc-600 text-white" : "bg-transparent text-black"
          }`}
          variant="outline"
          onClick={toggleFilters}
        >
          <Filter size={16} className="opacity-70" />
        </Button>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <Filters
            showFilters={showFilters}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        )}
      </AnimatePresence>

      {/* Items */}
      <Slider {...sliderSettings}>
        {beveragesData.map((beverage, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="h-[320px] p-3 lg:h-[350px]"
          >
            <Card data={beverage} />
          </motion.div>
        ))}
      </Slider>
    </motion.div>
  );
}
