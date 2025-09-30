### 1、TSConfig 配置文件

- `base.json`：基础 TSConfig 配置文件，包含通用的编译选项，其他项目的 TSConfig 配置文件可以继承自该文件。
- `node.json`：Node.js 项目的 TSConfig 配置文件，用于编译 Node.js 代码。
- `library.json`：库项目的 TSConfig 配置文件，用于编译库代码。

### 2、TSConfig 配置项含义

- `"composite": false`
  - 取值说明：true（启用复合项目）| false（禁用）
  - 配置原因：当前项目未使用 TypeScript 的 "项目引用" 功能（用于多项目依赖管理），关闭可简化配置，适合单项目开发。

- `"target": ESNext`
  - 取值说明：指定编译输出的 JS 版本，如ES5（兼容旧环境）、ES2020（特定标 准）、ESNext（最新标准）
  - 配置原因：使用ESNext表明项目希望使用最新 ECMAScript 特性（如箭头函数、模块语法等），通常配合 Babel 等工具做进一步兼容性处理，适合现代浏览器或 Node.js 环境。

- `"moduleDetection": force`
  - 取值说明：auto（自动检测模块）、force（强制所有文件为模块）、off（关闭自动检测）
  - 配置原因：force确保所有文件被视为模块，避免因缺少import/export导致的全局作用域污染，适合严格的模块化项目。

- `"experimentalDecorators": true`
  - 取值说明：true（启用）| false（禁用）
  - 配置原因：项目中使用了装饰器语法（如 Angular、MobX 等框架的@Component、@observable），需开启此实验性特性（尽管装饰器已进入 ES 标准，但部分工具仍依赖此配置）。

- `"allowImportingTsExtensions": true`
  - 取值说明：true（启用）| false（禁用）
  - 配置原因：项目中使用了 TypeScript 文件的扩展名（如 .ts、.tsx），需开启此选项以允许直接导入这些文件（如 import utils from './utils.ts'）。

- `"baseUrl": "."`
  - 取值说明：模块解析的基准目录（如./src、./lib等）
  - 配置原因：设置为当前目录（.），使非相对路径导入（如import utils from 'utils'）从项目根目录开始解析，简化长路径导入（避免../../层级嵌套）。

- `"module": ESNext`
  - 取值说明：取值说明：输出模块格式，如CommonJS（Node.js 默认）、UMD（通用模块）、ESNext（最新 ES 模块）
  - 配置原因：使用ESNext生成符合最新 ES 模块标准的代码（import/export），适合现代浏览器或支持 ES 模块的 Node.js 环境（需配合"type": "module"使用）。

- `"moduleResolution": nodenext`
  - 取值说明：模块解析策略，node（传统 Node.js 规则）、nodenext（Node.js 最新规则，支持 ES 模块与 CommonJS 混合）
  - 配置原因：nodenext遵循 Node.js 最新的模块解析逻辑，能正确处理.mjs/.cjs文件和package.json中的type字段，适合 ES 模块与 CommonJS 共存的项目。

- `"ignoreDeprecations": "6.0"`
  - 取值说明：指定忽略的 TypeScript 版本（如 "6.0"），用于解决旧版本 TypeScript 不支持的语法或行为。
  - 配置原因：项目中使用了 TypeScript 6.0 引入的新语法或行为（如装饰器），而旧版本 TypeScript 不支持，需忽略这些警告。

- `"resolveJsonModule": true`
  - 取值说明：true（允许导入 JSON）| false（禁止）
  - 配置原因：项目中需要导入 JSON 文件（如配置文件、数据文件），开启后可直接通过import config from './config.json'导入并获得类型提示。

- `"strict": strict`
  - 取值说明：true（启用所有严格检查）| false（禁用）
  - 配置原因：strict: true是严格类型检查的总开关，可避免隐式类型错误（如null赋值给非空类型），适合对类型安全要求高的项目（如大型应用、库开发）。

- `"strictNullChecks": true`
  - 取值说明：true（严格检查null/undefined）| false（允许隐式赋值）
  - 配置原因：作为strict的子选项，强制null和undefined必须显式处理（如通过可选链?.或非空断言!），减少 "无法读取 undefined 属性" 类错误。

