import { RouterProvider } from 'react-router';
import router from '#/router';
import { Button } from '@react-admin-core/shadcn-ui';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div>1223</div>
      <Button>我是按钮</Button>
    </>
  );
}

export default App;
