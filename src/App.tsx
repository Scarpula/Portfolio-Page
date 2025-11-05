import ReactFullpage from '@fullpage/react-fullpage';
import { useState } from 'react';
import MainSection from './components/sections/MainSection';
import MenuSection from './components/sections/MenuSection';
import './App.css';

function App() {
  const [section2Loaded, setSection2Loaded] = useState(false);

  return (
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
  );
}

export default App;
