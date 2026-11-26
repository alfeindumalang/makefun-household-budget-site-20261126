// Dana Rumah — angka-angka rumah tangga untuk November 2026.
//
// Keluarga fiktif: Hartono, tinggal di Depok. Budi bekerja kantoran, Sari
// menjalankan katering rumahan, dan Dimas anak mereka yang masih sekolah.
// Semua angka di sini karangan untuk situs contoh ini; halaman-halaman situs
// menghitung total dari baris-baris di bawah, jadi satu perubahan (misalnya
// transaksi baru atau anggaran yang diubah) langsung tercermin di mana-mana.
//
// Satuan uang: rupiah. `jenis` bernilai 'masuk' atau 'keluar'.
// Kunci `kategori` merujuk ke tabel KATEGORI di bawah.

export const RUMAH = {
  nama: 'Keluarga Hartono',
  kota: 'Depok, Jawa Barat',
  bulan: 'November 2026',
  rentang: '1–25 November 2026',
  anggota: 'Budi, Sari & Dimas (4 orang serumah)',
};

export const KATEGORI = [
  { kunci: 'belanja', nama: 'Belanja Harian', anggaran: 2500000, keterangan: 'Pasar, supermarket, dan kebutuhan dapur' },
  { kunci: 'makan', nama: 'Makan & Jajan', anggaran: 1200000, keterangan: 'Makan di luar, jajan, dan pesan antar' },
  { kunci: 'transport', nama: 'Transportasi', anggaran: 1200000, keterangan: 'Bensin, tol, ojek, dan parkir' },
  { kunci: 'tagihan', nama: 'Tagihan & Utilitas', anggaran: 1500000, keterangan: 'Listrik, air, internet, dan iuran' },
  { kunci: 'pendidikan', nama: 'Pendidikan', anggaran: 1500000, keterangan: 'SPP, les, dan buku' },
  { kunci: 'kesehatan', nama: 'Kesehatan', anggaran: 600000, keterangan: 'Dokter, apotek, dan vitamin' },
  { kunci: 'hiburan', nama: 'Hiburan', anggaran: 500000, keterangan: 'Bioskop, mainan, dan langganan' },
  { kunci: 'tabungan', nama: 'Tabungan', anggaran: 2000000, keterangan: 'Pindah otomatis setiap tanggal 25' },
];

export const PEMASUKAN = [
  { sumber: 'Gaji Budi Hartono', jumlah: 8500000, tanggal: '2026-11-01', keterangan: 'Gaji bulanan, cair tiap tanggal 1' },
  { sumber: 'Katering Sari', jumlah: 4000000, tanggal: '2026-11-11', keterangan: 'Pesanan katering minggu kedua' },
];

