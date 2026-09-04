import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import useToggle from '../../hooks/useToggle';
import authService from '../../services/authService';

export default function LoginForm({ onSuccess }) {
  const [showPassword, togglePassword] = useToggle(false);
  const [formData, setFormData] = useState({
    identity: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const data = await authService.login(formData.identity, formData.password);
      // data chứa { token, tokenType: 'Bearer', user: { role, username, ... } }
      if (onSuccess) {
        onSuccess(data.user);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Thông báo lỗi nếu đăng nhập thất bại */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 shadow-xs animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">{errorMsg}</div>
        </div>
      )}

      <Input
        id="identity_input"
        name="identity"
        label="Tên đăng nhập / Số điện thoại"
        icon={User}
        placeholder="Nhập tên đăng nhập hoặc SĐT..."
        required
        value={formData.identity}
        onChange={handleChange}
        disabled={loading}
      />
      
      <Input
        id="password_input"
        name="password"
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        icon={Lock}
        placeholder="••••••••••••"
        required
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        rightElement={
          <button 
            type="button"
            className={`flex items-center hover:text-slate-700 focus:outline-none ${showPassword ? 'text-brand-600' : 'text-slate-500'}`}
            onClick={togglePassword}
            aria-label="Hiện hoặc ẩn mật khẩu"
          >
            {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between pt-1">
        <Checkbox
          id="remember-me"
          name="rememberMe"
          label="Ghi nhớ đăng nhập trên máy này"
          checked={formData.rememberMe}
          onChange={handleChange}
          disabled={loading}
        />
        <div>
          <a className="text-xs font-bold text-brand-600 hover:text-brand-700 transition" href="#">
            Quên mật khẩu?
          </a>
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>ĐANG XÁC THỰC...</span>
            </span>
          ) : (
            <>
              <span className="whitespace-nowrap">ĐĂNG NHẬP NGAY</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
