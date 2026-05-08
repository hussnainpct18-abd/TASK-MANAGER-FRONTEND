import 'bootstrap/dist/css/bootstrap.min.css';

const Welcome = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 text-center px-3"
      style={{ background: '#0d0f1a' }}
    >
      <div style={{ maxWidth: '600px' }}>

        <div className="mb-4">
          <span
            className=" fw-bolder rounded-pill me-2"
            style={{
              background: 'rgba(109,93,255,0.15)',
              color: '#a599ff',
              border: '1px solid rgba(109,93,255,0.3)',
              fontSize: '0.8rem',
              padding: '6px 16px',
            }}
          >
            ✦ Your focus starts here
          </span>
        </div>

        <h1
          className="fw-bold text-white mb-3"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', lineHeight: 1.2 }}
        >
          Hey there — <br />
          ready to <span style={{ color: '#a599ff' }}>own your day?</span>
        </h1>

        <hr style={{ width: '48px', margin: '1.5rem auto', borderColor: 'rgba(109,93,255,0.5)', borderWidth: '2px' }} />

        <p className="fs-5 mb-5 mx-auto" style={{ color: '#7a7f9a', lineHeight: 1.7, maxWidth: '420px' }}>
          Every great thing starts with a single task. <br />
          TaskFlow helps you stay clear, stay focused, <br />
          and actually get things done.
        </p>

        {/* <button
          className="btn btn-lg rounded-pill px-5 py-3 mb-3"
          style={{ background: '#6d5dff', color: '#fff', border: 'none' }}
        >
          Let's get started →
        </button> */}

        <p className="mt-3 small" style={{ color: '#7a7f9a' }}>
          No clutter. No chaos. Just you and your tasks.
        </p>

      </div>
    </div>
  );
};

export default Welcome;