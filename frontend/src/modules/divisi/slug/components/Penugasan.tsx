"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

interface PenugasanData {
  deskripsiPenugasan: string;
  toolsPenugasan: string;
  linkPenugasan: string;
}

const Penugasan = ({
  data,
  existingPenugasan,
  hasEnrolled,
}: {
  data: {
    himakom: boolean;
    slug: string;
    penugasan: PenugasanData;
  };
  existingPenugasan: any;
  hasEnrolled: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  const handlePengumpulan = async (formData: any) => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/penugasan/submit/${data.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: formData.link, comment: " " }),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({
          title: `Gagal submit tugas`,
          description: responseData.message || `Terjadi kesalahan`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: `Tugas berhasil di-submit`,
        description: `Sampai jumpa di hari Wawancara! 😁`,
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast({
        title: `Error`,
        description: `Gagal submit tugas`,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleUpdatePenugasan = async (formData: any) => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/penugasan/update/${existingPenugasan._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: formData.existingLink, comment: " " }),
      });

      const responseData = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({
          title: `Gagal update tugas`,
          description: responseData.message || `Terjadi kesalahan`,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: `Tugas berhasil di-update`,
        description: `Sampai jumpa di hari Wawancara! 😁`,
      });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast({
        title: `Error`,
        description: `Gagal update tugas`,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const isPendaftaranBuka = process.env.NEXT_PUBLIC_PENDAFTARAN_STATUS === "true";

  return (
    <div className="h-auto rounded-lg bg-custom-gray-dark p-4 xl:ml-0 xl:h-full xl:w-[30%]">
      <h1
        className={`${data.himakom ? "text-custom-blue" : "text-custom-orange"} mb-4 text-xl font-bold`}
      >
        Penugasan
      </h1>

      <div className="mt-2 space-y-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Brief Penugasan</h1>
          <div className="w-full text-justify text-[0.9rem] leading-relaxed">
            {data.penugasan.deskripsiPenugasan}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold">Tools</h1>
          <div className="w-full text-pretty text-[0.9rem] leading-relaxed">
            {data.penugasan.toolsPenugasan}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Penugasan</h1>
          <Link
            href={data.penugasan.linkPenugasan}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="w-full text-base">
              <Download className="mr-2 h-5 w-5" /> Download Penugasan
            </Button>
          </Link>
        </div>

        {hasEnrolled && (
          <div className="flex flex-col gap-2 border-t border-custom-gray pt-3">
            <h1 className="font-semibold">Submit Tugas</h1>
            {existingPenugasan ? (
              <form onSubmit={handleSubmit(handleUpdatePenugasan)} className="space-y-2">
                <input
                  type="url"
                  {...register("existingLink", { 
                    required: "Link tugas wajib diisi",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Link harus valid (dimulai dengan http:// atau https://)"
                    }
                  })}
                  defaultValue={existingPenugasan.link}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-md bg-custom-gray px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  disabled={!isPendaftaranBuka}
                />
                {errors.existingLink && (
                  <p className="text-xs text-red-500">
                    {errors.existingLink.message as string}
                  </p>
                )}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-base"
                  disabled={loading || !isPendaftaranBuka}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Tugas"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(handlePengumpulan)} className="space-y-2">
                <input
                  type="url"
                  {...register("link", { 
                    required: "Link tugas wajib diisi",
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Link harus valid (dimulai dengan http:// atau https://)"
                    }
                  })}
                  placeholder="https://drive.google.com/..."
                  className="w-full rounded-md bg-custom-gray px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-custom-orange"
                  disabled={!isPendaftaranBuka}
                />
                {errors.link && (
                  <p className="text-xs text-red-500">
                    {errors.link.message as string}
                  </p>
                )}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-base"
                  disabled={loading || !isPendaftaranBuka}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Tugas"
                  )}
                </Button>
              </form>
            )}

            {!isPendaftaranBuka && (
              <p className="text-xs text-yellow-500">
                Pendaftaran sudah ditutup
              </p>
            )}
          </div>
        )}

        {!hasEnrolled && (
          <p className="text-sm text-custom-silver">
            Kamu harus memilih divisi ini terlebih dahulu untuk bisa submit penugasan.
          </p>
        )}
      </div>
    </div>
  );
};

export default Penugasan;