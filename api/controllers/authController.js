export function login(req, res) {
  res.json({
    token: 'demo-admin-token',
    user: {
      id: 1,
      name: 'Admin Demo',
      email: req.body.email || 'admin@demo.local',
      role: 'admin',
    },
  });
}

export function me(req, res) {
  res.json(req.user);
}

export function resetPassword(req, res) {
  res.json({
    success: true,
    message: `Contraseña demo regenerada para usuario ${req.params.id}`,
  });
}
