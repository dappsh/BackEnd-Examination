
var express = require('express')
var app = express()
// membuat variabel dengan isi require('mongodb').MongoClient
var mong = require('mongodb').MongoClient;
var url = 'mongodb://root:12345@localhost:27017/dataCPU';
// url mongo ^
// connect ke server
// parameter pertama url, ke 2 call back function

//OS module
var os = require('os')

var namaCPU =  os.hostname()
var osTipe = os.type();
var osPlatform = os.platform()
var osRilis = os.release()
var ramSisa = os.freemem()
var ramTotal = os.totalmem()


mong.connect(url, (error,data)=>{
    console.log('Terhubung ke MongoDB!')
})


app.get('/data',(req,res)=>{
    mong.connect(url,(error,data)=>{
        var collection = data.collection('test');
        collection.find({}).toArray((error,hasil)=>{
            console.log(hasil);
            res.send(hasil);
        })
    })
})


app.post('/data',(req,res)=>{
    mong.connect(url,(error,data)=>{
        var datas = {namacpu: namaCPU, tipe: osTipe, platform: osPlatform , rilis: osRilis , ramSisa: ramSisa, ramTotal: ramTotal};
        var collection = data.collection('test');
        collection.insert(datas, (error,hasil)=>{
            console.log(hasil);
            res.send(hasil);
            console.log(namaCPU)
        })
    })
})


app.listen(3210,()=>{
    console.log('Server @port 3210 Activated')
})