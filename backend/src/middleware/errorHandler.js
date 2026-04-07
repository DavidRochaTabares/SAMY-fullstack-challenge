const errorHandler = (err, req, res, next) => {
  console.log(' Error:', err.message);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Stack:', err.stack);
  }

  // Determinar el código de estado HTTP
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Errores de validación de Sequelize
  if (err.name === 'SequelizeValidationError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
  }

  // Errores de unicidad de Sequelize
  if (err.name === 'SequelizeUniqueConstraintError') {
    statusCode = 409;
    message = 'Resource already exists';
  }

  // Errores de base de datos
  if (err.name === 'SequelizeDatabaseError') {
    statusCode = 500;
    message = 'Database error occurred';
  }

  // Errores de JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Respuesta de error
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err.name 
    })
  });
};

module.exports = errorHandler;
