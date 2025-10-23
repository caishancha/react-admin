import { createBrowserRouter } from 'react-router';
import { Layout } from '#/layouts';
import { Workbench } from '#/pages/workbench';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Workbench,
      },
    ],
  },
]);

export default router;
