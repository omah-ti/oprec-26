// src/modules/beranda/makomti/Makomti.tsx
import React from "react";
import { Makomti as MakomtiData } from "@/helpers/DataMakomti";
import Image from "next/image";
import himakomLogo from "@/assets/beranda/about/slug/himakomLogo.png";
import omahtiLogo from "@/assets/beranda/about/slug/omahtiLogo.png";
import omahti from "@/assets/beranda/about/omahti.webp";
import himakom from "@/assets/beranda/about/himakom.webp";
import NotFound from "@/not-found";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowLeft } from "lucide-react";
import ProjectsSwiper from "./components/Swiper";
import BE from "@/assets/logo/putih/BE.png";
import CP from "@/assets/logo/putih/CP.png";
import CySec from "@/assets/logo/putih/CySec.png";
import DSAI from "@/assets/logo/putih/DSAI.png";
import FE from "@/assets/logo/putih/FE.png";
import GameDev from "@/assets/logo/putih/GameDev.png";
import MobApps from "@/assets/logo/putih/MobApps.png";
import UIUX from "@/assets/logo/putih/UIUX.png";
import HR from "@/assets/logo/himakom/hr.png";
import IPC from "@/assets/logo/himakom/ipc.png";
import Media from "@/assets/logo/himakom/media.png";
import PR from "@/assets/logo/himakom/pr.png";
import SF from "@/assets/logo/himakom/s&f.png";
import Secretary from "@/assets/logo/himakom/secretary.png";
import SD from "@/assets/logo/himakom/skillDev.png";
import Treasurer from "@/assets/logo/himakom/treasurer.png";

const omahtiLogos = {
  BE: BE,
  CP: CP,
  CySec: CySec,
  DSAI: DSAI,
  FE: FE,
  "Game Dev": GameDev,
  "Mob Apps": MobApps,
  "UI/UX": UIUX,
};

const himakomLogos = {
  HR: HR,
  IPC: IPC,
  Media: Media,
  PR: PR,
  "S&F": SF,
  Secretary: Secretary,
  "Skill Dev": SD,
  Treasurer: Treasurer,
};

interface MakomtiProps {
  makomti: string;
}

const Makomti: React.FC<MakomtiProps> = ({ makomti }) => {
  const data = MakomtiData.find((item) => item.id === makomti);
  const logo = makomti === "himakom" ? himakomLogo : omahtiLogo;
  const bgImage = makomti === "himakom" ? himakom : omahti;
  const logos = makomti === "himakom" ? himakomLogos : omahtiLogos;

  if (!data) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-custom-black text-white">
      {/* Hero Image */}
      <div className="relative h-64">
        <Image
          src={bgImage}
          alt="Background"
          className="object-cover brightness-75"
          fill
          priority
        />
      </div>
      <div className="absolute top-8 ml-[min(5vw,32px)]">
        <ButtonLink href="/">
          <ArrowLeft className="h-5" />
          Kembali
        </ButtonLink>
      </div>

      {/* Content Container */}
      <div className="relative z-10 -mt-[10rem] flex h-full flex-col gap-4 py-6 xl:flex-row">
        {/* Organization Card */}
        <div className="mx-[min(5vw,32px)] my-8 flex flex-col rounded-lg bg-custom-gray-dark p-6 lg:flex-row xl:mr-0 xl:w-[23%] xl:flex-col">
          <div className="flex items-center gap-4 xl:flex-col">
            <Image
              src={logo}
              alt={`${data.nama} Logo`}
              width={568}
              height={568}
              className="aspect-square w-20 rounded-full border border-white xl:w-[10rem]"
              priority
            />
            <div className="xl:text-center">
              <h1 className="text-2xl font-bold">{data.nama}</h1>
              <p className="text-gray-300">{data.namaLengkap}</p>
            </div>
          </div>
          <hr className="my-4" />
          <p className="w-full text-justify leading-relaxed text-gray-300">
            {data.desc}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="xl:mt-40 xl:w-[62%]">
          <div className="mb-8 px-[min(5vw,32px)] xl:px-0">
            <h2 className="mb-4 text-xl font-semibold">Manfaat</h2>
            <div className="grid grid-cols-2 gap-4">
              {data.manfaat.map((manfaat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg bg-custom-gray-dark p-4"
                >
                  <div className="h-2 w-2 rounded-full border-2 border-white" />
                  <span>{manfaat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities Section Swiper */}
          <ProjectsSwiper divisiData={{ makomti }} />
        </div>

        {/* Divisions Section */}
        <div className="mb-8 px-[min(5vw,32px)] xl:mt-40 xl:w-[15%] xl:pl-0">
          <h2 className="mb-4 text-xl font-semibold">Divisi</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-1">
            {data.divisi.map((divisi, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-custom-gray-dark p-4"
              >
                <div>
                  <Image
                    src={logos[divisi as keyof typeof logos]}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-auto"
                    priority
                  />
                </div>
                <span>{divisi}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makomti;
