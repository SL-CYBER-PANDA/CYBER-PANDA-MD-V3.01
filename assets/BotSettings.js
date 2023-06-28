const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('amdiSettings.env')) require('dotenv').config({ path: './amdiSettings.env' });
const DATABASE_URL = process.env.DATABASE_URL.includes("postgres") ? process.env.DATABASE_URL : "./queen_amdi.db"

module.exports = {
    VERSION: 'Queen Amdi 4.0.7v - Multi-Device',
    DATABASE_URL: DATABASE_URL,
    DATABASE:
        DATABASE_URL === './queen_amdi.db'
            ? new Sequelize({ dialect: 'sqlite', storage: DATABASE_URL, logging: false })
            : new Sequelize(DATABASE_URL, {
                dialect: 'postgres',
                ssl: true,
                protocol: 'postgres',
                dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false } },
                logging: false
            }),
    LANGUAGE: process.env.LANGUAGE || 'EN',
    HEROKU_APP: process.env.HEROKU_APP_NAME || '',
    isHEROKU: process.env.HEROKU || '',
    TZ: process.env.TZ || 'Asia/Colombo'
      }
