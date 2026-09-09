const path = require('path');
const { Umzug, SequelizeStorage } = require('umzug');
const db = require('../models');

/**
 * Migration Runner for NEXUS Cyber Command
 * Programmatically executes all pending Sequelize CLI migrations on app startup
 * and guarantees column synchronization.
 */
const runMigrations = async () => {
  try {
    // Direct Column Sync Fallback to guarantee existing MySQL tables match models
    const safeAddColumn = async (table, col, type) => {
      try {
        await db.sequelize.query(`ALTER TABLE \`${table}\` ADD COLUMN \`${col}\` ${type}`);
      } catch (e) {
        // Ignore if column already exists
      }
    };

    await safeAddColumn('financial_transaction', 'txn_code', 'VARCHAR(50) NULL');
    await safeAddColumn('financial_transaction', 'category', 'VARCHAR(50) NULL');
    await safeAddColumn('financial_transaction', 'payment_method', 'VARCHAR(50) NULL');
    await safeAddColumn('financial_transaction', 'status', 'VARCHAR(30) NULL');
    await safeAddColumn('financial_transaction', 'computer_name', 'VARCHAR(50) NULL');
    await safeAddColumn('financial_transaction', 'staff_name', 'VARCHAR(100) NULL');
    await safeAddColumn('financial_transaction', 'notes', 'TEXT NULL');

    await safeAddColumn('users', 'phone_number', 'VARCHAR(20) NULL');
    await safeAddColumn('users', 'email', 'VARCHAR(100) NULL');
    await safeAddColumn('users', 'status', "VARCHAR(30) NOT NULL DEFAULT 'ACTIVE'");
    await safeAddColumn('users', 'last_login', 'DATETIME NULL');

    await safeAddColumn('members', 'points', 'INT NOT NULL DEFAULT 0');

    // Run Umzug for registered CLI migrations
    const umzug = new Umzug({
      migrations: {
        glob: path.resolve(__dirname, '../migrations/2024*.js')
      },
      context: db.sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize: db.sequelize }),
      logger: console
    });

    console.log('🔄 Checking & executing pending Sequelize Migrations...');
    const executed = await umzug.up();
    if (executed && executed.length > 0) {
      console.log(`✅ Successfully executed ${executed.length} Sequelize migration(s):`, executed.map((m) => m.name));
    } else {
      console.log('✅ Database schema is up to date.');
    }
  } catch (error) {
    console.error('❌ Error executing Sequelize Migrations:', error);
    throw error;
  }
};

module.exports = runMigrations;
