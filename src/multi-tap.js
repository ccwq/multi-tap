/**
 * MultiTap 类用于在短时间间隔内连续调用时，根据调用次数执行不同的处理函数。
 *
 * @example
 * // 创建一个 MultiTap 实例，设置三个处理函数
 * const multiTap = new MultiTap([
 *   // handler1: 单次调用，必须提供
 *   (count) => console.log(`单击：${count} 次`),
 *   // handler2: 400ms 内连续调用 2 次，必须提供
 *   (count) => console.log(`双击：${count} 次`),
 *   // handler3: 400ms 内连续调用 3 次，可选（后续 handler 均为可选）
 *   (count) => console.log(`三击：${count} 次`)
 * ]);
 *
 * // 监听键盘事件：每次按空格键都会调用 trigger 方法
 * document.addEventListener("keydown", (event) => {
 *   // 这里以空格键为例，也可以根据需要修改为其他键
 *   if (event.code === "Space") {
 *     multiTap.trigger();
 *   }
 * });
 *
 * // 提示信息：
 * console.log("请在 400ms 内连续按空格键进行测试！");
 */
class MultiTap {
    /**
     * 构造函数
     *
     * @param {Function[]} handlers - 一个函数数组，对应连续调用次数的处理函数：
     *                                handlers[0] 用于 1 次调用，
     *                                handlers[1] 用于 2 次调用，
     *                                handlers[2] 用于 3 次调用（可选），依次类推。
     *                                至少需要提供前两个处理函数。
     * @param {number} [interval=400] - 多次调用之间允许的间隔（毫秒），默认为 400ms。
     *
     * @throws {Error} 当 handlers 不是数组或数量少于 2 时抛出错误。
     */
    constructor(handlers, interval = 400) {
      if (!Array.isArray(handlers) || handlers.length < 2) {
        throw new Error("必须提供至少两个处理函数（handler）。");
      }
      this.handlers = handlers;
      this.interval = interval;
      this.count = 0;
      this.timer = null;
    }
  
    /**
     * 触发调用记录。每次外部事件（例如按键）到来时，请调用此方法，
     * 系统会在间隔期内统计调用次数，超过间隔后执行对应的处理函数。
     *
     * 执行逻辑：
     * 1. 每次调用 trigger() 时，将内部计数器加 1。
     * 2. 如果之前已经启动了等待计时器则清除计时器，开始一个新的 400ms 倒计时。
     * 3. 当 400ms 过去没有新的调用时，依据计数器值选择对应的处理函数执行：
     *    - 如果 handlers 中存在与计数器相应的处理函数，则执行之；
     *    - 否则，使用 handlers 数组中的最后一个处理函数作为默认（也适用于超过已设定的次数）。
     * 4. 执行完成后，重置计数器和计时器。
     */
    trigger(data) {
      this.count++;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const index = this.count - 1; // 数组索引从0开始
        // 如果没有对应的 handler，则使用最后一个 handler 做为默认行为
        const handler = this.handlers[index] || this.handlers[this.handlers.length - 1];
        handler(data, this.count);
        // 重置计数器和定时器
        this.count = 0;
        this.timer = null;
      }, this.interval);
    }
  }

  // 导出 MultiTap 类
  module.exports = { MultiTap };
  