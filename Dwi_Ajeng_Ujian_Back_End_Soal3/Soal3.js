var express = require('express');
var app = express();

var bodyPars = require('body-parser');
app.use(bodyPars.json());

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dapps691',
    database: 'toko2'
});
db.connect();

app.get('/karyawan', (req, res) => {
    var getData = 'SELECT * FROM karyawan';
    db.query(getData, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/karyawan', (req, res) => {
    var tanggal = new Date();
    var tahun = tanggal.getFullYear();

    var zData = {
        nama: req.body.nama,
        tglLahir: req.body.tglLahir
    };

    var name = zData.nama;
    var tglSplit = zData.tglLahir.split("-");


    function fungsiZodiac(day, month) {

        if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            var zodiakMu = "aries"
            return zodiakMu;
        }

        else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            var zodiakMu = "taurus"
            return zodiakMu;
        }

        else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            var zodiakMu = "gemini"
            return zodiakMu;
        }

        else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            var zodiakMu = "cancer"
            return zodiakMu;
        }

        else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            var zodiakMu = "leo"
            return zodiakMu;
        }

        else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            var zodiakMu = "virgo"
            return zodiakMu;
        }

        else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            var zodiakMu = "libra"
            return zodiakMu;
        }

        else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            var zodiakMu = "scorpio"
            return zodiakMu;
        }

        else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            var zodiakMu = "sagittarius"
            return zodiakMu;
        }

        else if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            var zodiakMu = "capricorn"
            return zodiakMu;
        }

        else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            var zodiakMu = "aquarius"
            return zodiakMu;
        }

        else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            var zodiakMu = "pisces"
            return zodiakMu;
        }
    }
    
    var usiaSekarang = tahun - tglSplit[2];
    var dataKaryawan = {
        nama: name,
        hari: tglSplit[0],
        bulan: tglSplit[1],
        tahun: tglSplit[2],
        zodiak: fungsiZodiac(tglSplit[0], tglSplit[1]),
        usia: usiaSekarang
    };
    
    var sql = 'INSERT INTO karyawan SET ?';
    db.query(sql, dataKaryawan, (err, result) => {
        if (err) throw err;
        console.log(dataKaryawan);
        res.send({
            status: 'Data Posted'
        })
    });
});


app.listen(3210, () => {
    console.log('Server @port 3210 Active')
});