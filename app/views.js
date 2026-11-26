// Dana Rumah — halaman-halamannya. Tiap tampilan adalah fungsi dari keadaan
// hidup yang mengembalikan HTML; main.js yang menaruhnya di layar dan
// menyambungkan tombol serta formulirnya. Setiap angka dihitung dari keadaan,
// tidak pernah diketik dua kali, jadi halaman-halaman tidak bisa berbeda.

import { BULANAN, KATEGORI, KIAT, RUMAH } from './data.js';
import { escapeHtml, persen, rupiah, rupiahSingkat, tanggalPanjang, tanggalPendek } from './format.js';
import { WARNA_KATEGORI, batangBulanan, donat, keterangan } from './charts.js';
import { belanjaKategori, keadaan, pemasukanTotal, pengeluaranTotal, tagihanBelumTotal } from './state.js';

function namaKategori(kunci) {
  if (kunci === 'pemasukan') return 'Pemasukan';
  return KATEGORI.find((k) => k.kunci === kunci)?.nama ?? kunci;
}

function barisTransaksi(t, bisaHapus) {
  const hapus = bisaHapus
    ? `<td class="angka-kanan"><button class="kecil kedua" data-action="hapus-tx" data-id="${t.id}">Hapus</button></td>`
    : '';
  return `<tr>
    <td>${tanggalPendek(t.tanggal)}</td>
    <td>${escapeHtml(t.uraian)}</td>
    <td>${namaKategori(t.kategori)}</td>
    <td class="angka-kanan ${t.jenis === 'masuk' ? 'positif' : 'negatif'}">${t.jenis === 'masuk' ? '+' : '−'} ${rupiah(t.jumlah)}</td>
    ${hapus}
  </tr>`;
}

function kepala(judul, pengantar) {
  return `<div class="kepala-halaman"><h1>${judul}</h1><p>${pengantar}</p></div>`;
}

