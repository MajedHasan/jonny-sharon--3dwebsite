import { React, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  CameraControls,
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";

import * as THREE from "three";

import Home from "./models/New-scene-9";

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
    // 1
    new THREE.Vector3(
      31.894344008848872,
      1.595938465623928,
      -33.938577810821855
    ),
    // 2
    new THREE.Vector3(17.2786490019586, 1.527004020995852, -34.09779468436598),
    // 3
    new THREE.Vector3(
      15.589675609192323,
      1.5854036061340169,
      -44.91677739136854
    ),
    // 4
    new THREE.Vector3(
      11.753300915168596,
      1.6047343825654032,
      -44.93356608866701
    ),
    // 5
    new THREE.Vector3(
      8.040113889077201,
      1.6294979113507666,
      -44.94985377519397
    ),
    // 6
    new THREE.Vector3(
      0.47333092318303294,
      1.5739564046011738,
      -42.83007750614483
    ),
    // 7
    new THREE.Vector3(
      0.5071073657223053,
      1.5360675279118687,
      -53.72176472871208
    ),
    // 8
    new THREE.Vector3(
      -1.6544894328952005,
      1.8896927565612154,
      -62.369039521689494
    ),
    // 9
    new THREE.Vector3(
      0.9716272594951217,
      3.3903647463370086,
      -73.52508970319437
    ),
    // 10
    new THREE.Vector3(
      6.207737254398734,
      2.7484702734853474,
      -70.78733151031804
    ),
    // 11
    new THREE.Vector3(
      7.958316809986447,
      2.8293256465938947,
      -84.48466885027534
    ),
    // 12
    new THREE.Vector3(
      8.347061381685924,
      2.5338005880108025,
      -84.93972627116504
    ),
    // 13
    new THREE.Vector3(10.88918054490236, 2.538508177348409, -83.50041824174407),
    // 14
    new THREE.Vector3(13.22618933476883, 2.897616635585506, -73.24739886562816),
    // 15
    new THREE.Vector3(16.647734601483833, 2.42301246023479, -83.43248111123918),
    // 16
    new THREE.Vector3(23.880649476083697, 4.171844600708181, -94.3423331540033),
    // 17
    new THREE.Vector3(30.25353823560327, 3.656368901504385, -102.4511374830523),
    // 18
    new THREE.Vector3(
      35.37907726689559,
      4.9285932216572235,
      -103.38504993711106
    ),
    // 19
    new THREE.Vector3(
      29.564725550127015,
      3.503637131541334,
      -108.12916287282052
    ),
    // 20
    new THREE.Vector3(
      52.79364397339738,
      4.1426555867423245,
      -112.77322280531894
    ),
  ]);

  // const rotationTargets = [
  // 1
  //   {
  //     progress: 0,
  //     rotation: new THREE.Euler(
  //       -1.56627034444022,
  //       1.5016658492158175,
  //       1.5662595081248298
  //     ),
  //   },
  // 2
  //   {
  //     progress: 0.0565000000000022,
  //     rotation: new THREE.Euler(
  //       -1.5662704002779646,
  //       1.5016658883433605,
  //       1.5662595641085506
  //     ),
  //   },
  // 3
  //   {
  //     progress: 0.0480000000000001,
  //     rotation: new THREE.Euler(
  //       -0.01093468983795331,
  //       -0.010084328002883976,
  //       -0.00011027152455146242
  //     ),
  //   },
  // 4
  //   {
  //     progress: 0.04500000000000002,
  //     rotation: new THREE.Euler(
  //       -0.010934689837953331,
  //       -0.010084328003032167,
  //       -0.000110271524553083
  //     ),
  //   },
  // 5
  //   {
  //     progress: 0.04600000000000004,
  //     rotation: new THREE.Euler(
  //       -0.010934689837953331,
  //       -0.010084328003032167,
  //       -0.000110271524553083
  //     ),
  //   },
  // 6
  //   {
  //     progress: 0.030499999999999996,
  //     rotation: new THREE.Euler(
  //       -1.2016158914264794,
  //       1.5654736536887948,
  //       1.201611124171394
  //     ),
  //   },
  // 7
  //   {
  //     progress: 0.03449999999999715,
  //     rotation: new THREE.Euler(
  //       -1.2016158912741077,
  //       1.5654736536885028,
  //       1.201611124019022
  //     ),
  //   },
  // 8
  //   {
  //     progress: 0.007500000000000003,
  //     rotation: new THREE.Euler(
  //       0.7856378503359275,
  //       1.5586241676618908,
  //       -0.7856008090603741
  //     ),
  //   },
  // 9
  //   {
  //     progress: 0.05850000000000005,
  //     rotation: new THREE.Euler(
  //       -0.018742109652664,
  //       -0.010006633718227749,
  //       -0.00018756425651708615
  //     ),
  //   },
  // 10
  //   {
  //     progress: 0.19849999999999998,
  //     rotation: new THREE.Euler(
  //       -1.6178177151479627,
  //       1.5059065037803268,
  //       1.6179167387798832
  //     ),
  //   },
  // 11
  //   {
  //     progress: 0.06449999999919086,
  //     rotation: new THREE.Euler(
  //       0.07014681750164746,
  //       -0.000770714993638814,
  //       0.00005415204750460113
  //     ),
  //   },
  // 12
  //   {
  //     progress: 0.06349999999999016,
  //     rotation: new THREE.Euler(
  //       -1.6146802110272622,
  //       -1.5607454780470211,
  //       -1.6146824248408966
  //     ),
  //   },
  // 13
  //   {
  //     progress: 0.09250000000003002,
  //     rotation: new THREE.Euler(
  //       -0.025665668931029936,
  //       -0.028496073869311325,
  //       -0.000731432301011028
  //     ),
  //   },
  // 14
  //   {
  //     progress: 0.07449999997717036,
  //     rotation: new THREE.Euler(
  //       -1.4417629822675178,
  //       1.5388286077358249,
  //       1.4416977525881511
  //     ),
  //   },
  // 15
  //   {
  //     progress: 0.1195000000000001,
  //     rotation: new THREE.Euler(
  //       -0.04314520320880526,
  //       1.0174257618798312,
  //       0.03671241448585025
  //     ),
  //   },
  // 16
  //   {
  //     progress: 0.11849999999999872,
  //     rotation: new THREE.Euler(
  //       -0.1305512399349273,
  //       0.07995669691896687,
  //       0.010486589264036773
  //     ),
  //   },
  // 17
  //   {
  //     progress: 0.17550000000000002,
  //     rotation: new THREE.Euler(
  //       2.281616329244381,
  //       -1.5627691737853935,
  //       2.2816322593908147
  //     ),
  //   },
  // 18
  //   {
  //     progress: 0.14199999930192486,
  //     rotation: new THREE.Euler(
  //       -0.6560003130850592,
  //       -1.3809904986985215,
  //       -0.6472616192551558
  //     ),
  //   },
  // 19
  //   {
  //     progress: 0.18249999999924033,
  //     rotation: new THREE.Euler(
  //       -0.03563188196047303,
  //       -0.007401344699990171,
  //       -0.0002638330931363304
  //     ),
  //   },
  // ];
  const rotationTargets = [
    // 1
    {
      progress: 0,
      rotation: new THREE.Euler(
        -0.6490074073923771,
        1.5517336895495921,
        0.648919917209728
      ),
    },
    // 2
    {
      progress: 0.06250000004849618,
      rotation: new THREE.Euler(
        2.061329749915305,
        1.564854430417843,
        -2.061337085648094
      ),
    },
    // 3
    {
      progress: 0.09399999993972386,
      rotation: new THREE.Euler(
        -0.01093468983795331,
        -0.010084328002883976,
        -0.00011027152455146242
      ),
    },
    // 4
    {
      progress: 0.18899999977588705,
      rotation: new THREE.Euler(
        -0.010934689837953331,
        -0.010084328003032167,
        -0.000110271524553083
      ),
    },
    // 5
    {
      progress: 0.22400000001018644,
      rotation: new THREE.Euler(
        -0.010934689837953331,
        -0.010084328003032167,
        -0.000110271524553083
      ),
    },
    // 6
    {
      progress: 0.24800000000000008,
      rotation: new THREE.Euler(
        -0.5631292239716837,
        1.567136969063189,
        0.5631262016116
      ),
    },
    // 7
    {
      progress: 0.342999999999999,
      rotation: new THREE.Euler(
        -0.5631292239713293,
        1.5671369690631587,
        0.5631262016112455
      ),
    },
    // 8
    {
      progress: 0.3959978438289793,
      rotation: new THREE.Euler(
        0.7856378503359275,
        1.5586241676618908,
        -0.7856008090603741
      ),
    },
    // 9
    {
      progress: 0.4029999999954228,
      rotation: new THREE.Euler(
        -0.018742109652664,
        -0.010006633718227749,
        -0.00018756425651708615
      ),
    },
    // 10
    {
      progress: 0.48600000035644914,
      rotation: new THREE.Euler(
        -0.020283550816360053,
        0.011981810354644943,
        0.0002430611738386841
      ),
    },
    // 11
    {
      progress: 0.5279999992520764,
      rotation: new THREE.Euler(
        -1.6178177151479627,
        1.5059065037803268,
        1.6179167387798832
      ),
    },
    // 12
    {
      progress: 0.5640013712150768,
      rotation: new THREE.Euler(
        0.07014681750164746,
        -0.000770714993638814,
        0.00005415204750460113
      ),
    },
    // 13
    {
      progress: 0.6340000004264115,
      rotation: new THREE.Euler(
        -1.6146802110272622,
        -1.5607454780470211,
        -1.6146824248408966
      ),
    },
    // 14
    {
      progress: 0.6859999999999109,
      rotation: new THREE.Euler(
        -0.025665668931029936,
        -0.028496073869311325,
        -0.000731432301011028
      ),
    },
    // 15
    {
      progress: 0.7370000000144604,
      rotation: new THREE.Euler(
        -1.4417629822675178,
        1.5388286077358249,
        1.4416977525881511
      ),
    },
    // 16
    {
      progress: 0.7710007412610598,
      rotation: new THREE.Euler(
        -0.04314520320880526,
        1.0174257618798312,
        0.03671241448585025
      ),
    },
    // 17
    {
      progress: 0.8069965924043023,
      rotation: new THREE.Euler(
        -0.1305512399349273,
        0.07995669691896687,
        0.010486589264036773
      ),
    },
    // 18
    {
      progress: 0.8880013403881551,
      rotation: new THREE.Euler(
        2.281616329244381,
        -1.5627691737853935,
        2.2816322593908147
      ),
    },
    // 19
    {
      progress: 0.934999671840995,
      rotation: new THREE.Euler(
        -0.6560003130850592,
        -1.3809904986985215,
        -0.6472616192551558
      ),
    },
    // 20
    {
      progress: 0.9999999999999994,
      rotation: new THREE.Euler(
        -0.03563188196047303,
        -0.007401344699990171,
        -0.0002638330931363304
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
        targetScrollProgress.current + Math.sign(e.deltaY) * scrollSpeed * 0.15;
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
      <Canvas shadows eventSource={document.getElementById("root")}>
        {/* <directionalLight position={[10, 10, 10]} intensity={1} color="green" /> */}
        <ambientLight intensity={0.4} />
        <spotLight position={[0, 20, 0]} intensity={0.3} />

        {/* <pointLight position={[100, 100, 100]} intensity={5} /> */}
        <meshStandardMaterial transparent={false} opacity={1} />
        {/* <Environment preset="sunset" background /> */}
        <Environment files="/environments/background.hdr" background />

        {/* 
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh> */}
        {/* <directionalLight position={[0, 0, 0]} color={"red"} /> */}

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[200, 200]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>

        <directionalLight
          position={[10, 20, 10]}
          intensity={2}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-bias={-0.0005}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <pointLight position={[100, 100, 100]} intensity={5} castShadow />

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={5}
        />

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
          position={[34.17302419523004, 1.8446897452499078, -32.760082019452]}
        />

        <OrbitControls ref={controls} camera={camera.current} />
      </Canvas>
    </>
  );
};

export default Experience;
