const fs = require("fs");

const readFile = fs.readFileSync;
const writeFile = fs.writeFileSync;

/* readFile("./Cidades.json").then(resp =>{
    console.log(JSON.parse(resp));
}) */

init();

async function init(){
    try{
        const respCidades = await readFile("./Cidades.json");
        const respEstados = await readFile("./Estados.json");
        const dataCidades = JSON.parse(respCidades);
        const dataEstados = JSON.parse(respEstados);
        //console.log(dataCidades[0].ID);
        //console.log(dataEstados);

        
        //cria arquivos dos estados com as cidades correspondentes
        dataEstados.forEach(estado =>{
            const cidadesEstado = dataCidades.filter(cidade => cidade.Estado === estado.ID)
            writeFile(`./Estados/${estado.Sigla}.json`, JSON.stringify(cidadesEstado));
        })


        //conta nº de cidades por estado
       function numeroCidades(estado) {
            const estadosData = readFile(`./Estados/${estado}.json`);
            const cidades = JSON.parse(estadosData);
            return cidades.length;
        }


       //estados e cidades em ordem decrescente
        const estadosQuantCidades = dataEstados.map(estado => {
            return {
                UF: estado.Sigla,
                QuantCidades: numeroCidades(estado.Sigla)
            }
        }).sort((a,b) => {
            return b.QuantCidades - a.QuantCidades
        })
        console.group('Todos:');
        console.log(estadosQuantCidades);
        console.groupEnd();

        console.group('Top5 estados com maior número de cidades:');
        console.log(estadosQuantCidades.slice(0,5).map(estado => `${estado.UF} - ${estado.QuantCidades}`));
        console.group('Total de cidades do Top5:');
        console.log(estadosQuantCidades.slice(0,5).reduce((acc, cur) => {return acc + cur.QuantCidades}, 0));
        console.groupEnd();console.groupEnd();

        console.group('Down5 estados com maior número de cidades:');
        console.log(estadosQuantCidades.slice((estadosQuantCidades.length - 5), estadosQuantCidades.length).map(estado => `${estado.UF} - ${estado.QuantCidades}`));
        console.group('Total de cidades do Down5:');
        console.log(estadosQuantCidades.slice((estadosQuantCidades.length - 5), estadosQuantCidades.length).reduce((acc, cur) => {return acc + cur.QuantCidades}, 0));
        console.groupEnd();console.groupEnd();


        //maiores e menores nomes de cidades de cada estado
        const maiorNomeCidade = (estado) => {
            const estadosData = readFile(`./Estados/${estado}.json`);            
            const cidades = JSON.parse(estadosData);

            const maiorCidade = cidades.map(cidade => cidade.Nome).sort().sort((a,b) => {return b.length - a.length}).slice(0,1);
            return maiorCidade;
        } 
        const menorNomeCidade = (estado) => {
            const estadosData = readFile(`./Estados/${estado}.json`);
            const cidades = JSON.parse(estadosData);

            const menorCidade = cidades.map(cidade => cidade.Nome).sort().sort((a,b) => {return a.length - b.length}).slice(0,1);
            return menorCidade;
        } 

        const cidadeEstadoNomes = dataEstados.map(estado => {
            return {
                UF: estado.Sigla,
                MaiorNome: maiorNomeCidade(estado.Sigla),
                MenorNome: menorNomeCidade(estado.Sigla)
            }
        })
        console.group('Maiores nomes de cidade de cada estado:')
        console.log(cidadeEstadoNomes.map(estado => `${estado.MaiorNome} - ${estado.UF}`).sort());
        
        console.group('Maior nome de cidade de todos os estados:')
        console.log(cidadeEstadoNomes.map(estado => `${estado.MaiorNome} - ${estado.UF}`).sort().sort((a,b) => {return b.length - a.length}).slice(0,1));
        console.groupEnd();console.groupEnd();

        console.group('Menores nomes de cidade de cada estado:')
        console.log(cidadeEstadoNomes.map(estado => `${estado.MenorNome} - ${estado.UF}`).sort());        
        
        console.group('Menor nome de cidade de todos os estados:')
        console.log(cidadeEstadoNomes.map(estado => `${estado.MenorNome} - ${estado.UF}`).sort().sort((a,b) => {return a.length - b.length}).slice(0,1));
        console.groupEnd();console.groupEnd();



    } catch (err){
        console.log('Erro: ' + err);
    }
}

