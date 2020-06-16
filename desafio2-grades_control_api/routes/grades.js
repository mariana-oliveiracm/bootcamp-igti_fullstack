import express from "express";
import fs, { promises } from "fs";

const router = express.Router();
const readFile = promises.readFile;
const writeFile = promises.writeFile;


router.post("/", async (req, res)  => {
    let grade = req.body;
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);

        grade = { id: json.nextId++, ...grade };
        json.grades.push(grade);

        await writeFile(fileName, JSON.stringify(json));
        res.status(201).send(grade);
        res.end();

        console.log (`POST /grades - ${JSON.stringify(grade)}`)
        
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`POST /grades - ${err.message}`);  
    }
});


router.get("/", async (_, res)  => {
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        delete json.nextId;
        
        res.send(json);
        console.log (`GET /grades`)
        
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`GET /grades - ${err.message}`);  
    }
});

router.get("/:id", async (req, res)  => {
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        const grade = json.grades.find(grade => grade.id === parseInt(req.params.id, 10));
        if (grade){
            res.send(grade);
            console.log (`GET /grades/:id - ${JSON.stringify(grade)}`);
        } else if (isNaN(parseInt(req.params.id, 10))) {
            res.status(405).send(`ID ${JSON.stringify(req.params.id)} INVÁLIDO`);
        } else {
            res.status(404).send(`ID ${JSON.stringify(req.params.id)} NÃO ENCONTRADO`);
        }        
        
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`GET /grades/:id - ${err.message}`);  
    }
});

router.delete("/:id", async (req, res)  => {
    try {
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        const find = json.grades.find(grade => grade.id === parseInt(req.params.id, 10));
        if (find) {
            const grades = json.grades.filter(grade => grade.id !== parseInt(req.params.id, 10));
            json.grades = grades;
    
            await writeFile(fileName, JSON.stringify(json));        
            res.send(`ID ${JSON.stringify(req.params.id)} DELETADO`);
            console.log (`DELETE /grades/:id - ${JSON.stringify(req.params.id)}`);
        } else if (isNaN(parseInt(req.params.id, 10))) {
            res.status(405).send(`ID ${JSON.stringify(req.params.id)} INVÁLIDO`);
        } else {
            res.status(404).send(`ID ${JSON.stringify(req.params.id)} NÃO ENCONTRADO`);
        }
        
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`DELETE /grades/:id - ${err.message}`);  
    }
});


router.put("/", async (req, res) => {
    try {
        let updatedGrade = req.body;
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        let oldIndex = json.grades.findIndex(grade => grade.id === updatedGrade.id);

        json.grades[oldIndex] = updatedGrade;

        await writeFile(fileName, JSON.stringify(json));
        res.send(updatedGrade);
        console.log (`PUT /grades - ${JSON.stringify(updatedGrade)}`);   
        
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`PUT /grades - ${err.message}`);        
    }
});


router.put("/:id", async (req, res) => {
    try {
        let updatedGrade = req.body;
        let data = await readFile(fileName, "utf8");
        let json = JSON.parse(data);
        const oldIndex = json.grades.findIndex(grade => grade.id === parseInt(req.params.id));
        if (oldIndex != -1){
            if (updatedGrade.student) {
                json.grades[oldIndex].student = updatedGrade.student;
            }
            if (updatedGrade.subject) {
                json.grades[oldIndex].subject = updatedGrade.subject;
            }
            if (updatedGrade.type) {
                json.grades[oldIndex].type = updatedGrade.type;
            }
            if (updatedGrade.value) {
                json.grades[oldIndex].value = updatedGrade.value;
            }
            if (updatedGrade.student) {
                json.grades[oldIndex].timestamp = updatedGrade.timestamp;
            }
            
            await writeFile(fileName, JSON.stringify(json));
            res.send(updatedGrade);
            console.log (`PUT /grades/:id - ${JSON.stringify(updatedGrade)}`);
        } else if (isNaN(parseInt(req.params.id, 10))) {
            res.status(405).send(`ID ${JSON.stringify(req.params.id)} INVÁLIDO`);
        } else {
            res.status(404).send(`ID ${JSON.stringify(req.params.id)} NÃO ENCONTRADO`)
        }
        
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.log(`PUT /grades/:id - ${err.message}`);        
    }
});


export default router;