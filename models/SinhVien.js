const mongoose = require('mongoose');

var sinhvienSchema = new mongoose.Schema({
    HoTen  : String,
    NamSinh: Number
});

module.exports = mongoose.model("SinhVien", sinhvienSchema);