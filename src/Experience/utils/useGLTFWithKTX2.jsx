import React from "react";
import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { KTX2Loader } from "three-stdlib";

const ktx2loader = new KTX2Loader();
ktx2loader.setTranscoderPath("/basis/");

export function useGLTFWithKTX2(path) {
  const { gl } = useThree();

  return useGLTF(path, true, true, (loader) => {
    loader.setKTX2Loader(ktx2loader.detectSupport(gl));
  });
}
