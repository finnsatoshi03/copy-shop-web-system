export default function LandingPage() {
  return (
    <div>
      <div className="relative h-[calc(100vh-10rem)] w-full overflow-x-hidden bg-[#f1ede1]">
        <div className="container flex flex-col">
          <div className="flex w-full sm:justify-center sm:text-center md:mb-3 md:mt-6">
            <p className="order-last w-full text-xs md:order-first lg:w-1/3">
              Scan our QR code and step into a new era of coffee ordering. Enjoy
              personalized menus, quick service, and delicious brews tailored to
              your taste. Copyshop: Your coffee, your way, your QR.
            </p>
          </div>
          <h1 className="font-sans2 gradient-text order-first mb-3 mt-6 w-full text-center text-[4rem] font-black leading-[4rem] md:order-last md:mb-0 md:mt-0 md:text-[8rem] md:leading-[7rem] lg:text-[10rem] lg:leading-[9rem] xl:text-[14rem] xl:leading-[13rem]">
            COPYSHOP
          </h1>
        </div>
        <style>{`
        .gradient-text {
          background: radial-gradient(circle at center, #65482b, #252525 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          }
          `}</style>
        <img
          src="/images/coffee-main.png"
          alt="3d Image of Coffee Cup with a Coffee Beans inside it"
          className="absolute bottom-24 left-1/2 w-[50%] -translate-x-1/2 transform md:-bottom-16 md:w-[25%] lg:-bottom-24 xl:-bottom-32"
        />
      </div>
    </div>
  );
}
