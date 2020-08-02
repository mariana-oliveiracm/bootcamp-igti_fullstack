const express = require('express');
const db = require('../models/index.js');
const TransactionModel = require('../models/TransactionModel.js')


exports.get =  async (_, res) => {
    try {
        return res.status(400).send({
            error: 'É necessário informar o parâmetro \'period\', cujo valor deve estar no formado yyyy-mm',
          });
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.getPeriod = async (req, res) => {
    try {
        const ano = req.params.ano;
        const mes = req.params.mes;
        if (ano.length !== 4 || mes.length !== 2){
            return res.status(404).send('Informar ano e mês válidos no formato yyyy-mm')            
        }
        const periodo = await TransactionModel.find({ year: ano, month: mes })

        if(periodo.length){
            res.send(periodo)
        } else {
            res.status(404).send('Não foi encontrado nenhum registro para este período')
        }
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.insert = async (req, res) => {
    try {        
        const json = JSON.stringify(req.body)        
        if(json.length == 2){
            return res.status(400).send('Dados para inserção vazio')
        }
        const atividade = new TransactionModel(req.body);
        await atividade.save(atividade);
        res.send({ mensagem: 'Inserido com sucesso', atividade });
        
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.modify = async (req, res) => {
    try {
        const id = req.params.id;
        const dados = req.body

        const json = JSON.stringify(req.body)        
        if(json.length == 2){
            return res.status(400).send('Dados para atualização vazio')
            
        }
        const atividade = await TransactionModel.findOneAndUpdate({ _id: id }, dados)
        const atividadeAtualizada = await TransactionModel.findOne({ _id: id })        

        if(atividade){
            res.send({ mensagem: 'Atualizado com sucesso', atividadeAtualizada })
        } else {
            res.status(404).send('Não foi encontrado nenhum registro com este id')
        } 

    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
};

exports.deleteOne = async (req, res) => {
    try {
        const id = req.params.id;
        const atividade = await TransactionModel.findOneAndDelete({ _id: id })

        if(atividade){
            res.send(`Atividade de ID ${id} excluída com sucesso`)
        } else {
            res.status(404).send('Não foi encontrado nenhum registro com este id')
        }
    } catch (error) {
        res.status(500).send(error)
    }
};

