const express = require("express");
const app = express();
const port = 3001;
//Loads the handlebars module
const handlebars = require("express-handlebars");
//instead of app.set('view engine', 'handlebars');
app.set("view engine", "hbs");
//instead of app.engine('handlebars', handlebars({
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "planB",
    //new configuration parameter
    partialsDir: __dirname + "/views/partials/",
  })
);
app.use(express.static("public"));
app.get("/", (req, res) => {
  //Using the index.hbs file instead of planB
  res.render("main", { layout: "index" });
});
//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
//   res.render("main", { layout: "index" });
// });
fakeApi = () => "Faker";
app.get("/", (req, res) => {
  res.render("main", {
    layout: "index",
    suggestedChamps: fakeApi(),
    listExists: true,
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));


