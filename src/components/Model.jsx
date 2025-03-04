import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect } from 'react';
import * as THREE from 'three';

const Model = ({ url, onLoad }) => {
  const gltf = useLoader(GLTFLoader, url);
  
  useEffect(() => {
    if (gltf) {
      // Center the model
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      gltf.scene.position.x += -center.x;
      gltf.scene.position.y += -center.y;
      gltf.scene.position.z += -center.z;

      // Scale the model to fit in view
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1 / maxDim;
      gltf.scene.scale.setScalar(scale);

      // Call onLoad callback if provided
      if (onLoad) {
        onLoad();
      }
    }
  }, [gltf, onLoad]);

  return (
    <primitive 
      object={gltf.scene}
      dispose={null}
    />
  );
};

export default Model; 