const jwt = require('jsonwebtoken');


const jwtGenerator = (uid = '') => {
    return new Promise( (resolve, reject) => {
        console.log('Llegamos al jwtGenerator')
        const payload = { uid };

        console.log('keySecret en back: ', process.env.KEYSECRET)

        jwt.sign( payload, process.env.KEYSECRET, {
            expiresIn: '6h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } 
                // resolve.setHeader('Set-Cookie', loginToken)
                resolve( token );
            
        })

    })
}

module.exports = {
    jwtGenerator
}
