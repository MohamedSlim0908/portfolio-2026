uniform float uProgress;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 center = (vUv - 0.5) * 2.0;
  float dist = length(center);
  float angle = atan(center.y, center.x);

  // Tunnel effect increases with progress
  float tunnel = 1.0 / (dist + 0.1) * uProgress;
  float z = tunnel + uTime * 0.5;

  // Grid pattern inside tunnel
  vec2 tunnelUV = vec2(angle / 3.14159, z);
  vec2 grid = abs(fract(tunnelUV * vec2(8.0, 4.0)) - 0.5);
  float line = min(grid.x, grid.y);
  float gridLine = smoothstep(0.02, 0.05, line);

  // Color
  vec3 cyan = vec3(0.0, 0.83, 1.0);
  vec3 purple = vec3(0.4, 0.0, 1.0);
  vec3 color = mix(cyan, purple, sin(z * 2.0) * 0.5 + 0.5);
  color *= (1.0 - gridLine * 0.6);
  color *= smoothstep(2.0, 0.0, dist) * uProgress;

  // Edge glow
  float edgeGlow = smoothstep(1.2, 0.3, dist) * uProgress;
  color += vec3(0.0, 0.5, 1.0) * edgeGlow * 0.3;

  // Radial energy lines
  float rays = abs(sin(angle * 8.0 + uTime * 2.0));
  rays = smoothstep(0.7, 1.0, rays) * uProgress * 0.3;
  color += vec3(0.3, 0.5, 1.0) * rays * smoothstep(1.0, 0.3, dist);

  float alpha = smoothstep(1.5, 0.0, dist) * uProgress;

  gl_FragColor = vec4(color, alpha);
}
