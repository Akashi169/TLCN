// src/models/index.js
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    logging: false,
});

const db = {};

// Tự động đọc tất cả các file model trong thư mục này
fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

// Thiết lập các mối quan hệ (Associations)
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Không gọi sync() ở đây — việc đồng bộ DB được thực hiện duy nhất
// tại entry point (backend/index.js) để tránh race condition.
module.exports = db;