const { default: axios } = require('axios');
const { exec } = require('child_process');


const usuariosLogin = async (req, res) => {
   const { usuarios } = req.body;
   console.log('Usuarios que le llega al backend en executions: ', usuarios)
   const resultados = [];

   usuarios.map((usuario) => {
       const pythonCommand = `python automation/login.py ${usuario.du} ${usuario.usuario} ${usuario.pass}`;
       const ejecucionPromise = new Promise((resolve, reject) => {
           exec(pythonCommand, (error, stdout, stderr) => {
               if (error) {
                   console.error(`Error al ejecutar el comando: ${error.message}`);
                   reject(error);
                   return;
               }
               if (stderr) {
                   console.error(`Error en la salida estándar: ${stderr}`);
                   reject(stderr);
                   return;
               }

               // Parsear la salida del comando como JSON
               try {
                   const outputContent = JSON.parse(stdout);
                   console.log(`Resultado del comando: ${JSON.stringify(outputContent)}`);
                   console.log(`Resultado del login : ${outputContent.du} : ${outputContent.status}` )
                   if( outputContent.status == "success"){
                    const docSend = {doc: outputContent.du}
                    console.log('Le mando este du : ', outputContent.du)

                     const resp = axios.post(
                        "http://localhost:8080/api/usuarios/log",
                        {docSend}
                      );
                   }

                   resolve(outputContent);
                   
               } catch (parseError) {
                   console.error(`Error al parsear la salida como JSON: ${parseError.message}`);
                   reject(parseError);
               }
           });
       });

       resultados.push(ejecucionPromise);
   });

   try {
       const resultadosCompletos = await Promise.all(resultados);

       
       res.json({
           usuarios,
           resultados: resultadosCompletos,
       });
   } catch (error) {
       res.status(500).json({ error: 'Error en la ejecución de los comandos de Python' });
   }

   
   
};


const dataUser = async (req, res) => {
    const { usuarios } = req.body;
    console.log('RetrieveData   Usuarios que le llega al backend en executions: ', usuarios)
    const resultados = [];
 
    usuarios.map((usuario) => {
        const pythonCommand = `python automation/retrieveData.py ${usuario.du} ${usuario.usuario} ${usuario.pass}`;
        const ejecucionPromise = new Promise((resolve, reject) => {
            exec(pythonCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error al ejecutar el comando: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    console.error(`Error en la salida estándar: ${stderr}`);
                    reject(stderr);
                    return;
                }
 
                // Parsear la salida del comando como JSON
                try {
                    const outputContent = JSON.parse(stdout);
                    console.log(`Resultado del comando: ${JSON.stringify(outputContent)}`);
                    console.log(`Resultado del login : ${outputContent.du} : ${outputContent.status}` )
                    
                    if( outputContent.status == "success"){
                     // Le pegamos al retrieveData que trae la info..
                     
                     console.log('Le mando este du : ', outputContent.du)

                     // Aca guardamos la data recuperada
                     console.log('aca tenemos la data? :', outputContent)
                     const docSend = {
                        doc: outputContent.du,
                        cuentas: outputContent.cuentas
                     }
                     console.log('DocSend: ',docSend)
                     const resp = axios.post(
                        "http://localhost:8080/api/usuarios/retrieveData",
                        {docSend}
                      );  
                     
                    }
 
                    resolve(outputContent);
                    
                } catch (parseError) {
                    console.error(`Error al parsear la salida como JSON: ${parseError.message}`);
                    reject(parseError);
                }
            });
        });
 
        resultados.push(ejecucionPromise);
    });
 
    try {
        const resultadosCompletos = await Promise.all(resultados);
 
        
        res.json({
            usuarios,
            resultados: resultadosCompletos,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en la ejecución de los comandos de Python' });
    }
 
    
    
 };





module.exports = {
   usuariosLogin,
   dataUser
};
