var express = require("express");
var app = express();
/*app.use(express.static("./"));*/
app.get("/",function(req , res ){
    res.send("<h1>Araji ej</h1>");
    
});
app.get("/:name", function(req, res){
   var search = req.params.name;
   res.redirect("http://google.com/search?q=" + search);
});
app.get("/*",function (req,res){
    res.redirect(404,"EROR");
});
app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