export const TRANSAKSI = [
  { id: 1, tanggal: '2026-11-01', uraian: 'Gaji Budi Hartono', kategori: 'pemasukan', jumlah: 8500000, jenis: 'masuk' },
  { id: 2, tanggal: '2026-11-01', uraian: 'Belanja mingguan di Super Indo', kategori: 'belanja', jumlah: 486000, jenis: 'keluar' },
  { id: 3, tanggal: '2026-11-02', uraian: 'Bensin motor', kategori: 'transport', jumlah: 52000, jenis: 'keluar' },
  { id: 4, tanggal: '2026-11-02', uraian: 'Makan siang bareng di warteg', kategori: 'makan', jumlah: 78000, jenis: 'keluar' },
  { id: 5, tanggal: '2026-11-03', uraian: 'Sayur dan buah dari pasar pagi', kategori: 'belanja', jumlah: 124000, jenis: 'keluar' },
  { id: 6, tanggal: '2026-11-03', uraian: 'SPP sekolah Dimas', kategori: 'pendidikan', jumlah: 650000, jenis: 'keluar' },
  { id: 7, tanggal: '2026-11-04', uraian: 'Kopi dan camilan sore', kategori: 'makan', jumlah: 45000, jenis: 'keluar' },
  { id: 8, tanggal: '2026-11-05', uraian: 'Iuran RT dan keamanan', kategori: 'tagihan', jumlah: 150000, jenis: 'keluar' },
  { id: 9, tanggal: '2026-11-05', uraian: 'Ojek online ke kantor', kategori: 'transport', jumlah: 28000, jenis: 'keluar' },
  { id: 10, tanggal: '2026-11-06', uraian: 'Belanja bulanan di Indomaret', kategori: 'belanja', jumlah: 312000, jenis: 'keluar' },
  { id: 11, tanggal: '2026-11-07', uraian: 'Vitamin dan obat flu dari apotek', kategori: 'kesehatan', jumlah: 96000, jenis: 'keluar' },
  { id: 12, tanggal: '2026-11-07', uraian: 'Makan malam ayam geprek', kategori: 'makan', jumlah: 85000, jenis: 'keluar' },
  { id: 13, tanggal: '2026-11-08', uraian: 'Nonton bioskop sekeluarga', kategori: 'hiburan', jumlah: 180000, jenis: 'keluar' },
  { id: 14, tanggal: '2026-11-09', uraian: 'Listrik PLN', kategori: 'tagihan', jumlah: 385000, jenis: 'keluar' },
  { id: 15, tanggal: '2026-11-09', uraian: 'Ayam dan daging dari pasar', kategori: 'belanja', jumlah: 168000, jenis: 'keluar' },
  { id: 16, tanggal: '2026-11-10', uraian: 'Internet rumah', kategori: 'tagihan', jumlah: 275000, jenis: 'keluar' },
  { id: 17, tanggal: '2026-11-10', uraian: 'BPJS Kesehatan keluarga', kategori: 'tagihan', jumlah: 105000, jenis: 'keluar' },
  { id: 18, tanggal: '2026-11-11', uraian: 'Pesanan katering Sari', kategori: 'pemasukan', jumlah: 4000000, jenis: 'masuk' },
  { id: 19, tanggal: '2026-11-11', uraian: 'Les matematika Dimas', kategori: 'pendidikan', jumlah: 400000, jenis: 'keluar' },
  { id: 20, tanggal: '2026-11-12', uraian: 'Bensin mobil', kategori: 'transport', jumlah: 150000, jenis: 'keluar' },
  { id: 21, tanggal: '2026-11-12', uraian: 'Makan malam bakso', kategori: 'makan', jumlah: 96000, jenis: 'keluar' },
  { id: 22, tanggal: '2026-11-13', uraian: 'Beras 10 kg dan minyak goreng', kategori: 'belanja', jumlah: 245000, jenis: 'keluar' },
  { id: 23, tanggal: '2026-11-14', uraian: 'Tol Jagorawi', kategori: 'transport', jumlah: 32000, jenis: 'keluar' },
  { id: 24, tanggal: '2026-11-15', uraian: 'Air PDAM', kategori: 'tagihan', jumlah: 145000, jenis: 'keluar' },
  { id: 25, tanggal: '2026-11-15', uraian: 'Parkir di mal', kategori: 'transport', jumlah: 10000, jenis: 'keluar' },
  { id: 26, tanggal: '2026-11-15', uraian: 'Jajan anak sekolah', kategori: 'makan', jumlah: 35000, jenis: 'keluar' },
  { id: 27, tanggal: '2026-11-16', uraian: 'Belanja mingguan di pasar', kategori: 'belanja', jumlah: 428000, jenis: 'keluar' },
  { id: 28, tanggal: '2026-11-16', uraian: 'Mainan edukasi untuk Dimas', kategori: 'hiburan', jumlah: 85000, jenis: 'keluar' },
  { id: 29, tanggal: '2026-11-17', uraian: 'Dokter gigi Sari', kategori: 'kesehatan', jumlah: 250000, jenis: 'keluar' },
  { id: 30, tanggal: '2026-11-17', uraian: 'Jajan sore', kategori: 'makan', jumlah: 40000, jenis: 'keluar' },
  { id: 31, tanggal: '2026-11-18', uraian: 'Bensin motor', kategori: 'transport', jumlah: 48000, jenis: 'keluar' },
  { id: 32, tanggal: '2026-11-19', uraian: 'Buku dan alat tulis Dimas', kategori: 'pendidikan', jumlah: 175000, jenis: 'keluar' },
  { id: 33, tanggal: '2026-11-19', uraian: 'Bensin mobil', kategori: 'transport', jumlah: 200000, jenis: 'keluar' },
  { id: 34, tanggal: '2026-11-20', uraian: 'Makan siang kantor Budi', kategori: 'makan', jumlah: 62000, jenis: 'keluar' },
  { id: 35, tanggal: '2026-11-20', uraian: 'Parkir kantor', kategori: 'transport', jumlah: 15000, jenis: 'keluar' },
  { id: 36, tanggal: '2026-11-21', uraian: 'Sayur dan lauk dari pasar', kategori: 'belanja', jumlah: 98000, jenis: 'keluar' },
  { id: 37, tanggal: '2026-11-21', uraian: 'Pesan antar untuk makan malam', kategori: 'makan', jumlah: 120000, jenis: 'keluar' },
  { id: 38, tanggal: '2026-11-22', uraian: 'Ojek online', kategori: 'transport', jumlah: 24000, jenis: 'keluar' },
  { id: 39, tanggal: '2026-11-23', uraian: 'Belanja mingguan di Super Indo', kategori: 'belanja', jumlah: 396000, jenis: 'keluar' },
  { id: 40, tanggal: '2026-11-23', uraian: 'Makan siang keluarga', kategori: 'makan', jumlah: 145000, jenis: 'keluar' },
  { id: 41, tanggal: '2026-11-24', uraian: 'Kopi dan roti pagi', kategori: 'makan', jumlah: 58000, jenis: 'keluar' },
  { id: 42, tanggal: '2026-11-25', uraian: 'Tabungan otomatis ke Dana Darurat', kategori: 'tabungan', jumlah: 2000000, jenis: 'keluar' },
];

