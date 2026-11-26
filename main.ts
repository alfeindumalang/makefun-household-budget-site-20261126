// Dana Rumah — program penyerahan untuk best-household-budget-site-20261126-1457.
// Node 22, hanya pustaka bawaan.
//
// Situsnya sendiri tinggal di app/: berkas statis biasa yang dibuka peramban
// secara luring (index.html beserta modul ES dan satu stylesheet-nya, tanpa
// langkah build, tanpa satu pun permintaan jaringan). Program ini hanya
// langkah penyerahan: menyalin app/ dan screenshots/ dari samping berkas ini
// ke folder keluaran penilai, lalu menulis dossier.json di sana memakai
// pustaka kit yang sudah divendorkan. Penilai menjalankan program ini dua
// kali dan kedua jalan harus menghasilkan byte yang sama persis, jadi tidak
// ada yang di sini bergantung pada jam, keacakan, atau urutan berkas dibaca.
//
// Menjalankannya di luar penilai:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Menjalankan situs secara lokal:
//   node serve.ts        (lalu buka http://localhost:8080)

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Folder tempat berkas ini berada, dan folder tempat penilai menginginkan entrinya.
const akarRepo = fileURLToPath(new URL('.', import.meta.url));
const folderKeluaran = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Salin situsnya, lalu tangkapan layarnya, lalu tulis dossier yang dibaca juri.
mkdirSync(folderKeluaran, { recursive: true });
cpSync(join(akarRepo, 'app'), join(folderKeluaran, 'app'), { recursive: true });
mkdirSync(join(folderKeluaran, 'screenshots'), { recursive: true });
if (existsSync(join(akarRepo, 'screenshots'))) {
  cpSync(join(akarRepo, 'screenshots'), join(folderKeluaran, 'screenshots'), { recursive: true });
}

// Batas-batas ini mencerminkan gerbang penilai: paling banyak 4 tangkapan
// layar @ 256 KiB, app/ paling banyak 993 entri dan 16 MiB, teks dossier
// paling banyak 160 KiB.
writeFileSync(
  join(folderKeluaran, 'dossier.json'),
  buildDossier(folderKeluaran, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
