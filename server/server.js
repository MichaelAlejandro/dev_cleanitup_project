let express = require("express");
let mongoose = require('mongoose');
let app = express();
let PORT = 3000;
const path = require("path");
const cors = require('cors');


const cleanItUpRoutes = require("./routes/cleanItUpRoutes");
app.use(cleanItUpRoutes);//cambiar


app.use(cors());
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '../client/static')));

// Rutas para diferentes páginas HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/aboutus.html"));
});

app.get("/knowmore", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/knowmore.html"));
});

app.get("/game", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/game.html"));
});

app.get("/plantations", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/plantations.html"));
});

app.get("/ranking", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/ranking.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/templates/register.html"));
});

app.get('*', (req, res) => {
  res.status(404).send("Página no encontrada");
});

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/cleanitup');
        console.log("Conexión exitosa a la base de datos.");
    } catch (err) {
        console.error("Error en la conexión (base de datos):", err);
        process.exit(1);
    }
}
connectDB();

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


