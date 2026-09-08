import React from 'react';
import { Megaphone, PlayCircle, Calendar, Wallet, TrendingUp } from 'lucide-react';

/**
 * PromotionKpiCards
 * Hiển thị 4 thẻ Summary Card thông số chiến dịch khuyến mãi
 */
export default function PromotionKpiCards({ metrics }) {
  const totalCount = metrics?.totalPromotions || 0;
  const activeCount = metrics?.activePromotions || 0;
  const upcomingCount = metrics?.upcomingPromotions || 0;
  const budgetSpent = metrics?.budgetSpent || 0;
  const totalBudget = metrics?.totalBudget || 60000000;
  const budgetPercent = metrics?.budgetPercent || (budgetSpent ? Number(((budgetSpent / totalBudget) * 100).toFixed(1)) : 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Card 1: Tổng Chiến Dịch */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/90 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Tổng Chiến Dịch
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">{totalCount}</span>
              <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200/60">
                Quý 4/2024
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
            <Megaphone className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-slate-600 text-xs">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-slate-700">+4 chiến dịch so với quý trước</span>
        </div>
      </div>

      {/* Card 2: Đang Hoạt Động */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/90 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Đang Hoạt Động
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">{activeCount}</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                Running
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <PlayCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-700">Chiếm 64% lưu lượng trạm máy</span>
        </div>
      </div>

      {/* Card 3: Sắp Diễn Ra */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/90 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Sắp Diễn Ra
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">{upcomingCount}</span>
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60">
                Upcoming
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <Calendar className="w-4 h-4 text-indigo-500" />
          <span className="font-semibold text-slate-700">Đợt kế tiếp: 01/11/2024</span>
        </div>
      </div>

      {/* Card 4: Ngân Sách Ưu Đãi Đã Dùng */}
      <div className="bg-white p-4 rounded-xl shadow-xs border border-slate-200/90 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Ngân Sách Ưu Đãi Đã Dùng
            </span>
            <div className="flex items-baseline gap-1.5 mt-1 font-mono">
              <span className="text-2xl font-black text-slate-900">
                {(budgetSpent / 1000000).toFixed(1)}M
              </span>
              <span className="text-xs text-slate-400 font-bold">
                / {(totalBudget / 1000000).toFixed(0)}M VNĐ
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-500 font-medium">Hạn mức quý</span>
            <span className="font-mono font-bold text-sky-700">{budgetPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(budgetPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
