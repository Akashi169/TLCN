/**
 * NEXUS System Centralized Frontend Enums
 */

export const UserRole = Object.freeze({
  ADMIN: 'ADMIN',
  STAFF: 'STAFF',
  CUSTOMER: 'CUSTOMER',
});

export const ComputerStatus = Object.freeze({
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  IN_USE: 'IN_USE',
  LOCKED: 'LOCKED',
  MAINTENANCE: 'MAINTENANCE',
});

export const SessionStatus = Object.freeze({
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
});

export const OrderStatus = Object.freeze({
  PENDING: 'PENDING',
  PREPARING: 'PREPARING',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
});

export const TransactionType = Object.freeze({
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
});

export const TransactionCategory = Object.freeze({
  MACHINE_RENTAL: 'MACHINE_RENTAL',
  SERVICE_SALE: 'SERVICE_SALE',
  MEMBER_TOPUP: 'MEMBER_TOPUP',
  MEMBER_WITHDRAW: 'MEMBER_WITHDRAW',
  REFUND: 'REFUND',
  OTHER: 'OTHER',
});

export default {
  UserRole,
  ComputerStatus,
  SessionStatus,
  OrderStatus,
  TransactionType,
  TransactionCategory,
};
