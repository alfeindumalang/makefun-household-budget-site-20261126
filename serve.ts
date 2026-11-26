// Dana Rumah — peladen berkas statis mungil, hanya untuk pengujian lokal.
// Menyajikan app/ di http://localhost:8080, dengan app/index.html di akar.
// Tidak ada yang di sini ikut dalam entri; penilai tidak pernah menjalankannya.
//
//   node serve.ts

import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const akar = join(fileURLToPath(new URL('.', import.meta.url)), 'app');
const tipe = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

createServer((req, res) => {
  const jalur = normalize(join(akar, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  const berkas = statSync(jalur, { throwIfNoEntry: false })?.isDirectory() ? join(jalur, 'index.html') : jalur;
  if (!jalur.startsWith(akar) || !existsSync(berkas)) {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': tipe[extname(berkas)] ?? 'application/octet-stream' });
  res.end(readFileSync(berkas));
}).listen(8080, () => console.log('Dana Rumah di http://localhost:8080'));
