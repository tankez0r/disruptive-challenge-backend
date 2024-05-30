// src/controllers/contentController.ts
import { Request, Response, NextFunction } from 'express';
import { Content } from '../models/Content';
import { User } from '../models/User';
import { Topic } from '../models/Topic';
import mongoose, { Types } from 'mongoose';
import { getMediaType } from '../utils/getMediaType';


export const createContent = async (req: Request, res: Response, next: NextFunction) => {
  const { topicName, fileType, fileName, fileContent, title } = req.body;
  const { userId, username, role } = req.body.user;
  try {
    const topic = await Topic.findOne({ name: topicName });
    if (!topic) {
      return res.status(400).json({ message: 'Tematica no encontrada' });
    }

    if (role !== 'admin' && role !== 'creador') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }

    const fileBuffer = Buffer.from(fileContent, "base64")
    const mediaType = getMediaType(fileType)

    const content = new Content({
      topic: topic._id, fileContent: fileBuffer, author: userId,
      authorName: username, title: title, fileName, fileType, mediaType: mediaType
    });
    await content.save();

    topic.contents.push(content._id as Types.ObjectId);
    await topic.save();

    const user = await User.findById(userId);
    if (user) {
      user.contents.push(content._id as Types.ObjectId);
      await user.save();
    }

    res.status(201).json({title: content.title, createdAt:content.createdAt, mediaType:content.mediaType, author:content.authorName, fileName:content.fileName});
  } catch (error) {
    next(error);
  }
};




export const updateContent = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { topicName, fileType, fileName, title, fileContent } = req.body;
  const { userId, role } = req.body.user;

  try {
    const topic = await Topic.findOne({ name: topicName });
    if (!topic) {
      return res.status(400).json({ message: 'Tematica no encontrada' });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'contenido no encontrado' });
    }

    if (content.author.toString() !== userId && role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    const fileBuffer = Buffer.from(fileContent, "base64")
    const mediaType = getMediaType(fileType)

    content.topic = topic._id as Types.ObjectId;
    content.fileContent = fileBuffer;
    content.title = title;
    content.fileName = fileName;
    content.fileType = fileType;
    content.mediaType = mediaType;

    await content.save();

    res.status(200).json(content);
  } catch (error) {
    next(error);
  }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { role } = req.body.user;

  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Contenido no encontrado' });
    }

    if (role !== 'admin') {
      return res.status(403).json({ message: 'No posee los permisos correspondientes.' });
    }

    await content.deleteOne();
    res.status(200).json({ message: 'Contenido eliminado' });
  } catch (error) {
    next(error);
  }
};

export const getContents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 }).select(["-fileContent", "-fileName", "-fileType"]);
    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
};



export const searchByTitle = async (req: Request, res: Response, next: NextFunction) => {
  const { query } = req.query;

  try {
    const regexQuery = new RegExp(query as string, 'i')


    const contents = await Content.find({ title: regexQuery }).select(["-fileContent", "-fileName", "-fileType"]).exec();
    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
}

export const getContentByTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { topicId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(topicId)) {
    return res.status(400).json({ message: 'Invalid topic ID' });
  }

  try {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    const contents = await Content.find({ topic: topic._id }).select(["-fileContent", "-fileName", "-fileType"]);
    res.status(200).json(contents);
  } catch (error) {
    next(error); 
  }
};