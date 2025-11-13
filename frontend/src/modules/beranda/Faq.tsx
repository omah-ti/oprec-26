import Container from "@/components/Container";
import Header from "./components/Header";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HIMAKOM_FAQ, OMAHTI_FAQ } from "@/lib/utils";
import himakomFaq from "@/assets/beranda/faq/faq-himakom.webp";
import omahtiFaq from "@/assets/beranda/faq/faq-oti.webp";

const Faq = () => {
  return (
    <Container>
      <Header>Empowering Individuals, Building Communities</Header>

      {/* images row */}
      <div className="w-full gap-8 space-y-3 lg:flex lg:items-start lg:justify-start lg:gap-3 lg:space-y-0">
        <div className="flex flex-col gap-3 lg:w-1/2">
          <ImagesCard variant="omahti" />
        </div>

        <div className="flex flex-col gap-3 lg:w-1/2">
          <ImagesCard variant="himakom" />
        </div>
      </div>

      {/* merged FAQ title below both images */}
      <div className="mt-6 w-full rounded-lg bg-custom-gray-dark px-4 py-3 text-center font-semibold">
        Frequently Asked Questions – <span>Open Recruitment 2025</span>
      </div>

      {/* FAQ section */}
      <div className="mt-4 w-full gap-8 space-y-3 lg:flex lg:items-start lg:justify-start lg:gap-3 lg:space-y-0">
        <div className="flex flex-col gap-3 lg:w-1/2">
          <Questions variant="omahti" FAQ={OMAHTI_FAQ} />
        </div>

        <div className="flex flex-col gap-3 lg:w-1/2">
          <Questions variant="himakom" FAQ={HIMAKOM_FAQ} />
        </div>
      </div>
    </Container>
  );
};

const ImagesCard = ({
  variant = "omahti",
}: {
  variant?: "omahti" | "himakom";
}) => {
  return (
    <div
      className="relative flex min-h-52 flex-col justify-end overflow-hidden rounded-xl p-4"
      data-gsap={`${variant === "omahti" ? "right" : "left"}`}
    >
      <Image
        className="z-0 object-cover"
        sizes="100%"
        src={variant === "omahti" ? omahtiFaq : himakomFaq}
        alt=""
        fill
      />

      <p className="z-20 text-2xl font-semibold text-custom-silver">
        {variant === "omahti"
          ? "We Make IT for Everyone"
          : "Computer Love and Life"}
      </p>

      {/* gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-custom-black/70 ${variant === "omahti" ? "to-custom-orange/30" : "to-custom-blue/30"}`}
      />
    </div>
  );
};

const Questions = ({
  variant = "omahti",
  FAQ,
}: {
  variant?: "omahti" | "himakom";
  FAQ: { question: string; answer: string }[];
}) => {
  return (
    <div className="space-y-3">
      {/* <div className="w-full rounded-lg bg-custom-gray-dark px-4 py-3 font-semibold">
        Frequently Asked Questions - Open Recruitment 2025
      </div> */}

      <Accordion type="single" collapsible className="space-y-3">
        {FAQ.map((faq, i) => (
          <AccordionItem
            key={i}
            className="border-b-0"
            value={`item-${i}`}
            data-gsap="down"
          >
            <AccordionTrigger className="rounded-lg bg-custom-gray-dark p-4 py-5 text-justify text-base hover:no-underline">
              {faq.question}
              <span className="ml-4" />
            </AccordionTrigger>
            <AccordionContent className="mt-2 rounded-lg bg-custom-gray-light px-4 py-3 text-justify text-base font-medium text-custom-black">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