// ——— Ringkasan ———
export function ringkasan() {
  const masuk = pemasukanTotal();
  const keluar = pengeluaranTotal();
  const sisa = masuk - keluar;
  const belum = tagihanBelumTotal();
  const irisan = KATEGORI.filter((k) => k.kunci !== 'tabungan')
    .map((k) => ({ nama: k.nama, nilai: belanjaKategori(k.kunci), warna: WARNA_KATEGORI[k.kunci] }))
    .filter((iris) => iris.nilai > 0)
    .sort((a, b) => b.nilai - a.nilai);
  const terbaru = [...keadaan.transaksi]
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id)
    .slice(0, 8);
  const menanti = keadaan.tagihan.filter((t) => !t.lunas).sort((a, b) => a.jatuhTempo.localeCompare(b.jatuhTempo));
  const terkumpul = keadaan.tujuan.reduce((jumlah, t) => jumlah + t.terkumpul, 0);

  return `${kepala('Ringkasan Anggaran', `${RUMAH.nama} · ${RUMAH.rentang} · ${RUMAH.anggota}. Semua angka bulan ini, langsung berubah setiap ada transaksi baru.`)}
  <div class="angka-grid">
    <div class="angka baik"><div class="judul-angka">Pemasukan</div><div class="nilai-angka">${rupiahSingkat(masuk)}</div><div class="catatan-angka">Gaji + katering</div></div>
    <div class="angka"><div class="judul-angka">Pengeluaran</div><div class="nilai-angka">${rupiahSingkat(keluar)}</div><div class="catatan-angka">Termasuk tabungan ${rupiahSingkat(belanjaKategori('tabungan'))}</div></div>
    <div class="angka ${sisa < 0 ? 'bahaya' : 'baik'}"><div class="judul-angka">Sisa Uang</div><div class="nilai-angka">${rupiahSingkat(sisa)}</div><div class="catatan-angka">${sisa >= 0 ? 'Aman sampai gajian berikut' : 'Pengeluaran melebihi pemasukan!'}</div></div>
    <div class="angka ${belum > 0 ? 'waspada' : 'baik'}"><div class="judul-angka">Tagihan Belum Lunas</div><div class="nilai-angka">${rupiahSingkat(belum)}</div><div class="catatan-angka">${menanti.length} tagihan menunggu</div></div>
  </div>
  <div class="peringatan"><b>Perhatian:</b> cicilan motor Rp 850.000 jatuh tempo 28 November. Setelah dibayar, sisa uang bulan ini menjadi ${rupiah(sisa - 850000)}.</div>
  <div class="kolom-2">
    <section class="kartu">
      <h2>Pengeluaran per Kategori</h2>
      <p class="petunjuk">Di luar tabungan. Belanja harian paling besar — wajar, itu kebutuhan dapur sekeluarga.</p>
      <div class="bungkus-donat">${donat(irisan)}${keterangan(irisan)}</div>
      <p style="margin:14px 0 0"><a href="#/anggaran">Lihat semua anggaran →</a></p>
    </section>
    <section class="kartu">
      <h2>Transaksi Terakhir</h2>
      <p class="petunjuk">Delapan transaksi terbaru bulan ini.</p>
      <table class="tabel"><thead><tr><th>Tgl</th><th>Keterangan</th><th>Kategori</th><th class="angka-kanan">Jumlah</th></tr></thead>
      <tbody>${terbaru.map((t) => barisTransaksi(t, false)).join('')}</tbody></table>
      <p style="margin:14px 0 0"><a href="#/transaksi">Semua transaksi →</a></p>
    </section>
  </div>
  <div class="kolom-2">
    <section class="kartu">
      <h2>Tagihan Berikutnya</h2>
      <p class="petunjuk">Yang belum lunas, urut dari yang paling dekat jatuh temponya.</p>
      ${menanti.length ? menanti.map((t) => `<div class="baris-tagihan"><div><span class="nama-tagihan">${escapeHtml(t.nama)}</span><span class="catatan-tagihan">Jatuh tempo ${tanggalPanjang(t.jatuhTempo)} · ${escapeHtml(t.keterangan)}</span></div><div class="jumlah-tagihan">${rupiah(t.jumlah)}</div></div>`).join('') : '<p class="kosong">Semua tagihan bulan ini sudah lunas.</p>'}
      <p style="margin:14px 0 0"><a href="#/tagihan">Kelola tagihan →</a></p>
    </section>
    <section class="kartu">
      <h2>Tabungan Keluarga</h2>
      <p class="petunjuk">${rupiah(terkumpul)} sudah terkumpul di ${keadaan.tujuan.length} tujuan.</p>
      ${keadaan.tujuan.map((t) => `<div class="baris-batang"><div class="nama-batang">${escapeHtml(t.nama)}<span class="catatan-batang">${persen(t.terkumpul, t.target)}% tercapai</span></div><div class="rel-batang"><div class="isi-batang" style="width:${persen(t.terkumpul, t.target)}%"></div></div><div class="jumlah-batang"><b>${rupiahSingkat(t.terkumpul)}</b><span>dari ${rupiahSingkat(t.target)}</span></div></div>`).join('')}
      <p style="margin:14px 0 0"><a href="#/tabungan">Lihat tujuan tabungan →</a></p>
    </section>
  </div>`;
}

