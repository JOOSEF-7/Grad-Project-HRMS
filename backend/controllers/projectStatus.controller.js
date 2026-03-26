import Project from "../models/project.model.js";
import { httpResponseText } from "../utils/httpResponseText.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";

export const getProjectStats = asyncWraper(async (req, res, next) => {
    const stats = await Project.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                ongoing: {
                    $sum: { $cond: [{ $eq: ["$assignment.status", "On-going"] }, 1, 0] }
                },
                pending: {
                    $sum: { $cond: [{ $eq: ["$assignment.status", "Pending"] }, 1, 0] }
                },
                completed: {
                    $sum: { $cond: [{ $eq: ["$assignment.status", "Completed"] }, 1, 0] }
                }
            }
        }
    ]);

    const data = stats[0] || { total: 0, ongoing: 0, pending: 0, completed: 0 };

    const headers = [
        { title: "All Project", value: data.total },
        { title: "On-going", value: data.ongoing },
        { title: "Pending", value: data.pending },
        { title: "Completed", value: data.completed },
    ];

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: headers,
    });
});