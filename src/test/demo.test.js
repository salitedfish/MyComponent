import { genDemo } from "./demo"

test('测试genDemo函数', () => {
    expect(genDemo(1, 2, 3)).toBe(6)
})