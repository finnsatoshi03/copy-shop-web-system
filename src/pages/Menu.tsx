/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";

import Filters from "@/components/filters";
import Card from "@/components/card";
// import { beverages } from "@/lib/temp";
import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import PaginationControls from "@/components/pagination-controls";
import { Arrow } from "@/components/ui/arrow";
import { OrderDialog } from "@/components/orders/order-dialog";

import { usePagination } from "@/hooks/usePagination";
import { useIsMobile } from "@/hooks/useIsMobile";

import { filterBeverages } from "@/lib/helpers";
import { Beverage } from "@/lib/types";
import { useBeverages } from "@/hooks/beverages/useBeverages";

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

export default function Menu() {
  const { beverages, isLoading, error } = useBeverages();

  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [subfilters, setSubfilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 12;

  const isMobile = useIsMobile();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const navigate = useNavigate();

  const beveragesData: Beverage[] = beverages
    ? beverages.map((beverage: any) => ({
        ...beverage,
        category: [`${beverage.category} coffee`],
        price: {
          ...beverage.price,
          small: beverage.price.small || 0,
          medium: beverage.price.medium || 0,
          large: beverage.price.large || 0,
        },
        calories: {
          ...beverage.calories,
          small: beverage.calories.small || 0,
          medium: beverage.calories.medium || 0,
          large: beverage.calories.large || 0,
        },
      }))
    : [];

  const filteredItems = filterBeverages(
    beveragesData,
    activeFilter,
    subfilters,
    searchQuery,
  );
  const popularItems = beveragesData.filter((beverage) => beverage.isPopular);

  const {
    currentPage,
    totalPages,
    firstIndex,
    lastIndex,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(filteredItems.length, itemsPerPage);

  const currentItems = filteredItems.slice(firstIndex, lastIndex);

  const sliderSettings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: (
      <Arrow direction="right" onClick={() => {}} className="top-[45%]" />
    ),
    prevArrow: (
      <Arrow direction="left" onClick={() => {}} className="top-[40%]" />
    ),
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
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const handleOrderDetails = (order: Beverage) => {
    if (isMobile) {
      navigate(`/order/${order.id}`, { state: { orderDetails: order } });
    } else {
      setDialogOpen(true);
      setOrderDetails(order);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <motion.div
        className="container mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-xl font-bold leading-4">
          RKYVE
          <br />
          <span className="text-lg font-normal"> Study/Cospace Café</span>
        </h1>

        <div className="my-4 flex items-stretch gap-2">
          <PlaceholdersAndVanishInput
            className="max-w-xl"
            placeholder="Need a quick bite? We've got you covered."
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={(e) => e.preventDefault()}
          />
          <Button
            className={`h-12 rounded-xl ${
              showFilters
                ? "bg-zinc-600 text-white"
                : "bg-transparent text-black"
            }`}
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="opacity-70" />
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <Filters
              showFilters={showFilters}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setSubfilters={setSubfilters}
              subfilters={subfilters}
            />
          )}
        </AnimatePresence>

        {searchQuery === "" && (activeFilter === "All" || !activeFilter) && (
          <>
            <h1 className="text-lg font-bold">Best Sellers</h1>
            <p className="text-sm italic leading-3 opacity-60">
              What everyone's loving.
            </p>
            <Slider {...sliderSettings}>
              {popularItems.map((beverage, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="h-[350px] px-1 py-3 md:h-[320px] md:px-3 lg:h-[350px]"
                >
                  <Card
                    data={beverage as Beverage}
                    onDetails={handleOrderDetails}
                  />
                </motion.div>
              ))}
            </Slider>
          </>
        )}

        <motion.div
          className="mt-4"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {currentItems.map((beverage, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative"
              >
                <Card data={beverage} onList onDetails={handleOrderDetails} />
              </motion.div>
            ))}
          </div>
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              firstItemIndex={firstIndex}
              lastItemIndex={lastIndex}
              totalItems={filteredItems.length}
              onNext={goToNextPage}
              onPrevious={goToPreviousPage}
              onFirst={goToFirstPage}
              onLast={goToLastPage}
            />
          )}
        </motion.div>
        <OrderDialog
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          orderDetails={orderDetails}
        />
      </motion.div>
    </>
  );
}
