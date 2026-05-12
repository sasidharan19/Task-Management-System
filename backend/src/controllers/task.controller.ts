import { Request, Response } from "express";

import { prisma } from "../config/prisma";

export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      assignedToId,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: assignedToId,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Assigned user not found",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        assignedToId,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMyTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const tasks = await prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(tasks);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const userId = req.user?.id;

    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (task.assignedToId !== userId) {
      return res.status(403).json({
        message: "You can only update your tasks",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    return res.json({
      message: "Task status updated",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};