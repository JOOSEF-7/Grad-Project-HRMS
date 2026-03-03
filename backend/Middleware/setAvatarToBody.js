export const setAvatarToBody = (req, res, next) => {
  if (req.file) {
    general.avatar = req.file.filename;
  }
  next();
};
