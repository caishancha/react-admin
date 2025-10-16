import { updatePreferences } from '@react-admin/preferences';
import { useIsMobile } from '@react-admin/hooks';
import { RouterProvider } from 'react-router';
import router from '#/router';
import { useEffect } from 'react';

function App() {
  // 监听断点，判断是否移动端
  const { isMobile } = useIsMobile();
  useEffect(() => {
    console.log('isMobile', isMobile);

    updatePreferences({
      app: { isMobile },
    });
  }, [isMobile]);
  return <RouterProvider router={router} />;
}

export default App;
