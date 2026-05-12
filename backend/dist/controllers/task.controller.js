"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.getMyTasks = exports.getAllTasks = exports.createTask = void 0;
const prisma_1 = require("../config/prisma");
const createTask = async (req, res) => {
    try {
        const { title, description, assignedToId, } = req.body;
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                id: assignedToId,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "Assigned user not found",
            });
        }
        const task = await prisma_1.prisma.task.create({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.createTask = createTask;
const getAllTasks = async (req, res) => {
    try {
        const tasks = await prisma_1.prisma.task.findMany({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getAllTasks = getAllTasks;
const getMyTasks = async (req, res) => {
    try {
        const userId = req.user?.id;
        const tasks = await prisma_1.prisma.task.findMany({
            where: {
                assignedToId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(tasks);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.getMyTasks = getMyTasks;
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const userId = req.user?.id;
        const task = await prisma_1.prisma.task.findUnique({
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
        const updatedTask = await prisma_1.prisma.task.update({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.updateTaskStatus = updateTaskStatus;
