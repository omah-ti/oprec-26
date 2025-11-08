import Image from "next/image";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Link from "next/link";
import logo from "@/logos/logo.svg";

const TitleContent = () => (
  <h1 className="leading text-wrap font-semibold leading-tight">
    <div className="flex flex-col">
      <AnimatedGradientText className="border-none p-0 font-semibold">
        <span className="inline animate-gradient bg-gradient-to-r from-custom-peach via-custom-blue to-custom-peach bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
          Open Recruitment
        </span>
      </AnimatedGradientText>
      <span>Makomti 2024</span>
    </div>
  </h1>
);

const Title = ({ link = false }: { link?: boolean }) => {
  return (
    <>
      <div className="flex items-center gap-[13px]">
        <div className="relative aspect-square size-[38px]">
          <Image
            alt="Logo"
            className="object-cover"
            src={logo}
            sizes="100%"
            fill
          />
        </div>
        {link ? (
          <Link href={`/`}>
            <TitleContent />
          </Link>
        ) : (
          <TitleContent />
        )}
      </div>
    </>
  );
};

export default Title;
