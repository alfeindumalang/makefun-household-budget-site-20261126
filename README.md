# Dana Rumah — situs anggaran keluarga terbaik

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/alfeindumalang/makefun-household-budget-site-20261126/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/alfeindumalang/makefun-household-budget-site-20261126/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

Entri untuk bounty "Make the best household budget site" (best-household-budget-site-20261126-1457).

**Dana Rumah** adalah situs anggaran untuk satu keluarga fiktif di Indonesia:
Keluarga Hartono dari Depok — Budi yang bekerja kantoran, Sari yang membuka
katering rumahan, dan Dimas, anak mereka. Situs ini berupa berkas statis
biasa: tanpa akun, tanpa permintaan jaringan, tanpa langkah build. Cukup buka
`app/index.html` di peramban, semuanya langsung jalan.

## Enam halaman, semuanya bisa dipakai

Setiap halaman dicapai dari navigasi di kepala situs:

- **Ringkasan** — bulan ini sekilas: pemasukan, pengeluaran, sisa uang,
  tagihan yang belum lunas, donat pengeluaran per kategori, delapan transaksi
  terakhir, tagihan berikutnya, dan kemajuan tabungan.
- **Anggaran** — delapan amplop anggaran bulanan lengkap dengan batang
  kemajuannya. Besar tiap amplop bisa diubah di sini, dan halaman lain
  langsung mengikuti angka yang baru.
- **Transaksi** — seluruh 42 transaksi bulan November, bisa disaring menurut
  jenis dan kategori, lengkap dengan formulir tambah transaksi dan tombol hapus.
- **Tagihan** — delapan tagihan rutin beserta tanggal jatuh temponya; tiap
  tagihan bisa ditandai lunas, dan ringkasan langsung berkurang.
- **Tabungan** — tiga tujuan menabung (dana darurat, liburan keluarga,
  renovasi dapur) dengan batang kemajuan dan formulir tambah dana di tiap tujuan.
- **Laporan** — pemasukan lawan pengeluaran selama enam bulan dalam bentuk
  batang berpasangan, kategori pengeluaran terbesar, perbandingan dengan bulan
  lalu, dan empat kiat hemat yang ditulis untuk keluarga ini.

Semua perubahan pengunjung disimpan di peramban (localStorage bila tersedia,
kalau tidak ya di memori) dan tidak pernah dikirim ke mana pun. Tombol
"Kembalikan data contoh" di halaman Laporan mengembalikan angka ke data
contoh bawaan kapan saja.

## Angka-angka bulan ini

November 2026 (1–25 Nov): pemasukan Rp 12.500.000, pengeluaran
Rp 8.476.000 (termasuk tabungan otomatis Rp 2.000.000), sisa
Rp 4.024.000. Dua tagihan belum lunas senilai Rp 904.000 — cicilan motor
jatuh tempo 28 Nov dan langganan streaming jatuh tempo 27 Nov. Semua total di
semua halaman dihitung dari baris transaksi yang sama di `app/data.js`, jadi
halaman-halaman tidak mungkin berselisih.

## Susunan berkas

| Berkas | Peran |
|---|---|
| `main.ts` | Program penyerahan: menyalin `app/` + `screenshots/` ke folder keluaran dan menulis `dossier.json` dengan pustaka kit yang sudah divendorkan. |
| `vendor/makefun-frontend.ts` | Pustaka dossier dari kit, tidak diubah. |
| `app/index.html` | Kerangka halaman: kepala, navigasi, titik pasang, kaki. |
| `app/style.css` | Semua gaya; hanya huruf sistem, tampil baik sampai ukuran ponsel. |
| `app/data.js` | Angka-angka keluarga: kategori, pemasukan, transaksi, tagihan, tujuan, riwayat enam bulan, kiat hemat. |
| `app/state.js` | Keadaan hidup: membaca data bawaan, menerapkan perubahan pengunjung, menyimpannya secara lokal. |
| `app/format.js` | Penolong format rupiah, tanggal, dan pengaman teks. |
| `app/charts.js` | Donat SVG dan batang bulanan berpasangan, digambar dari angka. |
| `app/views.js` | Keenam halaman, masing-masing fungsi dari keadaan hidup. |
| `app/main.js` | Router hash beserta penyambung semua formulir dan tombol. |
| `serve.ts` | Peladen statis mungil untuk pengujian lokal saja (`node serve.ts`, lalu http://localhost:8080). |
| `screenshots/` | Empat hasil render asli situs di Chrome headless: ringkasan, anggaran, transaksi (desktop), dan ringkasan (ponsel). |

## Menjalankan

```sh
node serve.ts          # http://localhost:8080
```

Penyerahan entri (yang dijalankan penilai):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Cara memvalidasi

- Disajikan lokal lalu dibuka di Chrome headless: keenam halaman tampil,
  tanpa console error, tanpa exception.
- Log permintaan dari tiga kali muat halaman penuh hanya berisi berkas lokal
  (`/`, `style.css`, `main.js`, `views.js`, `state.js`, `data.js`,
  `format.js`, `charts.js`) — nol permintaan ke luar.
- Kontrol diuji di peramban: menambah transaksi menambah baris dan totalnya,
  saringan kategori menyempitkan daftar, menandai tagihan lunas menurunkan
  total yang belum dibayar, dan setiap perubahan bertahan setelah muat ulang
  lewat localStorage.
- `main.ts` dijalankan dua kali ke dua folder menghasilkan keluaran yang
  byte-nya sama persis (diperiksa dengan `diff -r`).

## Lisensi

MIT — lihat `LICENSE`.
