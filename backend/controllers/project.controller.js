import Project from "../models/project.model.js";
import { httpResponseText } from "../utils/httpResponseText.js";
import appErrors from "../utils/errors.js";
import { flatten } from "flat";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import Task from "../models/task.model.js";
import mongoose from "mongoose";

export const getAllProjects = asyncWraper(async (req, res, next) => {
    const { tag, status, priority, startDate, deadline } = req.query;

    const pipeline = [];

    if (tag) {
        pipeline.push({ $match: { "general.tag": tag } });
    }

    if (status) {
        pipeline.push({ $match: { "assignment.status": status } });
    }

    if (priority) {
        pipeline.push({ $match: { "assignment.priority": priority } });
    }

    if (startDate) {
        pipeline.push({
            $match: { "general.startDate": { $gte: new Date(startDate) } },
        });
    }

    if (deadline) {
        pipeline.push({
            $match: { "general.deadline": { $lte: new Date(deadline) } },
        });
    }

    pipeline.push({
        $lookup: {
            from: "tasks",
            localField: "_id",
            foreignField: "projectId",
            as: "subTasks",
        },
    });

    const projects = await Project.aggregate(pipeline);

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { projects },
    });
});

export const getProjectById = asyncWraper(async (req, res, next) => {
    const ProjectID = req.params.id;

    const projectData = await Project.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(ProjectID) },
        },
        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "projectId",
                as: "subTasks",
            },
        },
    ]);

    if (!projectData || projectData.length === 0) {
        const error = appErrors.create(
            404,
            "Project Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }

    res.json({
        status: httpResponseText.SUCCESS,
        data: { project: projectData[0] },
    });
});

export const createProject = asyncWraper(async (req, res, next) => {
    const { general, assignment, documents, subTasks } = req.body;
    const oldProject = await Project.findOne({ "general.name": general.name });
    if (oldProject) {
        const error = appErrors.create(
            400,
            "Project Already Exists",
            httpResponseText.FAIL
        );
        return next(error);
    }
    general.createdBy = req.currentUser.userId;

    const newProject = new Project({ general, assignment, documents });
    await newProject.save();

    if (subTasks && subTasks.length > 0) {
        const createdTasks = subTasks.map((task) => ({
            ...task,
            projectId: newProject._id,
        }));

        await Task.insertMany(createdTasks);
    }

    res.status(201).json({
        status: httpResponseText.SUCCESS,
        data: { newProject },
    });
});

export const updateProject = asyncWraper(async (req, res, next) => {
    const ProjectID = req.params.id;
    if (Object.keys(req.body).length === 0) {
        const error = appErrors.create(
            400,
            "Please provide data to update",
            httpResponseText.FAIL
        );
        return next(error);
    }

    const updateData = flatten(req.body);

    const updatedProject = await Project.findByIdAndUpdate(
        ProjectID,
        { $set: updateData },
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedProject) {
        const error = appErrors.create(
            404,
            "Project Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({
        status: httpResponseText.SUCCESS,
        data: { project: updatedProject },
    });
});

export const deleteProject = asyncWraper(async (req, res, next) => {
    const ProjectID = req.params.id;
    const project = await Project.findByIdAndDelete(ProjectID);
    if (!project) {
        const error = appErrors.create(
            404,
            "Project Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({ status: httpResponseText.SUCCESS, data: null });
});
