import  Applicant  from "../models/applicant.model.js";
import Job from "../models/job.model.js";
import { httpResponseText } from "../utils/httpResponseText.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import {flatten} from "flat";
import appErrors from "../utils/errors.js";

export const getAllApplicants = asyncWraper(async (req, res, next) => {
    const applicants = await Applicant.find({}, { __v: false });
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { applicants },
    });
});


export const getApplicantById = asyncWraper(async (req, res, next) => {
    const applicantId = req.params.id;
    const applicant = await Applicant.findById(applicantId, {
        __v: false,
    });
    if (!applicant) {
        const error = appErrors.create(
            404,
            "Applicant Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({
        status: httpResponseText.SUCCESS,
        data: { applicant },
    });
});

export const getApplicantsByJobId = asyncWraper(async (req, res, next) => {
    const jobId = req.params.jobId;
    const applicants = await Applicant.find(
        { jobId },
        {
            __v: false,
        }
    );
    if (applicants.length === 0) {
        const error = appErrors.create(
            404,
            "Applicant Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({
        status: httpResponseText.SUCCESS,
        data: { applicants },
    });
});

export const createApplicant = asyncWraper(async (req, res, next) => {
    const jobId = req.params.jobId;
    const job = await Job.findById(jobId);
    if(!job){
        const error = appErrors.create(
            404,
            "Job Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const oldApplicant = await Applicant.findOne({
        email: req.body.email,
        jobId: jobId,
    });

    if (oldApplicant) {
        const error = appErrors.create(
            400,
            "Applicant Already Exists",
            httpResponseText.FAIL
        );
        return next(error);
    }

    const newApplicant = new Applicant({ ...req.body, jobId });

    newApplicant.__v = undefined;

    await newApplicant.save();
    res.status(201).json({
        status: httpResponseText.SUCCESS,
        data: { newApplicant },
    });
});

export const updateApplicant = asyncWraper(async (req, res, next) => {
    const applicantID = req.params.id;
    if (Object.keys(req.body).length === 0) {
        const error = appErrors.create(
            400,
            "Please provide data to update",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const updateData = flatten(req.body);

    const updatedApplicant = await Applicant.findByIdAndUpdate(
        applicantID,
        { $set: updateData },
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedApplicant) {
        const error = appErrors.create(
            404,
            "Applicant Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    updatedApplicant.__v = undefined;

    res.json({
        status: httpResponseText.SUCCESS,
        data: { applicant: updatedApplicant },
    });
});

export const deleteApplicant = asyncWraper(async (req, res, next) => {
    const applicantID = req.params.id;
    const applicant = await Applicant.findByIdAndDelete(applicantID);
    if (!applicant) {
        const error = appErrors.create(
            404,
            "Applicant Not Found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({ status: httpResponseText.SUCCESS, data: null });
});
