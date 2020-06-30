import express from 'express';
import { accountModel } from '../models/accountModel.js'

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const account = await accountModel.find({});
        res.send(account);
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//deposito
router.patch('/deposito/:agencia/:conta', async (req, res) => {
    try {
        const valorDeposito = req.body;

        const whatMatch = { agencia: req.params.agencia, conta: req.params.conta }
        const doMatch = { $inc: valorDeposito }

        const account = await accountModel.findOneAndUpdate(whatMatch, doMatch, { new: true });
        if (!account){
            res.status(404).send("Conta não encontrada")
        }
        res.send(account);
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//saque
router.patch('/saque/:agencia/:conta', async (req, res) => {
    try {
        const descontar = req.body.balance + 1;
        const valorSaque = { balance: -descontar } 
        
        const whatMatch = { agencia: req.params.agencia, conta: req.params.conta }  
        const doMatch = { $inc: valorSaque }     

        const findAccount = await accountModel.findOne(whatMatch)
        if (!findAccount){
            res.status(404).send("Conta não encontrada")
        }
        const validate = findAccount.balance + valorSaque.balance
        if (validate < 0){
            res.status(400).send("Saldo insuficiente")
            return;
        }
        const account = await accountModel.findOneAndUpdate(whatMatch, doMatch, { new: true })
        res.send(account);
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//consulta saldo em conta
router.get('/saldo/:agencia/:conta', async (req, res) => {
    try {
        const accountBalance = await accountModel.find({$and: [{agencia: req.params.agencia}, {conta: req.params.conta}]}, {_id:0, balance: 1});
        if (!accountBalance.length){
            res.status(404).send("Conta não encontrada")
        }
        res.send(accountBalance);
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//exclui uma conta e retorna quantas contas naquela agencia
router.delete('/:agencia/:conta', async (req, res) => {
    try {
        const accountToDelete = await accountModel.findOneAndDelete({$and: [{agencia: req.params.agencia}, {conta: req.params.conta}]});
        const accountsRemaining = await accountModel.count({agencia: req.params.agencia})
        if (!accountToDelete){
            res.status(404).send("Conta não encontrada")
        }
        res.send(`Quantidade de contas nesta agencia: ${accountsRemaining}`);
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//transferencia
router.patch('/transferencia/:contadeb/:contacred/:valor', async (req, res) => {
    try {

        const valor = req.params.valor
        const debito = { balance: -valor }
        const credito = { balance: +valor }

        const whatMatchDeb = { conta: req.params.contadeb }  
        const doMatchDeb = { $inc: debito }
        const whatMatchCred = { conta: req.params.contacred }  
        const doMatchCred = { $inc: credito }        
        
        const findAccountDeb = await accountModel.findOne(whatMatchDeb)
        const findAccountCred = await accountModel.findOne(whatMatchCred)

        if (!findAccountDeb || !findAccountCred){
            res.status(404).send("Conta não encontrada")
        }  

        //valida se tem saldo na conta de debito
        const validateBalance = findAccountDeb.balance + debito.balance
        if (validateBalance < 0) {
            res.status(400).send("Saldo insuficiente para transferência")
            return;
        }

        //valida se são da mesma agência, caso não sejam debita uma tarifa de transferência de 8 dinheiros
        const agenciaDeb = findAccountDeb.agencia
        const agenciaCred = findAccountCred.agencia
        if (agenciaDeb !== agenciaCred){

            const valorComTarifa = parseInt(valor) + 8            
            const accountDeb = await accountModel.findOneAndUpdate(whatMatchDeb, {$inc: { balance: -valorComTarifa } }, { new: true });
            res.send(accountDeb);
            return;
        }
    
        const accountDeb = await accountModel.findOneAndUpdate(whatMatchDeb, doMatchDeb, { new: true });
        const accountCred = await accountModel.findOneAndUpdate(whatMatchCred, doMatchCred, { new: true });
              
        res.send(accountDeb);
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//media dos saldos de uma agencia
router.get('/mediasaldos/:agencia', async (req, res) => {
    try {
        const accounts = await accountModel.aggregate([ 
            {$match: {agencia: parseInt(req.params.agencia)}}, 
            {$group: {_id: null, mediaSaldos: {$avg: "$balance"}}}
        ]);
        if (!accounts.length){
            res.status(404).send("Agência não encontrada")
        }
        res.send(accounts)
    } catch (error) {
        res.status(500).send(console.log(error))
    }
}); 

//clientes com menor saldo
router.get('/menoressaldos/:quantidade', async (req, res) => {
    try {
        const limit = parseInt(req.params.quantidade)
        const accounts = await accountModel.find().sort({balance:1}).limit(limit);
        res.send(accounts)
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//clientes com maior saldo
router.get('/maioressaldos/:quantidade', async (req, res) => {
    try {
        const limit = parseInt(req.params.quantidade)
        const accounts = await accountModel.find().sort({balance:-1}).limit(limit);
        res.send(accounts)
    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

//clientes com maior saldo
router.get('/agenciaprivate', async (req, res) => {
    try {
        /* let i=0
        for (i=0; i<agencias.length; i++){
            const agenciaAtual = agencias[i]
            const contasAgencia = await accountModel.find({agencia: agenciaAtual}).sort({balance:-1}).limit(1)
            console.log(contasAgencia)
        } */

        /* const contasAgencia = await accountModel.aggregate([
            {$match: {agencia: 4}}, 
            {$group: {_id: null, balance: {$max: "$balance"}}},
        ]) */

        const agencias = await accountModel.distinct("agencia", {agencia: {$ne: 99}});
        for (const agencia of agencias){
            await accountModel.findOneAndUpdate({agencia: agencia}, {$set: {agencia: 99}}).sort({"balance": -1})
        }
        
        const contasAgenciaPrivate = await accountModel.find({agencia: 99})       
        res.send(contasAgenciaPrivate)

    } catch (error) {
        res.status(500).send(console.log(error))
    }
});

export default router;