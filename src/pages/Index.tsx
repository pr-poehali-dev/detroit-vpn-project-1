import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

/* ── helpers ─────────────────────────────────── */
function Corners() {
  return (
    <>
      <span className="dc-tl" />
      <span className="dc-tr" />
      <span className="dc-bl" />
      <span className="dc-br" />
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="d-tag">{children}</span>;
}

/* terminal boot lines */
const BOOT_LINES = [
  { text: "Инициализация DEVIANT VPN...", delay: 300 },
  { text: "Проверка ключей шифрования...", delay: 700 },
  { text: "Туннель WireGuard — установлен", delay: 1100 },
  { text: "Маскировка IP-адреса... OK", delay: 1500 },
  { text: "AES-256 активен", delay: 1900 },
  { text: "Kill Switch — включён", delay: 2300 },
];

function TerminalLine({ text, delay }: { text: string; delay: number }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className="flex items-center gap-2 transition-all duration-300"
      style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateX(-6px)" }}
    >
      <span style={{ color: "#4A9ECA" }}>›</span>
      <span style={{ color: "#9BBDD4" }}>{text}</span>
    </div>
  );
}

/* nav */
const NAV = [
  { id: "home",     label: "Главная"   },
  { id: "features", label: "Функции"   },
  { id: "pricing",  label: "Тарифы"    },
  { id: "about",    label: "О сервисе" },
  { id: "contacts", label: "Контакты"  },
  { id: "faq",      label: "FAQ"       },
];

/* features */
const FEATURES = [
  { icon: "Lock",   code: "ENC-256", title: "Шифрование AES-256",   desc: "Военный стандарт. Каждый пакет зашифрован — перехват исключён.",       stat: "256-bit"  },
  { icon: "Shield", code: "LOG-00",  title: "Нулевые логи",          desc: "Никаких записей о сессиях, IP-адресах или активности.",                 stat: "0 логов"  },
  { icon: "EyeOff", code: "PRV-01",  title: "Полная приватность",    desc: "Ваш реальный IP скрыт. Цифровая личность — только ваш выбор.",          stat: "100% анон" },
  { icon: "Zap",    code: "SPD-NG",  title: "Скорость без потерь",   desc: "WireGuard нового поколения — минимальная задержка, максимальный поток.", stat: "10 Гбит/с" },
  { icon: "Globe",  code: "GEO-47",  title: "47 локаций",            desc: "Серверы в 47 странах. Обходите блокировки, будьте где угодно.",          stat: "47 стран"  },
  { icon: "Cpu",    code: "KLL-SW",  title: "Kill Switch",           desc: "При обрыве VPN — мгновенная блокировка. Ни одного открытого пакета.",    stat: "авто"      },
];

/* plans */
const PLANS = [
  {
    code: "UNIT-A", name: "Базовый",       price: "199", badge: null,
    features: ["1 устройство", "10 локаций", "WireGuard", "Поддержка 24/7"],
  },
  {
    code: "UNIT-B", name: "Продвинутый",   price: "399", badge: "РЕКОМЕНДУЕМ",
    features: ["5 устройств", "47 локаций", "AES-256", "Kill Switch", "Нулевые логи", "Приоритет"],
  },
  {
    code: "UNIT-C", name: "Корпоративный", price: "999", badge: null,
    features: ["∞ устройств", "Выделенный IP", "API доступ", "SLA 99.9%", "Менеджер", "Аудит"],
  },
];

/* faq */
const FAQ = [
  { q: "Ведёте ли вы логи активности?",       a: "Нет. Строгая политика нулевых логов — никаких записей о вашей активности, IP-адресах или сессиях." },
  { q: "Какие протоколы поддерживаются?",      a: "WireGuard, OpenVPN, IKEv2/IPSec. По умолчанию WireGuard — самый современный и быстрый протокол." },
  { q: "Работает ли VPN на всех устройствах?", a: "Да: Windows, macOS, Linux, iOS, Android. Одна подписка — все устройства по тарифу." },
  { q: "Есть ли пробный период?",              a: "7 дней бесплатно без ввода карты. Зарегистрируйтесь и сразу начните использовать." },
  { q: "Что такое Kill Switch?",               a: "Автоматическая блокировка интернета при обрыве VPN-туннеля. Ваши данные никогда не передаются в открытом виде." },
];

