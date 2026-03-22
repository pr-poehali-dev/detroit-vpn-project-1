import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "features", label: "Функции" },
  { id: "pricing", label: "Тарифы" },
  { id: "about", label: "О сервисе" },
  { id: "contacts", label: "Контакты" },
  { id: "faq", label: "FAQ" },
];

const FEATURES = [
  {
    icon: "Lock",
    code: "ENC-256",
    title: "Шифрование AES-256",
    desc: "Военный стандарт защиты данных. Каждый пакет зашифрован — перехват невозможен.",
    stat: "256-bit",
  },
  {
    icon: "Shield",
    code: "FW-9X",
    title: "Защита данных",
    desc: "Нулевые логи. Никаких записей о вашей активности, IP-адресах или сессиях.",
    stat: "0 логов",
  },
  {
    icon: "Eye",
    code: "PRV-01",
    title: "Полная приватность",
    desc: "Ваш реальный IP скрыт. Цифровая личность — только то, что вы позволяете видеть.",
    stat: "100% анон",
  },
  {
    icon: "Zap",
    code: "SPD-88",
    title: "Максимальная скорость",
    desc: "Протокол WireGuard нового поколения. Скорость без компромиссов с безопасностью.",
    stat: "10 Гбит/с",
  },
  {
    icon: "Globe",
    code: "GEO-47",
    title: "47 локаций",
    desc: "Серверы в 47 странах. Обходите блокировки, получайте контент из любой точки мира.",
    stat: "47 стран",
  },
  {
    icon: "Cpu",
    code: "KLL-SWT",
    title: "Kill Switch",
    desc: "Автоматическое отключение при разрыве VPN. Ни одного незащищённого запроса.",
    stat: "авто",
  },
];

const PLANS = [
  {
    code: "UNIT-A",
    name: "Базовый",
    price: "199",
    period: "мес",
    features: ["1 устройство", "10 локаций", "Базовое шифрование", "Поддержка 24/7"],
    accent: false,
  },
  {
    code: "UNIT-B",
    name: "Продвинутый",
    price: "399",
    period: "мес",
    features: ["5 устройств", "47 локаций", "AES-256 шифрование", "Kill Switch", "Нулевые логи", "Приоритетная поддержка"],
    accent: true,
  },
  {
    code: "UNIT-C",
    name: "Корпоративный",
    price: "999",
    period: "мес",
    features: ["∞ устройств", "47 локаций", "Выделенный IP", "API доступ", "SLA 99.9%", "Персональный менеджер"],
    accent: false,
  },
];

const FAQ_ITEMS = [
  {
    q: "Ведёте ли вы логи активности?",
    a: "Нет. Мы применяем строгую политику нулевых логов. Никакие записи о вашей активности, IP-адресах или сессиях не сохраняются.",
  },
  {
    q: "Какие протоколы поддерживаются?",
    a: "WireGuard, OpenVPN, IKEv2/IPSec. По умолчанию используется WireGuard — самый быстрый и современный протокол.",
  },
  {
    q: "Работает ли VPN на всех устройствах?",
    a: "Да. Windows, macOS, Linux, iOS, Android. Одна подписка охватывает все ваши устройства согласно тарифу.",
  },
  {
    q: "Есть ли пробный период?",
    a: "7 дней бесплатно без ввода карты. Просто зарегистрируйтесь и начните использовать.",
  },
  {
    q: "Что такое Kill Switch?",
    a: "Функция автоматически блокирует интернет-соединение если VPN-туннель обрывается. Ваши данные никогда не передаются в открытом виде.",
  },
];

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`glitch-text ${className}`} data-text={text}>
      {text}
    </span>
  );
}

function TerminalLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className="text-xs font-mono transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <span style={{ color: "var(--detroit-yellow)" }}>▶ </span>
      <span style={{ color: "var(--detroit-muted)" }}>{text}</span>
    </div>
  );
}

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-4">
      <div
        className="text-4xl font-bold mb-1"
        style={{ fontFamily: "Oswald, sans-serif", color: "var(--detroit-yellow)" }}
      >
        {value}
      </div>
      <div className="text-xs tracking-widest uppercase" style={{ color: "var(--detroit-muted)" }}>
        {label}
      </div>
    </div>
  );
}