- `"noFallthroughCasesInSwitch": true`
  - 取值说明：true（禁止 switch 穿透）| false（允许）
  - 配置原因：防止 switch 语句中因忘记写break导致的逻辑错误（如 case 分支意外执行下一个 case），强制每个 case 必须显式终止（break/return/throw）。

- `"noImplicitAny": true`
  - 取值说明：true（禁止隐式any）| false（允许）
  - 配置原因：避免 TypeScript 无法推断类型时默认使用any（失去类型检查意义），强制开发者显式声明类型，提升代码可读性和可维护性。

- `"noImplicitOverride": true`
  - 取值说明：true（强制重写方法用override关键字）| false（允许隐式重写）
  - 配置原因：防止子类意外重写父类方法（如拼写错误），通过override关键字明确标识 "有意重写"，增强代码可读性。

- `"noImplicitThis": true`
  - 取值说明：true（禁止this隐式为any）| false（允许）
  - 配置原因：避免函数中this类型默认为any（如回调函数、对象方法），强制显式声明this类型（如function(this: MyClass) {}），防止this指向错误。

- `"noUncheckedIndexedAccess": true`
  - 取值说明：true（严格检查索引访问）| false（宽松检查）
  - 配置原因：对数组 / 对象的索引访问（如arr[0]、obj.key）进行严格检查，返回T | undefined类型，避免访问不存在的索引 / 属性导致的错误。

- `"noUnusedLocals": true`
  - 取值说明：true（禁止未使用的局部变量）| false（允许）
  - 配置原因：检测并报错未使用的变量（如定义后未引用），减少冗余代码，保持代码整洁。

- `"noUnusedParameters": true`
  - 取值说明：true（禁止未使用的函数参数）| false（允许）
  - 配置原因：与上一项类似，检测函数中未使用的参数，避免参数定义与实际逻辑脱节（如需保留可加下划线前缀\_param）。

- `"inlineSources": false`
  - 取值说明：true（将源码内联到 source map）| false（不内联）
  - 配置原因：false表示不将 TypeScript 源码嵌入 source map 文件，减少文件体积，适合生产环境（调试时可通过原始文件路径映射）。

- `"noEmit": true`
  - 取值说明：true（不生成输出文件）| false（生成）
  - 配置原因：项目可能使用 Webpack、Vite 等构建工具处理编译，TypeScript 仅用于类型检查（不直接生成 JS 文件），因此关闭输出。

- `"removeComments": true`
  - 取值说明：true（移除注释）| false（保留）
  - 配置原因：若后续需生成输出文件，true可移除代码中的注释，减小输出体积（配合noEmit: true时此配置实际无效果）。

- `"sourceMap": false`
  - 取值说明：true（生成 source map）| false（不生成）
  - 配置原因：因noEmit: true已关闭输出，无需生成 source map（调试依赖构建工具生成的 map 文件），减少编译开销。

- `"allowSyntheticDefaultImports": true`
  - 取值说明：true（允许合成默认导入）| false（禁止）
  - 配置原因：对于没有默认导出的 CommonJS 模块（如module.exports = { ... }），允许用import mod from 'mod'语法导入（仅类型检查层面，不影响实际编译），统一导入风格。

- `"esModuleInterop": true`
  - 取值说明：true（启用 ES 与 CommonJS 互操作）| false（禁用）
  - 配置原因：解决 ES 模块（import）与 CommonJS 模块（require）的兼容问题，生成额外代码使两种模块可互相导入（如import \* as mod from 'mod'可转为const mod = require('mod')）。

- `"forceConsistentCasingInFileNames": true`
  - 取值说明：true（强制文件名大小写一致）| false（不强制）
  - 配置原因：避免在不区分大小写的文件系统（如 Windows）上因文件名大小写不一致导致的问题（如Import utils from './Utils'实际文件为utils.ts），保证跨系统兼容性。

- `"isolatedModules": true`
  - 取值说明：true（每个文件必须是独立模块）| false（允许非模块文件）
  - 配置原因：与 Babel、SWC 等转译工具兼容，这些工具要求每个文件都是独立模块（有import/export），避免因全局脚本文件导致的转译错误。

- `"verbatimModuleSyntax": true`
  - 取值说明：true（保留原始模块语法）| false（自动转换）
  - 配置原因：禁止 TypeScript 自动转换模块语法（如不将import转为require），保持源码模块语法原样，适合由构建工具统一处理模块转换的场景。

