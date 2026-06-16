export function authMiddleware(req, _res, next) {
  req.user = {
    id: 1,
    name: 'Admin Demo',
    email: 'admin@demo.local',
    role: 'admin',
  };
  next();
}

export function isAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Acceso no autorizado en demo' });
  }
  next();
}
