# MultiTap

**MultiTap** 是一个用于在短间隔内连续触发调用时，根据调用次数执行不同处理函数的 JavaScript 类。  
你可以为不同的连续调用次数指定专属的处理函数，例如：  
- 单击时执行 handler1  
- 400ms 内连续按两次时执行 handler2  
- 400ms 内连续按三次时执行 handler3（以及更多可选 handler）

如果连续调用次数超出了你提供的处理函数数量，则自动使用最后一个处理函数作为默认处理逻辑。

## 安装

### NPM
```bash
npm install multi-tap
```

### PNPM
```bash
pnpm add multi-tap
```

### YARN
```bash
yarn add multi-tap
```

### 直接引入

将 `src/multi-tap.js` 文件加入到你的项目中即可。  
例如，你可以直接在 HTML 中通过 `<script>` 标签引入：

```html
<script src="path/to/multi-tap.js"></script>
```

## 使用方法

### ESM 模块导入
```javascript
import { MultiTap } from 'multi-tap';

// 创建实例并设置处理函数
const multiTap = new MultiTap([
  // 单击处理函数
  count => console.log(`单击：${count} 次`),
  // 双击处理函数
  count => console.log(`双击：${count} 次`),
  // 三击处理函数（可选）
  count => console.log(`三击：${count} 次`)
]);

// 在需要的地方调用 trigger 方法
multiTap.trigger();
```

### CommonJS 模块导入
```javascript
const { MultiTap } = require('multi-tap');

// 创建实例并设置处理函数
const multiTap = new MultiTap([
  // 单击处理函数
  count => console.log(`单击：${count} 次`),
  // 双击处理函数
  count => console.log(`双击：${count} 次`),
  // 三击处理函数（可选）
  count => console.log(`三击：${count} 次`)
]);
```

### 与 DOM 事件结合

```javascript
// 监听按钮点击事件
document.querySelector('#myButton').addEventListener('click', () => {
  multiTap.trigger();
});
```

## 运行测试

项目包含了基本的测试用例，你可以通过以下命令运行测试：

```bash
npm test
```

## 许可证

[MIT](LICENSE)
