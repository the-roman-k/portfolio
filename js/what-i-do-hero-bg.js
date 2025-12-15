(() => {
  const canvas = document.getElementById("whatIDoHeroCanvas");
  if (!canvas) return;

  const section = canvas.closest(".what-i-do-hero");
  if (!section) return;

  /** Prefer reduced motion: render once and stop animating. */
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const gl =
    canvas.getContext("webgl", { alpha: true, antialias: true }) ||
    canvas.getContext("experimental-webgl");

  if (!gl) {
    // Keep fallback background-image.
    return;
  }

  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;

    uniform float u_speed;
    uniform float u_wave_amp;
    uniform float u_wave_freq;
    uniform float u_glow_strength;
    uniform float u_mouse_force;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      st.x *= u_resolution.x / u_resolution.y;

      vec2 mouse = u_mouse;
      mouse.x *= u_resolution.x / u_resolution.y;

      float t = u_time * u_speed;

      float w1 = sin(st.x * u_wave_freq + t);
      float w2 = sin(st.y * (u_wave_freq * 1.5) + t * 0.7);
      float wave = w1 * u_wave_amp + w2 * (u_wave_amp * 0.25);

      float linePosition = st.y - 0.5;

      vec2 diff = st - mouse;
      float distSq = dot(diff, diff);
      float mousePull = 1.0 / (1.0 + distSq * 10.0);
      linePosition -= (mouse.y - 0.5) * mousePull * u_mouse_force;

      float d = abs(linePosition - wave * 0.3);

      float width = u_glow_strength;
      float intensity = 1.0 - smoothstep(0.0, width, d);
      intensity = intensity * intensity;

      vec3 c_ink = vec3(0.05, 0.05, 0.05);
      vec3 c_paper = vec3(0.95, 0.96, 0.97);

      float colorPos = st.x * 0.5 + sin(t) * 0.1;

      if (colorPos < 0.3) {
        c_ink = mix(vec3(0.1, 0.15, 0.2), vec3(0.0, 0.0, 0.0), smoothstep(0.0, 0.3, colorPos));
      } else if (colorPos > 0.6) {
        c_ink = mix(vec3(0.0, 0.0, 0.0), vec3(0.15, 0.1, 0.05), smoothstep(0.6, 1.0, colorPos));
      } else {
        c_ink = vec3(0.0, 0.0, 0.0);
      }

      vec3 finalColor = mix(c_paper, c_ink, intensity);
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      // Keep fallback background-image if shader fails.
      // eslint-disable-next-line no-console
      console.error("WebGL shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = createShader(gl.VERTEX_SHADER, vertexSource);
  const fs = createShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vs || !fs) return;

  const program = gl.createProgram();
  if (!program) return;

  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // eslint-disable-next-line no-console
    console.error("WebGL program link error:", gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]),
    gl.STATIC_DRAW
  );

  const posLoc = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const timeLoc = gl.getUniformLocation(program, "u_time");
  const resLoc = gl.getUniformLocation(program, "u_resolution");
  const mouseLoc = gl.getUniformLocation(program, "u_mouse");

  const speedLoc = gl.getUniformLocation(program, "u_speed");
  const ampLoc = gl.getUniformLocation(program, "u_wave_amp");
  const freqLoc = gl.getUniformLocation(program, "u_wave_freq");
  const glowLoc = gl.getUniformLocation(program, "u_glow_strength");
  const mouseForceLoc = gl.getUniformLocation(program, "u_mouse_force");

  const params = {
    speed: 0.16,
    amp: 1.0,
    freq: 2.0,
    glow: 0.05,
    mouseForce: 1.7,
  };

  let mouseX = 0.5,
    mouseY = 0.5;
  let targetX = 0.5,
    targetY = 0.5;

  function setMouseFromClient(clientX, clientY) {
    const rect = section.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    targetX = Math.max(0, Math.min(1, x));
    targetY = Math.max(0, Math.min(1, 1 - y)); // flip Y like the original
  }

  section.addEventListener("mousemove", (e) => setMouseFromClient(e.clientX, e.clientY));
  section.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches && e.touches.length > 0) {
        setMouseFromClient(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    { passive: true }
  );

  // Resize canvas to the section size (not the whole window)
  let pixelWidth = 0;
  let pixelHeight = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(section.clientWidth * dpr));
    const h = Math.max(1, Math.floor(section.clientHeight * dpr));
    if (w === pixelWidth && h === pixelHeight) return;
    pixelWidth = w;
    pixelHeight = h;
    canvas.width = w;
    canvas.height = h;
    gl.viewport(0, 0, w, h);
  }

  let ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(() => resize());
    ro.observe(section);
  } else {
    window.addEventListener("resize", resize, { passive: true });
  }

  // Delay initial sizing until layout is stable.
  window.requestAnimationFrame(() => resize());

  let raf = 0;
  function drawFrame(t) {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    gl.uniform1f(timeLoc, t * 0.001);
    gl.uniform2f(resLoc, pixelWidth, pixelHeight);
    gl.uniform2f(mouseLoc, mouseX, mouseY);
    gl.uniform1f(speedLoc, params.speed);
    gl.uniform1f(ampLoc, params.amp);
    gl.uniform1f(freqLoc, params.freq);
    gl.uniform1f(glowLoc, params.glow);
    gl.uniform1f(mouseForceLoc, params.mouseForce);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function loop(t) {
    resize();
    drawFrame(t);
    raf = window.requestAnimationFrame(loop);
  }

  // Ensure we have a valid canvas size before first render (critical for reduced-motion mode).
  resize();
  drawFrame(0);

  // Mark WebGL ready => disables fallback image via CSS (only after we have rendered at least once).
  section.setAttribute("data-webgl", "on");

  if (!prefersReducedMotion) {
    raf = window.requestAnimationFrame(loop);
  }

  // Cleanup on page hide
  window.addEventListener(
    "pagehide",
    () => {
      if (raf) window.cancelAnimationFrame(raf);
      try {
        if (ro) ro.disconnect();
      } catch (_) {}
    },
    { once: true }
  );
})();


