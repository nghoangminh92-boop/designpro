import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Mail,
  Menu,
  MousePointerClick,
  Palette,
  Sparkles,
  X,
} from "lucide-react";
import ShinyText from "./ShinyText";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4";

const links = [
  { label: "Dịch vụ", href: "#services" },
  { label: "Dự án", href: "#work" },
  { label: "Quy trình", href: "#process" },
  { label: "Bảng giá", href: "#pricing" },
];

const services = [
  {
    name: "Trang giới thiệu",
    audience: "Cho chiến dịch và sản phẩm mới",
    description: "Một trang tập trung vào giá trị cốt lõi, giúp khách hàng hiểu nhanh và biết cần làm gì tiếp theo.",
    deliverables: ["Cấu trúc nội dung & lời kêu gọi hành động", "Thiết kế thích ứng đa màn hình", "Biểu mẫu liên hệ"],
  },
  {
    name: "Trang mạng doanh nghiệp",
    audience: "Cho doanh nghiệp vừa và nhỏ, phục vụ khách hàng là doanh nghiệp",
    description: "Trang mạng chỉn chu để giới thiệu năng lực, dịch vụ và tạo sự tin cậy với khách hàng, đối tác.",
    deliverables: ["Cấu trúc 4–8 trang", "Giao diện theo thương hiệu", "Tối ưu máy tính và điện thoại"],
  },
  {
    name: "Thiết kế + lập trình sản phẩm mẫu",
    audience: "Cho công ty khởi nghiệp cần ra mắt bản đầu",
    description: "Thiết kế và xây dựng giao diện sản phẩm để trình bày ý tưởng, chạy thử và tiếp tục phát triển.",
    deliverables: ["Thiết kế trải nghiệm và giao diện", "Giao diện thích ứng đa màn hình", "Bàn giao mã nguồn"],
  },
];

const projects = [
  {
    name: "NovaForge",
    demo: "novaforge",
    category: "Phần mềm dịch vụ · Tự động hóa quy trình",
    headline: "Đơn giản hóa công việc phức tạp.",
    previewDescription: "Kết nối công việc của cả nhóm trong một quy trình rõ ràng.",
    previewCta: "Khám phá nền tảng",
    previewCards: ["Tự động hóa quy trình", "Kết nối đội ngũ"],
    problem: "Công ty phần mềm dịch vụ mới chưa có trang mạng giải thích rõ sản phẩm dành cho ai, giải quyết việc gì và vì sao nên dùng.",
    solution: "Thiết kế bảng điều hành nhóm để tạo, giao người phụ trách, đặt hạn, tìm kiếm, lọc và theo dõi trạng thái công việc.",
    result: "Bản dùng thử cho phép tạo, chỉnh sửa và xóa công việc; cập nhật tiến độ, mức ưu tiên, hạn hoàn thành và xem tỷ lệ hoàn tất. Dữ liệu lưu trên trình duyệt, chưa đồng bộ qua máy chủ.",
    visual: "bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.2),_transparent_45%),linear-gradient(145deg,_#111b2b,_#080d16)]",
    accent: "text-cyan-200",
    badge: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
  },
  {
    name: "Kora Clinic",
    demo: "kora",
    category: "Y tế · Phòng khám",
    headline: "Chăm sóc sức khỏe tận tâm hơn.",
    previewDescription: "Chăm sóc tận tâm, thông tin rõ ràng và dễ tiếp cận.",
    previewCta: "Tìm hiểu dịch vụ",
    previewCards: ["Chuyên khoa", "Đặt lịch khám"],
    problem: "Phòng khám giả định cần tiếp nhận lịch hẹn nhưng khách khó xem dịch vụ, ngày giờ còn trống và lịch đã đặt.",
    solution: "Tạo luồng chọn dịch vụ, chọn ngày giờ, kiểm tra khung giờ đã kín và bảng điều hành để xem, lọc hoặc hủy lịch.",
    result: "Bản dùng thử cho phép tạo lịch, kiểm tra giờ trống và lọc lịch sắp tới/đã hủy. Dữ liệu lưu trên trình duyệt, chưa kết nối hệ thống phòng khám.",
    visual: "bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_45%),linear-gradient(145deg,_#29251d,_#11100e)]",
    accent: "text-amber-200",
    badge: "border-amber-300/30 bg-amber-300/10 text-amber-100",
  },
  {
    name: "Sora Logistics",
    demo: "sora",
    category: "Doanh nghiệp · Vận tải",
    headline: "Cùng doanh nghiệp tiến xa hơn.",
    previewDescription: "Giải pháp vận chuyển linh hoạt cho chuỗi cung ứng của bạn.",
    previewCta: "Trao đổi nhu cầu",
    previewCards: ["Vận tải nội địa", "Giải pháp quốc tế"],
    problem: "Doanh nghiệp vận tải giả định cần tiếp nhận, sắp xếp và theo dõi yêu cầu báo giá theo tuyến và phương thức vận chuyển.",
    solution: "Tạo biểu mẫu yêu cầu, công thức ước tính minh họa và bảng điều hành có tìm kiếm, lọc, mã yêu cầu và trạng thái xử lý.",
    result: "Bản dùng thử cho phép tạo và theo dõi yêu cầu từ lúc tiếp nhận đến hoàn tất. Mức phí chỉ là minh họa; yêu cầu chưa gửi đến nhà vận chuyển.",
    visual: "bg-[radial-gradient(circle_at_top_right,_rgba(167,139,250,0.2),_transparent_45%),linear-gradient(145deg,_#211d30,_#100f18)]",
    accent: "text-violet-200",
    badge: "border-violet-300/30 bg-violet-300/10 text-violet-200",
  },
];

