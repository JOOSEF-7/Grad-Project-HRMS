export const setFilePathToBody = (fieldName) => (req, res, next) => {
    if (req.file) {
        if (fieldName.includes(".")) {
            const [parent, child] = fieldName.split(".");
            req.body[parent] = req.body[parent] || {};
            req.body[parent][child] = req.file.filename;
        } else {
            req.body[fieldName] = req.file.filename;
        }
    }
    next();
};
