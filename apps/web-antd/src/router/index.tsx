import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <div className="text-3xl">home</div>
        <span className="icon-[mdi-light--home]"></span>
      </div>
    ),
  },
  {
    path: '/about',
    element: <div>About</div>,
  },
  {
    path: '*',
    element: <div>404</div>,
  },
]);

export default router;
