const mongoose = require('mongoose');

var sanphamSchema = new mongoose.Schema({
    Ten  : String,
    Gia  : Number,
    ThuTu: Number
});

module.exports = mongoose.model("SanPham", sanphamSchema);