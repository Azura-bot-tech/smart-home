'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactForm } from '@/lib/actions';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Tin nhắn của bạn đã được gửi thành công!'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message:
            result.error ||
            'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Hãy điền vào mẫu dưới đây để gửi tin nhắn cho chúng tôi. Chúng tôi sẽ
          phản hồi trong thời gian sớm nhất.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Điện thoại</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +84 123 456 789
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    info@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Địa chỉ</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    268 Đ. Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Họ tên
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Nhập địa chỉ email của bạn"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium"
                >
                  Tiêu đề
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tiêu đề tin nhắn"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium"
                >
                  Nội dung
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Nhập nội dung tin nhắn của bạn"
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>

              {submitStatus.type && (
                <div
                  className={`mt-4 p-3 rounded-md ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Bản đồ</h2>
          <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4939963428715!2d106.660793!3d10.7734259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ec3bcdf754b%3A0x6dfcdbc4e685b7bc!2zQ29tcHV0ZXIgU2NpZW5jZSAmIEVuZ2luZWVyaW5nIERlcGFydG1lbnQsIDI2OCDEkC4gTMO9IFRoxrDhu51uZyBLaeG7h3QsIFBoxrDhu51uZyAxNCwgUXXhuq1uIDEwLCBI4buTIENow60gTWluaA!5e0!3m2!1sen!2s!4v1742985636703!5m2!1sen!2s"
              width="100%"
              height="100%"
              frameBorder="0"
              className="border-0"
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              title="Bản đồ vị trí của chúng tôi"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
