import { RouterProvider } from 'react-router';
import router from '#/router';
import { Button } from '@react-admin-core/shadcn-ui';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div className="text-red-500 rounded-md">1223</div>
      <Button variant="outline">Button</Button>
    </>
  );
}

export default App;
