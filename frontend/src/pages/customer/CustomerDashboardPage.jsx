import React from 'react';
import CustomerLayout from '../../widgets/layouts/customer/CustomerLayout';
import CustomerProfileView from '../../features/customer-profile/CustomerProfileView';

export default function CustomerDashboardPage({ user, onLogout }) {
  return (
    <CustomerLayout user={user} onLogout={onLogout} activeTab="profile">
      <CustomerProfileView user={user} memberId={user?.member_id ?? user?.id ?? user?.user_id} />
    </CustomerLayout>
  );
}

