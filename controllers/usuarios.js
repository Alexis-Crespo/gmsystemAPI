const Usuario = require('./../database/usuario')

const usuariosGet = async (req, res) => {
  
    const {id} = req.params
    console.log('el req params: ', req.params)
    const usuarios = await Usuario.find({creador : id})
     
    console.log('usuarios: ', usuarios)
    res.status(200).json({
       usuarios
    })
  }



  const usuariosPost = async (req, res) => {
     const { doc, du=true, pass, usuario, publico, creador, logeado,traeData, cuentas=[] } = req.body

     console.log('req body del add user: ', req.body)

     const usuarioNuevo = new Usuario ({ doc, du, pass, usuario, publico, creador, logeado,traeData, cuentas  });

    await usuarioNuevo.save();

    res.json({
        usuarioNuevo
    })

  }

  const usuarioUpdate = async(req, res) => {
    
    const {id} = req.params;

    try {
        
        const usuarioActual = await Usuario.findById(id);
        
        if (!usuarioActual) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualizar solo las propiedades proporcionadas en el cuerpo de la solicitud
        if (req.body.doc !== undefined) {
           usuarioActual.doc = req.body.doc;
        }
        if (req.body.usuario !== undefined) {
            usuarioActual.usuario = req.body.usuario;
        }
        if (req.body.pass !== undefined) {
            usuarioActual.pass = req.body.pass;
        }
        if (req.body.publico!== undefined) {
          usuarioActual.publico = req.body.publico;
      }
        

        // Guardar el usuario actualizado en la base de datos
        await usuarioActual.save();

        res.json({
          usuarioActual
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}

  const usuarioDelete = async(req, res) => {
    
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndDelete(id)

    res.json({
        usuario
    })
}


const loginUpdate = async(req, res) => {
    
  const doc = req.body.docSend.doc;
  console.log('A ver el req Body, porque trae undefined ?:; ' , req.body.docSend.doc)
  console.log('Me ejecuto con el doc: ', doc)

  try {
      
      const usuarioActual = await Usuario.findOne({doc: req.body.docSend.doc});
      
      usuarioActual.logeado = true
      
      await usuarioActual.save();
    console.log('El usuario actual .logeado quedo: ', usuarioActual)
      

  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
}

const traeDatahdler = async(req, res) => {
  console.log('Se ejecuto traeDatahdler, es el que deberia guardar en la DB la data encontrada')

  console.dir(req.body, { depth: null });

  const usuarioActual = await Usuario.findOne({doc: req.body.docSend.doc});

  usuarioActual.cuentas = req.body.docSend.cuentas;

  await usuarioActual.save();
  console.log('El usuario actual con cuentas: ', usuarioActual)

  res.status(200)
   /* 
  const doc = req.body.docSend.doc;
  console.log('A ver el req Body, porque trae undefined ?:; ' , req.body.docSend.doc)
  console.log('Me ejecuto con el doc: ', doc)

  try {
      
      const usuarioActual = await Usuario.findOne({doc: req.body.docSend.doc});
      
      usuarioActual.logeado = true
      
      await usuarioActual.save();
    console.log('El usuario actual .logeado quedo: ', usuarioActual)
      

  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el usuario' });
  } */
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioDelete,
    usuarioUpdate,
    loginUpdate,
    traeDatahdler
  }