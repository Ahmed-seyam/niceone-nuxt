export const useMyFetch = (request: any, opts: any) => {
  const runtimeConfig = useRuntimeConfig()

  // type UseFetchOptions = {
  //     key?: string
  //     method?: string
  //     query?: SearchParams
  //     params?: SearchParams
  //     body?: RequestInit['body'] | Record<string, any>
  //     headers?: Record<string, string> | [key: string, value: string][] | Headers
  //     baseURL?: string
  //     server?: boolean
  //     lazy?: boolean
  //     immediate?: boolean
  //     default?: () => DataT
  //     transform?: (input: DataT) => DataT
  //     pick?: string[]
  //     watch?: WatchSource[]
  //   }

  return useFetch(() => request, {
    baseURL:
      runtimeConfig.public.nodeENV === 'dev'
        ? runtimeConfig.public.apiDevBase
        : runtimeConfig.public.apiProdBase,
    ...opts,
  })
}