// ——— Anggaran ———
export function anggaran() {
  const totalAnggaran = KATEGORI.reduce((jumlah, k) => jumlah + keadaan.anggaran[k.kunci], 0);
  const totalTerpakai = KATEGORI.reduce((jumlah, k) => jumlah + belanjaKategori(k.kunci), 0);
  const baris = KATEGORI.map((k) => {
    const terpakai = belanjaKategori(k.kunci);
    const anggaranKategori = keadaan.anggaran[k.kunci];
    const pct = persen(terpakai, anggaranKategori);
    const kelas = pct > 100 ? 'lewat' : pct >= 85 ? 'hampir' : '';
    const tersisa = anggaranKategori - terpakai;
    return `<div class="baris-batang">
      <div class="nama-batang">${escapeHtml(k.nama)}<span class="catatan-batang">${escapeHtml(k.keterangan)}</span></div>
      <div class="rel-batang" title="${pct}% dari anggaran"><div class="isi-batang ${kelas}" style="width:${Math.min(pct, 100)}%"></div></div>
      <div class="jumlah-batang"><b>${rupiah(terpakai)}</b><span>dari ${rupiah(anggaranKategori)} · ${pct}%</span></div>
    </div>
    <form class="form-sebaris" data-form="anggaran" data-kunci="${k.kunci}" style="margin:2px 0 12px">
      <label class="kolom-form">Ubah anggaran ${escapeHtml(k.nama)} (Rp)
        <input type="number" name="jumlah" min="1" step="1000" value="${anggaranKategori}" required>
      </label>
      <button class="kecil" type="submit">Simpan</button>
      <span class="pesan-form" data-pesan></span>
      <span style="font-size:13.5px;color:var(--redup)">${tersisa >= 0 ? `Sisa ${rupiah(tersisa)}` : `Lebih ${rupiah(-tersisa)} dari anggaran`}</span>
    </form>`;
  }).join('');

  return `${kepala('Anggaran Bulanan', 'Delapan amplop untuk sebulan. Atur besarnya di sini — halaman lain langsung mengikuti angka baru.')}
  <div class="angka-grid">
    <div class="angka"><div class="judul-angka">Total Anggaran</div><div class="nilai-angka">${rupiahSingkat(totalAnggaran)}</div><div class="catatan-angka">8 kategori</div></div>
    <div class="angka"><div class="judul-angka">Terpakai</div><div class="nilai-angka">${rupiahSingkat(totalTerpakai)}</div><div class="catatan-angka">${persen(totalTerpakai, totalAnggaran)}% dari anggaran</div></div>
    <div class="angka ${totalAnggaran - totalTerpakai < 0 ? 'bahaya' : 'baik'}"><div class="judul-angka">Sisa Anggaran</div><div class="nilai-angka">${rupiahSingkat(totalAnggaran - totalTerpakai)}</div><div class="catatan-angka">${totalAnggaran - totalTerpakai >= 0 ? 'Masih dalam batas' : 'Anggaran terlampaui'}</div></div>
    <div class="angka"><div class="judul-angka">Kategori Paling Boros</div><div class="nilai-angka" style="font-size:20px">${escapeHtml(KATEGORI.find((k) => k.kunci === 'belanja').nama)}</div><div class="catatan-angka">${rupiahSingkat(belanjaKategori('belanja'))} · ${persen(belanjaKategori('belanja'), totalTerpakai)}% dari belanja</div></div>
  </div>
  <section class="kartu"><h2>Anggaran per Kategori</h2>
  <p class="petunjuk">Batang hijau berarti aman, kuning berarti di atas 85%, merah berarti anggaran terlampaui.</p>
  ${baris}</section>`;
}

// ——— Transaksi ———
const SARINGAN = [
  { kunci: 'semua', nama: 'Semua' },
  { kunci: 'masuk', nama: 'Pemasukan' },
  { kunci: 'keluar', nama: 'Pengeluaran' },
  ...KATEGORI.map((k) => ({ kunci: k.kunci, nama: k.nama })),
];

