'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function HelpPage() {
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi form liên hệ ở đây
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 3000);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Trung tâm trợ giúp</h1>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="faq">Câu hỏi thường gặp</TabsTrigger>
          <TabsTrigger value="guides">Hướng dẫn sử dụng</TabsTrigger>
          <TabsTrigger value="contact">Liên hệ hỗ trợ</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Câu hỏi thường gặp</CardTitle>
              <CardDescription>
                Những câu hỏi phổ biến nhất từ người dùng của chúng tôi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Làm thế nào để tạo tài khoản?
                  </AccordionTrigger>
                  <AccordionContent>
                    Để tạo tài khoản, nhấp vào nút "Đăng ký" ở góc trên bên phải
                    của trang chủ. Sau đó, điền thông tin cá nhân của bạn và làm
                    theo hướng dẫn trên màn hình.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Làm thế nào để thay đổi tên người dùng?
                  </AccordionTrigger>
                  <AccordionContent>
                    Để thay đổi tên người dùng, hãy truy cập trang cài đặt tài
                    khoản của bạn. Tại đó, bạn có thể cập nhật tên người dùng và
                    các thông tin cá nhân khác.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Làm thế nào để đặt lại mật khẩu?
                  </AccordionTrigger>
                  <AccordionContent>
                    Nếu bạn quên mật khẩu, hãy nhấp vào liên kết "Quên mật khẩu"
                    trên trang đăng nhập. Chúng tôi sẽ gửi email hướng dẫn đặt
                    lại mật khẩu đến địa chỉ email đã đăng ký của bạn.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Làm thế nào để xóa tài khoản?
                  </AccordionTrigger>
                  <AccordionContent>
                    Để xóa tài khoản, hãy truy cập trang cài đặt tài khoản và
                    tìm tùy chọn "Xóa tài khoản" ở cuối trang. Lưu ý rằng hành
                    động này không thể hoàn tác và tất cả dữ liệu của bạn sẽ bị
                    xóa vĩnh viễn.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hướng dẫn sử dụng</CardTitle>
              <CardDescription>
                Tìm hiểu cách sử dụng các tính năng của ứng dụng
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Bắt đầu</h3>
                  <p className="text-muted-foreground mb-4">
                    Hướng dẫn cơ bản để bắt đầu sử dụng ứng dụng của chúng tôi.
                  </p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Đăng ký tài khoản mới hoặc đăng nhập vào tài khoản hiện có
                    </li>
                    <li>Hoàn thành hồ sơ cá nhân của bạn</li>
                    <li>Khám phá các tính năng chính trên trang chủ</li>
                    <li>Tùy chỉnh cài đặt theo sở thích của bạn</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Quản lý tài khoản
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Tìm hiểu cách quản lý thông tin tài khoản và cài đặt bảo
                    mật.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Cập nhật thông tin cá nhân trong phần cài đặt tài khoản
                    </li>
                    <li>Thay đổi mật khẩu định kỳ để tăng cường bảo mật</li>
                    <li>Kích hoạt xác thực hai yếu tố để bảo vệ tài khoản</li>
                    <li>Quản lý thông báo và tùy chọn liên lạc</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Tính năng nâng cao
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Khám phá các tính năng nâng cao để tận dụng tối đa ứng dụng.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sử dụng công cụ tìm kiếm nâng cao để lọc kết quả</li>
                    <li>Tạo và quản lý danh sách yêu thích</li>
                    <li>Chia sẻ nội dung với bạn bè qua mạng xã hội</li>
                    <li>
                      Tùy chỉnh giao diện người dùng theo sở thích cá nhân
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Liên hệ hỗ trợ</CardTitle>
              <CardDescription>
                Gửi yêu cầu hỗ trợ hoặc câu hỏi của bạn đến đội ngũ của chúng
                tôi
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="text-center mb-6">
                Vui lòng nhấn vào nút bên dưới để chuyển đến trang liên hệ chi
                tiết
              </p>
              <Button asChild className="w-full md:w-auto">
                <a href="/contact">Đi đến trang liên hệ</a>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
