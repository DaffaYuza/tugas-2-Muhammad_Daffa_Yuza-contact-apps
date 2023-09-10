// panggil fungsi readline 
const readline = require('./readline');
//  panggil fungsi untuk menyimpan database sementara
const databaseKontak = require('./storage');


// buat object kosong untuk menampung inputan 
let objectKontak = {
    nama : '',
    nomorHp : ''
}


function viewMenu() { //fungsi untuk menampilkan halaman menu
    console.log("Selamat Datang Di Aplikasi Kontak !");
    console.log("====================================\n");
    console.log("Main Menu :\n");
    console.log("1.Tambah Data \n");
    console.log("2.Lihat Data \n");
    console.log("3.Reset Data \n");
    console.log("4.Pencarian Data \n");
    console.log("5.Hapus Satu Data \n");
    console.log("99.Exit \n");
    console.log("====================================\n");
    readline.question(`Silahkan Masukan Pilihan Anda  : `, input => {
        mainMenu(Number(input))
    });
}


function mainMenu(pilihan) { // fungsi untuk mengatur pilihan menu
    switch (pilihan) {
        case 1:
            simpan()
            break;
        case 2:
            lihatData() 
            break;
        case 3:
            resetData() 
            break;
        case 4:
            pencarianData() 
            break;
        case 5:
            hapusData() 
            break;
        case 99:
            readline.close() 
            break;
        // lanjutkan menu pilihanya disini secara urut
        default:
            console.log("Pilihan Tidak Valid !");
            readline.close()
            break;
    }
}


function simpan() {
    console.log("Silahkan Masukkan Data ! : ");
    readline.question("Nama : ", (nama) => {
        if (typeof nama === "string" && nama.trim() !== "") {
            objectKontak.nama = nama;
            console.log(`Input data berhasil ! : ${nama}`);
            ambilInputanNomor();
        } else {
            console.log("Nama harus berupa string.");
            simpan(); // Minta input lagi jika tidak valid
        }
    });
}


const ambilInputanNomor = () => {
    readline.question("Nomor : ", (nomor) => {
        if (isValidNumber(nomor)) {
            const nomorHp = parseInt(nomor); // Ubah ke tipe data number
            if (isDuplicateNomor(nomorHp)) {
                console.log("Nomor sudah ada dalam data.");
                ambilInputanNomor(); // Minta input nomor lagi jika sudah ada dalam data
            } else {
                objectKontak.nomorHp = nomorHp;
                databaseKontak.push(Object.assign({}, objectKontak)); // insert data kedalam array databaseKOntak
                kembali();
            }
        } else {
            console.log("Nomor harus berupa angka.");
            ambilInputanNomor(); // Minta input lagi jika tidak valid
        }
    });
}

function isValidNumber(input) {
    return !isNaN(input) && !isNaN(parseFloat(input)); // Memeriksa apakah input adalah angka
}

function isDuplicateNomor(nomor) {
    // Mengecek apakah nomor sudah ada dalam databaseKontak
    return databaseKontak.some(kontak => kontak.nomorHp === nomor);
}


const kembali = () => { // fungsi untuk navigasi kembali
    readline.question("Apakah Anda Ingin Kembali ? (y/n) : ", (pilihan) => {
        if(pilihan === "y"){
            viewMenu()
        }else {
            readline.close()
        }
        
    })
}

function lihatData () { // fungsi untuk melihat list data
    console.table(databaseKontak);
    kembali()
}

function resetData () {
    console.log("Anda yakin ingin mereset semua data? (y/n) : ");
    readline.question("Konfirmasi: ", (konfirmasi) => {
        if (konfirmasi === "y") {
            databaseKontak.length = 0; // Menghapus semua elemen dalam array databaseKontak
            console.log("Semua data telah direset.");
        } else {
            console.log("Penghapusan data dibatalkan.");
        }
        kembali();
    });
}


function pencarianData () {
    console.log("Masukkan nama yang ingin Anda cari : ");
    readline.question("Nama: ", (namaCari) => {
        const hasilPencarian = databaseKontak.filter((kontak) =>
            kontak.nama.toLowerCase().includes(namaCari.toLowerCase())
        );

        if (hasilPencarian.length > 0) {
            console.log("Hasil Pencarian :");
            console.table(hasilPencarian);
        } else {
            console.log(`Data dengan nama '${namaCari}' tidak ditemukan.`);
        }
        kembali();
    }); 
}
 

function hapusData() {
    console.log("Masukkan indeks data yang ingin Anda hapus: ");
    readline.question("Indeks: ", (indeksHapus) => {
        indeksHapus = parseInt(indeksHapus);

        if (isNaN(indeksHapus) || indeksHapus < 0 || indeksHapus >= databaseKontak.length) {
            console.log(`Indeks '${indeksHapus}' tidak valid.`);
        } else {
            const namaDihapus = databaseKontak[indeksHapus].nama;
            databaseKontak.splice(indeksHapus, 1);
            console.log(`Data dengan indeks '${indeksHapus}' dan nama '${namaDihapus}' telah dihapus.`);
        }
        kembali();
    });
}


viewMenu() // panggil fungsi view menu untuk pertama kali