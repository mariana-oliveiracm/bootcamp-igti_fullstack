import express from 'express';
import mongoose from 'mongoose';
import accountsRouter from './routes/accountsRouter.js'
require('dotenv').config();

const app = express();

(async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@bootcampigti.shwpp.gcp.mongodb.net/bank-api?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log("Conectado ao ATLAS")
    } catch (error) {
        console.log("Erro ao conectar")
    }
})();

app.use(express.json());
app.use('/accounts', accountsRouter);
app.listen(3000, () => console.log ("API iniciada"));