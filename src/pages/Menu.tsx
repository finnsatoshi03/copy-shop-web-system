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
import PaginationControls from "@/components/pagination-controls";

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

const listContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1, staggerChildren: 0.1, when: "beforeChildren" },
  },
};

// Custom Left Arrow with animation
function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ChevronLeft
      size={24}
      className={`${className} absolute -left-4 top-[40%] z-10 hidden -translate-y-1/2 transform rounded-full bg-gray-300 p-0.5 text-white hover:bg-gray-400 hover:text-white md:-left-8 md:block`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

// Custom Right Arrow with animation
function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <ChevronRight
      size={24}
      className={`${className} absolute -right-4 top-[45%] z-10 hidden -translate-y-1/2 transform rounded-full bg-gray-300 p-0.5 text-white hover:bg-gray-400 hover:text-white md:-right-8 md:block`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

export default function Menu() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const placeholder = "Need a quick bite? We've got you covered.";
  const beveragesData = beverages;
  const popularItems = beveragesData.filter((beverage) => beverage.isPopular);

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

  // Pagination calculations
  const totalItems = beveragesData.length;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = beveragesData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
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
          arrows: false, // Hide arrows below this breakpoint
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false, // Hide arrows below this breakpoint
        },
      },
    ],
  };

  return (
    <motion.div
      className="container mb-8"
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

      {/* Popular */}
      <h1 className="text-lg font-bold">Best Sellers</h1>
      <p className="text-sm italic leading-3 opacity-60">
        What everyone's loving.
      </p>
      <Slider {...sliderSettings}>
        {popularItems.map((beverage, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="h-[350px] px-1 py-3 sm:h-[320px] md:px-3 lg:h-[350px]"
          >
            <Card data={beverage} />
          </motion.div>
        ))}
      </Slider>

      {/* Items List with Pagination */}
      <motion.div
        className="mt-4"
        variants={listContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {currentItems.map((beverage, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative"
            >
              <Card data={beverage} onList />
            </motion.div>
          ))}
        </div>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          firstItemIndex={firstIndex}
          lastItemIndex={lastIndex}
          totalItems={totalItems}
          onNext={goToNextPage}
          onPrevious={goToPreviousPage}
          onFirst={goToFirstPage}
          onLast={goToLastPage}
        />
      </motion.div>
    </motion.div>
  );
}
