import { useGLTF } from "@react-three/drei";

export default function Home(props) {
  const { scene } = useGLTF("/models/3dwebsite_v_5.glb");
  return <primitive object={scene} scale={15} position={[100, 100, 100]} />;
}
