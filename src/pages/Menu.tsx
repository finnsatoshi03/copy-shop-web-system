import { useState } from "react";
import { Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Filters from "@/components/filters";
import Card from "@/components/card";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export default function Menu() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const placeholder = "Need a quick bite? We've got you covered.";

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
      <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        <Card />
      </div>
    </motion.div>
  );
}
