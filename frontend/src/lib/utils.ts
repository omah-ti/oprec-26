import { clsx, type ClassValue } from "clsx";
import { toZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// MAX ENROLLMENT
export const MAX_ENROLLMENTS = 4;

// LINIMASA / RECRUITMENT TIMELINE
// --------------------------------------------------------------------
export const LINIMASA_DETAIL = [
  {
    title: "Pilih Divisi",
    date: "15 Nov - 21 Nov",
    description:
      "Memilih 2 divisi Himakom (Opsional) dan 2 divisi OmahTI (Opsional)",
  },
  {
    title: "Penugasan",
    date: "15 Nov - 21 Nov",
    description: "Melakukan penugasan sesuai divisi",
  },
  {
    title: "Wawancara",
    date: "23 Nov - 28 Nov",
    description:
      "Wawancara Himakom dan OmahTI sesuai divisi dan waktu yang telah dipilih",
  },

  {
    title: "Pengumuman",
    date: "23 Nov - 24 Nov",
    description: "Hasil Pengumuman OmahTI dan Himakom",
  },
];
// --------------------------------------------------------------------

// FAQ QUESTIONS AND ANSWERS
// --------------------------------------------------------------------
export const MERGED_FAQ = [
  {
    question: "Apakah perlu pengalaman khusus untuk bergabung?",
    answer:
      "Tidak, semua level pengalaman diterima, baik yang masih belajar maupun yang sudah berpengalaman di bidang TI.",
  },
  {
    question: "Bagaimana proses seleksi di OMAHTI dan HIMAKOM?",
    answer:
      "Proses seleksi melibatkan tahap pemilihan divisi, penugasan sesuai divisi, dan wawancara.",
  },
  {
    question: "Berapa divisi yang dapat dipilih?",
    answer:
      "Kamu dapat memilih hingga 4 pilihan divisi: maksimal 2 divisi OmahTI dan maksimal 2 divisi HIMAKOM.",
  },
  {
    question: "Bolehkah memilih hanya 1 divisi?",
    answer:
      "Boleh. Kamu bebas memilih 1 atau 2 divisi dari masing-masing organisasi sesuai minat.",
  },
  {
    question: "Apakah pilihan divisi bersifat prioritas?",
    answer:
      "Ya. Kamu dapat mengatur urutan prioritas, dan proses evaluasi akan mempertimbangkan prioritas tersebut.",
  },
  {
    question: "Apakah setiap divisi memiliki penugasan yang sama?",
    answer:
      "Tidak. Setiap divisi memiliki ketentuan dan materi penugasan yang berbeda. Pastikan membaca ketentuan pada halaman divisi yang kamu pilih.",
  },
  {
    question: "Bagaimana cara melihat detail penugasan?",
    answer:
      "Setelah login, kamu bisa membuka dashboard divisi yang kamu pilih. Di sana sudah ada informasi tentang penugasan, termasuk instruksi, file, dan ketentuannya.",
  },
  {
    question:
      "Apakah semua penugasan dari divisi yang dipilih harus dikerjakan?",
    answer:
      "Ya. Jika kamu memilih lebih dari satu divisi, kamu wajib mengerjakan setiap task dari setiap divisi tersebut.",
  },
  {
    question: "Di mana hasil seleksi diumumkan?",
    answer:
      "Hasil seleksi akan diumumkan di dashboard sesuai jadwal yang sudah ditentukan.",
  },
  {
    question: "Apakah bisa diterima di lebih dari satu divisi?",
    answer:
      "Tidak. Kamu hanya akan diterima di 1 divisi berdasarkan evaluasi tugas, wawancara, dan prioritas pilihanmu.",
  },
];

// --------------------------------------------------------------------

// date formatter
// --------------------------------------------------------------------
export function formatDate(isoString: Date) {
  const jakartaDate = toZonedTime(new Date(isoString), "Asia/Jakarta");
  return jakartaDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
// --------------------------------------------------------------------
