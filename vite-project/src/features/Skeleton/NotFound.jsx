import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const floatingTasks = [
  { icon: "fa-solid fa-list-check", label: "All Tasks", color: "#ede9ff", textColor: "#6d5dff", delay: 0 },
  { icon: "fa-solid fa-bookmark", label: "Favourite", color: "#fef3c7", textColor: "#d97706", delay: 0.4 },
  { icon: "fa-solid fa-briefcase", label: "Work", color: "#dcfce7", textColor: "#16a34a", delay: 0.8 },
  { icon: "fa-solid fa-user-plus", label: "Personal", color: "#fce7f3", textColor: "#db2777", delay: 1.2 },
  { icon: "fa-solid fa-book-open-reader", label: "Learning", color: "#e0f2fe", textColor: "#0284c7", delay: 1.6 },
  { icon: "fa-solid fa-clock", label: "Pending", color: "#fff1f2", textColor: "#e11d48", delay: 0.2 },
  { icon: "fa-solid fa-circle-check", label: "Done", color: "#f0fdf4", textColor: "#15803d", delay: 0.6 },
  { icon: "fa-solid fa-star", label: "Priority", color: "#fefce8", textColor: "#ca8a04", delay: 1.0 },
];

export default function NotFound() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nf-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          background: #f8f7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          padding: 2rem 1rem;
        }

        /* ── BG BLOBS ── */
        .nf-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
          animation: blobDrift 8s ease-in-out infinite alternate;
        }
        .nf-blob-1 { width: 420px; height: 420px; background: #c4b5fd; top: -100px; left: -100px; animation-delay: 0s; }
        .nf-blob-2 { width: 320px; height: 320px; background: #a5f3fc; bottom: -80px; right: -80px; animation-delay: 2s; }
        .nf-blob-3 { width: 200px; height: 200px; background: #fbcfe8; top: 50%; left: 60%; animation-delay: 4s; }

        @keyframes blobDrift {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 20px) scale(1.08); }
        }

        /* ── FLOATING TASK CHIPS ── */
        .nf-chips-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .nf-chip {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 40px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          animation: chipFloat 6s ease-in-out infinite;
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(255,255,255,0.7);
        }

        .nf-chip:nth-child(1)  { top: 12%; left: 5%; animation-delay: 0s; }
        .nf-chip:nth-child(2)  { top: 22%; right: 7%; animation-delay: 0.4s; }
        .nf-chip:nth-child(3)  { top: 65%; left: 3%; animation-delay: 0.8s; }
        .nf-chip:nth-child(4)  { top: 78%; right: 6%; animation-delay: 1.2s; }
        .nf-chip:nth-child(5)  { top: 42%; left: 2%; animation-delay: 1.6s; }
        .nf-chip:nth-child(6)  { top: 55%; right: 4%; animation-delay: 0.2s; }
        .nf-chip:nth-child(7)  { top: 88%; left: 20%; animation-delay: 0.6s; }
        .nf-chip:nth-child(8)  { top: 8%;  right: 25%; animation-delay: 1.0s; }

        @keyframes chipFloat {
          0%   { opacity: 0; transform: translateY(16px) scale(0.9); }
          15%  { opacity: 1; transform: translateY(0px) scale(1); }
          85%  { opacity: 1; transform: translateY(-8px) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
        }

        /* ── CARD ── */
        .nf-card {
          position: relative;
          z-index: 10;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(109,93,255,0.12);
          border-radius: 28px;
          padding: 3rem 3.5rem;
          max-width: 560px;
          width: 100%;
          text-align: center;
          box-shadow: 0 24px 64px rgba(109,93,255,0.1), 0 4px 16px rgba(0,0,0,0.04);
          transition: transform 0.08s linear;
        }

        /* ── BIG 404 ── */
        .nf-big {
          font-size: clamp(6rem, 18vw, 9.5rem);
          font-weight: 900;
          line-height: 1;
          background: linear-gradient(135deg, #6d5dff 0%, #a78bfa 50%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -4px;
          animation: numPop 0.7s cubic-bezier(0.34,1.56,0.64,1) both;
          animation-delay: 0.1s;
          position: relative;
          display: inline-block;
        }

        @keyframes numPop {
          0%   { opacity: 0; transform: scale(0.6) rotate(-4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        /* ── LOST TASK ICON ── */
        .nf-icon-wrap {
          margin: -0.5rem auto 1.5rem;
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #ede9ff, #ddd6fe);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: iconBounce 2.4s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(109,93,255,0.2);
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .nf-icon-wrap i {
          font-size: 1.8rem;
          color: #6d5dff;
        }

        .nf-title {
          font-size: clamp(1.2rem, 4vw, 1.6rem);
          font-weight: 800;
          color: #1e1b4b;
          margin-bottom: 0.6rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.35s;
        }

        .nf-sub {
          font-size: 0.92rem;
          color: #6b7280;
          line-height: 1.7;
          margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.5s;
        }

        @keyframes fadeUp {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* ── BUTTONS ── */
        .nf-btn-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.65s;
        }

        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.7rem 1.5rem;
          background: linear-gradient(135deg, #6d5dff, #8b7cff);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 6px 20px rgba(109,93,255,0.35);
        }

        .nf-btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 10px 28px rgba(109,93,255,0.45);
        }

        .nf-btn-primary:active {
          transform: scale(0.97);
        }

        .nf-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.7rem 1.5rem;
          background: transparent;
          color: #6d5dff;
          border: 1.5px solid rgba(109,93,255,0.3);
          border-radius: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .nf-btn-ghost:hover {
          background: rgba(109,93,255,0.07);
          border-color: rgba(109,93,255,0.5);
          transform: translateY(-2px);
        }

        /* ── DIVIDER / QUICK LINKS ── */
        .nf-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 2rem 0 1.5rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.8s;
        }

        .nf-divider::before,
        .nf-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(109,93,255,0.15), transparent);
        }

        .nf-divider span {
          font-size: 0.75rem;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .nf-quick-links {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          animation: fadeUp 0.6s ease both;
          animation-delay: 0.9s;
        }

        .nf-quick-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 30px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .nf-quick-pill:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
        }

        /* ── PROGRESS BAR ── */
        .nf-progress-wrap {
          margin-top: 2rem;
          animation: fadeUp 0.6s ease both;
          animation-delay: 1.0s;
        }

        .nf-progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.72rem;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 6px;
        }

        .nf-progress-track {
          height: 6px;
          background: #ede9ff;
          border-radius: 10px;
          overflow: hidden;
        }

        .nf-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #6d5dff, #a78bfa);
          border-radius: 10px;
          animation: progressAnim 2.5s cubic-bezier(0.34,1.1,0.64,1) both;
          animation-delay: 1.2s;
          width: 0%;
        }

        @keyframes progressAnim {
          0%   { width: 0%; }
          100% { width: 68%; }
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .nf-card { padding: 2rem 1.5rem; }
          .nf-chip { display: none; }
          .nf-btn-group { flex-direction: column; align-items: stretch; }
          .nf-btn-primary, .nf-btn-ghost { justify-content: center; }
        }
      `}</style>

      <div className="nf-root min-vh-80" ref={containerRef}>
        {/* Background blobs */}
        <div className="nf-blob nf-blob-1" />
        <div className="nf-blob nf-blob-2" />
        <div className="nf-blob nf-blob-3" />

        {/* Floating task chips */}
        <div className="nf-chips-wrap">
          {floatingTasks.map((task, i) => (
            <div
              key={i}
              className="nf-chip"
              style={{ background: task.color, color: task.textColor, animationDelay: `${task.delay}s` }}
            >
              <i className={task.icon} style={{ fontSize: "0.75rem" }} />
              {task.label}
            </div>
          ))}
        </div>

        {/* Main card */}
        <div
          className="nf-card"
          style={{
            transform: `perspective(1000px) rotateX(${-mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
        >
          {/* 404 number */}
          <div className="nf-big">404</div>

          {/* Bouncing icon */}
          <div className="nf-icon-wrap">
            <i className="fa-solid fa-list-check" />
          </div>

          <h1 className="nf-title">This task doesn't exist!</h1>
          <p className="nf-sub">
            Looks like this page went missing from your task list.<br />
            Maybe it's been completed — or never assigned at all.
          </p>

          {/* Action buttons */}
          <div className="nf-btn-group">
            <button className="nf-btn-primary" onClick={() => navigate("/dashboard")}>
              <i className="fa-solid fa-house" />
              Back to Dashboard
            </button>
            <button className="nf-btn-ghost" onClick={() => navigate(-1)}>
              <i className="fa-solid fa-arrow-left" />
              Go Back
            </button>
          </div>

          {/* Quick links */}
          <div className="nf-divider">
            <span>or jump to</span>
          </div>

          <div className="nf-quick-links">
            {floatingTasks.slice(0, 5).map((task, i) => (
              <button
                key={i}
                className="nf-quick-pill"
                style={{ background: task.color, color: task.textColor, borderColor: task.color }}
                onClick={() => navigate("/dashboard")}
              >
                <i className={task.icon} style={{ fontSize: "0.72rem" }} />
                {task.label}
              </button>
            ))}
          </div>

          {/* Fake progress bar  */}
          <div className="nf-progress-wrap">
            <div className="nf-progress-label">
              <span>Your tasks progress</span>
              <span>68%</span>
            </div>
            <div className="nf-progress-track">
              <div className="nf-progress-fill" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
