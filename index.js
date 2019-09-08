var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

//Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoapham:awhXY2Ns2nhuC7mi@cluster0-qah5q.mongodb.net/buoi2?retryWrites=true&w=majority', {useNewUrlParser: true}, function(err){
    if(err){
        console.log("Mongodb connect error!!! " + err);
    }else{
        console.log("Mongodb connected successfully.");
    }
});

var SanPham = require("./models/SanPham");

app.get("/sp/:trang", function(req, res){
    var sosp1trang = 8;
    // tinh tổng sản phẩm
    SanPham.find().countDocuments(function(err, tong){
        if(err){
            console.log("List SanPham error:" + err);
            res.json({kq:0});
        }else{
            console.log(tong);
            
            // sotrang <---- tổng số trang phải có (tròn lên)
            var sotrang = Math.ceil(tong/sosp1trang);
            
            // Get :trang <---- Biết đc khách đang xem trang số mấy
            var trang = req.params.trang;

            // tính ra skip
            var skip = (trang - 1)*sosp1trang;

            SanPham.find(function(err, mang){
                if(err){
                    console.log("List SanPham error:" + err);
                    res.json({kq:0});
                }else{
                    res.render("sanpham", {
                        Mang:mang, 
                        TongTrang:sotrang, 
                        DangXem:trang  
                    });
                }
            }).sort({ThuTu:1}).skip(skip).limit(sosp1trang);
            
        }
    });

    

   

    


});

app.get("/ajax/:trang", function(req, res){
    var sosp1trang = 8;
    // tinh tổng sản phẩm
    SanPham.find().countDocuments(function(err, tong){
        if(err){
            console.log("List SanPham error:" + err);
            res.json({kq:0});
        }else{
            console.log(tong);
            
            // sotrang <---- tổng số trang phải có (tròn lên)
            var sotrang = Math.ceil(tong/sosp1trang);
            
            // Get :trang <---- Biết đc khách đang xem trang số mấy
            var trang = req.params.trang;

            // tính ra skip
            var skip = (trang - 1)*sosp1trang;

            SanPham.find(function(err, mang){
                if(err){
                    console.log("List SanPham error:" + err);
                    res.json({kq:0});
                }else{
                    res.render("sanpham2", {
                        Mang:mang, 
                        TongTrang:sotrang, 
                        DangXem:trang  
                    });
                }
            }).sort({ThuTu:1}).skip(skip).limit(sosp1trang);
            
        }
    });
});


app.get("/sanpham", function(req, res){
    
    /*SanPham.find().countDocuments(function(err, tong){
        if(err){
            console.log("List SanPham error:" + err);
            res.json({kq:0});
        }else{
            console.log(tong);
            res.send("" + tong);
        }
    }); */
    
    SanPham.find(function(err, items){
        if(err){
            console.log("List SanPham error:" + err);
            res.json({kq:0});
        }else{
            res.send(items);
        }
    }).sort({ThuTu:1}).skip(5).limit(3);
    
});

app.get("/demo", function(req, res){
    
    for(var i = 1; i<=23; i++){
        var keo = SanPham({
            Ten     : "Keo " + i,
            Gia     : 100,
            ThuTu   : i
        });
        keo.save(function(err){
            if(err){
                console.log("Save SanPham error:" + err);
            }else{
                console.log("Save SanPham " + i + " successfully!");
            }
        });
    }

    res.send("Okay!");

});


////////// Ngay hom qua


var SinhVien = require("./models/SinhVien.js");

app.get("/sv/:id", function(req, res){
    SinhVien.find( {NamSinh:req.params.id} , function(err, ds){
        if(err){
            console.log("Get SinhVien error!!! " + err);
            res.json({kq:0});
        }else{
            console.log("Get SinhVien successfully.");
            res.json(ds);
        }
    });
});

app.get("/save", function(req, res){
    var teo = new SinhVien({
        HoTen   : "Nguyễn Văn Tèo",
        NamSinh : 2000
    });

    teo.save(function(err){
        if(err){
            console.log("Save error!!! " + err);
            res.json({kq:0});
        }else{
            console.log("Saved successfully.");
            res.json({kq:1});
        }
    });
});

// E6nZpH1KX0A6xXzK