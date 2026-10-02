const express = require('express');
const router = express.Router();
const db = require('../models');

/**
 * GET /health / GET /api/health
 * Health Check endpoint for NEXUS Cloud Cyber OS API
 */
router.get('/', async (req, res) => {
  const startTime = Date.now();
  let dbStatus = 'disconnected';
  let dbError = null;

  try {
    await db.sequelize.authenticate();
    dbStatus = 'connected';
  } catch (error) {
    dbStatus = 'disconnected';
    dbError = error.message;
  }

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = dbStatus === 'connected';

  const healthData = {
    system: 'NEXUS Cloud Cyber OS API',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    responseTimeMs,
    services: {
      api: {
        status: 'UP'
      },
      database: {
        status: dbStatus,
        dialect: 'mysql',
        ...(dbError && { error: dbError })
      }
    }
  };

  if (isHealthy) {
    return res.status(200).json({
      status: 'success',
      data: healthData,
      message: 'NEXUS Cloud Cyber OS API is fully operational'
    });
  }

  return res.status(503).json({
    status: 'error',
    data: healthData,
    message: 'NEXUS Cloud Cyber OS API is experiencing degraded health',
    error: {
      code: 'SERVICE_UNHEALTHY',
      details: 'Database connection failed'
    }
  });
});

module.exports = router;
