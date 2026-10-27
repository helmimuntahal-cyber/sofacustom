export interface Step {
  title: string;
  body: string;
}

/** Alur kerja umum, dipakai di beranda dan halaman layanan. */
export const processSteps: Step[] = [
  {
    title: "Konsultasi",
    body: "Ceritakan kebutuhan Anda lewat WhatsApp. Foto sofa atau foto ruangan sudah cukup sebagai awal.",
  },
  {
    title: "Penilaian kebutuhan & kondisi",
    body: "Kami pelajari ukuran, model, dan kondisi sofa. Bila foto belum cukup, kami bicarakan langkah pemeriksaan berikutnya.",
  },
  {
    title: "Penawaran harga",
    body: "Anda menerima rincian pekerjaan, bahan, dan biayanya sebelum apa pun dikerjakan.",
  },
  {
    title: "Persetujuan Anda",
    body: "Pekerjaan baru dimulai setelah Anda setuju dengan rincian dan biayanya.",
  },
  {
    title: "Pengerjaan",
    body: "Sofa dikerjakan sesuai kesepakatan. Bila ditemukan hal baru saat pelapis dibuka, kami kabari dulu sebelum melanjutkan.",
  },
  {
    title: "Pemeriksaan & pengiriman",
    body: "Hasil diperiksa sebelum diserahkan, lalu sofa dikirim atau diambil sesuai kesepakatan.",
  },
];
