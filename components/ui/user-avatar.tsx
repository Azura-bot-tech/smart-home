'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function UserAvatar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{
    name?: string;
    email?: string;
    avatar?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check-login');
        const isAuthed = response.ok;
        setIsAuthenticated(isAuthed);

        if (isAuthed) {
          // Fetch user data if authenticated
          try {
            const userResponse = await fetch('/api/user');
            if (userResponse.ok) {
              const userData = await userResponse.json();
              setUserData(userData);
            }
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        }

        // Tự động chuyển hướng nếu đang ở trang không phù hợp
        const currentPath = window.location.pathname;
        if (!isAuthed && currentPath === '/user') {
          router.push('/login');
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (window.location.pathname === '/user') {
          router.push('/login');
        }
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full w-7 h-7 p-0"
        >
          <Image
            src={userData?.avatar || '/avatar.png'}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {isAuthenticated ? 'Tài khoản của tôi' : 'Đăng nhập'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {isAuthenticated ? (
          <>
            <DropdownMenuItem onClick={() => router.push('/user')}>
              Thông tin cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')}>
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/help')}>
              Hỗ trợ
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Đăng xuất
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={() => router.push('/login')}>
            Đăng nhập
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
