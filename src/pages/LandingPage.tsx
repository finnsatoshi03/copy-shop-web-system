import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function LandingPage() {
  return (
    <motion.div
      className="relative h-[calc(100vh-10rem)] w-full overflow-x-hidden bg-[#f1ede1]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="container flex flex-col" variants={itemVariants}>
        <motion.div
          className="flex w-full sm:justify-center sm:text-center md:mb-3 md:mt-6"
          variants={itemVariants}
        >
          <p className="order-last w-full text-xs md:order-first lg:w-1/3">
            Scan our QR code and step into a new era of coffee ordering. Enjoy
            personalized menus, quick service, and delicious brews tailored to
            your taste. Copyshop: Your coffee, your way, your QR.
          </p>
        </motion.div>
        <motion.h1
          className="font-sans2 gradient-text order-first mb-3 mt-6 w-full text-center text-[4rem] font-black leading-[4rem] md:order-last md:mb-0 md:mt-0 md:text-[8rem] md:leading-[7rem] lg:text-[10rem] lg:leading-[9rem] xl:text-[14rem] xl:leading-[13rem]"
          variants={itemVariants}
        >
          COPYSHOP
        </motion.h1>
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
          className="absolute bottom-24 w-[50%] sm:w-[30%] md:-bottom-16 md:w-[25%] lg:-bottom-24 xl:-bottom-32"
          variants={itemVariants}
        />
      </div>
      <motion.div
        className="absolute bottom-8 left-auto flex w-full justify-center md:bottom-auto md:left-72 md:mt-6 md:justify-start"
        variants={itemVariants}
      >
        <Button
          className="rounded-full text-xs md:text-sm"
          variant={"secondary"}
        >
          Order Now
        </Button>
        <Button className="rounded-full">
          <ChevronRight className="size-3 md:size-4" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
