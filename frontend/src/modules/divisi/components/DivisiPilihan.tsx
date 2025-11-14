"use client";
import DivisiCard from "./Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, FreeMode } from "swiper/modules"; // Import Grid module
import "swiper/css";
import "swiper/css/grid"; // Import Grid CSS

export default function DivisiPilihan({
  pilihanDivisi,
}: {
  pilihanDivisi: any;
}) {
  // ini temporary, nanti ganti authentication
  const hasChosen = pilihanDivisi.length > 0;

  return (
    <>
      <p className="font-semibold lg:text-lg">
        Divisi yang Kamu Pilih (Urut berdasarkan prioritas)
      </p>

      {hasChosen ? (
        <Swiper
          className="mt-4"
          modules={[Grid, FreeMode]}
          spaceBetween={10}
          breakpoints={{
            // mobile
            0: {
              slidesPerView: 1,
              freeMode: {
                enabled: true,
                sticky: false,
              },
            },
            // tablet
            640: {
              slidesPerView: 2,
              grid: {
                fill: "row",
                rows: 2,
              },
            },
            // desktop
            1024: {
              slidesPerView: 4,
              grid: {
                fill: "row",
                rows: 1,
              },
              enabled: false, // Disables swiping on desktop
            },
          }}
        >
          {pilihanDivisi.map((divisi: any) => (
            <SwiperSlide key={divisi.id}>
              <DivisiCard
                id={divisi.urutanPrioritas}
                title={divisi.divisiId.judul}
                variant={divisi.divisiId.himakom ? "himakom" : "omahti"}
                slug={divisi.divisiId.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <h1 className="mb-8 mt-2">
          Kamu belom memilih divisi, Pilih divisi yang tersedia
        </h1>
      )}
    </>
  );
}
