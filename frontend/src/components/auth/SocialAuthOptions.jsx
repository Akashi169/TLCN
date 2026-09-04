import React from 'react';
import Button from '../ui/Button';
import SocialIcon from '../ui/SocialIcon';

export default function SocialAuthOptions() {
  return (
    <div className="space-y-2.5 mb-6">
      {/* Steam Login Button */}
      <Button variant="social-steam" title="Đăng nhập bằng tài khoản Steam">
        <SocialIcon provider="steam" />
        <span>Đăng nhập bằng Steam</span>
      </Button>

      {/* Discord & Google Buttons Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="social-outline" title="Đăng nhập bằng Discord">
          <SocialIcon provider="discord" />
          <span>Discord</span>
        </Button>

        <Button variant="social-outline" title="Đăng nhập bằng Google">
          <SocialIcon provider="google" />
          <span>Google</span>
        </Button>
      </div>
    </div>
  );
}
