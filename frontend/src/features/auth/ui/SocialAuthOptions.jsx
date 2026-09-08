import React from 'react';
import SocialIcon from '../../../shared/ui/SocialIcon';

export default function SocialAuthOptions() {
  return (
    <div className="space-y-2.5 mb-6" data-purpose="social-identity-providers">
      {/* Steam Login Button */}
      <button
        className="w-full flex items-center justify-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm hover:shadow-md active:scale-[0.99] border border-slate-800"
        title="Đăng nhập bằng tài khoản Steam"
        type="button"
      >
        <SocialIcon provider="steam" />
        <span>Đăng nhập bằng Steam</span>
      </button>

      {/* Discord & Google Buttons Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          className="flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition shadow-sm active:scale-[0.99]"
          title="Đăng nhập bằng Discord"
          type="button"
        >
          <SocialIcon provider="discord" />
          <span>Discord</span>
        </button>

        <button
          className="flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition shadow-sm active:scale-[0.99]"
          title="Đăng nhập bằng Google"
          type="button"
        >
          <SocialIcon provider="google" />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
}
