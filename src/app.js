import express from "express";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { __dirname } from "./utils.js";
import './dao/db/dbConfig.js'
import { Server } from "socket.io";
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.routes.js"



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine','handlebars')


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter)



const port = 8080;

const httpServer = app.listen(port, () => {
  console.log("Servidor activo en el puerto 8080");
});
const socketServer = new Server(httpServer)
socketServer.on('connection', socket=>{
  console.log(`usuario conectado: ${socket.id}`)
  socket.on('disconnect',()=>{
    console.log(`usuario desconectado: ${socket.id}`);
  })
})

