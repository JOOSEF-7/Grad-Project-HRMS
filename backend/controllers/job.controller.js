import Job from "../models/job.model.js";
import { httpResponseText } from "../utils/httpResponseText.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import mongoose from "mongoose";
import { flatten } from "flat";
import appErrors from "../utils/errors.js";

export const getAllJobs = asyncWraper(async (req, res, next) => {
    const jobs = await Job.aggregate([
        {
            $lookup: {
                from: "applicants",
                localField: "_id",
                foreignField: "jobId",
                as: "jobApplicants",
            },
        },
        { $project: { __v: 0 } }
    ]);

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { jobs },
    });
});

export const getJobById = asyncWraper(async (req, res, next) => {
    const JobID = req.params.id;
    const job = await Job.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(JobID) },
        },
        {
            $lookup: {
                from: "applicants",
                localField: "_id",
                foreignField: "jobId",
                as: "jobApplicants",
            },
        },
        { $project: { __v: 0 } }
    ]);

    if (!job || job.length === 0) {
        const error = appErrors.create(
            404,
            "Job Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }

    res.json({
        status: httpResponseText.SUCCESS,
        data: { job: job[0] },
    });
});

export const createJob = asyncWraper(async (req, res, next) => {
    const { title, description, requirements } = req.body;

    const oldJob = await Job.findOne({ title });

    if (oldJob) {
        const error = appErrors.create(
            400,
            "Job Already Exists",
            httpResponseText.FAIL
        );
        return next(error);
    }

    const createdBy = req.currentUser.userId;

    const newJob = new Job({
        title,
        description,
        requirements,
        createdBy,

    });

    newJob.__v = undefined;

    await newJob.save();
    res.status(201).json({
        status: httpResponseText.SUCCESS,
        data: { newJob },
    });
});

export const updateJob = asyncWraper(async (req, res, next) => {
    const JobID = req.params.id;
    if (Object.keys(req.body).length === 0) {
        const error = appErrors.create(
            400,
            "Please provide data to update",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const updateData = flatten(req.body);

    const updatedJob = await Job.findByIdAndUpdate(
        JobID,
        { $set: updateData },
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedJob) {
        const error = appErrors.create(
            404,
            "Job Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    updatedJob.__v = undefined;

    res.json({
        status: httpResponseText.SUCCESS,
        data: { job: updatedJob },
    });
});

export const deleteJob = asyncWraper(async (req, res, next) => {
    const JobID = req.params.id;
    const job = await Job.findByIdAndDelete(JobID);
    if (!job) {
        const error = appErrors.create(
            404,
            "Job Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({ status: httpResponseText.SUCCESS, data: null });
});


export const searchJobs = asyncWraper(async (req, res, next) => {
    const { title } = req.query;

    if (!title) {
        return res.status(200).json({ status: httpResponseText.SUCCESS, data: { results: [] } });
    }

    const results = await Job.aggregate([
        { $match: { title: { $regex: title, $options: "i" } } },
        {
            $project: {
                _id: 1,
                title: 1,
                status: 1,
                date: 1
            }
        }
    ]);

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { results }
    });
});