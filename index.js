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
  res.send('GET USER: GET /user/' + req.params.id);
});

//endpoint untuk update
app.patch('/product/:id', (req,res) => {
  const msg = {
    message: 'UPDATE USER: PATCH /user/' + req.params.id,
    body: req.body
  };
  res.send(msg);
});

//endpoint untuk delete
app.delete('/product/:id', (req,res)=>{
  res.send('DELETE USER: DELETE /user/' + req.params.id);
});

//listen port
app.listen(port,host, () => {
  console.log(`rest api listening at http://${host}:${port}`);
});
