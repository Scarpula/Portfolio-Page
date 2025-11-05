import ReactFullpage from '@fullpage/react-fullpage';
import { useState } from 'react';
import { motion } from 'framer-motion';
import MainSection from '../components/sections/MainSection';
import MenuSection from '../components/sections/MenuSection';

const HomePage = () => {
  const [section2Loaded, setSection2Loaded] = useState(false);

  return (
    <motion.div
      className="fullpage-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ReactFullpage
      licenseKey={'OPEN-SOURCE-GPLV3-LICENSE'} // GPLv3 오픈소스 라이센스
      scrollingSpeed={1000}
      navigation
      navigationPosition="right"
      showActiveTooltip={false}
      credits={{ enabled: false }}
      afterLoad={(_origin, destination) => {
        if (destination.index === 1) {
          // Section 2 (index 1)에 도달했을 때 Canvas 렌더링 활성화
          setSection2Loaded(true);
        }
      }}
      render={() => {
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <MainSection />
            </div>
            <div className="section">
              <MenuSection canvasReady={section2Loaded} />
            </div>
          </ReactFullpage.Wrapper>
        );
      }}
    />
    </motion.div>
  );
};

export default HomePage;
