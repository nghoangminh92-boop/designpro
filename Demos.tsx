import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  CalendarClock,
  Download,
  Package,
  Pencil,
  Plus,
  Route,
  Search,
  Sparkles,
  Stethoscope,
  Trash2,
  Truck,
  Workflow,
} from "lucide-react";

type DemoId = "novaforge" | "kora" | "sora";
type TaskStatus = "Cần làm" | "Đang làm" | "Hoàn tất";

type Task = {
  id: number;
  title: string;
  owner: string;
  details?: string;
  status: TaskStatus;
  priority: "Ưu tiên cao" | "Bình thường";
  dueDate?: string;
};

type Appointment = {
  id: number;
  patient: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "Đã xác nhận" | "Đã hủy" | "Đã hoàn tất";
};

type QuoteStatus = "Mới tiếp nhận" | "Đang xử lý" | "Đã báo giá" | "Đã hoàn tất";

type QuoteRequest = {
  id: number;
  company: string;
  contact: string;
  email: string;
  origin: string;
  destination: string;
  mode: string;
  weight: number;
  estimate: number;
  status: QuoteStatus;
};

const seedTasks: Task[] = [
  { id: 1, title: "Chuẩn bị nội dung ra mắt", owner: "Minh Anh", status: "Đang làm", priority: "Ưu tiên cao" },
  { id: 2, title: "Duyệt giao diện trang sản phẩm", owner: "Quang", status: "Cần làm", priority: "Bình thường" },
  { id: 3, title: "Kiểm tra quy trình hướng dẫn người dùng mới", owner: "Linh", status: "Hoàn tất", priority: "Ưu tiên cao" },
  { id: 4, title: "Gửi bản dùng thử cho nhóm", owner: "Minh Anh", status: "Cần làm", priority: "Bình thường" },
];

const seedAppointments: Appointment[] = [
  { id: 1, patient: "Nguyễn Minh Anh", phone: "0900 123 456", service: "Khám tổng quát", date: today(), time: "14:00", status: "Đã xác nhận" },
];

const timeSlots = ["09:00", "10:00", "11:00", "13:30", "14:00", "15:00", "16:00"];
const services = [
  { name: "Khám tổng quát", detail: "Khám sức khỏe tổng quát", price: "Từ 350.000đ" },
  { name: "Tư vấn chuyên khoa", detail: "Tư vấn cùng bác sĩ chuyên khoa", price: "Từ 500.000đ" },
  { name: "Kiểm tra sức khỏe", detail: "Gói kiểm tra theo nhu cầu", price: "Từ 800.000đ" },
];

