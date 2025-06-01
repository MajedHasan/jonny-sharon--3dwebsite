import { React, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  CameraControls,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";

import * as THREE from "three";

import Home from "./models/3dwebsite_v_7";

const CameraHelper = ({ cameraRef }) => {
  useHelper(cameraRef, THREE.CameraHelper);
  return null;
};

const DebugCurve = ({ curve }) => {
  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={"red"} />
    </line>
  );
};

const Scene = ({
  camera,
  lerpFactor,
  scrollProgress,
  setScrollProgress,
  targetScrollProgress,
  mouseOffset,
}) => {
  const cameraCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(
      100.42149668141265,
      106.52436110906683,
      224.3863164589432
    ),
    new THREE.Vector3(
      100.17298918999013,
      90.35189803107018,
      105.97002012367534
    ),
    new THREE.Vector3(107.14759478293381, 99.33238983011671, 86.82942322577027),
    new THREE.Vector3(218.8680523793594, 93.00659824572418, 3.231043091195936),
    new THREE.Vector3(277.34528405553834, 94.51550590018039, 40.56150637480602),
    new THREE.Vector3(
      332.73780827273293,
      89.86513343470557,
      -28.902788507513836
    ),
    new THREE.Vector3(
      307.01531066791034,
      91.71540507937593,
      -13.868152579597078
    ),
    new THREE.Vector3(
      307.22331729360303,
      92.04545032131468,
      -29.935756344010965
    ),
    new THREE.Vector3(
      307.46000405890163,
      92.3095414337075,
      -48.599971455097986
    ),
  ]);

  const rotationTargets = [
    {
      progress: 0,
      rotation: new THREE.Euler(
        -0.14516047974655538,
        -0.002728550872735836,
        -0.00039888288038069655
      ),
    },
    {
      progress: 0.12499999982181885,
      rotation: new THREE.Euler(
        -0.10357364851305577,
        0.002053377719078932,
        0.00021343943975923654
      ),
    },
    {
      progress: 0.2549999999203713,
      rotation: new THREE.Euler(
        -0.12478543311010601,
        -0.012963307151185157,
        -0.0016260338167606073
      ),
    },
    {
      progress: 0.40250000001569064,
      rotation: new THREE.Euler(
        0.0017706483223626477,
        -0.010615599828687247,
        0.000018796160638038767
      ),
    },
    {
      progress: 0.5300000000002714,
      rotation: new THREE.Euler(
        -0.02147325646096882,
        0.010940509820448039,
        0.00023495979676665263
      ),
    },
    {
      progress: 0.6674999999998849,
      rotation: new THREE.Euler(
        1.0222031575247343,
        1.5309835143370982,
        -1.0218503534198673
      ),
    },
    {
      progress: 0.7700000003407186,
      rotation: new THREE.Euler(
        1.2863279118434705,
        1.5277227206076094,
        -1.2860778524937158
      ),
    },
    {
      progress: 0.8750000020961836,
      rotation: new THREE.Euler(
        1.2863279118586133,
        1.5277227206053816,
        -1.2860778525088454
      ),
    },
    {
      progress: 0.9999999912120051,
      rotation: new THREE.Euler(
        1.2863279118586133,
        1.5277227206053816,
        -1.2860778525088457
      ),
    },
  ];

  const getLerpedRotation = (progress) => {
    for (let i = 0; i < rotationTargets.length - 1; i++) {
      const start = rotationTargets[i];
      const end = rotationTargets[i + 1];
      if (progress >= start.progress && progress <= end.progress) {
        const lerpFactor =
          (progress - start.progress) / (end.progress - start.progress);

        const startQuaternion = new THREE.Quaternion().setFromEuler(
          start.rotation
        );
        const endQuaternion = new THREE.Quaternion().setFromEuler(end.rotation);

        const lerpingQuaternion = new THREE.Quaternion();
        lerpingQuaternion.slerpQuaternions(
          startQuaternion,
          endQuaternion,
          lerpFactor
        );

        const lerpedRotation = new THREE.Euler().setFromQuaternion(
          lerpingQuaternion
        );
        return lerpedRotation;

        // return new THREE.Euler(
        //   THREE.MathUtils.lerp(start.rotation.x, end.rotation.x, lerpFactor),
        //   THREE.MathUtils.lerp(start.rotation.y, end.rotation.y, lerpFactor),
        //   THREE.MathUtils.lerp(start.rotation.z, end.rotation.z, lerpFactor)
        // );
      }
    }

    // return rotationTargets[0].rotation;
  };

  useFrame(() => {
    if (camera) {
      // const newProgress = THREE.MathUtils.lerp(
      //   scrollProgress,
      //   targetScrollProgress.current,
      //   lerpFactor
      // );

      const newProgress = THREE.MathUtils.clamp(
        THREE.MathUtils.lerp(
          scrollProgress,
          targetScrollProgress.current,
          lerpFactor
        ),
        0,
        1
      );

      setScrollProgress(newProgress);

      console.log("Position");
      console.log(camera.current.position);
      console.log("New Progress");
      console.log(newProgress);
      console.log("Rotation");
      console.log(camera.current.rotation);

      const basePoint = cameraCurve.getPoint(newProgress);

      const finalPosition = new THREE.Vector3(
        basePoint.x + mouseOffset.current.x,
        basePoint.y - mouseOffset.current.y,
        basePoint.z
      );

      // camera.current.position.x = THREE.MathUtils.lerp(
      //   camera.current.position.x,
      //   finalPosition.x,
      //   0.1
      // );
      // camera.current.position.y = THREE.MathUtils.lerp(
      //   camera.current.position.y,
      //   finalPosition.y,
      //   0.1
      // );
      // camera.current.position.z = THREE.MathUtils.lerp(
      //   camera.current.position.z,
      //   finalPosition.z,
      //   0.1
      // );

      // camera.current.camera.position.copy(point);
      camera.current.position.copy(basePoint);

      const targetRotation = getLerpedRotation(newProgress);
      camera.current.rotation.copy(targetRotation);
    }
  });

  return (
    <>
      {/* <DebugCurve curve={cameraCurve} /> */}
      <Suspense>
        <Home />
      </Suspense>
    </>
  );
};