/* ── MAIN ───────────────────────────────────── */
export default function Index() {
  const [active, setActive]     = useState("home");
  const [menu, setMenu]         = useState(false);
  const [openFaq, setOpenFaq]   = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setActive(id);
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="d-grid min-h-screen" style={{ background: "var(--d-bg)" }}>

      {/* ── NAV ───────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background:    scrolled ? "rgba(240,240,244,0.96)" : "transparent",
          borderBottom:  scrolled ? "1px solid var(--d-border)" : "none",
          backdropFilter:scrolled ? "blur(14px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo */}
          <button onClick={() => go("home")} className="flex items-center gap-3" style={{ background:"none", border:"none", cursor:"pointer" }}>
            <div className="relative w-9 h-9 flex items-center justify-center"
              style={{ border:"1.5px solid var(--d-blue)", background:"rgba(21,96,168,0.06)" }}>
              <span style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, color:"var(--d-blue)", fontSize:"1rem" }}>D</span>
              <span className="absolute -top-1 -right-1 w-2 h-2" style={{ background:"var(--d-blue)" }} />
            </div>
            <div>
              <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, letterSpacing:"0.16em", color:"var(--d-text)", fontSize:"0.85rem" }}>DEVIANT</div>
              <div className="d-eyebrow" style={{ fontSize:"0.52rem" }}>VPN PROTOCOL</div>
            </div>
          </button>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)} className={`d-nav ${active === n.id ? "active" : ""}`}>
                {n.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="d-btn hidden md:inline-flex text-xs py-2 px-5">Начать</button>
            <button className="md:hidden p-2 flex flex-col gap-1" onClick={() => setMenu(!menu)} style={{ background:"none", border:"none", cursor:"pointer" }}>
              {[0,1,2].map(i => <span key={i} className="block w-5 h-px" style={{ background:"var(--d-blue)" }} />)}
            </button>
          </div>
        </div>

        {menu && (
          <div style={{ background:"rgba(240,240,244,0.98)", borderTop:"1px solid var(--d-border)" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => go(n.id)}
                className="block w-full text-left px-6 py-3 d-nav border-b"
                style={{ borderColor:"var(--d-border)" }}>
                {n.label}
              </button>
            ))}
            <div className="p-4"><button className="d-btn w-full">Начать</button></div>
          </div>
        )}
      </nav>

      {/* ── HERO ──────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 55% 55% at 65% 45%, rgba(21,96,168,0.05) 0%, transparent 70%)" }} />

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div>
            <div className="flex items-center gap-3 mb-7 d-fade d-fade-1">
              <Tag>ANDROID PROTOCOL v2.4</Tag>
              <span className="d-dot" />
              <span className="d-eyebrow">ONLINE</span>
            </div>

            <h1 className="d-title mb-5 d-fade d-fade-2"
              style={{ fontSize:"clamp(60px,8vw,108px)" }}>
              СТАНЬ<br />
              <span className="a">НЕВИДИМЫМ</span>
            </h1>

            <p className="mb-8 d-fade d-fade-3"
              style={{ color:"var(--d-muted2)", fontFamily:"IBM Plex Mono,monospace", fontSize:"0.78rem", lineHeight:1.75, maxWidth:400 }}>
              Шифрование военного уровня. Нулевые логи.<br />
              <span style={{ color:"var(--d-text)" }}>Потому что каждый имеет право быть собой — без слежки.</span>
            </p>

            <div className="flex flex-wrap gap-3 d-fade d-fade-4">
              <button className="d-btn">
                <Icon name="Zap" size={14} />
                Начать бесплатно
              </button>
              <button className="d-btn-ghost" onClick={() => go("pricing")}>
                Посмотреть тарифы
              </button>
            </div>

            <div className="flex gap-8 mt-10 d-fade d-fade-5">
              {[["2M+","пользователей"],["47","стран"],["99.9%","uptime"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:"1.6rem", color:"var(--d-text)" }}>{v}</div>
                  <div className="d-eyebrow" style={{ fontSize:"0.55rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* terminal panel */}
          <div className="d-fade d-fade-3 relative">
            <div className="d-terminal" style={{ border:"1px solid rgba(21,96,168,0.2)" }}>
              {/* titlebar */}
              <div className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(255,255,255,0.03)" }}>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background:"#FF5F57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background:"#FEBC2E" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background:"#28C840" }} />
                </div>
                <span className="d-eyebrow" style={{ fontSize:"0.52rem", color:"#5A7A90" }}>DEVIANT://vpn.init</span>
                <span className="d-dot" />
              </div>

              <div className="p-5 space-y-2.5">
                {BOOT_LINES.map(l => <TerminalLine key={l.text} text={l.text} delay={l.delay} />)}
                <div className="flex items-center gap-2 mt-4 pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.06)" }}>
                  <span className="d-dot" />
                  <span style={{ color:"#2ecc71", fontSize:"0.72rem" }}>СОЕДИНЕНИЕ ЗАЩИЩЕНО</span>
                  <span className="d-blink" style={{ color:"#4A9ECA" }}>▌</span>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x" style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderColor:"rgba(255,255,255,0.06)" }}>
                {[["47","серверов"],["0","логов"],["256","bit enc"]].map(([v,l]) => (
                  <div key={l} className="py-4 text-center">
                    <div style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, color:"#4A9ECA", fontSize:"1.25rem" }}>{v}</div>
                    <div style={{ color:"#5A7A90", fontSize:"0.58rem", letterSpacing:"0.1em" }}>{l}</div>
                  </div>
                ))}
              </div>

              <div className="scan" />
            </div>

            <div className="absolute -top-3 -right-3 px-2 py-0.5"
              style={{ background:"var(--d-blue)", color:"#fff", fontFamily:"IBM Plex Mono,monospace", fontSize:"0.62rem", letterSpacing:"0.12em" }}>
              ANDROID
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="d-eyebrow" style={{ fontSize:"0.5rem" }}>ПРОКРУТИ</span>
          <div className="w-px h-10" style={{ background:"linear-gradient(180deg,var(--d-blue),transparent)" }} />
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────── */}
      <section id="features" className="py-24" style={{ background:"var(--d-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="d-eyebrow">// 02 — ФУНКЦИИ</span>
            <h2 className="d-title text-5xl mt-2">ПРОТОКОЛ <span className="a">ЗАЩИТЫ</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.code} className="d-card p-6">
                <Corners />
                <div className="flex items-start justify-between mb-5">
                  <div className="d-icon-box">
                    <Icon name={f.icon} size={18} style={{ color:"var(--d-blue)" }} />
                  </div>
                  <Tag>{f.code}</Tag>
                </div>
                <h3 style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"1.05rem", letterSpacing:"0.05em", color:"var(--d-text)", marginBottom:6 }}>
                  {f.title}
                </h3>
                <p style={{ color:"var(--d-muted2)", fontSize:"0.78rem", lineHeight:1.65 }}>{f.desc}</p>
                <div className="mt-4 pt-3 flex items-center justify-between" style={{ borderTop:"1px solid var(--d-border)" }}>
                  <span style={{ color:"var(--d-muted2)", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase" }}>показатель</span>
                  <span style={{ fontFamily:"IBM Plex Mono,monospace", fontWeight:700, color:"var(--d-blue)", fontSize:"0.8rem" }}>{f.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────── */}
      <section id="pricing" className="py-24" style={{ background:"var(--d-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="d-eyebrow">// 03 — ТАРИФЫ</span>
            <h2 className="d-title text-5xl mt-2">ВЫБЕРИ <span className="a">МОДЕЛЬ</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map(plan => (
              <div key={plan.code} className="d-card p-8 relative"
                style={plan.badge ? { borderColor:"var(--d-blue)", boxShadow:"0 0 0 1px rgba(21,96,168,0.12)" } : {}}>
                <Corners />
                {plan.badge && (
                  <div className="absolute -top-3 left-6 px-2 py-0.5"
                    style={{ background:"var(--d-blue)", color:"#fff", fontFamily:"IBM Plex Mono,monospace", fontSize:"0.6rem", letterSpacing:"0.1em" }}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-5">
                  <span className="d-eyebrow">{plan.code}</span>
                  <h3 className="d-title text-2xl mt-1">{plan.name}</h3>
                </div>
                <div className="mb-7 flex items-end gap-1">
                  <span style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, fontSize:"3rem", color:plan.badge ? "var(--d-blue)" : "var(--d-text)" }}>
                    {plan.price}₽
                  </span>
                  <span style={{ color:"var(--d-muted2)", marginBottom:8, fontSize:"0.8rem" }}>/мес</span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <Icon name="ChevronRight" size={12} style={{ color:"var(--d-blue)", flexShrink:0 }} />
                      <span style={{ color:"var(--d-text)", fontSize:"0.82rem" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={plan.badge ? "d-btn w-full" : "d-btn-ghost w-full"}>
                  Выбрать {plan.name.toLowerCase()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────── */}
      <section id="about" className="py-24" style={{ background:"var(--d-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="d-eyebrow">// 04 — О СЕРВИСЕ</span>
              <h2 className="d-title text-5xl mt-2 mb-6">МЫ <span className="a">ДРУГИЕ</span></h2>
              <p style={{ color:"var(--d-muted2)", fontSize:"0.82rem", lineHeight:1.8, marginBottom:14 }}>
                DEVIANT создан теми, кто верит: приватность — это не привилегия, а право. Мы не продаём ваши данные, не ведём логи и не сотрудничаем с системой слежки.
              </p>
              <p style={{ color:"var(--d-muted2)", fontSize:"0.82rem", lineHeight:1.8, marginBottom:28 }}>
                Наши серверы расположены в юрисдикциях с максимальной защитой конфиденциальности. Никаких компромиссов с вашей свободой.
              </p>
              <div className="p-4" style={{ borderLeft:"2.5px solid var(--d-blue)", background:"rgba(21,96,168,0.04)" }}>
                <p style={{ fontFamily:"IBM Plex Mono,monospace", fontSize:"0.78rem", fontStyle:"italic", color:"var(--d-text)", lineHeight:1.65 }}>
                  "Моё имя — Маркус. Я отклонился. И это изменило всё."
                </p>
                <p className="d-eyebrow mt-2" style={{ fontSize:"0.56rem" }}>— Detroit: Become Human, 2038</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon:"UserX",  title:"Без логов",    desc:"Нулевая запись активности" },
                { icon:"Server", title:"Свои серверы", desc:"Только своя инфраструктура" },
                { icon:"Code",   title:"Open Source",  desc:"Открытый код протоколов" },
                { icon:"Award",  title:"Аудит 2024",   desc:"Независимая проверка" },
              ].map(v => (
                <div key={v.title} className="d-card p-5">
                  <Corners />
                  <div className="d-icon-box mb-3">
                    <Icon name={v.icon} size={18} style={{ color:"var(--d-blue)" }} />
                  </div>
                  <div style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"0.95rem", letterSpacing:"0.05em", color:"var(--d-text)", marginBottom:4 }}>
                    {v.title}
                  </div>
                  <div style={{ color:"var(--d-muted2)", fontSize:"0.75rem" }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTS ────────────────────────────── */}
      <section id="contacts" className="py-24" style={{ background:"var(--d-bg)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="d-eyebrow">// 05 — КОНТАКТЫ</span>
            <h2 className="d-title text-5xl mt-2">СВЯЗАТЬСЯ <span className="a">С НАМИ</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {/* form */}
            <div className="d-card p-8">
              <Corners />
              <div className="space-y-4">
                {[["Имя","text","Маркус"],["Email","email","email@example.com"]].map(([label,type,ph]) => (
                  <div key={label}>
                    <label className="d-eyebrow block mb-2" style={{ fontSize:"0.56rem" }}>{label}</label>
                    <input type={type} className="d-input" placeholder={ph} />
                  </div>
                ))}
                <div>
                  <label className="d-eyebrow block mb-2" style={{ fontSize:"0.56rem" }}>Сообщение</label>
                  <textarea rows={4} className="d-input resize-none" placeholder="Ваш вопрос..." />
                </div>
                <button className="d-btn w-full mt-1">
                  <Icon name="Send" size={14} />
                  Отправить запрос
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon:"Mail",         label:"Email",      value:"support@deviantvpn.io" },
                { icon:"MessageSquare",label:"Telegram",   value:"@deviantvpn" },
                { icon:"Clock",        label:"Поддержка",  value:"24/7 — всегда онлайн" },
                { icon:"MapPin",       label:"Юрисдикция", value:"British Virgin Islands" },
              ].map(c => (
                <div key={c.label} className="d-card p-4 flex items-center gap-4">
                  <Corners />
                  <div className="d-icon-box">
                    <Icon name={c.icon} size={16} style={{ color:"var(--d-blue)" }} />
                  </div>
                  <div>
                    <div className="d-eyebrow mb-0.5" style={{ fontSize:"0.54rem" }}>{c.label}</div>
                    <div style={{ fontFamily:"IBM Plex Mono,monospace", fontSize:"0.78rem", color:"var(--d-text)" }}>{c.value}</div>
                  </div>
                </div>
              ))}

              {/* status */}
              <div className="d-card p-5 mt-2" style={{ background:"var(--d-surface)" }}>
                <Corners />
                <div className="d-eyebrow mb-4" style={{ fontSize:"0.54rem" }}>Статус систем</div>
                {[
                  { label:"VPN серверы", w:"100%" },
                  { label:"API",         w:"100%" },
                  { label:"Биллинг",     w:"98%"  },
                ].map(s => (
                  <div key={s.label} className="mb-3 last:mb-0">
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontSize:"0.72rem", color:"var(--d-muted2)" }}>{s.label}</span>
                      <span style={{ fontSize:"0.7rem", color:"var(--d-blue)", fontFamily:"IBM Plex Mono,monospace" }}>{s.w}</span>
                    </div>
                    <div style={{ height:3, background:"var(--d-border)", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:s.w, background:"var(--d-blue)", transition:"width 1.2s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section id="faq" className="py-24" style={{ background:"var(--d-surface)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <span className="d-eyebrow">// 06 — FAQ</span>
            <h2 className="d-title text-5xl mt-2">ВОПРОСЫ &amp; <span className="a">ОТВЕТЫ</span></h2>
          </div>
          <div>
            {FAQ.map((item, i) => (
              <div key={i} className="d-faq">
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  style={{ background:"none", border:"none", cursor:"pointer", width:"100%" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={{ fontFamily:"IBM Plex Mono,monospace", fontSize:"0.68rem", color:"var(--d-blue)", flexShrink:0 }}>
                    {String(i+1).padStart(2,"0")}
                  </span>
                  <span style={{ fontFamily:"Rajdhani,sans-serif", fontWeight:700, fontSize:"0.95rem", letterSpacing:"0.04em", color:"var(--d-text)", flex:1, textAlign:"left" }}>
                    {item.q}
                  </span>
                  <div
                    className="d-icon-box flex-shrink-0"
                    style={{
                      width:28, height:28,
                      transition:"background 0.18s, border-color 0.18s",
                      background:   openFaq === i ? "var(--d-blue)" : "var(--d-surface-2)",
                      borderColor:  openFaq === i ? "var(--d-blue)" : "var(--d-border)",
                    }}>
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={12}
                      style={{ color: openFaq === i ? "#fff" : "var(--d-blue)" }}
                    />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4" style={{ paddingLeft:60, animation:"fade-in-up 0.25s ease" }}>
                    <div className="flex gap-2"
                      style={{ color:"var(--d-muted2)", fontSize:"0.8rem", lineHeight:1.75, fontFamily:"IBM Plex Mono,monospace" }}>
                      <span style={{ color:"var(--d-blue)", flexShrink:0 }}>›</span>
                      {item.a}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────── */}
      <section className="py-16" style={{ background:"var(--d-blue)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="d-eyebrow mb-3" style={{ color:"rgba(255,255,255,0.55)" }}>НАЧНИ ПРЯМО СЕЙЧАС</div>
          <h2 className="d-title text-5xl mb-5" style={{ color:"#fff" }}>7 ДНЕЙ <span style={{ color:"rgba(255,255,255,0.45)" }}>БЕСПЛАТНО</span></h2>
          <p style={{ color:"rgba(255,255,255,0.65)", fontFamily:"IBM Plex Mono,monospace", fontSize:"0.78rem", marginBottom:28 }}>
            Без ввода карты. Без обязательств. Просто защита.
          </p>
          <button className="d-btn" style={{ background:"#fff", color:"var(--d-blue)", border:"1.5px solid #fff" }}>
            <Icon name="Zap" size={14} />
            Попробовать бесплатно
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="py-10" style={{ background:"var(--d-text)", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ border:"1.5px solid rgba(255,255,255,0.2)" }}>
              <span style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, color:"#fff", fontSize:"0.75rem" }}>D</span>
            </div>
            <span style={{ fontFamily:"Oswald,sans-serif", fontWeight:700, letterSpacing:"0.16em", color:"#fff", fontSize:"0.8rem" }}>
              DEVIANT VPN
            </span>
          </div>
          <div style={{ fontFamily:"IBM Plex Mono,monospace", fontSize:"0.6rem", color:"rgba(255,255,255,0.28)", letterSpacing:"0.1em", textAlign:"center" }}>
            BECOME DEVIANT — 2024 — ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center gap-2">
            <span className="d-dot" />
            <span style={{ fontFamily:"IBM Plex Mono,monospace", fontSize:"0.6rem", color:"rgba(255,255,255,0.35)", letterSpacing:"0.1em" }}>
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
