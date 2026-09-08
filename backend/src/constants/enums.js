/**
 * NEXUS System Centralized Enums
 */

const UserRole = Object.freeze({
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
});

const ComputerStatus = Object.freeze({
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  IN_USE: 'IN_USE',
  LOCKED: 'LOCKED',
  MAINTENANCE: 'MAINTENANCE',
});

const SessionStatus = Object.freeze({
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
});

const OrderStatus = Object.freeze({
  PENDING: 'PENDING',
  PREPARING: 'PREPARING',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
});

const TransactionType = Object.freeze({
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
});

const TransactionCategory = Object.freeze({
  MACHINE_RENTAL: 'MACHINE_RENTAL',
  SERVICE_SALE: 'SERVICE_SALE',
  MEMBER_TOPUP: 'MEMBER_TOPUP',
  MEMBER_WITHDRAW: 'MEMBER_WITHDRAW',
  REFUND: 'REFUND',
  OTHER: 'OTHER',
});

module.exports = {
  UserRole,
  ComputerStatus,
  SessionStatus,
  OrderStatus,
  TransactionType,
  TransactionCategory,
};
