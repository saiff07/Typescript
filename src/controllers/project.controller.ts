import { Request, Response } from 'express';
import { Project } from '../models/project.model';
import { Status , Messages } from '../utils/constants';

export const addProject = async (req: Request, res: Response) => {
  const { title, description, tags } = req.body;

  try {
    const newProject = new Project({ title, description, tags, clientId: req.user.userId });
    await newProject.save();
    res.status(Status.OK).json({ message: Messages.PROJECT_CREATED });
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: id, clientId: req.user.userId },
      { title, description, tags },
      { new: true }
    );
    if (!project) {
      return res.status(Status.NOT_FOUND).json({ message: Messages.PROJECT_NOT_FOUND });
    }
    res.status(Status.OK).json(project);
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const listProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(Status.OK).json(projects);
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const removeProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findOneAndDelete({ _id: id, clientId: req.user.userId });
    if (!project) {
      return res.status(Status.NOT_FOUND).json({ message: Messages.PROJECT_NOT_FOUND });
    }
    res.status(Status.OK).json({ message: Messages.PROJECT_REMOVED });
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const fetchProjectsByTag = async (req: Request, res: Response) => {
  const { tag } = req.params;

  try {
    const projects = await Project.find({ tags: tag });
    res.status(Status.OK).json(projects);
  } catch (error) {
    res.status(Status.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
