const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const port       = 3000;
const host       = 'localhost';

app.use(bodyParser.json());

//endpoint create user
app.post('/user', (req,res)=> {
  res.send({
    message: 'CREATE NEW USER: POST /user',
    body: req.body
  });
});

//endpoint untuk get list all user
app.get('/user', (req,res)=>{
  res.send('GET USER LIST: GET /user');
});

//endpoint untuk get user by id
app.get('/user/:id', (req,res)=>{
  res.send('GET USER: GET /user/' + req.params.id);
});

//endpoint untuk update
app.patch('/user/:id', (req,res) => {
  const msg = {
    message: 'UPDATE USER: PATCH /user/' + req.params.id,
    body: req.body
  };
  res.send(msg);
});

//endpoint untuk delete
app.delete('/user/:id', (req,res)=>{
  res.send('DELETE USER: DELETE /user/' + req.params.id);
});

//listen port
app.listen(port,host, () => {
  console.log(`rest api listening at http://${host}:${port}`);
});
