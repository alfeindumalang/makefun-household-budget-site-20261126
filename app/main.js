// Dana Rumah — router dan penyambung tombol. Halaman-halaman tinggal di
// views.js; file ini hanya memutuskan halaman mana yang tampil dan
// menghubungkan tombol serta formulirnya ke keadaan di state.js. Tidak ada
// muat ulang halaman: tiap rute adalah hash, tiap perubahan menggambar ulang
// di tempat.
//
// window.__siapGambar bernilai false selagi halaman digambar dan true begitu
// halaman tampil, supaya skrip tangkapan layar bisa menunggu sebelum memotret.

import { anggaran, laporan, ringkasan, tabungan, tagihan, transaksi } from './views.js';
import { balikTagihan, hapusTransaksi, pulihkanContoh, tambahDana, tambahTransaksi, ubahAnggaran } from './state.js';

const wadah = document.getElementById('app');
let saringanTx = 'semua';

const RUTE = {
  '': ringkasan,
  '/': ringkasan,
  '/anggaran': anggaran,
  '/transaksi': () => transaksi(saringanTx),
  '/tagihan': tagihan,
  '/tabungan': tabungan,
  '/laporan': laporan,
};

function jalurSaatIni() {
  const hash = location.hash.replace(/^#/, '');
  return RUTE[hash] ? hash : '';
}

function gambar() {
  window.__siapGambar = false;
  const jalur = jalurSaatIni();
  wadah.innerHTML = RUTE[jalur]();
  document.querySelectorAll('[data-nav]').forEach((tautan) => {
    const kunci = tautan.getAttribute('data-nav');
    const rute = kunci === 'ringkasan' ? '' : `/${kunci}`;
    tautan.classList.toggle('aktif', rute === jalur);
  });
  window.scrollTo(0, 0);
  window.__siapGambar = true;
}

function beriPesan(form, teks) {
  const tempat = form.querySelector('[data-pesan]');
  if (tempat) tempat.textContent = teks;
}

function saatKirim(event) {
  const form = event.target.closest('form[data-form]');
  if (!form) return;
  event.preventDefault();
  const macam = form.getAttribute('data-form');
  const isi = new FormData(form);

  if (macam === 'tambah-tx') {
    const baris = tambahTransaksi({
      uraian: isi.get('uraian'),
      jumlah: isi.get('jumlah'),
      kategori: isi.get('kategori'),
      jenis: isi.get('jenis'),
    });
    if (baris) {
      beriPesan(form, 'Transaksi ditambahkan.');
      gambar();
    } else {
      beriPesan(form, 'Isi keterangan dan jumlah yang benar.');
    }
    return;
  }

  if (macam === 'anggaran') {
    const berhasil = ubahAnggaran(form.getAttribute('data-kunci'), isi.get('jumlah'));
    beriPesan(form, berhasil ? 'Anggaran disimpan.' : 'Jumlah anggaran tidak valid.');
    if (berhasil) gambar();
    return;
  }

  if (macam === 'tambah-dana') {
    const berhasil = tambahDana(Number(form.getAttribute('data-id')), isi.get('jumlah'));
    beriPesan(form, berhasil ? 'Dana ditambahkan ke tujuan.' : 'Jumlah tidak valid.');
    if (berhasil) gambar();
  }
}

function saatKlik(event) {
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const aksi = el.getAttribute('data-action');

  if (aksi === 'hapus-tx') {
    if (hapusTransaksi(Number(el.getAttribute('data-id')))) gambar();
    return;
  }
  if (aksi === 'balik-tagihan') {
    if (balikTagihan(Number(el.getAttribute('data-id')))) gambar();
    return;
  }
  if (aksi === 'saring') {
    saringanTx = el.getAttribute('data-saringan');
    gambar();
    return;
  }
  if (aksi === 'pulihkan') {
    pulihkanContoh();
    saringanTx = 'semua';
    gambar();
  }
}

document.addEventListener('submit', saatKirim);
document.addEventListener('click', saatKlik);
window.addEventListener('hashchange', gambar);
gambar();
