import {Suspense, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import Loader from '../components/Loader'

import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

const Home = () => {
  const[isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    }else{
      screenScale = [1,1,1];
    }

    return [screenScale, screenPosition, rotation];
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition ;

    if (window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0,-1.5, 0];
    }else{
      screenScale = [3,3,3];
      screenPosition = [0,-4, -4];
    }

    return [screenScale, screenPosition];
  }

  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-0 flex items-center justify-center">
        POPUP 
      </div> */}
      <Canvas className = {`^w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      camera={{near: 0.1, far: 1000}}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position = {[1, 1, 1]} intensity = {2}/>
          <ambientLight intensity={0.5}/>
          <pointLight/>
          <spotLight/>
          <hemisphereLight skycolor="#b1e1ff" groundColor="#000000" intensity ={1} />

          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Bird/>
          <Plane
          isRotating={isRotating}
          planeScale={planeScale}
          planePosition={planePosition}
          rotation={[0, 20.1, 0]}
          />
          <Sky isRotating={isRotating}/>
        </Suspense>
      </Canvas>
      
    </section>
  )
}

export default Home