- `"skipLibCheck": true`
  - 取值说明：true（跳过声明文件检查）| false（检查）
  - 配置原因：跳过对node_modules中.d.ts声明文件的类型检查，加快编译速度（声明文件通常由库作者维护，出错概率低）。

- `"preserveWatchOutput": true`
  - 取值说明：true（保留 watch 模式输出）| false（清空输出）
  - 配置原因：在tsc --watch模式下，保留之前的编译输出日志，仅追加新内容，方便对比多次编译的错误信息。

- `"lib": ["ESNext", "DOM", "DOM.Iterable"]`
  - 取值说明：指定 TypeScript 编译时引用的内置库声明文件，可选值包括：
    - 语言库：ES5、ES6、ES2020、ESNext（对应 ECMAScript 标准库）
    - 环境库：DOM（浏览器 DOM API）、WebWorker（Web Worker 环境）、Node（Node.js 环境）
    - 扩展库：DOM.Iterable（DOM 可迭代对象）、ScriptHost（Windows 脚本宿主）等
  - 配置原因：
    - 若不指定，TypeScript 会根据target自动推断（如target: ES5默认包含ES5+DOM）。
    - 显式指定可精确控制项目依赖的 API 类型（如前端项目需DOM库，Node.js 项目需Node库）。
    - 示例["ESNext", "DOM"]表示使用最新 ES 特性 + 浏览器 DOM API，适合现代前端开发。

- `"useDefineForClassFields": true`
  - 取值说明：true（使用defineProperty定义类字段）| false（使用赋值语法）
  - 配置原因：
    - 当设为true时，TypeScript 会将类字段编译为Object.defineProperty形式（符合 ES 标准的类字段语义）。
    - 当设为false时，编译为简单赋值（this.field = value），兼容旧环境但不符合最新标准。
    - 现代项目通常设为true，以支持类字段的私有性（如#privateField）和继承特性，配合target: ESNext使用。

- `"jsx": "react-jsx"`
  - 取值说明：指定 JSX 语法的编译方式，主要选项：
    - "preserve"：保留 JSX 语法不编译，由 Babel 等工具处理（如 React 项目用 Babel 时）。
    - "react"：编译为React.createElement调用（传统 React 17 之前的写法）。
    - "react-jsx"：编译为\_jsx函数调用（React 17 + 新语法，需引入react/jsx-runtime），会自动从 jsxImportSource 指定的来源导入 \_jsx 函数（默认从 react/jsx-runtime 导入）。
    - "react-jsxdev"：编译为\_jsxDev函数调用（开发环境，包含额外的调试信息），需引入react/jsx-dev-runtime。
      - 输出代码包含额外调试信息，运行时会提供更友好的错误提示。
      - 生产环境需切换为 react-jsx 以减少代码体积。
    - "react-native": 保留 JSX 语法但输出 .js 文件（而非 .jsx），适配 React Native 环境。
      - 原因：React Native 有自己的 JSX 解析器（不依赖浏览器 DOM），TypeScript 只需将 .tsx 文件转换为 .js 即可，无需编译 JSX 语法。

  - 配置原因：
    - 前端框架决定取值（如 React 17 + 用"react-jsx"，Vue 用"vue"）。
    - react-jsx相比react减少了对React全局变量的依赖，更符合现代 React 开发模式。

- `"jsxImportSource": "react"`
  - 取值说明：react | vue
    ```json
    // react 17+
    {
      "jsx": "react-jsx", // 现代 React JSX 编译模式
      "jsxImportSource": "react" // 从 React 包导入运行时（默认值，可省略）
    }
    // Vue3
    {
      "jsx": "preserve",           // Vue 通常由 Babel 处理 JSX，保留原始语法
      "jsxImportSource": "vue"  // 配合 Vue 运行时
    }
    ```

- `"declaration": true`
  - 取值说明：true（生成.d.ts声明文件）| false（不生成）
  - 配置原因：
    - 若项目是类库（供其他项目导入），需设为true，生成声明文件让使用者获得类型提示。
    - 应用项目（如前端应用）通常设为false，避免冗余的声明文件。
    - 配合declarationDir: "./types"可指定声明文件输出目录，保持代码结构整洁。