const packages = [
  {
    name: "Trang giới thiệu",
    price: "3,9 triệu",
    description: "Cho doanh nghiệp nhỏ cần trang mạng gọn, triển khai nhanh và giúp khách hàng dễ dàng liên hệ.",
    features: [
      "1 trang giới thiệu tập trung mục tiêu",
      "Thiết kế ưu tiên điện thoại",
      "Biểu mẫu liên hệ + đo lường cơ bản",
      "Tối ưu tốc độ tải trang",
    ],
    highlight: false,
  },
  {
    name: "Trang mạng doanh nghiệp",
    price: "9,9 triệu",
    description: "Giải pháp thương hiệu cho công ty khởi nghiệp và đối tác Nhật Bản muốn trang mạng chuyên nghiệp, đáng tin cậy.",
    features: [
      "4–8 trang nội dung rõ cấu trúc",
      "Nhận diện, màu sắc và bố cục theo thương hiệu",
      "Hỗ trợ chỉnh sửa 1 vòng duyệt",
      "Tương thích máy tính bảng và điện thoại",
    ],
    highlight: true,
  },
  {
    name: "Thiết kế + lập trình sản phẩm mẫu",
    price: "19,9 triệu",
    description: "Dành cho công ty khởi nghiệp cần bản chạy thử nhanh, kiểm chứng ý tưởng và giới thiệu sản phẩm.",
    features: [
      "Thiết kế trải nghiệm + lập trình giao diện",
      "Tích hợp lời kêu gọi hành động và biểu mẫu",
      "Cấu trúc sẵn sàng mở rộng tính năng",
      "Bàn giao và hướng dẫn triển khai",
    ],
    highlight: false,
  },
];

