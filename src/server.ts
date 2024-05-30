import mongoose, { ConnectOptions } from 'mongoose';
import { Express } from 'express'
import 'dotenv/config'

const port = process.env.PORT;
const DBURI = process.env.MONGODB_URL as string;

const serverConection = (app: Express) => {
    mongoose.connect(DBURI).then(() => {
        console.log('Conectado a base de datos MONGODB');
        app.listen(port, () => {
            console.log(`Server corriendo en: http://localhost:${port}`);
        });
    }).catch(error => {
        console.error('Error conexion en base de datos:', error);
    });
}

export default serverConection