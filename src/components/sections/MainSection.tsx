import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import DeskScene from '../3d/DeskScene';
import './MainSection.css';

const MainSection = () => {
  const [lightOn, setLightOn] = useState(true);

  return (
    <div className="main-section" data-light={lightOn ? 'on' : 'off'}>
      {/* Wave 효과를 위한 배경 레이어 */}
      <motion.div
        className="light-wave"
        initial={{ x: lightOn ? '0%' : '100%' }}
        animate={{ x: lightOn ? '0%' : '100%' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      {/* Three.js 3D 책상 씬 */}
      <div className="threejs-background">
        <Canvas
          camera={{ position: [4, 3, 4], fov: 50 }}
          shadows
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <DeskScene onLightToggle={setLightOn} />
        </Canvas>
      </div>

      {/* 배경 그라데이션 레이어 */}
      <div className="background-layer"></div>

      {/* 블러 효과를 가진 컨텐츠 영역 */}
      <div className="content-wrapper">
        <motion.div
          className="content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="main-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            이성도
            <span className="title-english">Seongdo Lee</span>
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            도전하는 풀스택 개발자
          </motion.p>

          <motion.p
            className="description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            혁신적인 아이디어를 실현하는 개발자
          </motion.p>
        </motion.div>
      </div>

      {/* 인터랙션 가이드 */}
      <motion.div
        className="interaction-guide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <p>💡 전등 클릭으로 조명 ON/OFF</p>
        <p>💻 맥북 클릭으로 줌인/줌아웃</p>
        <p>🖱️ 드래그하여 씬 회전</p>
        <p>⬇️ 스크롤하여 다음 페이지로</p>
      </motion.div>

      {/* 스크롤 유도 화살표 */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          className="arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
        <span>Scroll Down</span>
      </motion.div>
    </div>
  );
};

export default MainSection;
