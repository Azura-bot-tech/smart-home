'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface UserData {
  username: string;
  email: string;
  avatar?: string;
}

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Thay thế bằng API call thực tế để lấy thông tin user
        const response = await fetch('/api/user');
        if (!response.ok) {
          router.push('/login');
          return;
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (user) {
      setNewUsername(user.username);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      // Thay thế bằng API call thực tế để logout
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) return;

    setUpdateLoading(true);
    try {
      // Gọi API để cập nhật username
      const response = await fetch('/api/user/update-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setIsEditing(false);
      } else {
        // Hiển thị thông báo lỗi cụ thể từ server
        console.error('Failed to update username:', data.error);
        alert(data.error || 'Không thể cập nhật tên người dùng');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Đã xảy ra lỗi khi cập nhật tên người dùng');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-[600px] p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <Image
                src={user?.avatar || '/placeholder-user.jpg'}
                alt="User Avatar"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Họ và tên</label>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                    disabled={updateLoading}
                    aria-label="Tên người dùng mới"
                    placeholder="Nhập tên người dùng"
                    id="username-input"
                  />
                  <Button
                    onClick={handleUpdateUsername}
                    disabled={updateLoading || !newUsername.trim()}
                    size="sm"
                  >
                    {updateLoading ? 'Đang lưu...' : 'Lưu'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setNewUsername(user?.username || '');
                    }}
                    size="sm"
                    disabled={updateLoading}
                  >
                    Hủy
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="text-lg font-medium">{user?.username}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-500">Email</label>
              <div className="text-lg font-medium">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
