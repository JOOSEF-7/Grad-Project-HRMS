import User from "../models/user.model.js";
import Applicant from "../models/applicant.model.js";
import Payroll from "../models/payroll.model.js";
import Project from "../models/project.model.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import { httpResponseText } from "../utils/httpResponseText.js";

export const getEmployeeStatistics = asyncWraper(async (req, res, next) => {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;

    const stats = await User.aggregate([
        {
            $facet: {
                "current": [
                    {
                        $match: {
                            "employee.status": "Active",
                            $expr: {
                                $and: [
                                    { $eq: [{ $month: "$employee.joiningDate" }, month] },
                                    { $eq: [{ $year: "$employee.joiningDate" }, year] }
                                ]
                            }
                        }
                    },
                    { $count: "total" }
                ],
                "previous": [
                    {
                        $match: {
                            "employee.status": "Active",
                            $expr: {
                                $and: [
                                    { $eq: [{ $month: "$employee.joiningDate" }, prevMonth] },
                                    { $eq: [{ $year: "$employee.joiningDate" }, prevYear] }
                                ]
                            }
                        }
                    },
                    { $count: "total" }
                ]
            }
        },
        {
            $project: {
                currentTotal: { $ifNull: [{ $arrayElemAt: ["$current.total", 0] }, 0] },
                previousTotal: { $ifNull: [{ $arrayElemAt: ["$previous.total", 0] }, 0] }
            }
        }
    ]);

    const { currentTotal, previousTotal } = stats[0] || { currentTotal: 0, previousTotal: 0 };

    let percentageChange = 0;
    if (previousTotal > 0) {
        percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    }

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: {
            totalEmployees: currentTotal,
            previousTotal,
            percentageChange: Math.round(percentageChange)
        }
    });
});



export const getApplicantStatistics = asyncWraper(async (req, res, next) => {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);
    const filterStatus = req.query.status || "Applied";

    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;

    const Statistics = await Applicant.aggregate([
        {
            $facet: {
                
                "comparison": [
                    {
                        $facet: {
                            "current": [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: [{ $month: "$createdAt" }, month] },
                                                { $eq: [{ $year: "$createdAt" }, year] }
                                            ]
                                        }
                                    }
                                },
                                { $count: "total" }
                            ],
                            "previous": [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: [{ $month: "$createdAt" }, prevMonth] },
                                                { $eq: [{ $year: "$createdAt" }, prevYear] }
                                            ]
                                        }
                                    }
                                },
                                { $count: "total" }
                            ]
                        }
                    },
                    {
                        $project: {
                            currentTotal: { $ifNull: [{ $arrayElemAt: ["$current.total", 0] }, 0] },
                            previousTotal: { $ifNull: [{ $arrayElemAt: ["$previous.total", 0] }, 0] }
                        }
                    }
                ],
                "applicantsFilter": [
                    { $match: { status: filterStatus } },
                    { $sort: { createdAt: -1 } },
                    {
                        $project: {
                            firstName: 1,
                            lastName: 1,
                            avatar: 1,
                            status: 1,
                            "experience.position": 1
                        }
                    }
                ]
            }
        }
    ]);

    const result = Statistics[0];
    const { currentTotal, previousTotal } = result.comparison[0] || { currentTotal: 0, previousTotal: 0 };


    let percentageChange = 0;
    if (previousTotal > 0) {
        percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    }

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: {
            Statistics: {
                totalApplicants: currentTotal,
                previousTotal,
                percentageChange: Math.round(percentageChange)
            },
            applicants: result.applicantsFilter
        }
    });
});