const steps = [
  {
    title: "Khảo sát nhu cầu",
    description: "Hiểu mục tiêu kinh doanh, đối tượng khách hàng, thương hiệu và nội dung cần truyền tải.",
    icon: Briefcase,
  },
  {
    title: "Thiết kế giao diện",
    description: "Xây dựng khung trang, bảng cảm hứng và bản mẫu theo thương hiệu cùng hành vi người dùng.",
    icon: Palette,
  },
  {
    title: "Duyệt và chỉnh sửa",
    description: "Khách hàng xem trước mẫu, góp ý và xác nhận trước khi chuyển sang giai đoạn lập trình.",
    icon: MousePointerClick,
  },
  {
    title: "Lập trình và bàn giao",
    description: "Lập trình giao diện, tối ưu tốc độ, kiểm tra trên nhiều thiết bị và bàn giao đầy đủ tài liệu.",
    icon: Sparkles,
  },
];

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#070b12] text-white">
      <section className="relative overflow-hidden bg-[#070b12] font-sans">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(100,206,251,0.22),_transparent_35%),linear-gradient(to_bottom,_rgba(7,11,18,0.7),_rgba(7,11,18,0.95))]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between py-6">
            <a href="#" className="flex items-center gap-2.5 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/5">
                <span className="h-3 w-3 rounded-full bg-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight">DesignPro</span>
            </a>

            <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-sm lg:flex">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                >
                  Liên hệ <ArrowUpRight className="h-4 w-4" />
                </a>
              </li>
            </ul>

            <button
              className="text-white transition-colors hover:text-white/80 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {open && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#070b12]/90 p-3 backdrop-blur-lg lg:hidden">
                {[
                  ...links,
                  { label: "Liên hệ", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block rounded-lg px-4 py-2.5 text-sm text-slate-200 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </nav>

          <div className="mt-6 grid grid-cols-1 gap-8 pb-12 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-10 lg:pb-20 lg:pt-16">
            <div>
              <p className="mb-5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-200">
                Thiết kế trang mạng cho doanh nghiệp vừa và nhỏ
              </p>

              <h1 className="max-w-4xl text-5xl leading-[0.9] tracking-[-0.07em] text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
                <span className="block font-medium text-slate-100">Tạo dựng dấu ấn</span>
                <ShinyText
                  text="trên môi trường số."
                  className="mt-2 block font-medium"
                  color="#7dd3fc"
                  shineColor="#ffffff"
                  speed={3}
                  spread={120}
                />
              </h1>

              <p className="mt-6 max-w-xl text-base text-slate-200 md:text-lg">
                Thiết kế trang mạng cho doanh nghiệp nhỏ, công ty khởi nghiệp và đối tác Nhật Bản —
                sạch, chuyên nghiệp, dễ tin, và sẵn sàng chuyển đổi khách hàng ngay từ lần đầu tiên truy cập.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#pricing"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#dfe7ef] px-6 py-3.5 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02]"
                >
                  Xem gói dịch vụ
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#process"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Quy trình làm việc
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-700/80 bg-[#0d1321]/80 p-5 shadow-[0_0_40px_rgba(125,211,252,0.12)] backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                <span className="text-sm text-slate-300">Năng lực triển khai</span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-200">
                  Thiết kế + lập trình
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm text-slate-400">Trang giới thiệu</p>
                  <div className="mt-2 h-2.5 rounded-full bg-white/10">
                    <div className="h-2.5 w-[82%] rounded-full bg-cyan-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Trang mạng doanh nghiệp</p>
                  <div className="mt-2 h-2.5 rounded-full bg-white/10">
                    <div className="h-2.5 w-[72%] rounded-full bg-indigo-400" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Sản phẩm mẫu khởi nghiệp</p>
                  <div className="mt-2 h-2.5 rounded-full bg-white/10">
                    <div className="h-2.5 w-[91%] rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Cách chúng tôi làm việc</p>
                <p className="mt-2 text-base text-white">
                  Rõ mục tiêu, rõ phạm vi, giao diện nhất quán với thương hiệu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="border-t border-slate-800 bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Dịch vụ</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Dịch vụ theo đúng giai đoạn phát triển
            </h2>
            <p className="mt-4 text-slate-300">
              Từ trang giới thiệu gọn nhẹ đến giao diện sản phẩm đầu tiên cho công ty khởi nghiệp.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service.name} className="rounded-[28px] border border-slate-700 bg-white/[0.02] p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    {index === 0 ? <MousePointerClick className="h-5 w-5" /> : index === 1 ? <Briefcase className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{service.name}</h3>
                <p className="mt-1 text-sm text-cyan-200">{service.audience}</p>
                <p className="mt-4 min-h-20 text-sm leading-6 text-slate-300">{service.description}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-700 pt-5">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="h-4 w-4 text-emerald-300" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="border-t border-slate-800 bg-[#070b12]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Dự án mẫu</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Ba bài toán, ba hướng giải quyết
            </h2>
            <p className="mt-4 text-slate-300">
              Ba sản phẩm mẫu do studio tự xây dựng để minh họa trải nghiệm; không đại diện cho khách hàng thật.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {projects.map((project, index) => (
              <article key={project.name} className="overflow-hidden rounded-[28px] border border-slate-700 bg-white/[0.02]">
                <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
                  <div className={`p-5 sm:p-7 ${project.visual}`}>
                    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#f6f7f8] text-slate-900 shadow-2xl">
                      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-white px-4 py-3">
                        <span className="h-2 w-2 rounded-full bg-rose-300" />
                        <span className="h-2 w-2 rounded-full bg-amber-300" />
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        <span className="ml-3 flex-1 rounded-md bg-slate-100 px-3 py-1 text-[9px] text-slate-400">
                          {project.name.toLowerCase().replace(/\s/g, "")}.mau
                        </span>
                      </div>
                      <div className="p-5 sm:p-7">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[10px] font-bold tracking-[0.15em] text-slate-800">
                            {project.name.toUpperCase()}
                          </span>
                          <div className="hidden items-center gap-3 text-[8px] text-slate-500 sm:flex">
                            <span>Giới thiệu</span>
                            <span>Dịch vụ</span>
                            <span>Liên hệ</span>
                          </div>
                          <span className={`rounded-full border px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] ${project.badge}`}>
                            Bản mẫu
                          </span>
                        </div>

                        <div className="mt-7 grid gap-5 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
                          <div>
                            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                              {project.category}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                              {project.headline}
                            </h3>
                            <p className="mt-2 max-w-xs text-[10px] leading-4 text-slate-500">
                              {project.previewDescription}
                            </p>
                            <a
                              href={`./?demo=${project.demo}`}
                              className="mt-4 inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-2 text-[9px] font-medium text-white transition hover:bg-slate-700"
                            >
                              Trải nghiệm sản phẩm <ArrowRight className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="grid grid-cols-2 gap-2" aria-hidden="true">
                            {project.previewCards.map((card, cardIndex) => (
                              <div
                                key={card}
                                className={`flex min-h-20 flex-col justify-between rounded-xl p-3 ${
                                  cardIndex === 0 ? "bg-slate-200" : "bg-white shadow-sm"
                                }`}
                              >
                                <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${project.badge}`}>
                                  <Sparkles className="h-3 w-3" />
                                </span>
                                <span className="text-[8px] font-medium leading-3 text-slate-600">{card}</span>
                              </div>
                            ))}
                            <div className="col-span-2 h-2 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className={`h-full w-2/3 rounded-full ${
                                  index === 0 ? "bg-cyan-400" : index === 1 ? "bg-amber-400" : "bg-violet-400"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">
                      Bản xem trước giao diện · Dự án mẫu
                    </p>
                  </div>

                  <div className="grid gap-7 p-7 sm:p-9 md:grid-cols-3">
                    {[
                      { title: "Vấn đề", text: project.problem },
                      { title: "Giải pháp", text: project.solution },
                      { title: "Kết quả hiển thị", text: project.result },
                    ].map((item) => (
                      <div key={item.title}>
                        <p className={`text-xs font-medium uppercase tracking-[0.18em] ${project.accent}`}>{item.title}</p>
                        <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-700 bg-white/[0.02] px-7 py-4 sm:px-9">
                  <p className="text-xs text-slate-400">
                    {project.previewCta} · Bản dùng thử tương tác ngay trên trình duyệt
                  </p>
                  <a
                    href={`./?demo=${project.demo}`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
                  >
                    Mở sản phẩm mẫu <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="border-t border-slate-700 px-7 py-4 sm:px-9">
                  <p className="text-xs leading-5 text-slate-500">
                    Sản phẩm mẫu {index + 1} · Không phải khách hàng thật · Bản dùng thử chưa kết nối máy chủ
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-slate-800 bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Quy trình</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              Quy trình làm việc đơn giản, minh bạch
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-[28px] border border-slate-700 bg-white/[0.02] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">0{index + 1}</span>
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Bảng giá</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Gói dịch vụ rõ ràng, dễ chọn
          </h2>
          <p className="mt-4 text-slate-300">
            Mỗi gói được xây dựng để phù hợp một mục tiêu cụ thể — từ ra mắt nhanh đến thiết kế thương hiệu toàn diện.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.name}
              className={`rounded-[28px] border p-6 shadow-lg transition-transform hover:-translate-y-1 ${
                item.highlight
                  ? "border-cyan-400/40 bg-cyan-400/5 shadow-cyan-500/10"
                  : "border-slate-700 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white">{item.name}</p>
                {item.highlight && (
                  <span className="rounded-full bg-cyan-400/15 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-cyan-200">
                    Được chọn nhiều
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold tracking-tight text-white">{item.price}</span>
                <span className="pb-1 text-sm text-slate-400">/ gói</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">{item.description}</p>

              <ul className="mt-6 space-y-3">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                  item.highlight
                    ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                    : "bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Chọn gói này <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-slate-800 bg-[#070b12]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-700 bg-[linear-gradient(135deg,_rgba(14,20,31,0.9),_rgba(9,14,24,0.98))] p-8 shadow-[0_0_40px_rgba(14,165,233,0.12)] md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Liên hệ</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Tư vấn trang mạng phù hợp với mục tiêu kinh doanh của bạn
                </h2>
                <p className="mt-4 max-w-xl text-slate-300">
                  Nếu bạn đang cần một trang mạng đẹp, chuyên nghiệp và dễ triển khai, hãy để chúng tôi
                  cùng bạn định hình giải pháp phù hợp nhất.
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-700 bg-slate-950/70 p-5">
                <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-white/5 p-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Địa chỉ thư điện tử</p>
                    <p className="text-sm font-medium text-white">hello@designpro.vn</p>
                  </div>
                </div>

                <a
                  href="mailto:hello@designpro.vn"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-400 px-5 py-3.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-300"
                >
                  Gửi yêu cầu tư vấn <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
