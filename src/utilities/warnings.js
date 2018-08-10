export const warnIfOutOfSync = (value0, value1) => {
  console.assert(value0 === value1, OUT_OF_SYNC_ERROR)
}

const OUT_OF_SYNC_ERROR = 'Storage values out of sync.'
