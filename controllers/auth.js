const { jwtGenerator } = require('../helpers/jwtGenerator');
const Auth = require('./../database/auth')


const authPost = async (req, res) => {
    const { username, password, tribu } = req.body

    console.log('LLego a authGet desde controllers')

    const authNew = new Auth ({ username, password, tribu });

    

   await authNew.save();

   const token = await jwtGenerator(authNew._id)
    res.setHeader('Set-Cookie', 'token=${token}; HttpOnly; Secure; SameSite=Lax');

   res.json({
      authNew,
      token
   })

 }

 const login = async (req, res) => {
    const {username, password} = req.body;

    console.log('username y password de login : ', username, password)
    const userAuth = await Auth.findOne({username})

    console.log('userAuth == ', userAuth)

    if (!userAuth) {
        return res.status(400).json({
            msg: 'Usuario o Password no son correctos'
        });
    }

    console.log('userAuth.password, ', userAuth.password)
    if(userAuth.password === password){

      
      const token = await jwtGenerator(userAuth._id)
      res.setHeader('Set-Cookie', 'token=${token}; HttpOnly; Secure; SameSite=Lax');

      return  res.json({
        userAuth,
        token
      })
    }
 }

module.exports = {
    authPost,
    login
 }