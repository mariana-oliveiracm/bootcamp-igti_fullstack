import express from "express";
import fs, { readFileSync, writeFileSync } from "fs";
import gradesRouter from "./routes/grades.js"
import statisticsRouter from "./routes/consultas.js"

const app = express();

global.fileName = "grades.json"

app.use(express.json());
app.use("/grades", gradesRouter);
app.use("/", statisticsRouter);


app.listen(8080, function() {
   try {
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) {
                const initialJson = {
                    nextId: 1,
                    grades: []
                };
                fs.writeFile(fileName, JSON.stringify(initialJson), (err) => {
                    if (err){
                        console.log(err);
                    }
                });
            }
        })
    } catch (err) {
        console.log(err);       
    }
    console.log("API Started!");
});

