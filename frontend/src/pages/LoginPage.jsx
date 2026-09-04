import React from 'react';
import SplitScreenLayout from '../components/layout/SplitScreenLayout';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/auth/LoginForm';
import SocialAuthOptions from '../components/auth/SocialAuthOptions';
import ShowcaseVisuals from '../components/showcase/ShowcaseVisuals';

export default function LoginPage({ onLoginSuccess }) {
  const leftContent = (
    <>
      <Header />
      <div className="my-auto py-4 max-w-md w-full mx-auto" data-purpose="login-form-area">
        {/* Title and Welcoming */}
        <div className="mb-6 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Chào mừng trở lại!
          </h1>
          <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">
            Đăng nhập để trải nghiệm Cloud Gaming độ trễ siêu thấp (1.1ms) hoặc quản lý tài khoản trạm máy của bạn.
          </p>
        </div>

        <SocialAuthOptions />

        {/* Clean Form Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-slate-500 whitespace-nowrap">
            Hoặc tiếp tục với tài khoản phòng máy / SĐT
          </span>
          <div className="border-t border-slate-200 w-full"></div>
        </div>

        <LoginForm onSuccess={onLoginSuccess} />

        {/* New Member Registration Switch */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-700 font-medium flex flex-wrap items-center justify-center gap-1.5">
            Chưa có tài khoản?
            <a className="font-bold text-brand-600 hover:text-brand-700 transition inline-flex items-center space-x-2 group" href="#">
              <span className="underline underline-offset-2">Đăng ký hội viên mới</span>
              <span className="text-[11px] bg-emerald-500 text-white font-bold px-2.5 py-0.5 rounded-full border border-emerald-500 shadow-sm transition-transform duration-200 group-hover:scale-105">
                +2 Giờ Miễn Phí
              </span>
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );

  const rightContent = (
    <ShowcaseVisuals />
  );

  return (
    <SplitScreenLayout 
      leftContent={leftContent} 
      rightContent={rightContent} 
    />
  );
}
