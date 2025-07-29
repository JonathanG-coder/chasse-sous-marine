export const isAdmin = (req, res, next) => {
  const role = req.body.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Seul un administrateur peut créer, modifier et supprimer un article" });
  }

  next();
};
