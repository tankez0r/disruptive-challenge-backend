// src/controllers/topicController.ts
import { Request, Response, NextFunction } from 'express';
import { Topic } from '../models/Topic';
import mongoose from 'mongoose';
import { Content } from '../models/Content';

export const createTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { name, fileName, fileType, fileContent } = req.body;


  const fileBuffer = Buffer.from(fileContent, "base64")

  try {
    const topic = new Topic({ name, fileName, fileType, contents: [], imageContent: fileBuffer });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
};

export const getTopics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    next(error);
  }
};

export const searchTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { query } = req.query;

  try {
    const regexQuery = new RegExp(query as string, 'i')
    const contents = await Topic.find({ name: regexQuery }).exec();
    res.status(200).json(contents);
  } catch (error) {
    next(error);
  }
}



export const updateTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { name, fileName, fileType, fileContent } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid topic ID' });
  }

  try {
    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    topic.name = name || topic.name;

    if (fileContent) {
      topic.fileContent = fileContent;
      topic.fileType = fileType;
      topic.fileName = fileName;
    }

    await topic.save();
    res.status(200).json(topic);
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid topic ID' });
  }

  try {
    const topic = await Topic.findById(id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    await Content.deleteMany({ topic: topic._id });

    await topic.deleteOne();
    res.status(200).json({ message: 'Topic and associated contents deleted' });
  } catch (error) {
    next(error);
  }
};