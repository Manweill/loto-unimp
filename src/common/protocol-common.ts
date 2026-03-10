// ArrayBuffer转16进度字符串示例
export function ab2hex(buffer: number[]) {
  const hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    (bit) => {
      return (`00${bit.toString(16)}`).slice(-2)
    },
  )
  return hexArr.join('')
}
