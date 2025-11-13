import { Smile } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <section className="font-semibold flex flex-col items-center justify-center w-full min-h-screen leading-none bg-custom-black">
        <h1 className="text-[10vw]">
          <span className="text-custom-orange">4</span>
          <span>0</span>
          <span className="text-custom-blue">4</span>
        </h1>
        <h2 className="text-[2vw] flex gap-[1vw]">
          <Smile className="w-[2vw] aspect-square" /> Oops! ada yang salah nih bossssssssssssssssht
        </h2>
      </section>
    </>
  );
};

export default NotFound;