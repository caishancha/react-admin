import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: [
    'src/store',
    'src/utils/index',
    'src/cache/index',
    'src/constants/index',
    'src/color/index',
    'src/global-state',
  ],
});
