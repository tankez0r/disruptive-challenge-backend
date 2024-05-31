import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { CompactSign } from 'jose';
import 'dotenv/config'
import mongoose from 'mongoose';
import { Content } from '../models/Content';

const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword, role, contents: [] });
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Usuario o correo ya existentes' });
        } else {
            next(error);
        }
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña invalida' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña invalida' });
        }

        const token = await new CompactSign(new TextEncoder()
            .encode(JSON.stringify({ userId: user._id, role: user.role, username: user.username })))
            .setProtectedHeader({ alg: "HS256" }).sign(secretKey);

        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};



export const getUserWithContents = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(userId).select('username email').lean();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const contents = await Content.find({ author: userId }).select('-file').lean();

        res.status(200).json({ user, contents });
    } catch (error) {
        next(error);
    }
};


export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, role, username } = req.body.user;

    try {
        const contents = await Content.find({ author: userId }).select('-file').lean();

        res.status(200).json({ user: { role, username }, contents });
    } catch (error) {
        next(error);
    }
};