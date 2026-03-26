import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import { httpResponseText } from "../utils/httpResponseText.js";
import appErrors from "../utils/errors.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";

export const getAllTasks = asyncWraper(async (req, res, next) => {
    const tasks = await Task.find();
    res.status(200).json({ status: httpResponseText.SUCCESS, data: { tasks } });
});

export const getTasksByProjectId = asyncWraper(async (req, res, next) => {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.status(200).json({ status: httpResponseText.SUCCESS, data: { tasks } });
});

export const createTask = asyncWraper(async (req, res, next) => {
    const { projectId } = req.params; 
    const { title, done } = req.body;

    const newTask = new Task({
        projectId,
        title,
        done
    });

    await newTask.save();

    res.status(201).json({
        status: httpResponseText.SUCCESS,
        data: { task: newTask },
    });
});

export const updateTask = asyncWraper(async (req, res, next) => {
    const taskId = req.params.id;

    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: req.body }, 
        { returnDocument: "after", runValidators: true }
    );

    if (!updatedTask) {
        return next(appErrors.create(404, "Task Not Found", httpResponseText.FAIL));
    }

    res.json({
        status: httpResponseText.SUCCESS,
        data: { task: updatedTask },
    });
});

export const deleteTask = asyncWraper(async (req, res, next) => {
    const taskId = req.params.id;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
        const error = appErrors.create(
            404,
            "Task Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }

    res.json({ 
        status: httpResponseText.SUCCESS, 
        message: "Task deleted successfully",
        data: null 
    });
});