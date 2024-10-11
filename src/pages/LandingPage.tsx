import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3, // Delay children animation for staggered effect
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } },
};

export default function LandingPage() {
  return (
    <motion.div
      className="relative grid h-[calc(100vh-10rem)] w-full overflow-hidden bg-[#f1ede1] md:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="container flex flex-col items-center justify-center space-y-8"
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <p className="text-center text-xs">It happens over coffee</p>
          <h1 className="gradient-text font-aura text-center text-9xl font-black">
            Amiga
            <br />
            Café
          </h1>
        </motion.div>
        <motion.div
          className="flex w-full items-center sm:w-1/3 md:w-3/4"
          variants={itemVariants}
        >
          <p className="text-center text-xs md:text-sm">
            Scan our QR code and step into a new era of coffee ordering. Enjoy
            personalized menus, quick service, and delicious brews tailored to
            your taste. Copyshop: Your coffee, your way, your QR.
          </p>
        </motion.div>
        <motion.div
          className="flex w-full justify-center"
          variants={itemVariants}
        >
          <NavLink to="/menu">
            <Button
              className="rounded-full text-xs md:text-sm"
              variant={"secondary"}
            >
              Order Now
            </Button>
          </NavLink>
          <NavLink to="/menu">
            <Button className="rounded-full">
              <ChevronRight className="size-3 md:size-4" />
            </Button>
          </NavLink>
        </motion.div>
      </motion.div>
      <style>{`
      .gradient-text {
        background: radial-gradient(circle at center, #65482b, #252525 50%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        }
        `}</style>
      <div className="flex w-full justify-center">
        <motion.img
          src="/images/coffee-main.png"
          alt="3d Image of Coffee Cup with a Coffee Beans inside it"
          className="absolute bottom-24 hidden w-[70%] sm:w-[55%] md:-bottom-16 md:block md:w-[25%] lg:-bottom-24 xl:-bottom-32"
          variants={itemVariants}
        />
      </div>
    </motion.div>
  );
}
