import { Request, Response, NextFunction } from 'express';
import { compactVerify } from 'jose';
import 'dotenv/config'

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(res.status(401).json({ message: 'Acceso denegado, no hay token de seguridad provisto.' }))
    }
    try {
        const { payload } = await compactVerify(token, secretKey);
        const user = JSON.parse(new TextDecoder().decode(payload))
        req.body.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export const permitRoles = (...roles: Array<string>) => {

    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.body.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado, no cuenta con los permisos correspondientes.' });
        }

        next();
    };
};