const Experience = () => {
  const controls = useRef();
  const camera = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollProgress = useRef(0);
  const scrollSpeed = 0.005;
  const lerpFactor = 0.1;
  const isSwiping = useRef(false);

  const mouseOffset = useRef(new THREE.Vector3());

  useEffect(() => {
    const handleWheel = (e) => {
      // targetScrollProgress.current =
      //   targetScrollProgress.current + Math.sign(e.deltaY) * scrollSpeed * 0.4;
      const newTarget =
        targetScrollProgress.current + Math.sign(e.deltaY) * scrollSpeed * 0.5;
      targetScrollProgress.current = THREE.MathUtils.clamp(newTarget, 0, 1);
    };

    const handlePointerDown = () => {
      isSwiping.current = true;
    };
    const handlePointerMove = (e) => {
      if (!isSwiping.current) return;

      // targetScrollProgress.current =
      //   targetScrollProgress.current +
      //   Math.sign(e.movementY) * scrollSpeed * 0.2;

      const newTarget =
        targetScrollProgress.current +
        Math.sign(e.movementY) * scrollSpeed * 0.2;
      targetScrollProgress.current = THREE.MathUtils.clamp(newTarget, 0, 1);
    };

    const handlePointerUp = () => {
      isSwiping.current = false;
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      const sensitivityX = 0.2;
      const sensitivityY = 0.2;

      mouseOffset.current.x = mouseX * sensitivityX;
      mouseOffset.current.y = mouseY * sensitivityY;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <>
      <Canvas eventSource={document.getElementById("root")}>
        <directionalLight position={[10, 10, 10]} intensity={1} color="white" />
        <ambientLight intensity={0.3} />

        <pointLight position={[100, 100, 100]} intensity={5} />
        <meshStandardMaterial transparent={false} opacity={1} />
        <Environment preset="sunset" background />

        <Scene
          camera={camera}
          lerpFactor={lerpFactor}
          mouseOffset={mouseOffset}
          scrollProgress={scrollProgress}
          setScrollProgress={setScrollProgress}
          targetScrollProgress={targetScrollProgress}
        />

        <PerspectiveCamera
          ref={camera}
          makeDefault
          fov={60}
          position={[94.23616545520319, 108.09771916417259, 268.1527892032837]}
        />

        <OrbitControls ref={controls} camera={camera.current} />
      </Canvas>
    </>
  );
};

export default Experience;
