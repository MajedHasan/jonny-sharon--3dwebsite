import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function ImagePlane({
  imagePath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  size = [4, 3],
}) {
  const texture = useLoader(TextureLoader, imagePath);

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} side={2} />
    </mesh>
  );
}

export default ImagePlane;
