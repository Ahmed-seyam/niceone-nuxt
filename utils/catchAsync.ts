import { Alert } from '@/utils/Alert.js'

export default (fn: Function, fnOnError: Function | undefined = undefined) => {
  return (...args: any) => {
    return fn(...args).catch((error: Error) => {
      if (!fnOnError) {
        console.log(error)
        Alert('error', error.message, 3000)
      } else {
        fnOnError()
      }
    })
  }
}
