var express = require("express");
var router = express.Router();
const mysqlConnection = require("./mysqlconn.js");


router.post("/", function (req, res,next) {
    var data = req.body;
    var arr = [];
    var array_of_column_name=[];
    function isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!  
      return !isNaN(str)  
    }
    var task;

    for(key in data){
      if (isNumeric(data[key])){
        var num = parseInt(data[key]);
        arr.push(num);
      } else{
        if (key=='task'){
          task=data[key]
          continue;
        }else{
          arr.push(data[key]);
        }
      }
      array_of_column_name.push(key)
    }
    
    var tablename = arr.shift();
    array_of_column_name.shift();

    var huz = "'" + arr.join("','") + "'";
    var ham = "" + array_of_column_name.join(",") + "";
    if(task=='add'){
      mysqlConnection.query(`insert into ${tablename} (${ham}) values (${huz})`,(err,rows,fields)=>{
        if(err){
            res.send(err)
        } else{
            res.redirect('/tables')
        }
      })
    } else if(task=='edit'){
      value = arr.shift();
      arr_value = value.split(",");
      array_of_column_name.shift();
      var update="";
      for(var i=0;i<array_of_column_name.length;i++){
        if(i==array_of_column_name.length-1){
          update+=`${array_of_column_name[i]}=`+"'"+arr[i]+"'";
          break;
        }
        update+=`${array_of_column_name[i]}=`+"'"+arr[i]+"'"+",";
      }
      mysqlConnection.query(`update ${tablename} set ${update} where ${arr_value[0]} = ${arr_value[1]}`,(err,rows,fields)=>{
        if(err){
          res.send(err);
        } else{
          res.redirect('/tables')
        }
      })
    }
});

module.exports = router;