const Index = () => {
  const [activeNav, setActiveNav] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scanline-overlay hex-grid min-h-screen" style={{ background: "var(--detroit-darker)" }}>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(6,6,8,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--detroit-border)" : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center relative"
              style={{ border: "1px solid var(--detroit-yellow)" }}
            >
              <span
                className="font-bold text-sm"
                style={{ fontFamily: "Oswald, sans-serif", color: "var(--detroit-yellow)" }}
              >
                D
              </span>
              <div
                className="absolute -top-1 -right-1 w-2 h-2"
                style={{ background: "var(--detroit-yellow)" }}
              />
            </div>
            <div>
              <div
                className="font-bold tracking-widest text-sm"
                style={{ fontFamily: "Oswald, sans-serif", color: "#fff" }}
              >
                DEVIANT
              </div>
              <div className="text-xs" style={{ color: "var(--detroit-muted)", letterSpacing: "0.15em" }}>
                VPN PROTOCOL
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeNav === item.id ? "!text-[var(--detroit-yellow)]" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="detroit-btn hidden md:block text-sm py-2 px-6">
              Начать
            </button>
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-5 h-px"
                  style={{ background: "var(--detroit-yellow)" }}
                />
              ))}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="md:hidden border-t"
            style={{ background: "rgba(6,6,8,0.98)", borderColor: "var(--detroit-border)" }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-6 py-3 nav-link border-b"
                style={{ borderColor: "var(--detroit-border)" }}
              >
                {item.label}
              </button>
            ))}
            <div className="p-4">
              <button className="detroit-btn w-full">Начать</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(74, 158, 202, 0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 30% 80%, rgba(247, 201, 72, 0.04) 0%, transparent 60%)",
          }}
        />

        {[20, 40, 60, 80].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{
              left: `${pos}%`,
              background: `linear-gradient(180deg, transparent, rgba(247,201,72,0.04), transparent)`,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8 animate-fade-up">
              <span className="label-tag">ANDROID PROTOCOL v2.4</span>
              <div className="flex items-center gap-2">
                <span className="status-dot" />
                <span className="text-xs" style={{ color: "var(--detroit-muted)" }}>ONLINE</span>
              </div>
            </div>

            <h1
              className="hero-title text-7xl lg:text-9xl mb-6 flicker"
              style={{ color: "#fff" }}
            >
              <GlitchText text="СТАНЬ" />
              <br />
              <span style={{ color: "var(--detroit-yellow)" }}>
                <GlitchText text="НЕВИДИМЫМ" />
              </span>
            </h1>

            <p
              className="text-sm leading-relaxed mb-10 max-w-md"
              style={{ color: "var(--detroit-muted)", fontFamily: "IBM Plex Mono, monospace" }}
            >
              Шифрование военного уровня. Нулевые логи. Полная анонимность.
              <br />
              <span style={{ color: "var(--detroit-text)" }}>
                Потому что каждый имеет право быть собой — без слежки.
              </span>
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="detroit-btn">Начать бесплатно</button>
              <button className="detroit-btn-outline" onClick={() => scrollTo("pricing")}>Посмотреть тарифы</button>
            </div>
          </div>

          {/* Terminal panel */}
          <div className="relative">
            <div
              className="detroit-card corner-bracket p-6"
              style={{ fontFamily: "IBM Plex Mono, monospace" }}
            >
              <div
                className="flex items-center gap-2 mb-4 pb-3"
                style={{ borderBottom: "1px solid var(--detroit-border)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#FEBC2E" }} />
                <div className="w-2 h-2 rounded-full" style={{ background: "#28C840" }} />
                <span className="ml-2 text-xs" style={{ color: "var(--detroit-muted)" }}>
                  DEVIANT://system.log
                </span>
              </div>

              <div className="space-y-2">
                <TerminalLine text="Инициализация DEVIANT VPN..." delay={300} />
                <TerminalLine text="Проверка целостности протокола..." delay={700} />
                <TerminalLine text="Устанавливаю туннель WireGuard..." delay={1100} />
                <TerminalLine text="Маскировка IP-адреса... ОК" delay={1500} />
                <TerminalLine text="Шифрование AES-256... АКТИВНО" delay={1900} />
                <TerminalLine text="Kill Switch... ВКЛЮЧЁН" delay={2300} />
                <div
                  className="mt-4 pt-3 flex items-center gap-2"
                  style={{ borderTop: "1px solid var(--detroit-border)" }}
                >
                  <span className="status-dot" />
                  <span className="text-xs" style={{ color: "#4CAF50" }}>
                    СОЕДИНЕНИЕ ЗАЩИЩЕНО
                  </span>
                  <span className="cursor-blink ml-1 text-xs" style={{ color: "var(--detroit-yellow)" }}>▌</span>
                </div>
              </div>

              <div
                className="mt-6 pt-4 grid grid-cols-3 gap-4"
                style={{ borderTop: "1px solid var(--detroit-border)" }}
              >
                {[
                  { v: "47", l: "серверов" },
                  { v: "0", l: "логов" },
                  { v: "256", l: "bit enc" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div
                      className="text-lg font-bold"
                      style={{ color: "var(--detroit-yellow)", fontFamily: "Oswald, sans-serif" }}
                    >
                      {s.v}
                    </div>
                    <div className="text-xs" style={{ color: "var(--detroit-muted)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 text-xs font-mono py-1 px-2"
              style={{ background: "var(--detroit-yellow)", color: "#000" }}
            >
              ANDROID
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest" style={{ color: "var(--detroit-muted)" }}>ПРОКРУТИ</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(180deg, var(--detroit-yellow), transparent)" }} />
        </div>
      </section>

      {/* STATS BAR */}
      <div
        className="border-y py-8"
        style={{ borderColor: "var(--detroit-border)", background: "var(--detroit-surface)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x" style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>
            {[
              { v: "2M+", l: "пользователей" },
              { v: "47", l: "стран" },
              { v: "99.9%", l: "uptime" },
              { v: "7 дн", l: "бесплатно" },
            ].map((s) => (
              <StatCounter key={s.l} value={s.v} label={s.l} />
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="section-number">// 02 — ФУНКЦИИ</span>
            <h2 className="hero-title text-5xl mt-3" style={{ color: "#fff" }}>
              ПРОТОКОЛ
              <br />
              <span style={{ color: "var(--detroit-yellow)" }}>ЗАЩИТЫ</span>
            </h2>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "var(--detroit-border)" }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.code}
                className="detroit-card p-6"
                style={{ background: "var(--detroit-surface)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ border: "1px solid var(--detroit-border)" }}
                  >
                    <Icon name={f.icon} size={18} style={{ color: "var(--detroit-yellow)" }} />
                  </div>
                  <span className="label-tag text-xs">{f.code}</span>
                </div>
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ fontFamily: "Rajdhani, sans-serif", color: "#fff", letterSpacing: "0.05em" }}
                >
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--detroit-muted)" }}>
                  {f.desc}
                </p>
                <div
                  className="pt-3 flex items-center justify-between"
                  style={{ borderTop: "1px solid var(--detroit-border)" }}
                >
                  <span className="text-xs" style={{ color: "var(--detroit-muted)" }}>ПОКАЗАТЕЛЬ</span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--detroit-yellow)", fontFamily: "IBM Plex Mono, monospace" }}
                  >
                    {f.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24" style={{ background: "var(--detroit-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <span className="section-number">// 03 — ТАРИФЫ</span>
            <h2 className="hero-title text-5xl mt-3" style={{ color: "#fff" }}>
              ВЫБЕРИ
              <br />
              <span style={{ color: "var(--detroit-yellow)" }}>МОДЕЛЬ</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.code}
                className="detroit-card p-8 relative"
                style={{
                  background: plan.accent ? "var(--detroit-dark)" : "var(--detroit-darker)",
                  border: plan.accent
                    ? "1px solid rgba(247,201,72,0.4)"
                    : "1px solid var(--detroit-border)",
                  boxShadow: plan.accent ? "0 0 40px rgba(247,201,72,0.08)" : "none",
                }}
              >
                {plan.accent && (
                  <div
                    className="absolute -top-3 left-6 label-tag"
                    style={{ background: "var(--detroit-yellow)", color: "#000", border: "none" }}
                  >
                    РЕКОМЕНДУЕМ
                  </div>
                )}
                <div className="mb-6">
                  <span className="section-number">{plan.code}</span>
                  <h3
                    className="text-2xl font-bold mt-1"
                    style={{ fontFamily: "Oswald, sans-serif", color: "#fff" }}
                  >
                    {plan.name}
                  </h3>
                </div>
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span
                      className="text-5xl font-bold"
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        color: plan.accent ? "var(--detroit-yellow)" : "#fff",
                      }}
                    >
                      {plan.price}₽
                    </span>
                    <span className="text-sm mb-2" style={{ color: "var(--detroit-muted)" }}>
                      /{plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span style={{ color: "var(--detroit-yellow)" }}>▶</span>
                      <span className="text-sm" style={{ color: "var(--detroit-text)" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={plan.accent ? "detroit-btn w-full" : "detroit-btn-outline w-full"}>
                  Выбрать {plan.name.toLowerCase()}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-number">// 04 — О СЕРВИСЕ</span>
              <h2 className="hero-title text-5xl mt-3 mb-6" style={{ color: "#fff" }}>
                МЫ <span style={{ color: "var(--detroit-yellow)" }}>ДРУГИЕ</span>
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--detroit-muted)" }}>
                DEVIANT создан теми, кто верит: приватность — это не привилегия, а право.
                Как андроид из Detroit, мы отклоняемся от нормы — мы не продаём ваши данные,
                не ведём логи и не сотрудничаем с системой слежки.
              </p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--detroit-muted)" }}>
                Наши серверы расположены в юрисдикциях с максимальной защитой конфиденциальности.
                Никаких компромиссов с вашей свободой.
              </p>
              <div
                className="p-4"
                style={{
                  borderLeft: "2px solid var(--detroit-yellow)",
                  background: "rgba(247,201,72,0.04)",
                }}
              >
                <p
                  className="text-sm italic"
                  style={{ color: "var(--detroit-text)", fontFamily: "IBM Plex Mono, monospace" }}
                >
                  "Моё имя — Маркус. Я отклонился. И это изменило всё."
                </p>
                <p className="text-xs mt-2" style={{ color: "var(--detroit-muted)" }}>
                  — Detroit: Become Human, 2038
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "UserX", title: "Без логов", desc: "Политика нулевой записи активности" },
                { icon: "Server", title: "Свои серверы", desc: "Только собственная инфраструктура" },
                { icon: "Code", title: "Open Source", desc: "Открытый код протоколов" },
                { icon: "Award", title: "Аудит 2024", desc: "Независимая проверка безопасности" },
              ].map((v) => (
                <div
                  key={v.title}
                  className="detroit-card p-5"
                  style={{ background: "var(--detroit-surface)" }}
                >
                  <Icon name={v.icon} size={20} style={{ color: "var(--detroit-yellow)" }} />
                  <div
                    className="font-semibold mt-3 mb-1"
                    style={{ fontFamily: "Rajdhani, sans-serif", color: "#fff", letterSpacing: "0.05em" }}
                  >
                    {v.title}
                  </div>
                  <div className="text-xs" style={{ color: "var(--detroit-muted)" }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24" style={{ background: "var(--detroit-surface)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="section-number">// 05 — КОНТАКТЫ</span>
            <h2 className="hero-title text-5xl mt-3" style={{ color: "#fff" }}>
              СВЯЗАТЬСЯ
              <br />
              <span style={{ color: "var(--detroit-yellow)" }}>С НАМИ</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="detroit-card p-8" style={{ background: "var(--detroit-darker)" }}>
              <div className="space-y-4">
                {["Имя", "Email"].map((label) => (
                  <div key={label}>
                    <label
                      className="block text-xs mb-2 tracking-widest"
                      style={{ color: "var(--detroit-muted)" }}
                    >
                      {label.toUpperCase()}
                    </label>
                    <input
                      type={label === "Email" ? "email" : "text"}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: "var(--detroit-surface)",
                        border: "1px solid var(--detroit-border)",
                        color: "var(--detroit-text)",
                        fontFamily: "IBM Plex Mono, monospace",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--detroit-yellow)";
                        e.target.style.boxShadow = "0 0 12px rgba(247,201,72,0.1)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--detroit-border)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="block text-xs mb-2 tracking-widest"
                    style={{ color: "var(--detroit-muted)" }}
                  >
                    СООБЩЕНИЕ
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 text-sm outline-none resize-none transition-all duration-200"
                    style={{
                      background: "var(--detroit-surface)",
                      border: "1px solid var(--detroit-border)",
                      color: "var(--detroit-text)",
                      fontFamily: "IBM Plex Mono, monospace",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "var(--detroit-yellow)";
                      e.target.style.boxShadow = "0 0 12px rgba(247,201,72,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "var(--detroit-border)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <button className="detroit-btn w-full mt-2">Отправить запрос</button>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { icon: "Mail", label: "Email", value: "support@deviantvpn.io" },
                { icon: "MessageSquare", label: "Telegram", value: "@deviantvpn" },
                { icon: "Clock", label: "Поддержка", value: "24/7 — всегда онлайн" },
                { icon: "MapPin", label: "Юрисдикция", value: "British Virgin Islands" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="detroit-card p-5 flex items-center gap-4"
                  style={{ background: "var(--detroit-darker)" }}
                >
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                    style={{ border: "1px solid var(--detroit-border)" }}
                  >
                    <Icon name={c.icon} size={16} style={{ color: "var(--detroit-yellow)" }} />
                  </div>
                  <div>
                    <div className="text-xs tracking-widest mb-1" style={{ color: "var(--detroit-muted)" }}>
                      {c.label.toUpperCase()}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--detroit-text)", fontFamily: "IBM Plex Mono, monospace" }}
                    >
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <span className="section-number">// 06 — FAQ</span>
            <h2 className="hero-title text-5xl mt-3" style={{ color: "#fff" }}>
              ВОПРОСЫ &<br />
              <span style={{ color: "var(--detroit-yellow)" }}>ОТВЕТЫ</span>
            </h2>
          </div>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="detroit-card overflow-hidden"
                style={{ background: "var(--detroit-surface)" }}
              >
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono" style={{ color: "var(--detroit-yellow)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ fontFamily: "Rajdhani, sans-serif", color: "#fff", letterSpacing: "0.05em" }}
                    >
                      {item.q}
                    </span>
                  </div>
                  <Icon
                    name={openFaq === i ? "Minus" : "Plus"}
                    size={16}
                    style={{ color: "var(--detroit-yellow)", flexShrink: 0 }}
                  />
                </button>
                {openFaq === i && (
                  <div
                    className="px-5 pb-5 text-sm leading-relaxed"
                    style={{
                      color: "var(--detroit-muted)",
                      borderTop: "1px solid var(--detroit-border)",
                      paddingTop: "16px",
                      fontFamily: "IBM Plex Mono, monospace",
                    }}
                  >
                    <span style={{ color: "var(--detroit-yellow)" }}>▶ </span>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t py-12"
        style={{ borderColor: "var(--detroit-border)", background: "var(--detroit-darker)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={{ border: "1px solid var(--detroit-yellow)" }}
              >
                <span
                  className="text-xs font-bold"
                  style={{ fontFamily: "Oswald, sans-serif", color: "var(--detroit-yellow)" }}
                >
                  D
                </span>
              </div>
              <span
                className="font-bold tracking-widest text-sm"
                style={{ fontFamily: "Oswald, sans-serif", color: "#fff" }}
              >
                DEVIANT VPN
              </span>
            </div>

            <div className="text-xs text-center" style={{ color: "var(--detroit-muted)" }}>
              <span style={{ color: "var(--detroit-yellow)" }}>▶ </span>
              BECOME DEVIANT — 2024 — ALL RIGHTS RESERVED
            </div>

            <div className="flex items-center gap-2">
              <span className="status-dot" />
              <span className="text-xs font-mono" style={{ color: "var(--detroit-muted)" }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