export function transaksi(saringan) {
  const aktif = saringan || 'semua';
  let baris = [...keadaan.transaksi].sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.id - a.id);
  if (aktif === 'masuk') baris = baris.filter((t) => t.jenis === 'masuk');
  else if (aktif === 'keluar') baris = baris.filter((t) => t.jenis === 'keluar');
  else if (aktif !== 'semua') baris = baris.filter((t) => t.kategori === aktif);
  const jumlahKeluar = baris.filter((t) => t.jenis === 'keluar').reduce((j, t) => j + t.jumlah, 0);
  const jumlahMasuk = baris.filter((t) => t.jenis === 'masuk').reduce((j, t) => j + t.jumlah, 0);

  return `${kepala('Transaksi', 'Semua uang masuk dan keluar bulan ini. Tambah transaksi baru di bawah — angka di semua halaman langsung berubah.')}
  <section class="kartu">
    <h2>Tambah Transaksi</h2>
    <p class="petunjuk">Catat begitu uang keluar atau masuk, supaya anggarannya selalu jujur.</p>
    <form class="form-sebaris" data-form="tambah-tx">
      <label class="kolom-form">Keterangan<input type="text" name="uraian" maxlength="80" placeholder="cth. Belanja mingguan" required></label>
      <label class="kolom-form">Jumlah (Rp)<input type="number" name="jumlah" min="1" step="1000" placeholder="150000" required></label>
      <label class="kolom-form">Kategori
        <select name="kategori">
          ${KATEGORI.map((k) => `<option value="${k.kunci}">${escapeHtml(k.nama)}</option>`).join('')}
        </select>
      </label>
      <label class="kolom-form">Jenis
        <select name="jenis"><option value="keluar">Pengeluaran</option><option value="masuk">Pemasukan</option></select>
      </label>
      <button type="submit">Tambah</button>
      <span class="pesan-form" data-pesan></span>
    </form>
  </section>
  <div class="pilihan" role="group" aria-label="Saring transaksi">
    ${SARINGAN.map((s) => `<button data-action="saring" data-saringan="${s.kunci}" aria-pressed="${aktif === s.kunci}">${s.nama}</button>`).join('')}
  </div>
  <section class="kartu">
    <h2>Daftar Transaksi <span style="color:var(--redup);font-weight:400;font-size:15px">(${baris.length} baris · masuk ${rupiah(jumlahMasuk)} · keluar ${rupiah(jumlahKeluar)})</span></h2>
    ${baris.length ? `<table class="tabel"><thead><tr><th>Tgl</th><th>Keterangan</th><th>Kategori</th><th class="angka-kanan">Jumlah</th><th class="angka-kanan">Aksi</th></tr></thead>
    <tbody>${baris.map((t) => barisTransaksi(t, true)).join('')}</tbody></table>` : '<p class="kosong">Tidak ada transaksi untuk saringan ini.</p>'}
  </section>`;
}

// ——— Tagihan ———
export function tagihan() {
  const belum = keadaan.tagihan.filter((t) => !t.lunas);
  const lunas = keadaan.tagihan.filter((t) => t.lunas);
  const terdekat = [...belum].sort((a, b) => a.jatuhTempo.localeCompare(b.jatuhTempo))[0];
  const baris = [...keadaan.tagihan].sort((a, b) => a.jatuhTempo.localeCompare(b.jatuhTempo)).map((t) => `
    <div class="baris-tagihan">
      <div><span class="nama-tagihan">${escapeHtml(t.nama)}</span><span class="catatan-tagihan">Jatuh tempo ${tanggalPanjang(t.jatuhTempo)} · ${escapeHtml(t.keterangan)}</span></div>
      <div style="display:flex;align-items:center;gap:12px">
        <div class="jumlah-tagihan">${rupiah(t.jumlah)}<span>${t.lunas ? 'Sudah dibayar' : 'Belum dibayar'}</span></div>
        <span class="lencana ${t.lunas ? 'lunas' : 'menunggu'}">${t.lunas ? 'Lunas' : 'Menunggu'}</span>
        <button class="kecil ${t.lunas ? 'kedua' : ''}" data-action="balik-tagihan" data-id="${t.id}">${t.lunas ? 'Batalkan' : 'Tandai Lunas'}</button>
      </div>
    </div>`).join('');

  return `${kepala('Tagihan & Cicilan', 'Semua kewajiban bulanan dalam satu daftar. Tandai lunas begitu dibayar — ringkasan langsung berkurang.')}
  <div class="angka-grid">
    <div class="angka ${tagihanBelumTotal() > 0 ? 'waspada' : 'baik'}"><div class="judul-angka">Belum Dibayar</div><div class="nilai-angka">${rupiahSingkat(tagihanBelumTotal())}</div><div class="catatan-angka">${belum.length} dari ${keadaan.tagihan.length} tagihan</div></div>
    <div class="angka baik"><div class="judul-angka">Sudah Lunas</div><div class="nilai-angka">${rupiahSingkat(lunas.reduce((j, t) => j + t.jumlah, 0))}</div><div class="catatan-angka">${lunas.length} tagihan bulan ini</div></div>
    <div class="angka"><div class="judul-angka">Jatuh Tempo Terdekat</div><div class="nilai-angka" style="font-size:20px">${terdekat ? escapeHtml(terdekat.nama) : '—'}</div><div class="catatan-angka">${terdekat ? `${tanggalPanjang(terdekat.jatuhTempo)} · ${rupiah(terdekat.jumlah)}` : 'Semua sudah lunas'}</div></div>
    <div class="angka"><div class="judul-angka">Total Tagihan/Bulan</div><div class="nilai-angka">${rupiahSingkat(keadaan.tagihan.reduce((j, t) => j + t.jumlah, 0))}</div><div class="catatan-angka">8 kewajiban rutin</div></div>
  </div>
  <section class="kartu"><h2>Daftar Tagihan November</h2>
  <p class="petunjuk">Urut dari yang paling dekat jatuh temponya.</p>${baris}</section>`;
}

