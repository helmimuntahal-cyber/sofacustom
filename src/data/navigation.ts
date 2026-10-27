export interface NavLink {
  label: string;
  href: string;
}

export const serviceNav: NavLink[] = [
  { label: "Pembuatan Sofa Custom", href: "/pembuatan-sofa-custom/" },
  { label: "Servis Sofa", href: "/servis-sofa/" },
  { label: "Ganti Kain Sofa", href: "/ganti-kain-sofa/" },
];

export const mainNav: NavLink[] = [
  { label: "Galeri", href: "/galeri/" },
  { label: "Tentang Kami", href: "/tentang-kami/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Kontak", href: "/kontak/" },
];
