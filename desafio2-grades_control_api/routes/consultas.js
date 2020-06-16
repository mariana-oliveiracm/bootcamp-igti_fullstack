import express from "express";
import fs, { promises } from "fs";

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;

router.get("/consultanota/:student/:subject", async (req, res)  => {
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        const findStudentSubject = json.grades.filter(grade => {
            return (grade.student.toLowerCase().replace(" ", "") === req.params.student.toLowerCase().replace(" ", "")) && (grade.subject.toLowerCase().includes(req.params.subject.toLowerCase()))});

        const findStudent = json.grades.filter(grade => {
            return grade.student.toLowerCase().replace(" ", "") === req.params.student.toLowerCase().replace(" ", "")});

        const findSubject= json.grades.filter(grade => {
            return grade.subject.toLowerCase().includes(req.params.subject.toLowerCase())});
        
        if (findStudentSubject.length){
            const notaTotal = findStudentSubject.reduce((acc, cur) => {
                return acc + cur.value;
            }, 0);
            res.send(`NOTA FINAL DA(O) ALUNA(O) ${req.params.student.toUpperCase()} EM ${req.params.subject.toUpperCase()} É ${JSON.stringify(notaTotal)}`);
            
        } else if (!findStudent.length && !findSubject.length){
            res.status(400).send('ALUNA(O) NÃO ENCONTRADA(O) - DISCIPLINA NÃO ENCONTRADA');
        } else if (!findSubject.length) {
            res.status(400).send('DISCIPLINA NÃO ENCONTRADA');
        } else if (!findStudent.length){
            res.status(400).send('ALUNA(O) NÃO ENCONTRADA(O)');
        }

    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`GET /grades/:id - ${err.message}`);  
    }
});

router.get("/mediadisciplina/:subject/:type", async (req, res)  => {
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        const findSubjectType = json.grades.filter(grade => {
            return (grade.subject.toLowerCase().includes(req.params.subject.toLowerCase())) && (grade.type.toLowerCase().replace(" ", "").normalize('NFD').replace(/[\u0300-\u036f]/g, "") === req.params.type.toLowerCase().replace(" ", ""))});
        
        const findSubject= json.grades.filter(grade => {
            return grade.subject.toLowerCase().includes(req.params.subject.toLowerCase())});
            
        const findType = json.grades.filter(grade => {
            return grade.type.toLowerCase().replace(" ", "").normalize('NFD').replace(/[\u0300-\u036f]/g, "") === req.params.type.toLowerCase().replace(" ", "")});

        if (findSubjectType.length){
            const somaNotas = findSubjectType.reduce((acc, cur) => {
                return (acc + cur.value);
            }, 0);
            const notaMedia = somaNotas/parseInt(findSubjectType.length, 10);
            res.send(`A MÉDIA DE TIPO ${req.params.type.toUpperCase()} DA DISCIPLINA ${req.params.subject.toUpperCase()} É ${JSON.stringify(notaMedia)}`);
            
        } else if (!findSubject.length && !findType.length){
            res.status(400).send('DISCIPLINA NÃO ENCONTRADA - TIPO NÃO ENCONTRADO');
        } else if (!findSubject.length) {
            res.status(400).send('DISCIPLINA NÃO ENCONTRADA');
        } else if (!findType.length){
            res.status(400).send('TIPO NÃO ENCONTRADO');
        }

    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`GET /grades/:id - ${err.message}`);  
    }
});

router.get("/top3/:subject/:type", async (req, res)  => {
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        const findSubjectType = json.grades.filter(grade => {
            return (grade.subject.toLowerCase().includes(req.params.subject.toLowerCase())) && (grade.type.toLowerCase().replace(" ", "").normalize('NFD').replace(/[\u0300-\u036f]/g, "") === req.params.type.toLowerCase().replace(" ", ""))});
        
        const findSubject= json.grades.filter(grade => {
            return grade.subject.toLowerCase().includes(req.params.subject.toLowerCase())});
            
        const findType = json.grades.filter(grade => {
            return grade.type.toLowerCase().replace(" ", "").normalize('NFD').replace(/[\u0300-\u036f]/g, "") === req.params.type.toLowerCase().replace(" ", "")});

        const top3 = findSubjectType.sort((a,b) => {
            return b.value - a.value
        }).slice(0,3);        

        if (findSubjectType.length){
            res.send(top3);
            
        } else if (!findSubject.length && !findType.length){
            res.status(400).send('DISCIPLINA NÃO ENCONTRADA - TIPO NÃO ENCONTRADO');
        } else if (!findSubject.length) {
            res.status(400).send('DISCIPLINA NÃO ENCONTRADA');
        } else if (!findType.length){
            res.status(400).send('TIPO NÃO ENCONTRADO');
        }

    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`GET /grades/:id - ${err.message}`);  
    }
});


export default router;