// ——— Tabungan ———
export function tabungan() {
  const terkumpul = keadaan.tujuan.reduce((j, t) => j + t.terkumpul, 0);
  const target = keadaan.tujuan.reduce((j, t) => j + t.target, 0);
  const kartu = keadaan.tujuan.map((t) => {
    const pct = persen(t.terkumpul, t.target);
    const kurang = t.target - t.terkumpul;
    return `<article class="tujuan">
      <h3>${escapeHtml(t.nama)}</h3>
      <p class="catatan-tujuan">${escapeHtml(t.keterangan)}</p>
      <div class="rel-batang"><div class="isi-batang" style="width:${pct}%"></div></div>
      <div class="angka-tujuan"><span><b>${rupiahSingkat(t.terkumpul)}</b> terkumpul</span><span>${pct}%</span></div>
      <div class="angka-tujuan"><span>Target ${rupiah(t.target)}</span><span>${kurang > 0 ? `Kurang ${rupiahSingkat(kurang)}` : 'Tercapai!'}</span></div>
      <form data-form="tambah-dana" data-id="${t.id}">
        <label class="kolom-form" style="flex:1">Tambah dana (Rp)<input type="number" name="jumlah" min="1000" step="1000" placeholder="100000" required></label>
        <button class="kecil" type="submit" style="align-self:flex-end">Simpan</button>
      </form>
    </article>`;
  }).join('');

  return `${kepala('Tabungan & Tujuan', 'Tiga tujuan keluarga. Tambah dana kapan saja — batang kemajuan langsung bergerak.')}
  <div class="angka-grid">
    <div class="angka baik"><div class="judul-angka">Total Terkumpul</div><div class="nilai-angka">${rupiahSingkat(terkumpul)}</div><div class="catatan-angka">${persen(terkumpul, target)}% dari semua target</div></div>
    <div class="angka"><div class="judul-angka">Total Target</div><div class="nilai-angka">${rupiahSingkat(target)}</div><div class="catatan-angka">3 tujuan</div></div>
    <div class="angka"><div class="judul-angka">Dana Darurat</div><div class="nilai-angka">${persen(keadaan.tujuan[0].terkumpul, keadaan.tujuan[0].target)}%</div><div class="catatan-angka">${rupiahSingkat(keadaan.tujuan[0].terkumpul)} dari ${rupiahSingkat(keadaan.tujuan[0].target)}</div></div>
    <div class="angka"><div class="judul-angka">Tabungan Bulan Ini</div><div class="nilai-angka">${rupiahSingkat(belanjaKategori('tabungan'))}</div><div class="catatan-angka">Otomatis tiap tanggal 25</div></div>
  </div>
  <div class="grid-tujuan">${kartu}</div>
  <section class="kartu" style="margin-top:16px">
    <h2>Kenapa menabung dulu?</h2>
    <p class="petunjuk">Aturan keluarga Hartono: begitu gajian masuk, Rp 2.000.000 langsung pindah ke Dana Darurat sebelum dibelanjakan. Sisanya yang dibagi ke delapan amplop anggaran. Menabung di akhir bulan tidak pernah berhasil — menabung di awal selalu berhasil.</p>
  </section>`;
}

