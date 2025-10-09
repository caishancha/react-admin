import { RouterProvider } from 'react-router';
import router from '#/router';
import { Button } from '@react-admin-core/shadcn-ui';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div className="text-red-500 rounded-lg z-100 bg-primary">1223</div>
      <Button variant="destructive">Button</Button>
    </>
  );
}

export default App;
