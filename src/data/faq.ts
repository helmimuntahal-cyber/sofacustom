import { site } from "@/config/site";

/**
 * FAQ. Jawaban yang bergantung pada kebijakan bisnis (garansi, durasi,
 * pengiriman, wilayah) diambil dari src/config/site.ts. Selama nilainya null,
 * yang tampil adalah jawaban netral — bukan janji yang belum dikonfirmasi.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  topics: ("umum" | "custom" | "servis" | "kain")[];
}

const areaAnswer =
  site.serviceAreas.length > 0
    ? `Saat ini kami melayani ${site.serviceAreas.join(", ")}. Untuk lokasi di luar daftar tersebut, tanyakan dulu lewat WhatsApp.`
    : "Informasi wilayah layanan dapat Anda tanyakan langsung lewat WhatsApp. Sebutkan kota atau kecamatan Anda agar kami bisa memastikan apakah lokasi tersebut terjangkau.";

export const faqs: FaqItem[] = [
  {
    id: "cara-pesan-custom",
    question: "Bagaimana cara memesan sofa custom?",
    answer:
      "Hubungi kami lewat WhatsApp dan kirimkan ukuran ruang, foto ruangan, serta referensi model yang Anda suka. Dari situ kami diskusikan ukuran, bahan, dan warna, lalu menyiapkan penawaran. Pembuatan dimulai setelah Anda menyetujui rincian dan biayanya.",
    topics: ["custom", "umum"],
  },
  {
    id: "estimasi-servis",
    question: "Bagaimana cara meminta estimasi servis sofa?",
    answer:
      "Kirim foto sofa dari beberapa sisi (depan, samping, dudukan, dan bagian yang rusak) beserta perkiraan ukurannya lewat WhatsApp. Ceritakan juga keluhannya, misalnya dudukan ambles atau kain robek. Estimasi dari foto bersifat awal; biaya akhir bisa menyesuaikan setelah kondisi sofa dilihat langsung.",
    topics: ["servis", "umum"],
  },
  {
    id: "info-whatsapp",
    question: "Informasi apa yang perlu dikirim melalui WhatsApp?",
    answer:
      "Foto sofa atau foto ruangan, ukuran (panjang, kedalaman, tinggi), jenis pekerjaan yang diinginkan, bahan atau warna yang Anda bayangkan, dan lokasi Anda. Semakin lengkap informasinya, semakin cepat kami bisa memberi gambaran pekerjaan dan biaya.",
    topics: ["umum", "custom", "servis", "kain"],
  },
  {
    id: "sofa-lama-diperbaiki",
    question: "Apakah sofa lama bisa diperbaiki?",
    answer:
      "Banyak sofa lama masih layak diperbaiki, terutama bila rangkanya kokoh. Namun tidak semua kerusakan sepadan untuk diperbaiki. Setelah melihat kondisinya, kami akan menyampaikan secara terbuka apakah perbaikan masuk akal atau lebih baik membuat sofa baru.",
    topics: ["servis"],
  },
  {
    id: "kain-busa-saja",
    question: "Apakah bisa mengganti kain dan busa saja?",
    answer:
      "Bisa dikonsultasikan. Penggantian kain atau busa saja cocok bila rangka masih dalam kondisi baik. Bila saat pelapis dibuka ternyata ada bagian rangka yang perlu diperbaiki, kami kabari dulu sebelum menambah pekerjaan.",
    topics: ["servis", "kain"],
  },
  {
    id: "lama-pengerjaan",
    question: "Berapa lama pengerjaan?",
    answer:
      site.policies.leadTime ??
      "Lama pengerjaan bergantung pada jenis pekerjaan, ukuran sofa, dan ketersediaan bahan. Perkiraan waktunya kami sampaikan bersama penawaran, sebelum Anda memutuskan.",
    topics: ["umum", "custom", "servis"],
  },
  {
    id: "pengambilan-pengiriman",
    question: "Bagaimana sistem pengambilan dan pengiriman?",
    answer:
      site.policies.pickupDelivery ??
      "Ketentuan pengambilan dan pengiriman, termasuk biayanya bila ada, dibicarakan dan disepakati saat penawaran sesuai lokasi Anda.",
    topics: ["umum", "servis"],
  },
  {
    id: "harga",
    question: "Apakah harga bergantung pada ukuran dan bahan?",
    answer:
      "Ya. Harga dipengaruhi ukuran sofa, model, jenis dan jumlah bahan, kondisi sofa (untuk servis), serta tingkat kerumitan pekerjaan. Karena itu kami tidak memasang daftar harga tetap; setiap penawaran disusun berdasarkan kebutuhan Anda.",
    topics: ["umum", "custom", "servis", "kain"],
  },
  {
    id: "garansi",
    question: "Apakah tersedia garansi?",
    answer:
      site.policies.warranty ??
      "Silakan tanyakan ketentuan garansi saat konsultasi. Apa pun yang disepakati akan kami sampaikan secara tertulis bersama penawaran.",
    topics: ["umum"],
  },
  {
    id: "wilayah",
    question: "Wilayah mana yang dilayani?",
    answer: areaAnswer,
    topics: ["umum"],
  },
];

export function faqsFor(topic: FaqItem["topics"][number]): FaqItem[] {
  return faqs.filter((f) => f.topics.includes(topic));
}
