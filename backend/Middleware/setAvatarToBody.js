export const setAvatarToBody = (req, res, next) => {
  if (req.file) {
    req.body.avatar = req.file.filename;
  }
  next();
};
