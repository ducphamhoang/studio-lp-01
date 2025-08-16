"use client";

import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import {
  Building2,
  Cake,
  CalendarIcon,
  Facebook,
  Flower2,
  Gift,
  GlassWater,
  Instagram,
  MapPin,
  Mic,
  Music,
  Phone,
  Utensils,
  Youtube
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import Chatbot from '@/components/chatbot';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  weddingDate: z.date().optional(),
});

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  const packageDetails = [
    { icon: Building2, title: "Sảnh tiệc lộng lẫy", description: "Sức chứa 200 khách với phong cách kiến trúc Châu Âu." },
    { icon: Utensils, title: "Thực đơn 8 món cao cấp", description: "Tự chọn từ danh sách hơn 50 món Á-Âu tinh hoa." },
    { icon: GlassWater, title: "Trọn gói nước uống", description: "Phục vụ nước ngọt, nước suối không giới hạn trong 2.5 giờ." },
    { icon: Flower2, title: "Gói trang trí hoa tươi", description: "Bao gồm cổng hoa, bàn gallery, lối đi và hoa bàn tiệc." },
    { icon: Mic, title: "MC chuyên nghiệp", description: "Dẫn dắt buổi lễ trang trọng và ấm cúng." },
    { icon: Music, title: "Âm thanh & ánh sáng", description: "Hệ thống hiện đại, tiêu chuẩn sân khấu." },
    { icon: Cake, title: "Bánh cưới 5 tầng", description: "Và tháp ly champagne khai tiệc sang trọng." },
    { icon: Gift, title: "Quà tặng đặc biệt", description: "Một đêm tân hôn tại khách sạn 5 sao liên kết." },
  ];

  const gallery = {
    "Sảnh Tiệc": [
      { src: "https://placehold.co/600x400.png", alt: "Sảnh tiệc 1", hint: "wedding venue ballroom" },
      { src: "https://placehold.co/600x400.png", alt: "Sảnh tiệc 2", hint: "wedding hall interior" },
      { src: "https://placehold.co/600x400.png", alt: "Sảnh tiệc 3", hint: "luxury wedding reception" },
      { src: "https://placehold.co/600x400.png", alt: "Sảnh tiệc 4", hint: "elegant wedding space" },
    ],
    "Trang Trí": [
      { src: "https://placehold.co/600x400.png", alt: "Trang trí 1", hint: "wedding decoration floral" },
      { src: "https://placehold.co/600x400.png", alt: "Trang trí 2", hint: "wedding table setting" },
      { src: "https://placehold.co/600x400.png", alt: "Trang trí 3", hint: "wedding aisle decor" },
      { src: "https://placehold.co/600x400.png", alt: "Trang trí 4", hint: "wedding centerpiece flowers" },
    ],
    "Ẩm Thực": [
      { src: "https://placehold.co/600x400.png", alt: "Ẩm thực 1", hint: "gourmet wedding food" },
      { src: "https://placehold.co/600x400.png", alt: "Ẩm thực 2", hint: "wedding catering plate" },
      { src: "https://placehold.co/600x400.png", alt: "Ẩm thực 3", hint: "wedding appetizers display" },
      { src: "https://placehold.co/600x400.png", alt: "Ẩm thực 4", hint: "fine dining dish" },
    ],
    "Khoảnh Khắc Cưới": [
      { src: "https://placehold.co/600x400.png", alt: "Khoảnh khắc 1", hint: "wedding couple happy" },
      { src: "https://placehold.co/600x400.png", alt: "Khoảnh khắc 2", hint: "bride groom smile" },
      { src: "https://placehold.co/600x400.png", alt: "Khoảnh khắc 3", hint: "wedding ceremony moment" },
      { src: "https://placehold.co/600x400.png", alt: "Khoảnh khắc 4", hint: "wedding dance couple" },
    ],
  };

  const testimonials = [
    {
      quote: "Dịch vụ chuyên nghiệp, sảnh tiệc đẹp hơn cả trong ảnh. Cảm ơn Dream Wedding Deals đã cho chúng tôi một ngày cưới không thể nào quên!",
      name: "Cô dâu Minh Anh & Chú rể Quốc Bảo",
      image: "https://placehold.co/100x100.png",
      hint: "wedding couple portrait"
    },
    {
      quote: "Mọi thứ đều hoàn hảo, từ đồ ăn, trang trí cho tới đội ngũ nhân viên. Chúng tôi rất hài lòng và chắc chắn sẽ giới thiệu cho bạn bè.",
      name: "Cô dâu Thuỳ Linh & Chú rể Hoàng Long",
      image: "https://placehold.co/100x100.png",
      hint: "happy wedding couple"
    },
     {
      quote: "Gói ưu đãi quá tuyệt vời cho một không gian sang trọng như vậy. Vượt xa sự mong đợi của chúng tôi. Cảm ơn nhà hàng rất nhiều!",
      name: "Cô dâu Phương Vy & Chú rể Tuấn Kiệt",
      image: "https://placehold.co/100x100.png",
      hint: "smiling wedding couple"
    }
  ];

  return (
    <div className="bg-background text-foreground">
      <header className="absolute top-0 left-0 w-full z-30 p-4 md:p-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-10 w-10 text-primary" />
          <span className="text-xl font-bold tracking-tight text-white md:text-primary-foreground font-headline">Dream Wedding Deals</span>
        </div>
        <a href="#form-dang-ky">
          <Button variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hidden md:flex">
            Đăng Ký Ngay
          </Button>
        </a>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-full h-full max-w-6xl max-h-4xl flex items-center justify-center">
            <Image
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiAIu5tgiYM_zhuQTWA8rrYVHT7jxZjiX3WL5YZAi3M1dWoMQjw9CTU3ej5NIj1BqWSRrHpFAUP5QlQyR8-PDrkhJFE1rmH8X_eGvl02gJcZW-3mNQp8EMpkqBfFpxsu4IAoTxAaqOLaRlqN7Ascq4i4uGb49IZRq9-MLHIruaFNR_D-E9VpQ3skxiOkMcx/s1920/twh-hero-001.jpg"
              alt="Sảnh tiệc cưới lộng lẫy"
              layout="fill"
              objectFit="cover"
              className="pointer-events-none"
              data-ai-hint="wedding venue interior"
              priority
            />
          </div>
        </div>
        <div className="relative z-20 flex flex-col items-center p-4 max-w-4xl">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold leading-tight drop-shadow-2xl mb-6 tracking-wide">
            Ngày Cưới Hoàn Hảo
          </h1>
          <p className="text-xl md:text-3xl mb-8 max-w-2xl mx-auto drop-shadow-xl font-medium">
            200 khách - Chỉ từ 79 triệu
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="accent"
              size="lg"
              className="text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => setIsChatOpen(true)}
            >
              Tư Vấn Ngay
            </Button>
            <a href="#form-dang-ky">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10">
                Đăng Ký Tham Quan
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="offer" className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ưu Đãi Đặc Biệt: Đám Cưới 200 Khách</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl mx-auto border border-primary/20 shadow-xl">
            <p className="font-headline text-4xl md:text-6xl font-bold text-primary my-4">
              CHỈ VỚI 79.000.000 VNĐ
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Trọn gói ngày chung đôi tại không gian sang trọng bậc nhất Quận 12.
            </p>
            <a href="#form-dang-ky">
              <Button variant="accent" size="lg" className="mt-8 text-lg px-12 py-6 bg-accent text-accent-foreground hover:bg-accent/90">
                ĐĂNG KÝ THAM QUAN NGAY
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 shadow-lg">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Viết Nên Câu Chuyện Tình Yêu Của Riêng Bạn</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mỗi câu chuyện tình yêu đều là một bản tình ca độc nhất. Và ngày cưới chính là chương tuyệt vời nhất, nơi bản tình ca ấy được vang lên rực rỡ. Dream Wedding Deals hiểu rằng bạn đang mong chờ một lễ đường hoàn hảo, một không gian xứng tầm để ghi dấu khoảnh khắc trọng đại. Hãy để chúng tôi cùng bạn viết nên chương đẹp nhất của cuộc đời.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-2xl transform rotate-3"></div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Cặp đôi nắm tay"
                width={600}
                height={400}
                className="relative rounded-lg shadow-xl"
                data-ai-hint="wedding couple hands"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Package Details Section */}
      <section id="package" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Tất Cả Những Gì Bạn Cần Cho Một Đám Cưới Hoàn Hảo</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">Gói Tiệc Cưới 200 Khách Bao Gồm:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 text-left">
            {packageDetails.map((item, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                <CardHeader className="flex flex-col items-start gap-4 p-6">
                   <div className="bg-primary/10 p-3 rounded-full">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-headline font-bold text-xl">{item.title}</h3>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <Button variant="outline" size="lg" className="mt-12 text-lg border-primary text-primary hover:bg-primary/10 rounded-full px-8">XEM THỰC ĐƠN CHI TIẾT</Button>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-secondary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Chìm Đắm Trong Không Gian Sang Trọng</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">Khám phá những khoảnh khắc đẹp nhất tại Dream Wedding Deals</p>
          <Tabs defaultValue="Sảnh Tiệc" className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white/10 backdrop-blur-sm p-1 rounded-full mx-auto max-w-3xl border border-primary/10">
              {Object.keys(gallery).map(tab => (
                <TabsTrigger key={tab} value={tab} className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(gallery).map(([tab, images]) => (
              <TabsContent key={tab} value={tab} className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-2xl shadow-lg aspect-w-1 aspect-h-1 group">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        data-ai-hint={image.hint}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Tasting Section */}
      <section id="tasting" className="py-20 md:py-32 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/10 shadow-lg">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Đừng Chỉ Nhìn, Hãy Đến Và Cảm Nhận</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Trăm nghe không bằng một thấy, trăm thấy không bằng một thử. Dream Wedding Deals trân trọng mời bạn đến tham dự chương trình Ăn Thử Tiệc Miễn Phí để trực tiếp trải nghiệm và cảm nhận hương vị tinh hoa trong từng món ăn sẽ có mặt trong ngày vui của bạn.
              </p>
              <Button variant="accent" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8">TÌM HIỂU VỀ CHƯƠNG TRÌNH ĂN THỬ</Button>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-2xl transform -rotate-3"></div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Món ăn đặc sắc"
                width={600}
                height={400}
                className="relative rounded-lg shadow-xl"
                data-ai-hint="gourmet food steaming"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Những Cặp Đôi Đã Tin Chọn Chúng Tôi</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">Cảm nhận của các cặp đôi đã tổ chức đám cưới tại Dream Wedding Deals</p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm text-center p-8 border border-primary/10 shadow-lg rounded-2xl">
                 <CardContent className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="absolute -inset-2 bg-primary/20 rounded-full"></div>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="relative rounded-full border-2 border-primary"
                      data-ai-hint={testimonial.hint}
                    />
                  </div>
                  <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                  <p className="font-headline font-bold text-primary">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="form-dang-ky" className="py-20 md:py-32 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 md:p-12 shadow-2xl bg-white/10 backdrop-blur-sm border border-primary/10 rounded-2xl">
             <div className="text-center mb-8">
               <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Đừng Bỏ Lỡ Ưu Đãi Tốt Nhất!</h2>
               <p className="text-muted-foreground">Để lại thông tin, đội ngũ tư vấn của chúng tôi sẽ liên hệ với bạn trong 30 phút để sắp xếp lịch tham quan.</p>
             </div>
             <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Tên Cô Dâu & Chú Rể</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: Anh & Bảo" {...field} className="bg-white/10 border-primary/20 focus:border-primary focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground">Số Điện Thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="09xxxxxxxx" {...field} className="bg-white/10 border-primary/20 focus:border-primary focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} className="bg-white/10 border-primary/20 focus:border-primary focus:ring-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={form.control}
                  name="weddingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-primary-foreground">Ngày Cưới Dự Kiến (tùy chọn)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal bg-white/10 border-primary/20 hover:bg-white/20",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Chọn một ngày</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0,0,0,0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                  NHẬN TƯ VẤN & GIỮ ƯU ĐÃI NGAY!
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
           <div className="flex justify-center items-center gap-2 mb-4">
              <Icons.logo className="h-10 w-10 text-primary" />
              <span className="text-xl font-bold tracking-tight text-white font-headline">Dream Wedding Deals</span>
            </div>
            <div className="flex justify-center items-center gap-4 my-4">
              <MapPin className="h-5 w-5 text-primary" />
              <a href="#" className="hover:text-primary">123 Đường ABC, Phường XYZ, Quận 12, TP.HCM</a>
            </div>
            <div className="flex justify-center items-center gap-4 my-4">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:0987654321" className="hover:text-primary">0987 654 321</a>
            </div>
             <div className="flex justify-center gap-6 my-8">
              <a href="#" className="text-secondary-foreground/80 hover:text-primary"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-secondary-foreground/80 hover:text-primary"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-secondary-foreground/80 hover:text-primary"><Youtube className="h-6 w-6" /></a>
            </div>
            <p className="text-sm text-secondary-foreground/60">&copy; {new Date().getFullYear()} Dream Wedding Deals. All rights reserved.</p>
        </div>
      </footer>
      <Chatbot openChat={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
}
