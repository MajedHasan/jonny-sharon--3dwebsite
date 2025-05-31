import { React, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  CameraControls,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";

import * as THREE from "three";

import Home from "./components/models/3dwebsite_v_6";

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
    new THREE.Vector3(90.87456132219498, 117.8970729680818, 270.7342517305476),
    new THREE.Vector3(99.4367832551978, 101.5388699177154, 200.76076076172663),
    new THREE.Vector3(103.47823066460788, 92.2351377110094, 95.8799586674829),
    new THREE.Vector3(99.81813429495563, 100.38540896746655, 78.61357279146156),
    new THREE.Vector3(179.69596019321406, 102.1109604472254, 40.35978586505511),
    new THREE.Vector3(217.58823116353966, 102.95028839612164, 38.6471734477092),
    new THREE.Vector3(260.494392811521, 100.77439387803213, 27.99127277467842),
    new THREE.Vector3(260.2906944578748, 107.55842848416825, 70.66731519495971),
    new THREE.Vector3(311.4673643650239, 95.69596048414374, 86.4360855135099),
    new THREE.Vector3(364.3970225240414, 92.6971069563327, -24.032636058587084),
    new THREE.Vector3(
      323.81249696572024,
      91.80177288246666,
      -30.40781183894164
    ),
  ]);

  const rotationTargets = [
    {
      progress: 0,
      rotation: new THREE.Euler(
        -0.21771643944764107,
        -0.03129190287187789,
        -0.006921244981888409
      ),
    },
    {
      progress: 0.1570000000000001,
      rotation: new THREE.Euler(
        -0.17652033496540906,
        -0.0006820099838210879,
        -0.00012165481835572273
      ),
    },
    {
      progress: 0.19099999999838035,
      rotation: new THREE.Euler(
        -0.1394011343610872,
        0.008845001161990012,
        0.0012410358014257577
      ),
    },
    {
      progress: 0.3840000000000003,
      rotation: new THREE.Euler(
        -0.2162339089183201,
        -0.12065612048263391,
        -0.026433906769094666
      ),
    },
    {
      progress: 0.518,
      rotation: new THREE.Euler(
        -0.19083558744805607,
        -0.006996406593872995,
        -0.0013515992446637905
      ),
    },
    {
      progress: 0.5750000000000006,
      rotation: new THREE.Euler(
        -0.18090828491569602,
        -0.35512277897362454,
        -0.06351259265973724
      ),
    },
    {
      progress: 0.7270000000000006,
      rotation: new THREE.Euler(
        -0.20510930402317848,
        -0.16674608176811778,
        -0.034514757013798934
      ),
    },
    {
      progress: 0.8110000000000013,
      rotation: new THREE.Euler(
        -0.13074524243225397,
        0.23311441456166387,
        0.03036725194040267
      ),
    },
    {
      progress: 0.8510000000000003,
      rotation: new THREE.Euler(
        -0.20885707314769916,
        0.5596362664538206,
        0.11204719837087342
      ),
    },
    {
      progress: 0.9820000000000003,
      rotation: new THREE.Euler(
        -1.3630903309918052,
        1.4788224246944288,
        1.3622340040307406
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
      // console.log("Position");
      // console.log(camera.current.getPosition());

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

      camera.current.position.x = THREE.MathUtils.lerp(
        camera.current.position.x,
        finalPosition.x,
        0.1
      );
      camera.current.position.y = THREE.MathUtils.lerp(
        camera.current.position.y,
        finalPosition.y,
        0.1
      );
      camera.current.position.z = THREE.MathUtils.lerp(
        camera.current.position.z,
        finalPosition.z,
        0.1
      );

      // camera.current.camera.position.copy(point);
      camera.current.position.copy(basePoint);

      const targetRotation = getLerpedRotation(newProgress);
      camera.current.rotation.copy(targetRotation);
    }
  });

  return (
    <>
      <DebugCurve curve={cameraCurve} />
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
        targetScrollProgress.current + Math.sign(e.deltaY) * scrollSpeed * 0.4;
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
    // window.addEventListener("pointerdown", handlePointerDown);
    // window.addEventListener("pointermove", handlePointerMove);
    // window.addEventListener("pointerup", handlePointerUp);

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
        <directionalLight
          position={[10, 10, 10]}
          intensity={1.5}
          color="white"
        />
        <ambientLight intensity={1} />

        {/* <pointLight position={[100, 100, 100]} intensity={5} />
        <meshStandardMaterial transparent={false} opacity={1} /> */}

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
