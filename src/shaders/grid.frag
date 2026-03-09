uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  vec2 grid = abs(fract(vUv * 50.0 - 0.5) - 0.5);
  float line = min(grid.x, grid.y);
  float gridAlpha = 1.0 - smoothstep(0.0, 0.03, line);

  // Major grid lines every 10 units
  vec2 majorGrid = abs(fract(vUv * 5.0 - 0.5) - 0.5);
  float majorLine = min(majorGrid.x, majorGrid.y);
  float majorAlpha = 1.0 - smoothstep(0.0, 0.02, majorLine);

  float alpha = max(gridAlpha * 0.12, majorAlpha * 0.35);

  // Distance fade from center
  float dist = length(vUv - 0.5) * 2.0;
  alpha *= smoothstep(1.0, 0.3, dist);

  // Pulse
  alpha *= 0.8 + 0.2 * sin(uTime * 0.5);

  gl_FragColor = vec4(uColor, alpha);
}
