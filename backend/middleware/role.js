module.exports = function (roles = []) {
  // roles có thể là string hoặc array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have permission" });
    }
    next();
  };
};
