export const setFilesToBody2 = () => (req, res, next) => {
    if (req.files && Array.isArray(req.files)) {
        req.files.forEach((file) => {
            const path = file.fieldname; 
            const fileValue = file.path || file.filename;

            const cleanPath = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
            const keys = cleanPath.split('.');
            
            let current = req.body;
            for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];
                if (!current[k]) {
                    current[k] = isNaN(keys[i + 1]) ? {} : [];
                }
                current = current[k];
            }
            current[keys[keys.length - 1]] = fileValue;
        });
    }
    next();
};