export const TAGIHAN = [
  { id: 1, nama: 'Listrik PLN', jumlah: 385000, jatuhTempo: '2026-11-20', lunas: true, keterangan: 'Daya 1300 VA' },
  { id: 2, nama: 'Air PDAM', jumlah: 145000, jatuhTempo: '2026-11-15', lunas: true, keterangan: 'Pemakaian 18 m³' },
  { id: 3, nama: 'Internet rumah', jumlah: 275000, jatuhTempo: '2026-11-10', lunas: true, keterangan: 'Paket 50 Mbps' },
  { id: 4, nama: 'Iuran RT dan keamanan', jumlah: 150000, jatuhTempo: '2026-11-05', lunas: true, keterangan: 'Iuran bulanan' },
  { id: 5, nama: 'BPJS Kesehatan', jumlah: 105000, jatuhTempo: '2026-11-10', lunas: true, keterangan: '3 peserta kelas 2' },
  { id: 6, nama: 'SPP sekolah Dimas', jumlah: 650000, jatuhTempo: '2026-11-05', lunas: true, keterangan: 'Kelas 4 SD' },
  { id: 7, nama: 'Cicilan motor', jumlah: 850000, jatuhTempo: '2026-11-28', lunas: false, keterangan: 'Angsuran ke-14 dari 35' },
  { id: 8, nama: 'Langganan streaming', jumlah: 54000, jatuhTempo: '2026-11-27', lunas: false, keterangan: 'Paket keluarga' },
];

export const TUJUAN = [
  { id: 1, nama: 'Dana Darurat', target: 30000000, terkumpul: 18500000, keterangan: 'Target 6x pengeluaran bulanan' },
  { id: 2, nama: 'Liburan ke Yogyakarta', target: 8000000, terkumpul: 3200000, keterangan: 'Berangkat libur sekolah Juni 2027' },
  { id: 3, nama: 'Renovasi Dapur', target: 15000000, terkumpul: 6750000, keterangan: 'Ganti kompor dan kitchen set' },
];

// Pemasukan dan pengeluaran enam bulan terakhir (rupiah).
// November masih berjalan, jadi angkanya baru sampai 25 November.
export const BULANAN = [
  { bulan: 'Jun 26', masuk: 12000000, keluar: 10400000 },
  { bulan: 'Jul 26', masuk: 12500000, keluar: 11100000 },
  { bulan: 'Agu 26', masuk: 12500000, keluar: 10850000 },
  { bulan: 'Sep 26', masuk: 12800000, keluar: 11300000 },
  { bulan: 'Okt 26', masuk: 12500000, keluar: 10950000 },
  { bulan: 'Nov 26', masuk: 12500000, keluar: 8476000 },
];

// Kiat hemat di halaman Laporan — ditulis khusus untuk keluarga ini,
// dengan angka yang sama dengan yang tampil di halaman lain.
export const KIAT = [
  { judul: 'Belanja harian hampir habis', isi: 'Rp 2.257.000 dari Rp 2.500.000 sudah terpakai dalam 25 hari. Lima hari tersisa cukup untuk satu kali belanja mingguan — tahan belanja besar sampai gajian berikutnya.' },
  { judul: 'Cicilan motor jatuh tempo 28 Nov', isi: 'Rp 850.000 belum dibayar. Sisa uang bulan ini Rp 4.024.000, jadi setelah cicilan dibayar masih tersisa Rp 3.174.000 untuk lima hari terakhir.' },
  { judul: 'Dana darurat sudah 62%', isi: 'Rp 18.500.000 dari target Rp 30.000.000. Dengan tabungan otomatis Rp 2.000.000 per bulan, target tercapai sekitar Mei 2027.' },
  { judul: 'Makan di luar terkendali', isi: 'Rp 764.000 dari anggaran Rp 1.200.000. Memasak di rumah lima hari seminggu menghemat sekitar Rp 400.000 sebulan dibanding bulan lalu.' },
];
