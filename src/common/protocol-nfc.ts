export const NFC_CONSTS = {
  FLAG_REQUEST: 0x02,
  MFG_CODE: 0x02,
} as const

export const NFC_CMD = {
  // ST25DV 指令集
  CMD_READ_MSG_LEN: 0xAB,
  CMD_READ_MSG: 0xAC,
  CMD_WRITE_MSG: 0xAA,
  CMD_READ_DYN: 0xAD,
  CMD_WRITE_DYN: 0xAE,
  REG_MB_CTRL_DYN: 0x0D,

  /** 解锁 */
  UNLOCK: 0x33,
  /** 恢复闭锁 */
  FORCE_LOCK: 0x34,
} as const