// ——— Laporan ———
export function laporan() {
  const keluar = KATEGORI.filter((k) => k.kunci !== 'tabungan')
    .map((k) => ({ nama: k.nama, nilai: belanjaKategori(k.kunci) }))
    .sort((a, b) => b.nilai - a.nilai);
  const terbesar = [...keadaan.transaksi].filter((t) => t.jenis === 'keluar').sort((a, b) => b.jumlah - a.jumlah)[0];
  const rataHarian = Math.round(pengeluaranTotal() / 25);

  return `${kepala('Laporan Bulanan', 'Enam bulan terakhir, diringkas: dari mana uang datang, ke mana uang pergi, dan apa yang bisa diperbaiki.')}
  <section class="kartu">
    <h2>Pemasukan vs Pengeluaran — Jun–Nov 2026</h2>
    <p class="petunjuk">November masih berjalan (1–25 Nov). Pengeluaran bulan ini paling rendah dalam enam bulan karena cicilan motor belum dibayar.</p>
    ${batangBulanan(BULANAN)}
  </section>
  <div class="kolom-2">
    <section class="kartu">
      <h2>Pengeluaran Terbesar Bulan Ini</h2>
      <p class="petunjuk">Tiga kategori teratas dari total ${rupiah(pengeluaranTotal())}.</p>
      ${keluar.slice(0, 3).map((k, i) => `<div class="baris-batang"><div class="nama-batang">${i + 1}. ${escapeHtml(k.nama)}</div><div class="rel-batang"><div class="isi-batang" style="width:${persen(k.nilai, keluar[0].nilai)}%"></div></div><div class="jumlah-batang"><b>${rupiah(k.nilai)}</b></div></div>`).join('')}
      <p style="margin-top:14px">Pengeluaran tunggal terbesar: <b>${escapeHtml(terbesar.uraian)}</b> — ${rupiah(terbesar.jumlah)} pada ${tanggalPanjang(terbesar.tanggal)}. Rata-rata belanja harian bulan ini ${rupiah(rataHarian)}.</p>
    </section>
    <section class="kartu">
      <h2>Perbandingan dengan Bulan Lalu</h2>
      <p class="petunjuk">Oktober 2026 sebagai pembanding.</p>
      <table class="tabel"><thead><tr><th></th><th class="angka-kanan">Okt 2026</th><th class="angka-kanan">Nov 2026</th></tr></thead><tbody>
        <tr><td>Pemasukan</td><td class="angka-kanan">Rp 12.500.000</td><td class="angka-kanan">Rp 12.500.000</td></tr>
        <tr><td>Pengeluaran</td><td class="angka-kanan">Rp 10.950.000</td><td class="angka-kanan">${rupiah(pengeluaranTotal())} *</td></tr>
        <tr><td>Sisa</td><td class="angka-kanan">Rp 1.550.000</td><td class="angka-kanan">${rupiah(pemasukanTotal() - pengeluaranTotal())} *</td></tr>
        <tr><td>Tabungan</td><td class="angka-kanan">Rp 2.000.000</td><td class="angka-kanan">${rupiah(belanjaKategori('tabungan'))}</td></tr>
      </tbody></table>
      <p style="font-size:13px;color:var(--redup)">* November masih berjalan sampai 25 Nov; cicilan motor Rp 850.000 belum dibayar.</p>
    </section>
  </div>
  <h2 class="judul-bagian">Kiat Hemat untuk Keluarga Hartono</h2>
  <div class="grid-kiat">
    ${KIAT.map((k) => `<article class="kiat"><h3>${escapeHtml(k.judul)}</h3><p>${escapeHtml(k.isi)}</p></article>`).join('')}
  </div>
  <section class="kartu" style="margin-top:16px">
    <h2>Reset Data Contoh</h2>
    <p class="petunjuk">Semua perubahan Anda (transaksi, tagihan, tabungan, anggaran) tersimpan di peramban ini. Kembalikan angka ke data contoh awal kapan saja.</p>
    <button class="kedua" data-action="pulihkan">Kembalikan data contoh</button>
  </section>`;
}