export const payrollStatistics = asyncWraper(async (req, res, next) => {
    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;

    const stats = await Payroll.aggregate([
        {
            $facet: {
                "current": [
                    { $match: { month, year, status: "Paid" } },
                    { $group: { _id: null, total: { $sum: "$netSalary" } } }
                ],
                "previous": [
                    { $match: { month: prevMonth, year: prevYear, status: "Paid" } },
                    { $group: { _id: null, total: { $sum: "$netSalary" } } }
                ]
            }
        },
        {
            $project: {
                currentTotal: { $ifNull: [{ $arrayElemAt: ["$current.total", 0] }, 0] },
                previousTotal: { $ifNull: [{ $arrayElemAt: ["$previous.total", 0] }, 0] }
            }
        }
    ]);

    const { currentTotal, previousTotal } = stats[0] || { currentTotal: 0, previousTotal: 0 };

    let percentageChange = 0;
    if (previousTotal > 0) {
        percentageChange = ((currentTotal - previousTotal) / previousTotal) * 100;
    }

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: {
            currentTotal,
            previousTotal,
            percentageChange: Math.round(percentageChange) 
        }
    });
});



export const getEmployeeStatus = asyncWraper(async (req, res, next) => {
    const stats = await User.aggregate([
        {
            $match: {
                "general.role": "EMPLOYEE",
                "employee.status": "Active"
            }
        },
        {
            $group: {
                _id: null,
                totalEmployee: { $sum: 1 },
                fullTimeCount: {
                    $sum: { $cond: [{ $eq: ["$employee.jobType", "Full-time"] }, 1, 0] }
                },
                partTimeCount: {
                    $sum: { $cond: [{ $eq: ["$employee.jobType", "Part-time"] }, 1, 0] }
                },
                internshipCount: {
                    $sum: { $cond: [{ $eq: ["$employee.jobType", "Internship"] }, 1, 0] }
                }
            }
        }
    ]);

    const result = stats[0] || { 
        totalEmployee: 0, 
        fullTimeCount: 0, 
        partTimeCount: 0, 
        internshipCount: 0 
    };
    
    const { totalEmployee, fullTimeCount, partTimeCount, internshipCount } = result;

    const getPercentage = (count) => (totalEmployee > 0 ? Math.round((count / totalEmployee) * 100) : 0);

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: {
            totalEmployee,
            fullTimeCount,
            fullTimePercentage: getPercentage(fullTimeCount),
            partTimeCount,
            partTimePercentage: getPercentage(partTimeCount),
            internshipCount,
            internshipPercentage: getPercentage(internshipCount)
        }
    });
});



export const getProjectSummary = asyncWraper(async (req, res, next) => {
    const filterStatus = req.query.status || "On-going";

    const projects = await Project.aggregate([
        { $match: { "assignment.status": filterStatus } },

        {
            $lookup: {
                from: "users",
                localField: "assignment.assignedTo",
                foreignField: "_id",
                pipeline: [
                    {
                        $project: {
                            firstName: "$general.firstName",
                            lastName: "$general.lastName",
                            avatar: "$general.avatar",
                        },
                    },
                ],
                as: "assignedTo",
            },
        },

        {
            $lookup: {
                from: "tasks",
                localField: "_id",
                foreignField: "projectId",
                as: "allTasks",
            },
        },

        {
            $addFields: {
                totalTasks: { $size: "$allTasks" },
                completedTasks: {
                    $size: {
                        $filter: {
                            input: "$allTasks",
                            as: "t",
                            cond: { $eq: ["$$t.done", true] },
                        },
                    },
                },
            },
        },

        {
            $project: {
                _id: 1,
                name: "$general.name",
                description: "$general.description",
                deadline: "$general.deadline",
                assignedTo: 1,
                documentsCount: { $size: { $ifNull: ["$documents", []] } },
                projectProgress: {
                    $cond: [
                        { $gt: ["$totalTasks", 0] },
                        {
                            $round: [
                                {
                                    $multiply: [
                                        {
                                            $divide: [
                                                "$completedTasks",
                                                "$totalTasks",
                                            ],
                                        },
                                        100,
                                    ],
                                },
                                0,
                            ],
                        },
                        0,
                    ],
                },
            },
        },
    ]);

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { projects },
    });
});
