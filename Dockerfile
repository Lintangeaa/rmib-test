# Gunakan node image yang sesuai dengan versi Node.js yang dibutuhkan
FROM node:20.10.0

# Pindah ke direktori proyek
WORKDIR /

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin sumber kode proyek
COPY . .

# Jalankan perintah build
RUN npm run build

# Port yang digunakan oleh aplikasi Next.js
EXPOSE 3000