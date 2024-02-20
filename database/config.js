const mongoose = require('mongoose');

console.log('Llego a config de database')

const ConnectionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log('Base de datos online')
    } 
    catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')
    }
}

module.exports = ConnectionDB