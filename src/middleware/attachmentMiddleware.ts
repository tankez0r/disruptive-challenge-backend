import { Request, Response, NextFunction } from 'express';
import fs from 'fs'
import path from 'path'

export const sendAttachment = async (req: Request, res: Response, next: NextFunction, model: any) => {
    try {
        const { id } = req.params;
        let modelQuery = await model.findById(id).exec();

        if (!modelQuery) {
            return res.status(404).json({ message: 'Content not found' });
        }

        console.log(modelQuery)

        const outputFilePath = path.join(__dirname, 'uploads', modelQuery.fileName)
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true })
        fs.writeFileSync(outputFilePath, modelQuery.fileContent)


        res.setHeader('Content-Disposition', `attachment; filename="${modelQuery.fileName}"`);
        res.setHeader('Content-Type', modelQuery.fileType);
        res.send(modelQuery.fileContent);
        fs.rm(path.join(__dirname, "uploads"), { recursive: true }, () => { console.log("carpeta upload borrado") })
    } catch (error) {
        next(error);
    }
    finally {
    }
};