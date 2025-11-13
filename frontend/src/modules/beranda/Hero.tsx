import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import Link from "next/link";
import Marquee from "@/components/ui/marquee";
import { House } from "lucide-react";
import omahtiModel from "@/assets/beranda/hero/omahtiModel.webp";
import himakomModel from "@/assets/beranda/hero/himakomModel.webp";

const Hero = () => {
  return (
    <>
      <Container
        parentClass=" "
        className="flex h-[67vh] w-full flex-col items-center justify-end gap-4 bg-custom-black pb-10 xs:h-[32rem] sm:h-[75vh]"
      >
        {/* logo himakom omahti */}
        <Logos />

        {/* title and cta button */}
        <TitleCTA />

        {/* gradients, and circle in the background */}
        <Background />
      </Container>
      <BenefitsMarquee />
    </>
  );
};

const TitleCTA = () => (
  <div className="z-20 mb-10 flex flex-col items-center gap-4">
    <h1 className="text-center text-3xl font-semibold drop-shadow-xl sm:text-5xl">
      Be Great. Be Us.
    </h1>
    <div className="flex flex-row items-center justify-center gap-4">
      <Link href={`dashboard`}>
        <Button
          variant={`white`}
          size={`lg`}
          className="duration-250 relative z-50 shadow-[0_10px_25px_rgba(255,255,255,0.45)] transition-all ease-in-out hover:shadow-[0_8px_25px_rgba(255,255,255,0.65)]"
        >
          Daftar Sekarang
        </Button>
      </Link>
      <Link href={`guidebook`}>
        <Button
          variant={`secondary`}
          size={`lg`}
          className="duration-250 relative z-50 shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-all ease-in-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.7)]"
        >
          Lihat Guidebook
        </Button>
      </Link>
    </div>
  </div>
);

const Logos = () => (
  <div className="z-20 flex items-center gap-4">
    <Image src={omahti} alt="OmahTI Logo" className="h-8 w-auto" priority />
    <Image src={himakom} alt="Himakom Logo" className="h-8 w-auto" priority />
  </div>
);

const Background = () => (
  <>
    {/* gradient wrapper biar gak tembus bawah */}
    <div className="absolute inset-0 overflow-hidden">
      {/* image layer */}
      <div className="relative h-[600px] w-full">
        <Image
          className="absolute -right-[2rem] top-6 z-10 h-[80vh] w-full min-w-[500px] object-contain xxs:right-[2.7rem] xs:right-[9rem]"
          src={omahtiModel}
          width={503}
          height={906}
          alt=""
          priority
        />
        <Image
          className="absolute -left-[2rem] top-6 z-10 h-[80vh] w-full min-w-[500px] object-contain p-8 xxs:left-[2.7rem] xs:left-[9rem]"
          src={himakomModel}
          width={500}
          height={906}
          alt=""
          priority
        />
      </div>

      {/* circle in the background */}
      <div className="absolute bottom-[-10rem] left-1/2 z-0 aspect-square w-full max-w-2xl -translate-x-1/2 rounded-full bg-custom-gray sm:bottom-[-12rem] md:bottom-[-13rem] lg:bottom-[-14rem]" />

      {/* gradients */}
      <div className="absolute bottom-0 left-1/2 z-10 h-[85%] w-full bg-gradient-to-t from-custom-blue/100 via-custom-blue/20 to-transparent opacity-100 blur-2xl" />
      <div className="absolute bottom-0 right-1/2 z-10 h-[85%] w-full bg-gradient-to-t from-custom-orange/100 via-custom-orange/20 to-transparent opacity-100 blur-2xl" />

      {/* mask layer to stop gradient overflow */}
      <div className="absolute bottom-0 left-0 z-20 h-[45px] w-full bg-custom-black sm:h-[55px]" />
    </div>
  </>
);

const BenefitsMarquee = () => {
  const Benefits = [
    "Hardskill and Softskill",
    "The Best in The Field",
    "Projects and Portfolio",
    "Relational Experience",
  ];

  return (
    <div className="relative z-50 mt-3 w-full overflow-visible xs:-mt-10 sm:-mt-12 lg:-mt-12">
      {/* Left shadow */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-20 hidden h-10 w-6 bg-gradient-to-r from-custom-gray-dark/100 to-transparent xs:block sm:h-16 md:h-20 md:w-20"
        aria-hidden="true"
      />

      {/* Right shadow */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-20 hidden h-10 w-6 bg-gradient-to-l from-custom-gray-dark/100 to-transparent xs:block sm:h-16 md:h-20 md:w-20 lg:w-28"
        aria-hidden="true"
      />

      {/* Marquee content */}
      <div className="z-60 relative bottom-1 flex justify-center xs:bottom-[0.35rem] sm:bottom-2">
        <Marquee className="flex items-center bg-custom-gray-dark">
          {Benefits.map((benefit, i) => (
            <div
              key={i}
              className="mx-1 flex shrink-0 flex-row items-center justify-center gap-1.5 rounded-xl px-2 py-1.5 text-xs font-medium text-custom-silver xs:mx-2 xs:px-3 xs:py-2 xs:text-sm sm:mx-4 sm:px-4 sm:py-2.5 sm:text-base md:mx-6 md:px-6 md:py-3 md:text-base lg:mx-8 lg:px-8 lg:py-5 lg:text-lg"
            >
              <House
                size={20}
                className="h-4 w-4 xs:h-4 xs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
              />
              <span className="text-center">{benefit}</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* bottom mask */}
      <div className="absolute bottom-0 left-0 z-30 h-[6px] w-full bg-custom-black xs:h-[8px] sm:h-[10px]" />
    </div>
  );
};

export default Hero;
