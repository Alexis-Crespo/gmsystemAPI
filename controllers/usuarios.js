const Usuario = require('./../database/usuario')

const usuariosGet = async (req, res) => {
  
    const usuarios = '23202979'
  
    res.json({
       usuarios
    })
  }



  const usuariosPost = async (req, res) => {
     const {doc, du, pa, 
      usuario, pass, tarjetas,visa,mastercard,amex,ca, cc, usd,
       afip='', homologacion, desarrollo, cliente , publico, creador } = req.body

     const usuarioNuevo = new Usuario ({ doc, du, pa, 
      usuario, pass, tarjetas,visa,mastercard,amex,ca, cc, usd,
       afip, homologacion, desarrollo, cliente , publico, creador });

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

module.exports = {
    usuariosGet,
    usuariosPost,
    usuarioDelete,
    usuarioUpdate
  }