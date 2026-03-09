export interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

export interface SceneConfig {
  id: string;
  name: string;
  scrollStart: number;
  scrollEnd: number;
  cameraKeyframes: CameraKeyframe[];
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  color: string;
  image?: string;
}
