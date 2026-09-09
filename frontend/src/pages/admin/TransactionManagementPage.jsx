import React, { useState, useEffect } from 'react';
import Header from '../../widgets/header/Header';
import Sidebar from '../../widgets/sidebar/Sidebar';
import TransactionKpiCards from '../../features/transactions/ui/TransactionKpiCards';
import TransactionFilterBar from '../../features/transactions/ui/TransactionFilterBar';
import TransactionTable from '../../features/transactions/ui/TransactionTable';
import CreateTopUpModal from '../../features/transactions/ui/CreateTopUpModal';
import TransactionDetailDrawer from '../../features/transactions/ui/TransactionDetailDrawer';
import TransactionService from '../../shared/api/transaction.service';
import { Download, PlusCircle, AlertCircle } from 'lucide-react';

export default function TransactionManagementPage({ user, onLogout }) {
    const [transactions, setTransactions] = useState([]);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal & Drawer State
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Filters State
    const [filters, setFilters] = useState({
        search: '',
        dateRange: 'all',
        category: 'all',
        paymentMethod: 'all',
        status: 'all'
    });

    const fetchTransactionsData = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await TransactionService.getTransactions();
            setTransactions(data.transactions || []);
            setMetrics(data.metrics || null);
        } catch (err) {
            console.error('Lỗi khi tải giao dịch:', err);
            setError('Không thể kết nối CSDL MySQL backend. Vui lòng kiểm tra lại dịch vụ.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactionsData();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleResetFilters = () => {
        setFilters({
            search: '',
            dateRange: 'all',
            category: 'all',
            paymentMethod: 'all',
            status: 'all'
        });
    };

    const handleCreateTopUpSubmit = async (formData) => {
        await TransactionService.createTopUp(formData);
        fetchTransactionsData();
    };

    const handleRefundSubmit = async (transaction) => {
        const txnId = transaction.transaction_id || transaction.id;
        const reason = window.prompt(`Xác nhận hoàn tiền cho giao dịch ${transaction.txn_code || txnId}?\nLý do hoàn tiền:`, 'Khách đổi ý / Nhầm lẫn');
        if (reason !== null) {
            try {
                await TransactionService.refundTransaction(txnId, reason);
                alert('Đã xử lý hoàn tiền thành công!');
                if (selectedReceipt && (selectedReceipt.transaction_id || selectedReceipt.id) === txnId) {
                    setSelectedReceipt(null);
                }
                fetchTransactionsData();
            } catch (err) {
                alert('Lỗi hoàn tiền: ' + (err?.response?.data?.message || err?.message));
            }
        }
    };

    // Filter transaction items based on selected filters
    const filteredTransactions = transactions.filter((txn) => {
        // Search query
        if (filters.search) {
            const q = filters.search.toLowerCase();
            const txnCode = (txn.txn_code || '').toLowerCase();
            const memberName = (txn.member_name || txn.customer_name || '').toLowerCase();
            const phone = (txn.member_phone || '').toLowerCase();
            const computerName = (txn.computer_name || '').toLowerCase();
            const matchesSearch = txnCode.includes(q) || memberName.includes(q) || phone.includes(q) || computerName.includes(q);
            if (!matchesSearch) return false;
        }

        // Category filter
        if (filters.category !== 'all') {
            if (txn.category !== filters.category) return false;
        }

        // Payment method filter
        if (filters.paymentMethod !== 'all') {
            const pm = (txn.payment_method || '').toLowerCase();
            if (!pm.includes(filters.paymentMethod.toLowerCase())) return false;
        }

        // Status filter
        if (filters.status !== 'all') {
            const st = (txn.status || '').toLowerCase();
            if (filters.status === 'completed' && st !== 'completed' && st !== 'thành công') return false;
            if (filters.status === 'pending' && st !== 'pending' && st !== 'đang xử lý') return false;
            if (filters.status === 'failed' && st !== 'failed' && st !== 'thất bại') return false;
            if (filters.status === 'refunded' && st !== 'refunded' && st !== 'hoàn tiền') return false;
        }

        return true;
    });

    const handleExportExcel = () => {
        alert('Tính năng xuất báo cáo Excel cho ' + filteredTransactions.length + ' giao dịch đang khởi tạo!');
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans antialiased text-slate-900">
            {/* Header Widget */}
            <Header user={user} onLogout={onLogout} />

            {/* Sidebar Widget */}
            <Sidebar activeNav="transactions" />

            {/* Main Content Area */}
            <main className="pl-[240px] pt-16 min-h-screen p-6">
                <div className="max-w-[1600px] mx-auto space-y-6">
                    {/* Top Level Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                                    Sổ Cái & Tra Cứu Giao Dịch
                                </h1>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 font-mono text-[11px] font-semibold uppercase tracking-wider border border-sky-200">
                                    Audit Stream v2.4
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                Hệ thống kiểm toán thu chi, nạp tiền giờ chơi, dịch vụ F&B và tra cứu hóa đơn điện tử thời gian thực từ CSDL MySQL.
                            </p>
                        </div>

                        {/* Top Right Action Buttons */}
                        <div className="flex items-center gap-2 self-start md:self-auto">
                            <button
                                onClick={handleExportExcel}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 shadow-xs hover:bg-slate-50 transition-all text-sm font-semibold"
                            >
                                <Download className="w-4 h-4 text-slate-500" />
                                <span>Xuất Báo Cáo Excel</span>
                            </button>

                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 text-white shadow-sm hover:bg-sky-700 transition-all text-sm font-semibold"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>+ Nạp Tiền Tại Quầy</span>
                            </button>
                        </div>
                    </div>

                    {/* Backend Error Banner */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* 4 Financial KPI Summary Cards */}
                    <TransactionKpiCards metrics={metrics} loading={loading} />

                    {/* Detailed Filter Toolbar */}
                    <TransactionFilterBar
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onResetFilters={handleResetFilters}
                        onRefresh={fetchTransactionsData}
                        onOpenCreateModal={() => setIsCreateModalOpen(true)}
                        loading={loading}
                    />

                    {/* Transaction Data Table */}
                    <TransactionTable
                        transactions={filteredTransactions}
                        loading={loading}
                        onSelectReceipt={(txn) => setSelectedReceipt(txn)}
                        onRefundTransaction={handleRefundSubmit}
                    />
                </div>

                {/* Create Top Up Modal */}
                <CreateTopUpModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleCreateTopUpSubmit}
                />

                {/* Digital Receipt Detail Drawer */}
                {selectedReceipt && (
                    <TransactionDetailDrawer
                        transaction={selectedReceipt}
                        onClose={() => setSelectedReceipt(null)}
                        onRefund={handleRefundSubmit}
                    />
                )}
            </main>
        </div>
    );
}
