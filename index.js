const express    = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
const app        = express();

//cons environment
const port       = 3000;
const host       = 'localhost';
const database   = 'learn';
const user       = 'root';
const password   = '';


// init body parser
app.use(bodyParser.json());


//init connection mysql
const con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

//check connection
con.connect(function(err) {
  if(err) throw err;
  console.log("Connected!");
})

//endpoint create product
app.post('/product', (req,res)=> {
  let product_name  = req.body.product_name;
  let product_price = req.body.product_price;
  let sql           = `INSERT INTO product (product_name,product_price) VALUES ('${product_name}','${product_price}')`;
  let exec          = con.query(sql);
  let message       =  "";
  if(exec) {
    message = "Success";
  } else {
    messafe = "Failed";
  }
  res.send({
    message: message,
    body: req.body
  });
});

//endpoint untuk get list all product
app.get('/product', (req,res)=>{
  let sql  = "SELECT * FROM product";
  con.query(sql,(err, result, field) => {
    if(err) {
      res.send({
        message: "failed",
        data: ""
      });
    } else {
      res.send({
        message: "Success",
        data: result
      });
    }
  });
});

//endpoint untuk get product by id
app.get('/product/:id', (req,res)=>{
  let id  = req.params.id;
  let sql = `SELECT * FROM product WHERE product_id=${id}`;
  con.query(sql,(err,result,field) => {
    if(err) {
      res.send({
        message: "Failed",
        data: ""
      });
    } else {
      let data = result;
      if(result.length == 0 ) {
        data = "data not found"
      }
      res.send({
        message: "Success",
        data: data
      });
    }
  });
});

//endpoint untuk update
app.patch('/product/:id', (req,res) => {
  let product_id    = req.params.id;
  let product_name  = req.body.product_name;
  let product_price = req.body.product_price;
  let sql = `UPDATE product set product_name='${product_name}',product_price=${product_price} WHERE product_id=${product_id}`;
  con.query(sql,(err,result) => {
    if(err) {
      res.send({
        message: "Failed",
        data: ""
      });
    } else {
      res.send({
        message: "Success",
        data: ""
      });
    }
  });
});

//endpoint untuk delete
app.delete('/product/:id', (req,res)=>{
  let sql = "DELETE FROM product WHERE product_id=" + req.params.id;
  con.query(sql,(err,result)=>{
    if(err) {
      res.send({
        message: "Failed"
      });
    } else {
      res.send({
        message: "Success"
      });
    }
  })
});

//listen port
app.listen(port,host, () => {
  console.log(`rest api listening at http://${host}:${port}`);
});
