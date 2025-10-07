import { RouterProvider } from 'react-router';
import router from '#/router';
import { Button } from '@react-admin-core/shadcn-ui';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div className="text-red-500">1223</div>
      <div className="w-50 rounded-lg">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
