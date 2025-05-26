import React from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { useGLTFWithKTX2 } from "../../utils/useGLTFWithKTX2";
import { convertMaterialsToMeshBasicMaterial } from "../../utils/convertMaterial";

export default function Model(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTFWithKTX2(
    "/models/3dwebsite_v_5.glb"
  );
  const { actions } = useAnimations(animations, group);

  // convertMaterialsToMeshBasicMaterial(materials);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Area"
          position={[0.019, 0.024, 11.686]}
          scale={[7.417, 3.597, 0.008]}
        />
        <group
          name="Area001"
          position={[3.715, 0.024, 7.946]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[7.417, 3.597, 0.008]}
        />
        <group
          name="Window_Group"
          position={[8.13, -1.787, -10.917]}
          scale={[0.932, 1.816, 0.652]}
        >
          <mesh
            name="CTRL_Hole"
            geometry={nodes.CTRL_Hole.geometry}
            material={materials.hidden_material}
          />
          <group name="Window">
            <mesh
              name="Window_1"
              geometry={nodes.Window_1.geometry}
              material={materials.PVC}
            />
            <mesh
              name="Window_2"
              geometry={nodes.Window_2.geometry}
              material={materials.Plastic}
            />
            <mesh
              name="Window_3"
              geometry={nodes.Window_3.geometry}
              material={materials.Glass}
            />
            <mesh
              name="Window_4"
              geometry={nodes.Window_4.geometry}
              material={materials.Marble}
            />
          </group>
        </group>
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={100}
          near={3.5}
          fov={22.895}
          position={[19.543, -0.171, -8.607]}
          rotation={[-1.547, 1.497, 1.547]}
        />
        <group name="Cube" scale={[4.572, 1.829, 5.334]}>
          <mesh
            name="Cube_1"
            geometry={nodes.Cube_1.geometry}
            material={materials.Material}
          />
          <mesh
            name="Cube_2"
            geometry={nodes.Cube_2.geometry}
            material={materials["Wooden Floor"]}
          />
          <mesh
            name="Cube_3"
            geometry={nodes.Cube_3.geometry}
            material={materials["Projects Box"]}
          />
          <mesh
            name="Cube_4"
            geometry={nodes.Cube_4.geometry}
            material={materials["Third Room wall color"]}
          />
          <mesh
            name="Cube_5"
            geometry={nodes.Cube_5.geometry}
            material={materials["Second Room wall color"]}
          />
          <mesh
            name="Cube_6"
            geometry={nodes.Cube_6.geometry}
            material={materials["First Room wall color"]}
          />
        </group>
        <mesh
          name="Sofa"
          geometry={nodes.Sofa.geometry}
          material={nodes.Sofa.material}
          position={[1.237, -1.567, -4.803]}
          rotation={[-Math.PI, 0, -Math.PI]}
          scale={[-1, -0.222, -1]}
        />
        <mesh
          name="Gate"
          geometry={nodes.Gate.geometry}
          material={materials.Material}
          scale={[4.572, 1.829, 5.334]}
        />
        <mesh
          name="3dwebsite-background"
          geometry={nodes["3dwebsite-background"].geometry}
          material={materials["3dwebsite-background"]}
          position={[2.468, -0.64, -17.88]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={16.684}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/3dwebsite_v_5.glb");
