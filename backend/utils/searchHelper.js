// utils/searchHelper.js
export const buildNameSearchQuery = (employeeName, fNamePath, lNamePath) => {
    if (!employeeName) return {};

    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const safeName = escapeRegex(employeeName.trim());
    const terms = safeName.split(/\s+/);

    let matchStage = {};

    if (terms.length === 1) {
        matchStage.$or = [
            { [fNamePath]: { $regex: terms[0], $options: "i" } },
            { [lNamePath]: { $regex: terms[0], $options: "i" } },
        ];
    } else if (terms.length > 1) {
        matchStage.$and = terms.map((term) => ({
            $or: [
                { [fNamePath]: { $regex: term, $options: "i" } },
                { [lNamePath]: { $regex: term, $options: "i" } },
            ],
        }));
    }

    return matchStage;
};
