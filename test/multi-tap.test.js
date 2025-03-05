const { MultiTap } = require('../src/multi-tap');

describe('MultiTap', () => {
  let multiTap;
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    multiTap = new MultiTap([
      (data, count) => console.log(`检测到单击调用，共调用 ${count} 次`),
      (data, count) => console.log(`检测到双击调用，共调用 ${count} 次`),
      (data, count) => console.log(`检测到三击调用，共调用 ${count} 次`)
    ]);
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.clearAllTimers();
  });

  it('应该正确处理单次点击', (done) => {
    multiTap.trigger();
    
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith('检测到单击调用，共调用 1 次');
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      done();
    }, 500);
  });

  it('应该正确处理双击', (done) => {
    multiTap.trigger();
    multiTap.trigger();

    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith('检测到双击调用，共调用 2 次');
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      done();
    }, 500);
  });

  it('应该正确处理三击', (done) => {
    multiTap.trigger();
    multiTap.trigger();
    multiTap.trigger();

    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalledWith('检测到三击调用，共调用 3 次');
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      done();
    }, 500);
  });

  it('应该在构造时验证处理函数数量', () => {
    expect(() => new MultiTap([])).toThrow('必须提供至少两个处理函数（handler）。');
    expect(() => new MultiTap([() => {}])).toThrow('必须提供至少两个处理函数（handler）。');
  });
});