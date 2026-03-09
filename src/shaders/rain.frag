varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv * vec2(1.0, 0.3));
  float alpha = smoothstep(0.5, 0.15, d) * vAlpha * 0.5;
  gl_FragColor = vec4(0.53, 0.8, 1.0, alpha);
}
