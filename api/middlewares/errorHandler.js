export function errorHandler(error, _req, res, _next) {
  console.error('[DEMO API]', error);
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Error inesperado en API demo',
  });
}
