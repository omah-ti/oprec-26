import { useState } from "react";
import { X, Check, CalendarDays, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ErrorPopup from "@/components/ErrorPopup";
import { useRouter } from "next/navigation";
import PopupBerhasil from "../../../components/PopupBerhasil";

interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean;
}

interface PopupProps {
  type: "gagal" | "berhasil" | "berhasilTugas" | "konfirmasi";
  className?: string;
  disabled?: boolean;
  selectedSlot: ScheduleSlot | null;
}

export default function Popup({
  type,
  disabled,
  className,
  selectedSlot,
}: PopupProps) {
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>("");

  const getContent = () => {
    switch (type) {
      case "gagal":
        return {
          icon: (
            <X className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          ),
          title: "Isi Waktu Terlebih Dahulu",
          subtitle: "Sebelum memilih pilihan wawancara",
          headerText: "Akses wawancara",
          buttonLabel: "Selesai",
          cancelable: false,
        };
      case "berhasil":
        return {
          icon: (
            <Check className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          ),
          title: "Pilih Jadwal Berhasil",
          subtitle: "Sampai jumpa di hari Wawancara",
          headerText: "Konfirmasi Jadwal",
          buttonLabel: "Selesai",
          cancelable: false,
        };
      case "konfirmasi":
        return {
          icon: (
            <CalendarDays className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          ),
          title: "Kamu Sudah Yakin?",
          subtitle: "Pilihan Jadwal Tidak Dapat Dirubah",
          headerText: "Konfirmasi Jadwal",
          buttonLabel: "Pilih",
          cancelable: true,
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  const handleConfirm = async () => {
    const hima = selectedSlot?.himakom ? "hima" : "oti";
    if (type === "konfirmasi" && selectedSlot) {
      try {
        setLoading(true);
        
        // Call Next.js API route (bukan langsung ke backend)
        const response = await fetch(
          `/api/wawancara/${hima}/${selectedSlot.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jamWawancara: selectedSlot.sesi,
            }),
          }
        );
        
        const responseJSON = await response.json();
        
        if (response.ok) {
          setLoading(false);
          setSuccessMessage(responseJSON.message);
          setShowSuccessModal(true);
        } else {
          setLoading(false);
          setErrorMessage(responseJSON.message);
          setShowErrorModal(true);
          console.error("Failed to confirm schedule.");
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage("Terjadi kesalahan saat memilih jadwal");
        setShowErrorModal(true);
        console.error("Error confirming schedule:", error);
      }
    }
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.refresh(); // Refresh data
  };

  return (
    <AlertDialog>
      {showErrorModal && (
        <ErrorPopup
          open={showErrorModal}
          onErrorClose={handleErrorClose}
          errorMessage={errorMessage || ""}
        />
      )}
      {showSuccessModal && (
        <PopupBerhasil
          open={showSuccessModal}
          onBerhasilClose={handleSuccessClose}
          successMessage={successMessage || ""}
        />
      )}
      <AlertDialogTrigger disabled={disabled} asChild>
        {disabled || (
          <Button className="h-auto w-20 p-2 text-sm tracking-wide sm:w-24 sm:text-base lg:w-32">
            Pilih
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="h-auto w-[90vw] rounded-lg bg-custom-gray-dark p-0 xxs:w-[76vw] xs:w-[56vw] sm:w-[48vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw]">
        <div className="h-14 rounded-t-lg bg-custom-black sm:h-20 lg:h-24" />

        <div className="absolute left-1/2 top-[25px] -translate-x-1/2 sm:top-[35px] lg:top-[40px]">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white bg-custom-black p-3 sm:h-20 sm:w-20 sm:p-4 lg:h-28 lg:w-28 lg:p-6">
            {content.icon}
          </div>
        </div>
        <div className="mt-8 px-4 text-center lg:mt-12">
          <p className="text-[0.9rem] text-custom-silver">
            {content.headerText}
          </p>
          <AlertDialogTitle
            className={`mb-2 mt-3 text-xl text-custom-silver`}
          >
            {content.title}
          </AlertDialogTitle>
          <p className="mb-4 text-[0.9rem] text-custom-silver">
            {content.subtitle}
          </p>
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-2 p-4 pt-0 *:text-[0.9rem] xxs:flex-row sm:px-4 lg:flex-row lg:pt-4">
          {content.cancelable && (
            <AlertDialogCancel asChild>
              <Button
                variant={"outline"}
                size={`lg`}
                disabled={loading}
                className="mt-0 w-full lg:w-1/2"
              >
                Batal
              </Button>
            </AlertDialogCancel>
          )}
          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirm}
              size={`lg`}
              disabled={loading}
              className={`w-full ${content.cancelable ? "lg:w-1/2" : ""}`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" size={20} />
                </div>
              ) : (
                content.buttonLabel
              )}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}