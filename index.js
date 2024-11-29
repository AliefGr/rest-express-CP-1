const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const port = 3000;
const host = "localhost";
const methodOverride = require('method-override')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/order", (req, res) => {
  // console.log("Ini response dari endpoint order dari method GET");
  res.send("Ini response dari endpoint order dari method GET");
});

app.post("/order", (req, res) => {
  // console.log(req.body);
  const { name, price } = req.body;
  res.send(`Name: ${name}, Price: ${price}`);
});

let comments = [
  {
    id : uuidv4(),
    name: "Alief",
    text: "Terima kasih atas informasinya!",
  },
  {
    id : uuidv4(),
    name: "Budi",
    text: "Sangat membantu, lanjutkan berkarya!",
  },
  {
    id : uuidv4(),
    name: "Citra",
    text: "Ada beberapa hal yang perlu diperbaiki.",
  },
  {
    id : uuidv4(),
    name: "Dewi",
    text: "Keren sekali, ini sangat bermanfaat!",
  },
  {
    id : uuidv4(),
    name: "Eko",
    text: "Tolong buat tutorial lebih detail untuk pemula.",
  },
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

app.get('/comments/create', (req, res) => {
    res.render('comments/create');
})

app.get('/comments/:id', (req, res) => {
  const {id} = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/show', {comment});
})

app.get('/comments/:id/edit', (req, res) => {
  const {id} = req.params;
  const comment = comments.find(c => c.id === id);
  res.render('comments/edit', {comment});
})

app.delete('/comments/:id', (req, res) => {
  const {id} = req.params;
  comments = comments.filter(c => c.id !== id );
  res.redirect('/comments')
}) 


app.post('/comments', (req, res) => {
    const {name, text} = req.body;
    comments.push({name, text, id : uuidv4()});
    // res.send('Okk berhasil');
    res.redirect('/comments');
})

app.patch('/comments/:id', (req, res) => {
  const {id} = req.params;
  const newComment = req.body.text;
  const foundComment = comments.find(c => c.id === id)
  foundComment.text = newComment
  res.redirect('/comments')
})




app.listen(port, host, () => {
  console.log(`App listening at http://${host}:${port}`);
});
