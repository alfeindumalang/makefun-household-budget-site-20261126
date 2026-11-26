// Dana Rumah — gambar yang digambar dari angka keluarga.
// Kedua pembuat grafik ini mengembalikan string SVG/HTML; tanpa pustaka,
// tanpa canvas, tanpa jaringan. Warna tiap kategori tetap, supaya donat
// dan keterangannya selalu cocok.

import { rupiah, rupiahSingkat } from './format.js';

export const WARNA_KATEGORI = {
  belanja: '#15803d',
  makan: '#d97706',
  transport: '#0369a1',
  tagihan: '#7c3aed',
  pendidikan: '#db2777',
  kesehatan: '#0891b2',
  hiburan: '#65a30d',
  tabungan: '#44403c',
};

// Donat pengeluaran per kategori. `irisan` berisi {nama, nilai, warna}.
// Tiap irisan adalah busur lingkaran; totalnya tertulis di tengah.
export function donat(irisan) {
  const total = irisan.reduce((jumlah, iris) => jumlah + iris.nilai, 0);
  if (total <= 0) return '<p class="kosong">Belum ada pengeluaran bulan ini.</p>';
  const jari = 62;
  const keliling = 2 * Math.PI * jari;
  let mulai = 0;
  const busur = irisan
    .map((iris) => {
      const porsi = iris.nilai / total;
      const panjang = Math.max(porsi * keliling - 2, 0.5);
      const el = `<circle cx="80" cy="80" r="${jari}" fill="none" stroke="${iris.warna}" stroke-width="26" stroke-dasharray="${panjang.toFixed(1)} ${(keliling - panjang).toFixed(1)}" stroke-dashoffset="${(-mulai).toFixed(1)}" />`;
      mulai += porsi * keliling;
      return el;
    })
    .join('');
  return `<svg width="160" height="160" viewBox="0 0 160 160" role="img" aria-label="Pengeluaran per kategori, total ${rupiah(total)}">
    ${busur}
    <text x="80" y="74" text-anchor="middle" font-size="13" fill="#57534e">Total keluar</text>
    <text x="80" y="96" text-anchor="middle" font-size="16" font-weight="700" fill="#1c1917">${rupiahSingkat(total)}</text>
  </svg>`;
}

// Daftar keterangan di samping donat: nama, jumlah, dan persennya.
export function keterangan(irisan) {
  const total = irisan.reduce((jumlah, iris) => jumlah + iris.nilai, 0);
  const baris = irisan
    .map(
      (iris) => `<li><span><span class="titik" style="background:${iris.warna}"></span>${iris.nama}</span><span><b>${rupiahSingkat(iris.nilai)}</b> <span class="persen-teks">${Math.round((iris.nilai / total) * 100)}%</span></span></li>`,
    )
    .join('');
  return `<ul class="legenda">${baris}</ul>`;
}

// Batang berpasangan: pemasukan (hijau) lawan pengeluaran (kuning)
// untuk tiap bulan dalam `riwayat`. Batang tertinggi memenuhi grafik.
export function batangBulanan(riwayat) {
  const tertinggi = Math.max(...riwayat.flatMap((b) => [b.masuk, b.keluar]), 1);
  const kolom = riwayat
    .map((b) => {
      const tinggiMasuk = Math.max(Math.round((b.masuk / tertinggi) * 140), 3);
      const tinggiKeluar = Math.max(Math.round((b.keluar / tertinggi) * 140), 3);
      return `<div class="kolom-bulan">
        <div class="batang"><i class="masuk" style="height:${tinggiMasuk}px" title="Pemasukan ${rupiah(b.masuk)}"></i><i class="keluar" style="height:${tinggiKeluar}px" title="Pengeluaran ${rupiah(b.keluar)}"></i></div>
        <div class="label-bulan">${b.bulan}</div>
        <div class="nilai-bulan">${rupiahSingkat(b.masuk)}<br>${rupiahSingkat(b.keluar)}</div>
      </div>`;
    })
    .join('');
  return `<div class="batang-bulanan" role="img" aria-label="Pemasukan dan pengeluaran Juni sampai November 2026">${kolom}</div>
  <p class="petunjuk"><span style="color:#15803d">■</span> Pemasukan &nbsp; <span style="color:#d97706">■</span> Pengeluaran (termasuk tabungan)</p>`;
}
