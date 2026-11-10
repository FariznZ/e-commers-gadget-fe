# E-commers-fe

Frontend aplikasi belanja **OOLAMA** (mobile web, 402px) — Vue 3 + TypeScript + Vite + Pinia.
Dibangun mengikuti desain Figma "Rama e-commerce mobile app" (file `DlMgXZwZTbBfDSdeEw5Oku`).

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + build produksi
npm run preview  # pratinjau hasil build
```

## Halaman

| Route | Halaman |
| --- | --- |
| `/` | Beranda |
| `/jelajah` | Jelajah produk (pencarian, kategori, urutan) |
| `/produk/:id` | Detail produk |
| `/keranjang` | Keranjang (pilih item, voucher, ringkasan) |
| `/checkout` | Checkout (alamat, isi pesanan, ringkasan) |
| `/pembayaran-berhasil` | Pembayaran berhasil |
| `/pesanan` | Riwayat pesanan |
| `/masuk` | Masuk |
| `/daftar` | Daftar |
| `/profil` | Profil & pengaturan |

Bottom navigation tampil di Beranda, Jelajah, Keranjang, Pesanan, dan Profil.

## Struktur

```
src/
  components/   komponen UI bersama (header, nav, kartu produk, field, dll.)
  data/         mock produk & riwayat pesanan
  router/       definisi route
  stores/       Pinia: cart, auth
  styles/       tokens desain & utilitas global
  types/        tipe TypeScript
  utils/        formatter harga
  views/        10 halaman
```

## Catatan

- Frontend saja, tanpa backend. Semua data produk/pesanan adalah mock.
- Pembayaran bersifat simulasi; tidak ada transaksi nyata.
- State keranjang/auth disimpan di memori Pinia (reset saat halaman dimuat ulang).
- Token desain: Work Sans, ink `#242630`, accent `#d84719`, aksen kuat `#f25b28`, hijau `#248463`, latar `#f6f7f9`.
- Status bar perangkat dan chrome OS sengaja tidak disertakan.
- opencode -s ses_e41c33955ffeRy7AylcirGfcEs  
