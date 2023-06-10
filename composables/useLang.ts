import { useI18n } from 'vue-i18n'

export const useLang = () => {
  const { t } = useI18n()
  const locale = useState<string>('locale.setting')

  const isArabic = computed(() => {
    return locale.value === 'ar' ? true : false
  })

  const changeLang = (val: any) => {
    locale.value = val
  }

  return {
    t,
    isArabic,
    locale,
    changeLang,
  }
}
