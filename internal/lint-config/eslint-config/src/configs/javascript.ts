import type { Linter } from 'eslint';
import { defineConfig } from 'eslint/config';
import jsEslint from '@eslint/js';
import globals from 'globals';
import pluginUnusedImports from 'eslint-plugin-unused-imports';

export async function javascript(): Promise<Linter.Config[]> {
  return defineConfig({
    // 语言选项配置
    languageOptions: {
      // 使用最新的ECMAScript版本
      ecmaVersion: 'latest',
      // 全局变量配置
      globals: {
        ...globals.browser, // 浏览器环境全局变量
        ...globals.es2025, // ES2025全局变量
        ...globals.node, // Node.js环境全局变量
        document: 'readonly', // document对象（只读）
        window: 'readonly', // window对象（只读）
        navigator: 'readonly', // navigator对象（只读）
      },
      // 解析器选项
      parserOptions: {
        // ECMAScript特性支持
        ecmaFeatures: {
          jsx: true, // 启用JSX支持
        },
        ecmaVersion: 'latest', // 使用最新的ECMAScript版本
        sourceType: 'module', // 使用ES模块
      },
      sourceType: 'module', // 源代码类型为模块
    },
    // linter选项
    linterOptions: {
      // 报告未使用的禁用指令
      reportUnusedDisableDirectives: true,
    },
    // 插件配置
    plugins: {
      // 未使用导入插件
      'unused-imports': pluginUnusedImports,
    },
    // 规则配置
    rules: {
      ...jsEslint.configs.recommended.rules, // 继承推荐规则

      // 访问器对规则：强制getter和setter成对出现
      'accessor-pairs': [
        'error',
        { enforceForClassMembers: true, setWithoutGet: true },
      ],
      // 数组回调返回：强制数组方法回调返回
      'array-callback-return': 'error',
      // 块作用域变量：强制在块作用域中声明变量
      'block-scoped-var': 'error',
      // 构造函数super调用：强制派生类中调用super()
      'constructor-super': 'error',
      // default case位置：强制default case在最后
      'default-case-last': 'error',
      // 点符号访问：强制使用点符号访问属性
      'dot-notation': ['error', { allowKeywords: true }],
      // 相等比较：强制使用===和!==
      eqeqeq: ['error', 'always'],
      // 关键字间距：禁用（由其他规则处理）
      'keyword-spacing': 'off',

      // new操作符大小写：强制构造函数首字母大写
      'new-cap': [
        'error',
        { capIsNew: false, newIsCap: true, properties: true },
      ],
      // 禁用alert：禁止使用alert
      'no-alert': 'error',
      // 禁用数组构造函数：禁止使用Array构造函数
      'no-array-constructor': 'error',
      // 禁用异步Promise执行器：禁止异步Promise执行器
      'no-async-promise-executor': 'error',
      // 禁用caller：禁止使用arguments.caller
      'no-caller': 'error',
      // 禁用case声明：禁止在case中声明变量
      'no-case-declarations': 'error',
      // 禁用类赋值：禁止重新分配类
      'no-class-assign': 'error',
      // 禁用负零比较：禁止与-0比较
      'no-compare-neg-zero': 'error',
      // 禁用条件赋值：禁止在条件语句中赋值
      'no-cond-assign': ['error', 'always'],
      // 禁用console：禁止使用console，但允许warn和error
      // 'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-console': 'off',
      // 禁用const赋值：禁止重新分配const变量
      'no-const-assign': 'error',
      // 禁用控制字符：禁止在正则表达式中使用控制字符
      'no-control-regex': 'error',
      // 禁用debugger：禁止使用debugger
      'no-debugger': 'error',
      // 禁用delete变量：禁止删除变量
      'no-delete-var': 'error',
      // 禁用重复参数：禁止函数参数重复
      'no-dupe-args': 'error',
      // 禁用重复类成员：禁止类成员重复
      'no-dupe-class-members': 'error',
      // 禁用重复键：禁止对象字面量中重复键
      'no-dupe-keys': 'error',
      // 禁用重复case：禁止switch case重复
      'no-duplicate-case': 'error',
      // 禁用空块：禁止空块，但允许空catch
      'no-empty': ['error', { allowEmptyCatch: true }],
      // 禁用空字符类：禁止正则表达式中空字符类
      'no-empty-character-class': 'error',
      // 禁用空函数：禁用（由其他规则处理）
      'no-empty-function': 'off',
      // 禁用空模式：禁止解构中的空模式
      'no-empty-pattern': 'error',
      // 禁用eval：禁止使用eval
      'no-eval': 'error',
      // 禁用异常赋值：禁止重新分配异常变量
      'no-ex-assign': 'error',
      // 禁用扩展原生对象：禁止扩展原生对象原型
      'no-extend-native': 'error',
      // 禁用额外bind：禁止不必要的bind
      'no-extra-bind': 'error',
      // 禁用额外布尔转换：禁止不必要的布尔转换
      'no-extra-boolean-cast': 'error',
      // 禁用fallthrough：禁止case穿透
      'no-fallthrough': 'error',
      // 禁用函数赋值：禁止重新分配函数
      'no-func-assign': 'error',
      // 禁用全局赋值：禁止重新分配全局变量
      'no-global-assign': 'error',
      // 禁用隐式eval：禁止隐式eval
      'no-implied-eval': 'error',
      // 禁用导入赋值：禁止重新分配导入
      'no-import-assign': 'error',
      // 禁用无效正则：禁止无效的正则表达式
      'no-invalid-regexp': 'error',
      // 禁用不规则空白：禁止不规则空白字符
      'no-irregular-whitespace': 'error',
      // 禁用iterator：禁止使用__iterator__
      'no-iterator': 'error',
      // 禁用标签：禁止使用标签
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      // 禁用孤立块：禁止孤立块
      'no-lone-blocks': 'error',
      // 禁用精度丢失：禁止精度丢失
      'no-loss-of-precision': 'error',
      // 禁用误导性字符类：禁止正则表达式中误导性字符类
      'no-misleading-character-class': 'error',
      // 禁用多行字符串：禁止多行字符串
      'no-multi-str': 'error',
      // 禁用new：禁止new操作符副作用
      'no-new': 'error',
      // 禁用new Function：禁止new Function
      'no-new-func': 'error',
      // 禁用new Object：禁止new Object
      'no-new-object': 'error',
      // 禁用new Symbol：禁止new Symbol
      'no-new-symbol': 'error',
      // 禁用new包装器：禁止new包装对象
      'no-new-wrappers': 'error',
      // 禁用对象调用：禁止将对象作为函数调用
      'no-obj-calls': 'error',
      // 禁用八进制：禁止八进制字面量
      'no-octal': 'error',
      // 禁用八进制转义：禁止八进制转义序列
      'no-octal-escape': 'error',
      // 禁用__proto__：禁止使用__proto__
      'no-proto': 'error',
      // 禁用原型内置方法：禁止直接调用原型方法
      'no-prototype-builtins': 'error',
      // 禁用重新声明：禁止变量重新声明
      'no-redeclare': ['error', { builtinGlobals: false }],
      // 禁用正则空格：禁止正则表达式中多个空格
      'no-regex-spaces': 'error',
      // 禁用受限全局变量：限制使用某些全局变量
      'no-restricted-globals': [
        'error',
        { message: 'Use `globalThis` instead.', name: 'global' },
        { message: 'Use `globalThis` instead.', name: 'self' },
      ],
      // 禁用受限属性：限制使用某些对象属性
      'no-restricted-properties': [
        'error',
        {
          message:
            'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.',
          property: '__proto__',
        },
        {
          message: 'Use `Object.defineProperty` instead.',
          property: '__defineGetter__',
        },
        {
          message: 'Use `Object.defineProperty` instead.',
          property: '__defineSetter__',
        },
        {
          message: 'Use `Object.getOwnPropertyDescriptor` instead.',
          property: '__lookupGetter__',
        },
        {
          message: 'Use `Object.getOwnPropertyDescriptor` instead.',
          property: '__lookupSetter__',
        },
      ],
      // 禁用受限语法：限制使用某些语法结构
      'no-restricted-syntax': [
        'error',
        'DebuggerStatement', // 禁用debugger语句
        'LabeledStatement', // 禁用标签语句
        'WithStatement', // 禁用with语句
        'TSEnumDeclaration[const=true]', // 禁用const枚举
        'TSExportAssignment', // 禁用TypeScript导出赋值
      ],
      // 禁用自赋值：禁止自赋值
      'no-self-assign': ['error', { props: true }],
      // 禁用自比较：禁止自比较
      'no-self-compare': 'error',
      // 禁用序列表达式：禁止序列表达式
      'no-sequences': 'error',
      // 禁用阴影受限名称：禁止遮蔽受限名称
      'no-shadow-restricted-names': 'error',
      // 禁用稀疏数组：禁止稀疏数组
      'no-sparse-arrays': 'error',
      // 禁用模板字符串中的花括号：禁止在普通字符串中使用模板字符串语法
      'no-template-curly-in-string': 'error',
      // 禁用super前使用this：禁止在super()前使用this
      'no-this-before-super': 'error',
      // 禁用字面量抛出：禁止抛出字面量
      'no-throw-literal': 'error',
      // 禁用未定义变量：禁用（由TypeScript处理）
      'no-undef': 'off',
      // 禁用未定义初始化：禁止初始化undefined
      'no-undef-init': 'error',
      // 禁用意外多行：禁止意外多行
      'no-unexpected-multiline': 'error',
      // 禁用未修改的循环条件：禁止未修改的循环条件
      'no-unmodified-loop-condition': 'error',
      // 禁用不必要的三元表达式：禁止不必要的三元表达式
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      // 禁用不可达代码：禁止不可达代码
      'no-unreachable': 'error',
      // 禁用不可达循环：禁止不可达循环
      'no-unreachable-loop': 'error',
      // 禁用不安全的finally：禁止不安全的finally
      'no-unsafe-finally': 'error',
      // 禁用不安全的否定：禁止不安全的否定
      'no-unsafe-negation': 'error',
      // 禁用未使用表达式：禁止未使用的表达式
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true, // 允许短路求值
          allowTaggedTemplates: true, // 允许标签模板
          allowTernary: true, // 允许三元表达式
        },
      ],
      // 禁用未使用变量：禁止未使用的变量
      'no-unused-vars': [
        'error',
        {
          args: 'none', // 不检查函数参数
          caughtErrors: 'none', // 不检查catch参数
          ignoreRestSiblings: true, // 忽略剩余解构兄弟
          vars: 'all', // 检查所有变量
        },
      ],
      // 禁用先使用后定义：禁止先使用后定义
      'no-use-before-define': [
        'error',
        { classes: false, functions: false, variables: false },
      ],
      // 禁用无用的反向引用：禁止无用的正则反向引用
      'no-useless-backreference': 'error',
      // 禁用无用的调用：禁止无用的call/apply
      'no-useless-call': 'error',
      // 禁用无用的catch：禁止空的catch块
      'no-useless-catch': 'error',
      // 禁用无用的计算属性：禁止无用的计算属性
      'no-useless-computed-key': 'error',
      // 禁用无用的构造函数：禁止空的构造函数
      'no-useless-constructor': 'error',
      // 禁用无用的重命名：禁止无用的重命名
      'no-useless-rename': 'error',
      // 禁用无用的返回：禁止不必要的return
      'no-useless-return': 'error',
      // 禁用var：禁止使用var
      'no-var': 'error',
      // 禁用with：禁止使用with语句
      'no-with': 'error',
      // 对象简写：强制使用对象属性简写
      'object-shorthand': [
        'error',
        'always',
        { avoidQuotes: true, ignoreConstructors: false },
      ],
      // 单变量声明：强制单变量声明
      'one-var': ['error', { initialized: 'never' }],
      // 偏好箭头回调：强制使用箭头函数作为回调
      'prefer-arrow-callback': [
        'error',
        {
          allowNamedFunctions: false, // 不允许命名函数
          allowUnboundThis: true, // 允许未绑定的this
        },
      ],
      // 偏好const：强制使用const声明不会重新赋值的变量
      'prefer-const': [
        'error',
        {
          destructuring: 'all', // 对所有解构适用
          ignoreReadBeforeAssign: true, // 忽略先读后赋的情况
        },
      ],
      // 偏好指数运算符：强制使用**运算符
      'prefer-exponentiation-operator': 'error',

      // 偏好Promise拒绝错误：强制Promise.reject使用Error对象
      'prefer-promise-reject-errors': 'error',
      // 偏好正则字面量：强制使用正则字面量而非RegExp构造函数
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      // 偏好剩余参数：强制使用剩余参数而非arguments
      'prefer-rest-params': 'error',
      // 偏好展开运算符：强制使用展开运算符而非apply
      'prefer-spread': 'error',
      // 偏好模板字符串：强制使用模板字符串而非字符串拼接
      'prefer-template': 'error',
      // 函数括号前空格：禁用（由其他规则处理）
      'space-before-function-paren': 'off',
      // 注释间距：强制注释前有空格
      'spaced-comment': 'error',
      // Symbol描述：强制Symbol有描述
      'symbol-description': 'error',
      // Unicode BOM：禁止Unicode BOM
      'unicode-bom': ['error', 'never'],

      // 未使用导入插件规则：禁止未使用的导入
      'unused-imports/no-unused-imports': 'error',
      // 未使用导入插件规则：禁止未使用的变量
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used', // 参数在使用后检查
          argsIgnorePattern: '^_', // 忽略以_开头的参数
          vars: 'all', // 检查所有变量
          varsIgnorePattern: '^_', // 忽略以_开头的变量
        },
      ],
      // 使用isNaN：强制使用isNaN检查NaN
      'use-isnan': [
        'error',
        { enforceForIndexOf: true, enforceForSwitchCase: true },
      ],
      // 有效的typeof：强制typeof操作符使用字符串字面量
      'valid-typeof': ['error', { requireStringLiterals: true }],

      // 变量在顶部：强制变量声明在作用域顶部
      'vars-on-top': 'error',
      // Yoda条件：禁止Yoda条件（字面量在前）
      yoda: ['error', 'never'],
    },
  });
}
