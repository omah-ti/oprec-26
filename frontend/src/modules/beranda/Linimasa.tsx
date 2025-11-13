import Header from "@/modules/beranda/components/Header";
import Container from "@/components/Container";
import Image from "next/image";
import { LINIMASA_DETAIL } from "@/lib/utils";
import timelineImage from "@/assets/beranda/timeline/timeline.webp";

const Linimasa = () => {
  return (
    <Container>
      <Header>
        Timeline <span className="text-custom-orange">Open</span>{" "}
        <span className="text-custom-blue">Recruitment</span>
      </Header>

      <div className="grid grid-cols-1 gap-3 sm:auto-rows-fr sm:grid-rows-2 lg:auto-cols-fr lg:grid-cols-2 lg:grid-rows-1 lg:gap-8">
        {/* image */}
        <ImageCard />

        {/* timeline */}
        <div className="grid auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-6">
          {LINIMASA_DETAIL.map((detail, i) => (
            <LinimasaCard
              key={i}
              title={detail.title}
              date={detail.date}
              description={detail.description}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

const ImageCard = () => (
  <div
    className="relative h-full min-h-40 w-full overflow-hidden rounded-xl"
    data-gsap="down"
  >
    <Image
      className="object-cover"
      sizes="100%"
      src={timelineImage}
      alt=""
      fill
    />
  </div>
);

const LinimasaCard = ({
  title,
  date,
  description,
}: {
  title: string;
  date: string;
  description: string;
}) => (
  <div
    className="flex w-full flex-col justify-between space-y-3 rounded-xl bg-custom-gray-dark p-4"
    data-gsap="up"
  >
    {/* top part */}
    <div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <h2 className="font-medium">{date}</h2>
    </div>

    {/* bottom part */}
    <p className="text-pretty">{description}</p>
  </div>
);

export default Linimasa;
