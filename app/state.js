// Dana Rumah — keadaan: angka bawaan keluarga ditambah perubahan pengunjung.
//
// Data November bawaan tinggal di data.js. Setiap perubahan yang dibuat
// pengunjung (transaksi baru, tagihan yang dilunasi, dana yang ditambah ke
// tujuan, anggaran yang diubah) disimpan di memori dan, bila peramban
// mengizinkan, di localStorage supaya bertahan setelah muat ulang. Bila
// penyimpanan tidak tersedia (mode privat, kebijakan host yang ketat),
// situs tetap jalan — perubahannya hanya bertahan sampai halaman ditutup.
// Tidak ada satu pun yang dikirim ke mana-mana: file ini tidak memanggil jaringan.

import { KATEGORI, TAGIHAN, TRANSAKSI, TUJUAN } from './data.js';

const KUNCI_SIMPAN = 'dana-rumah-v2';

// Salinan segar dari data bawaan, supaya data.js tidak pernah berubah.
function keadaanAwal() {
  return {
    transaksi: TRANSAKSI.map((t) => ({ ...t })),
    tagihan: TAGIHAN.map((t) => ({ ...t })),
    tujuan: TUJUAN.map((t) => ({ ...t })),
    anggaran: Object.fromEntries(KATEGORI.map((k) => [k.kunci, k.anggaran])),
    idBerikutnya: Math.max(...TRANSAKSI.map((t) => t.id)) + 1,
  };
}

function bacaTersimpan() {
  try {
    const mentah = window.localStorage.getItem(KUNCI_SIMPAN);
    if (!mentah) return null;
    const hasil = JSON.parse(mentah);
    if (!hasil || !Array.isArray(hasil.transaksi)) return null;
    return hasil;
  } catch {
    return null;
  }
}

function tulisTersimpan(keadaan) {
  try {
    window.localStorage.setItem(KUNCI_SIMPAN, JSON.stringify(keadaan));
    return true;
  } catch {
    return false;
  }
}

// Satu-satunya objek keadaan yang hidup. Halaman membacanya; aksi di bawah
// mengubahnya lalu menyimpannya, kemudian router menggambar ulang.
export const keadaan = bacaTersimpan() ?? keadaanAwal();

function simpan() {
  tulisTersimpan(keadaan);
}

export function pemasukanTotal() {
  return keadaan.transaksi
    .filter((t) => t.jenis === 'masuk')
    .reduce((jumlah, t) => jumlah + t.jumlah, 0);
}

export function pengeluaranTotal() {
  return keadaan.transaksi
    .filter((t) => t.jenis === 'keluar')
    .reduce((jumlah, t) => jumlah + t.jumlah, 0);
}

export function belanjaKategori(kunci) {
  return keadaan.transaksi
    .filter((t) => t.jenis === 'keluar' && t.kategori === kunci)
    .reduce((jumlah, t) => jumlah + t.jumlah, 0);
}

export function tagihanBelumTotal() {
  return keadaan.tagihan
    .filter((t) => !t.lunas)
    .reduce((jumlah, t) => jumlah + t.jumlah, 0);
}

function tanggalHariIni() {
  const kini = new Date();
  const bulan = String(kini.getMonth() + 1).padStart(2, '0');
  const hari = String(kini.getDate()).padStart(2, '0');
  return `${kini.getFullYear()}-${bulan}-${hari}`;
}

export function tambahTransaksi({ uraian, jumlah, kategori, jenis }) {
  const bersih = String(uraian || '').trim().slice(0, 80);
  const nilai = Math.floor(Math.abs(Number(jumlah)) || 0);
  if (!bersih || nilai <= 0) return null;
  const baris = {
    id: keadaan.idBerikutnya,
    tanggal: tanggalHariIni(),
    uraian: bersih,
    kategori,
    jumlah: nilai,
    jenis,
  };
  keadaan.idBerikutnya += 1;
  keadaan.transaksi.unshift(baris);
  simpan();
  return baris;
}

export function hapusTransaksi(id) {
  const posisi = keadaan.transaksi.findIndex((t) => t.id === id);
  if (posisi < 0) return false;
  keadaan.transaksi.splice(posisi, 1);
  simpan();
  return true;
}

export function ubahAnggaran(kunci, jumlah) {
  const nilai = Math.floor(Math.abs(Number(jumlah)) || 0);
  if (nilai <= 0) return false;
  keadaan.anggaran[kunci] = nilai;
  simpan();
  return true;
}

export function balikTagihan(id) {
  const tagihan = keadaan.tagihan.find((t) => t.id === id);
  if (!tagihan) return false;
  tagihan.lunas = !tagihan.lunas;
  simpan();
  return true;
}

export function tambahDana(id, jumlah) {
  const tujuan = keadaan.tujuan.find((t) => t.id === id);
  const nilai = Math.floor(Math.abs(Number(jumlah)) || 0);
  if (!tujuan || nilai <= 0) return false;
  tujuan.terkumpul = Math.min(tujuan.target, tujuan.terkumpul + nilai);
  simpan();
  return true;
}

export function pulihkanContoh() {
  const segar = keadaanAwal();
  keadaan.transaksi = segar.transaksi;
  keadaan.tagihan = segar.tagihan;
  keadaan.tujuan = segar.tujuan;
  keadaan.anggaran = segar.anggaran;
  keadaan.idBerikutnya = segar.idBerikutnya;
  simpan();
}