function today() {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number>>) {
  const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (!saved) return initial;
    try {
      return JSON.parse(saved) as T;
    } catch (error) {
      console.error(`Không thể đọc dữ liệu bản mẫu "${key}" từ trình duyệt.`, error);
      return initial;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function DemoShell({
  id,
  name,
  category,
  description,
  children,
}: {
  id: DemoId;
  name: string;
  category: string;
  description: string;
  children: ReactNode;
}) {
  const colors: Record<DemoId, string> = {
    novaforge: "from-cyan-500/20",
    kora: "from-amber-500/20",
    sora: "from-violet-500/20",
  };

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <header className={`border-b border-slate-200 bg-gradient-to-r ${colors[id]} to-white`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            Về hồ sơ năng lực
          </a>
          <span className="rounded-full border border-slate-300 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-600">
            Bản dùng thử tương tác · Dữ liệu lưu trên thiết bị
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-200/70 px-3 py-2 text-xs leading-5 text-slate-600">
            <Sparkles className="h-4 w-4 shrink-0" />
            Đây là sản phẩm mẫu tương tác. Thao tác chưa gửi dữ liệu lên máy chủ.
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}

function Metric({ label, value, icon }: { label: string; value: number; icon: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between text-slate-500">
        <span className="text-sm">{label}</span>
        {icon}
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function NovaForgeDemo() {
  const [tasks, setTasks] = useStoredState<Task[]>("designpro-demo-novaforge-tasks", seedTasks);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [details, setDetails] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Bình thường");
  const [dueDate, setDueDate] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Tất cả" | TaskStatus | "Quá hạn">("Tất cả");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [notice, setNotice] = useState("");

  const completedCount = tasks.filter((task) => task.status === "Hoàn tất").length;
  const overdueCount = tasks.filter(
    (task) => task.status !== "Hoàn tất" && task.dueDate && task.dueDate < today(),
  ).length;
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);
  const normalizedQuery = query.trim().toLocaleLowerCase("vi");
  const visibleTasks = tasks
    .filter((task) => {
      const matchesStatus =
        statusFilter === "Tất cả" ||
        (statusFilter === "Quá hạn"
          ? task.status !== "Hoàn tất" && Boolean(task.dueDate && task.dueDate < today())
          : task.status === statusFilter);
      const matchesQuery =
        !normalizedQuery ||
        [task.title, task.owner, task.details ?? "", task.priority]
          .some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
      return matchesStatus && matchesQuery;
    })
    .sort((a, b) => {
      if (!a.dueDate) return b.dueDate ? 1 : 0;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });

  function resetForm() {
    setTitle("");
    setOwner("");
    setDetails("");
    setPriority("Bình thường");
    setDueDate("");
    setEditingId(null);
  }

  function saveTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const taskTitle = title.trim();
    const taskOwner = owner.trim();
    if (!taskTitle || !taskOwner) return;
    if (editingId !== null) {
      setTasks((current) =>
        current.map((task) =>
          task.id === editingId
            ? { ...task, title: taskTitle, owner: taskOwner, details: details.trim(), priority, dueDate }
            : task,
        ),
      );
      setNotice("Đã lưu thay đổi công việc.");
    } else {
      setTasks((current) => [
        {
          id: Date.now(),
          title: taskTitle,
          owner: taskOwner,
          details: details.trim(),
          status: "Cần làm",
          priority,
          dueDate,
        },
        ...current,
      ]);
      setNotice("Đã thêm công việc mới vào bảng điều hành.");
    }
    resetForm();
  }

  function updateStatus(id: number, status: TaskStatus) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
    setNotice("Đã cập nhật trạng thái công việc.");
  }

  function editTask(task: Task) {
    setEditingId(task.id);
    setTitle(task.title);
    setOwner(task.owner);
    setDetails(task.details ?? "");
    setPriority(task.priority);
    setDueDate(task.dueDate ?? "");
    setNotice("");
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
    if (editingId === id) resetForm();
    setNotice("Đã xóa công việc.");
  }

  return (
    <DemoShell
      id="novaforge"
      name="NovaForge"
      category="Phần mềm dịch vụ · Quản lý quy trình"
      description="Bảng điều hành nhóm để tạo công việc, giao người phụ trách, đặt hạn hoàn thành và theo dõi tiến độ."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Tổng công việc" value={tasks.length} icon={<ClipboardList className="h-5 w-5" />} />
        <Metric label="Đang thực hiện" value={tasks.filter((task) => task.status === "Đang làm").length} icon={<Workflow className="h-5 w-5" />} />
        <Metric label="Đã hoàn tất" value={completedCount} icon={<Check className="h-5 w-5" />} />
        <Metric label="Quá hạn" value={overdueCount} icon={<CalendarClock className="h-5 w-5" />} />
      </div>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold">Tiến độ dự án</h2>
            <p className="mt-1 text-xs text-slate-500">{completedCount} / {tasks.length} công việc đã hoàn tất</p>
          </div>
          <span className="text-sm font-semibold text-cyan-800">{progress}%</span>
        </div>
        <div
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Tiến độ hoàn thành công việc"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="h-full rounded-full bg-cyan-600 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-800">
              {editingId === null ? <Plus className="h-5 w-5" /> : <Pencil className="h-5 w-5" />}
            </span>
            <div>
              <h2 className="font-semibold">{editingId === null ? "Tạo công việc" : "Chỉnh sửa công việc"}</h2>
              <p className="text-xs text-slate-500">{editingId === null ? "Thêm việc vào bảng điều hành" : "Cập nhật thông tin công việc"}</p>
            </div>
          </div>
          <form onSubmit={saveTask} className="mt-5 space-y-4">
            <label className="block text-sm font-medium">
              Tên công việc
              <input
                required
                maxLength={100}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ví dụ: Chuẩn bị nội dung ra mắt"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <label className="block text-sm font-medium">
              Người phụ trách
              <input
                required
                maxLength={60}
                value={owner}
                onChange={(event) => setOwner(event.target.value)}
                placeholder="Tên thành viên"
                className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <label className="block text-sm font-medium">
              Mô tả
              <textarea
                maxLength={300}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                rows={3}
                placeholder="Ghi chú ngắn về việc cần làm"
                className="mt-1.5 w-full resize-y rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Mức ưu tiên
                <select value={priority} onChange={(event) => setPriority(event.target.value as Task["priority"])} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal">
                  <option>Bình thường</option>
                  <option>Ưu tiên cao</option>
                </select>
              </label>
              <label className="block text-sm font-medium">
                Hạn hoàn thành
                <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal" />
              </label>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                {editingId === null ? <Plus className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                {editingId === null ? "Thêm công việc" : "Lưu thay đổi"}
              </button>
              {editingId !== null && (
                <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Hủy
                </button>
              )}
            </div>
          </form>
          {notice && <p role="status" className="mt-3 text-sm text-emerald-700">{notice}</p>}
          <p className="mt-4 text-xs leading-5 text-slate-500">Dữ liệu chỉ lưu trong trình duyệt hiện tại, chưa đồng bộ giữa các thiết bị.</p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Bảng điều hành · Ra mắt sản phẩm</h2>
              <p className="mt-1 text-xs text-slate-500">Tìm kiếm, lọc, phân công và cập nhật trạng thái</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadCsv("novaforge-cong-viec.csv", ["Công việc", "Người phụ trách", "Mô tả", "Trạng thái", "Ưu tiên", "Hạn hoàn thành"], tasks.map((task) => [task.title, task.owner, task.details ?? "", task.status, task.priority, task.dueDate ?? ""]))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" /> Xuất CSV
              </button>
              <select
                aria-label="Lọc công việc theo trạng thái"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as "Tất cả" | TaskStatus | "Quá hạn")}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
              >
                {["Tất cả", "Cần làm", "Đang làm", "Hoàn tất", "Quá hạn"].map((status) => <option key={status}>{status}</option>)}
              </select>
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo công việc, người phụ trách..." className="w-full border-0 py-2.5 text-sm outline-none focus:ring-0" />
          </label>
          <div className="mt-2 divide-y divide-slate-100">
            {visibleTasks.map((task) => {
              const overdue = task.status !== "Hoàn tất" && Boolean(task.dueDate && task.dueDate < today());
              return (
                <article key={task.id} className="py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className={`font-medium ${task.status === "Hoàn tất" ? "text-slate-400 line-through" : "text-slate-900"}`}>{task.title}</p>
                        {task.priority === "Ưu tiên cao" && <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700">Ưu tiên cao</span>}
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{task.owner}</p>
                      {task.details && <p className="mt-2 text-sm leading-5 text-slate-600">{task.details}</p>}
                      {task.dueDate && (
                        <p className={`mt-2 inline-flex items-center gap-1.5 text-xs ${overdue ? "font-medium text-rose-700" : "text-slate-500"}`}>
                          <CalendarDays className="h-3.5 w-3.5" />{overdue ? "Quá hạn · " : "Hạn · "}{task.dueDate}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <select
                        aria-label={`Trạng thái: ${task.title}`}
                        value={task.status}
                        onChange={(event) => updateStatus(task.id, event.target.value as TaskStatus)}
                        className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium"
                      >
                        {(["Cần làm", "Đang làm", "Hoàn tất"] as TaskStatus[]).map((status) => <option key={status}>{status}</option>)}
                      </select>
                      <button type="button" aria-label={`Chỉnh sửa ${task.title}`} onClick={() => editTask(task)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" aria-label={`Xóa ${task.title}`} onClick={() => deleteTask(task.id)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
            {visibleTasks.length === 0 && <p className="py-8 text-center text-sm text-slate-500">Không tìm thấy công việc phù hợp.</p>}
          </div>
        </section>
      </div>
    </DemoShell>
  );
}

function KoraClinicDemo() {
  const [appointments, setAppointments] = useStoredState<Appointment[]>("designpro-demo-kora-appointments", seedAppointments);
  const [patient, setPatient] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0].name);
  const [date, setDate] = useState(today());
  const [time, setTime] = useState(timeSlots[0]);
  const [appointmentFilter, setAppointmentFilter] = useState<"Tất cả" | "Sắp tới" | "Đã hủy" | "Đã hoàn tất">("Tất cả");
  const [appointmentQuery, setAppointmentQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const normalizedAppointments = appointments.map((item) => ({
    ...item,
    status: item.status ?? "Đã xác nhận",
  }));
  const activeAppointments = normalizedAppointments.filter((item) => item.status === "Đã xác nhận");
  const bookedSlots = new Set(activeAppointments.filter((item) => item.date === date).map((item) => item.time));
  const normalizedAppointmentQuery = appointmentQuery.trim().toLocaleLowerCase("vi");
  const visibleAppointments = normalizedAppointments
    .filter((item) => {
      const matchesStatus =
        appointmentFilter === "Tất cả" ||
        (appointmentFilter === "Sắp tới"
          ? item.status === "Đã xác nhận" && item.date >= today()
          : item.status === appointmentFilter);
      const matchesQuery =
        !normalizedAppointmentQuery ||
        [item.patient, item.phone, item.service].some((value) =>
          value.toLocaleLowerCase("vi").includes(normalizedAppointmentQuery),
        );
      return matchesStatus && matchesQuery;
    })
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  useEffect(() => {
    if (appointments.some((item) => !item.status)) {
      setAppointments(normalizedAppointments);
    }
  }, [appointments, normalizedAppointments, setAppointments]);

  function bookAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (date < today()) {
      setError("Không thể đặt lịch vào ngày đã qua.");
      return;
    }
    if (date === today() && time <= new Date().toTimeString().slice(0, 5)) {
      setError("Giờ đã qua. Vui lòng chọn khung giờ khác.");
      return;
    }
    if (normalizedAppointments.some((item) => item.status === "Đã xác nhận" && item.date === date && item.time === time)) {
      setError("Khung giờ này đã có lịch. Vui lòng chọn giờ khác.");
      return;
    }
    setAppointments((current) => [
      { id: Date.now(), patient: patient.trim(), phone: phone.trim(), service, date, time, status: "Đã xác nhận" },
      ...current,
    ]);
    setPatient("");
    setPhone("");
    setNotice("Đã đặt lịch thành công trên bản dùng thử.");
  }

  return (
    <DemoShell
      id="kora"
      name="Kora Clinic"
      category="Y tế · Đặt lịch phòng khám"
      description="Trang đặt lịch cho khách và bảng theo dõi lịch của phòng khám; có kiểm tra giờ trống, tìm kiếm, lọc và cập nhật kết quả khám."
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Metric label="Tổng lịch" value={normalizedAppointments.length} icon={<CalendarDays className="h-5 w-5" />} />
        <Metric label="Lịch đã xác nhận" value={activeAppointments.length} icon={<Check className="h-5 w-5" />} />
        <Metric label="Khung giờ trống hôm nay" value={timeSlots.filter((slot) => !activeAppointments.some((item) => item.date === today() && item.time === slot) && slot > new Date().toTimeString().slice(0, 5)).length} icon={<Clock3 className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
              <Stethoscope className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Đặt lịch khám</h2>
              <p className="text-sm text-slate-500">Chọn dịch vụ và khung giờ phù hợp</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {services.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setService(item.name)}
                className={`rounded-xl border p-3 text-left transition ${
                  service === item.name ? "border-amber-500 bg-amber-50 ring-2 ring-amber-100" : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <span className="block text-sm font-semibold">{item.name}</span>
                <span className="mt-1 block text-xs leading-4 text-slate-500">{item.detail}</span>
                <span className="mt-3 block text-[10px] font-medium text-amber-800">{item.price}</span>
              </button>
            ))}
          </div>

          <form onSubmit={bookAppointment} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium sm:col-span-2">
              Họ và tên
              <input required maxLength={100} value={patient} onChange={(event) => setPatient(event.target.value)} placeholder="Tên người đi khám" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100" />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Số điện thoại
              <input required type="tel" maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="0900 000 000" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100" />
            </label>
            <label className="text-sm font-medium">
              Ngày khám
              <input required type="date" min={today()} value={date} onChange={(event) => setDate(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-100" />
            </label>
            <label className="text-sm font-medium">
              Giờ khám
              <select value={time} onChange={(event) => setTime(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal">
                {timeSlots.map((slot) => (
                  <option
                    key={slot}
                    value={slot}
                    disabled={bookedSlots.has(slot) || (date === today() && slot <= new Date().toTimeString().slice(0, 5))}
                  >
                    {slot}{bookedSlots.has(slot) ? " · Đã kín" : ""}
                  </option>
                ))}
              </select>
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:col-span-2">
              Xác nhận lịch hẹn <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {error && <p role="alert" className="mt-3 text-sm text-rose-700">{error}</p>}
          {notice && <p role="status" className="mt-3 text-sm text-emerald-700">{notice}</p>}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Bảng lịch phòng khám</h2>
              <p className="mt-1 text-sm text-slate-500">{normalizedAppointments.length} lịch trên thiết bị này</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadCsv("kora-lich-hen.csv", ["Khách hàng", "Số điện thoại", "Dịch vụ", "Ngày", "Giờ", "Trạng thái"], normalizedAppointments.map((item) => [item.patient, item.phone, item.service, item.date, item.time, item.status]))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" /> Xuất CSV
              </button>
              <select
                aria-label="Lọc lịch hẹn"
                value={appointmentFilter}
                onChange={(event) => setAppointmentFilter(event.target.value as "Tất cả" | "Sắp tới" | "Đã hủy" | "Đã hoàn tất")}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
              >
                {["Tất cả", "Sắp tới", "Đã hủy", "Đã hoàn tất"].map((filter) => <option key={filter}>{filter}</option>)}
              </select>
            </div>
          </div>
          <label className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 px-3">
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
            <input value={appointmentQuery} onChange={(event) => setAppointmentQuery(event.target.value)} placeholder="Tìm theo tên, số điện thoại, dịch vụ..." className="w-full border-0 py-2.5 text-sm outline-none focus:ring-0" />
          </label>
          <div className="mt-5 space-y-3">
            {visibleAppointments.map((item) => (
              <article key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{item.patient}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${item.status === "Đã xác nhận" ? "bg-emerald-50 text-emerald-700" : item.status === "Đã hoàn tất" ? "bg-cyan-50 text-cyan-700" : "bg-slate-100 text-slate-500"}`}>{item.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{item.phone} · {item.service}</p>
                  </div>
                  {item.status === "Đã xác nhận" && (
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAppointments((current) => current.map((appointment) => appointment.id === item.id ? { ...appointment, status: "Đã hoàn tất" } : appointment));
                          setNotice("Đã đánh dấu lịch khám hoàn tất.");
                        }}
                        className="text-xs font-medium text-cyan-800 hover:underline"
                      >
                        Hoàn tất khám
                      </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAppointments((current) => current.map((appointment) => appointment.id === item.id ? { ...appointment, status: "Đã hủy" } : appointment));
                        setNotice("Đã hủy lịch hẹn mẫu.");
                      }}
                      className="text-xs font-medium text-rose-700 hover:underline"
                    >
                      Hủy lịch
                    </button>
                    </div>
                  )}
                </div>
                <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
                  <Clock3 className="h-4 w-4" /> {item.date} · {item.time}
                </p>
              </article>
            ))}
            {visibleAppointments.length === 0 && <p className="py-8 text-center text-sm text-slate-500">Không tìm thấy lịch hẹn phù hợp.</p>}
          </div>
        </section>
      </div>
    </DemoShell>
  );
}

function SoraLogisticsDemo() {
  const [requests, setRequests] = useStoredState<QuoteRequest[]>("designpro-demo-sora-quotes", []);
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [mode, setMode] = useState("Đường bộ");
  const [weight, setWeight] = useState("100");
  const [requestQuery, setRequestQuery] = useState("");
  const [requestFilter, setRequestFilter] = useState<"Tất cả" | QuoteStatus>("Tất cả");
  const [notice, setNotice] = useState("");

  const modePricing: Record<string, { base: number; perKg: number }> = {
    "Đường bộ": { base: 450_000, perKg: 18_000 },
    "Đường hàng không": { base: 1_500_000, perKg: 90_000 },
    "Đường biển": { base: 900_000, perKg: 12_000 },
  };
  const estimate = Math.round(modePricing[mode].base + (Number(weight) || 0) * modePricing[mode].perKg);
  const currency = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 });
  const normalizedRequests = requests.map((request) => ({
    ...request,
    status: request.status ?? "Mới tiếp nhận",
  }));
  const normalizedQuery = requestQuery.trim().toLocaleLowerCase("vi");
  const visibleRequests = normalizedRequests.filter((request) => {
    const matchesStatus = requestFilter === "Tất cả" || request.status === requestFilter;
    const matchesQuery =
      !normalizedQuery ||
      [request.company, request.contact, request.email, request.origin, request.destination]
        .some((value) => value.toLocaleLowerCase("vi").includes(normalizedQuery));
    return matchesStatus && matchesQuery;
  });

  useEffect(() => {
    if (requests.some((request) => !request.status)) {
      setRequests(normalizedRequests);
    }
  }, [requests, normalizedRequests, setRequests]);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequests((current) => [
      {
        id: Date.now(),
        company: company.trim(),
        contact: contact.trim(),
        email: email.trim(),
        origin: origin.trim(),
        destination: destination.trim(),
        mode,
        weight: Number(weight),
        estimate,
        status: "Mới tiếp nhận",
      },
      ...current,
    ]);
    setCompany("");
    setContact("");
    setEmail("");
    setOrigin("");
    setDestination("");
    setNotice("Đã lưu yêu cầu báo giá mẫu trên thiết bị này.");
  }

  function updateRequestStatus(id: number, status: QuoteStatus) {
    setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request));
    setNotice("Đã cập nhật trạng thái yêu cầu.");
  }

  return (
    <DemoShell
      id="sora"
      name="Sora Logistics"
      category="Vận tải · Yêu cầu báo giá"
      description="Tạo yêu cầu báo giá theo tuyến và khối lượng; theo dõi trạng thái xử lý trong bảng điều hành vận tải."
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Tổng yêu cầu" value={normalizedRequests.length} icon={<Package className="h-5 w-5" />} />
        <Metric label="Mới tiếp nhận" value={normalizedRequests.filter((request) => request.status === "Mới tiếp nhận").length} icon={<ClipboardList className="h-5 w-5" />} />
        <Metric label="Đang xử lý" value={normalizedRequests.filter((request) => request.status === "Đang xử lý").length} icon={<Truck className="h-5 w-5" />} />
        <Metric label="Đã hoàn tất" value={normalizedRequests.filter((request) => request.status === "Đã hoàn tất").length} icon={<Check className="h-5 w-5" />} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-800">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Yêu cầu báo giá</h2>
              <p className="text-sm text-slate-500">Nhập thông tin lô hàng để xem ước tính minh họa</p>
            </div>
          </div>

          <form onSubmit={submitRequest} className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Tên doanh nghiệp
              <input required maxLength={100} value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Công ty của bạn" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="text-sm font-medium">
              Người liên hệ
              <input required maxLength={100} value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Họ và tên" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="text-sm font-medium sm:col-span-2">
              Địa chỉ thư điện tử
              <input required type="email" maxLength={150} value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ten@congty.vn" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="text-sm font-medium">
              Điểm gửi
              <input required maxLength={100} value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Thành phố / cảng gửi" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="text-sm font-medium">
              Điểm nhận
              <input required maxLength={100} value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Thành phố / cảng nhận" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100" />
            </label>
            <label className="text-sm font-medium">
              Phương thức
              <select value={mode} onChange={(event) => setMode(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal">
                {Object.keys(modePricing).map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium">
              Khối lượng (kg)
              <input required type="number" min="1" max="100000" value={weight} onChange={(event) => setWeight(event.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-100" />
            </label>
            <div className="rounded-xl bg-violet-50 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-violet-950">
                  <CircleDollarSign className="h-4 w-4" /> Ước tính minh họa
                </span>
                <span className="text-lg font-semibold text-violet-950">{currency.format(estimate)}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-violet-800">Đây là ước tính minh họa theo công thức mẫu, không phải báo giá vận chuyển thực tế.</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:col-span-2">
              Lưu yêu cầu báo giá <ArrowRight className="h-4 w-4" />
            </button>
          </form>
          {notice && <p role="status" className="mt-3 text-sm text-emerald-700">{notice}</p>}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Bảng điều hành yêu cầu</h2>
              <p className="mt-1 text-sm text-slate-500">{normalizedRequests.length} yêu cầu trên thiết bị này</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => downloadCsv("sora-yeu-cau-bao-gia.csv", ["Mã yêu cầu", "Doanh nghiệp", "Người liên hệ", "Thư điện tử", "Điểm gửi", "Điểm nhận", "Phương thức", "Khối lượng (kg)", "Ước tính minh họa (VND)", "Trạng thái"], normalizedRequests.map((request) => [request.id, request.company, request.contact, request.email, request.origin, request.destination, request.mode, request.weight, request.estimate, request.status]))}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Download className="h-4 w-4" /> Xuất CSV
              </button>
              <Route className="h-5 w-5 text-violet-700" />
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
              <Search className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                value={requestQuery}
                onChange={(event) => setRequestQuery(event.target.value)}
                placeholder="Tìm doanh nghiệp, tuyến..."
                className="w-full border-0 py-2.5 text-sm outline-none focus:ring-0"
              />
            </label>
            <select
              aria-label="Lọc yêu cầu theo trạng thái"
              value={requestFilter}
              onChange={(event) => setRequestFilter(event.target.value as "Tất cả" | QuoteStatus)}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              {["Tất cả", "Mới tiếp nhận", "Đang xử lý", "Đã báo giá", "Đã hoàn tất"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </div>
          <div className="mt-5 space-y-3">
            {visibleRequests.map((request) => (
              <article key={request.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{request.company}</h3>
                    <p className="mt-1 text-xs text-slate-500">{request.contact} · {request.email}</p>
                  </div>
                  <span className="rounded-full bg-violet-50 px-2 py-1 text-[10px] font-medium text-violet-800">
                    Mã {String(request.id).slice(-6)}
                  </span>
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-xs text-slate-600">
                  <Package className="h-4 w-4" /> {request.origin} → {request.destination}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                  <span className="text-slate-500">{request.mode} · {request.weight} kg</span>
                  <span className="font-semibold text-violet-900">{currency.format(request.estimate)}</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-500">Trạng thái xử lý</span>
                  <select
                    aria-label={`Trạng thái yêu cầu ${String(request.id).slice(-6)}`}
                    value={request.status}
                    onChange={(event) => updateRequestStatus(request.id, event.target.value as QuoteStatus)}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium"
                  >
                    {(["Mới tiếp nhận", "Đang xử lý", "Đã báo giá", "Đã hoàn tất"] as QuoteStatus[]).map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRequests((current) => current.filter((item) => item.id !== request.id));
                    setNotice("Đã xóa yêu cầu khỏi danh sách.");
                  }}
                  className="mt-3 text-xs font-medium text-rose-700 hover:underline"
                >
                  Xóa yêu cầu
                </button>
              </article>
            ))}
            {visibleRequests.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 px-5 py-10 text-center">
                <Package className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-3 text-sm font-medium">{normalizedRequests.length === 0 ? "Chưa có yêu cầu báo giá" : "Không tìm thấy yêu cầu phù hợp"}</p>
                <p className="mt-1 text-xs text-slate-500">{normalizedRequests.length === 0 ? "Điền biểu mẫu để tạo yêu cầu đầu tiên." : "Thử đổi từ khóa tìm kiếm hoặc trạng thái."}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DemoShell>
  );
}

export default function ProductDemo({ id }: { id: DemoId }) {
  if (id === "novaforge") return <NovaForgeDemo />;
  if (id === "kora") return <KoraClinicDemo />;
  return <SoraLogisticsDemo />;
}
