const { skips } = require("debug");
var express = require("express");
var router = express.Router();
const mysqlConnection = require("./mysqlconn.js");

router.post("/", function (req, res,next) {
  var ob = req.body;
  var name;
  var value;
  if(Object.getOwnPropertyNames(ob).length == 1){
    
    for(key in ob){
      name=key
      value=ob[key]
    }
  }else{
    name= Object.keys(ob)[0]
    value=ob[Object.keys(ob)[0]]
  }
  
  if(value=="ADD"){
    mysqlConnection.query(`select COLUMN_NAME, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH,  
       IS_NULLABLE 
    from INFORMATION_SCHEMA.COLUMNS
    where TABLE_NAME='${name}'`,(err,rows,fields)=>{

      if(err){
        res.send(err)
      }else{
        if(Object.keys(ob)[0]=="users"){
          var main=rows.slice(0,2);
        }else{
          var main=rows;
        }
        rows.shift()
        res.render("add",{data:main, tablename:name, cond:'add'});
      }
    });

  } else if(ob[Object.keys(ob)[0]]=='EDIT'){
      mysqlConnection.query(`select COLUMN_NAME,DATA_TYPE,CHARACTER_MAXIMUM_LENGTH,IS_NULLABLE
      from INFORMATION_SCHEMA.COLUMNS
      where TABLE_NAME='${ob.tablename}'`,(err,rows,fields)=>{
        if(err){
          res.send(err)
        }
        var main=rows;
        if(typeof(ob.id)==typeof([])){
          var condition =  ob.id[0];
          id = [ob.id[0],Object.keys(ob)[0]]
        } else{
          var condition = ob.id;
          id = [ob.id,Object.keys(ob)[0]]
        }
        mysqlConnection.query(`select * from ${ob.tablename} where ${condition}=${Object.keys(ob)[0]}`,(err,rows,fields)=>{ 
          res.render("add",{data:main,rows:rows,tablename:ob.tablename,cond:'edit',id:id})
        })
      })
      
  } else if(ob[Object.keys(ob)[0]]=='DELETE'){
      if (ob.confirm[0] == "False") {
        mysqlConnection.query(`SELECT * from ${ob.tablename}`,(err,rows,fields)=>{
          if (err){
            res.send(err)
          } else{
            var data = [rows]
            res.render("tables",{
              data:data,
              user: req.cookies.user,
              tablenames:[ob.tablename],
              action: true,
              cond:"view"
            })
          }
        });

      } else {
        mysqlConnection.query(`delete from ${ob.tablename} where ${ob.id[0]}=${Object.keys(ob)[0]}`,(err,rows,fields)=>{
          if(err){
            res.send(err)
          }else{
            mysqlConnection.query(`SELECT * from ${ob.tablename}`,(err,rows,fields)=>{
              if (err){
                res.send(err)
              } else{
                var data = [rows]
                res.render("tables",{
                  data:data,
                  user: req.cookies.user,
                  tablenames:[ob.tablename],
                  action: true,
                  cond:"view"
                })
              }
            });
          }
        })
      }
      
  } else if(ob[Object.keys(ob)[0]]=='VIEW'){
      var tablename=[name]
      mysqlConnection.query(`SELECT * from ${name}`,(err,rows,fields)=>{
        if (err){
          res.send(err)
        } else{
          var data = [rows]
          res.render("tables",{
            data:data,
            user: req.cookies.user,
            tablenames:tablename,
            action: true,
            cond:"view"
          })
        }
      });

  } else{
      var tablename = ob.tablename;
      var select = ob.selectbox;
      var search = ob.search;
      var id = ob.id[0];
      mysqlConnection.query(`SELECT * from ${tablename} where ${select}='${search}'`,(err,rows,fields)=>{
        var data = [rows]
        if(data[0].length === 0){
          res.render("tables",{
            data:data,
            user: req.cookies.user,
            message: 'No record found !',
            cond:"view"
          })    
        }else{
          res.render("tables",{
            data:data,
            user: req.cookies.user,
            tablenames:[tablename],
            action: true,
            cond:"view"
          })
        }
      })
    }
})

module.exports = router;