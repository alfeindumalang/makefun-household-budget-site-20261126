// Dana Rumah — penolong kecil untuk menampilkan angka dan tanggal.
// Satu tugas per fungsi; semua uang di sini rupiah, semua tanggal gaya Indonesia.

const pemisahRibuan = new Intl.NumberFormat('id-ID');

// "Rp 12.500.000"
export function rupiah(nilai) {
  return `Rp ${pemisahRibuan.format(Math.round(nilai))}`;
}

// Bentuk ringkas untuk kartu ringkasan: "Rp 12,5 jt" atau "Rp 850 rb".
export function rupiahSingkat(nilai) {
  const abs = Math.abs(nilai);
  if (abs >= 1000000) {
    const jt = nilai / 1000000;
    const teks = Number.isInteger(jt) ? String(jt) : jt.toFixed(1).replace('.', ',');
    return `Rp ${teks} jt`;
  }
  if (abs >= 1000) return `Rp ${Math.round(nilai / 1000)} rb`;
  return rupiah(nilai);
}

const NAMA_BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

// "2026-11-28" -> "28 Nov 2026"
export function tanggalPanjang(iso) {
  const bagian = iso.split('-').map(Number);
  return `${bagian[2]} ${NAMA_BULAN[bagian[1] - 1]} ${bagian[0]}`;
}

// "2026-11-28" -> "28 Nov"
export function tanggalPendek(iso) {
  const bagian = iso.split('-').map(Number);
  return `${bagian[2]} ${NAMA_BULAN[bagian[1] - 1]}`;
}

// Persentase bulat, aman bila pembaginya nol.
export function persen(bagian, keseluruhan) {
  if (!keseluruhan) return 0;
  return Math.round((bagian / keseluruhan) * 100);
}

// Amankan teks yang diketik pengunjung sebelum masuk ke innerHTML,
// supaya tanda kurung siku atau tag tidak pernah merusak halaman.
export function escapeHtml(teks) {
  return String(teks).replace(/[&<>"']/g, (huruf) => `&#${huruf.charCodeAt(0)};`);
}
