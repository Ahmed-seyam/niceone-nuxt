export const useMyFetch = (request: any, opts: any = {}) => {
  const runTimeConfig = useRuntimeConfig()
  const locale = useState<string>('locale.setting')

  if (!opts.query) opts.query = {}
  if (opts && opts.query)
    opts.query = {
      ...opts.query,
      currencyId: '646f759538e9f5aeed137cee',
      lang: locale.value,
      limit: 10,
    }

  return $fetch(request, {
    baseURL:
      runTimeConfig.public.nodeENV === 'dev'
        ? runTimeConfig.public.apiDevBase
        : runTimeConfig.public.apiProdBase,
    ...opts,
    credentials: 'include',
    lazy: true,
  })
}
