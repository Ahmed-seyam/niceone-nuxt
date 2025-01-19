<script setup>
import { minLength, required, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const authStore = stores.authStore

const { t, locale } = useLang()
const router = useRouter()
const route = useRoute()

const user = reactive({
  password: '',
  passwordConfirm: '',
})

const password = computed(() => user.password)

const rules = {
  passwordConfirm: {
    required,
    sameAsPassword: sameAs(password),
  },
  password: {
    required,
    minLengthValue: minLength(8),
  },
}

const v$ = useVuelidate(rules, user, { $lazy: true })

const loading = ref(false)

const submitForm = async (e) => {
  e.preventDefault()
  v$.value.$touch()

  if (loading.value || v$.value.$invalid) return
  loading.value = true

  const res = await authStore.resetPassword(user, route.params.resetToken)

  loading.value = false
  if (res) router.push('/home')
}
</script>

<template>
  <div
    class="grid gap-2rem border-2 p-x-2rem p-t-3rem p-b-2rem rounded-2rem bg-white color-[var(--blue-900)]"
  >
    <h1
      class="text-1.4rem autogrid items-center grid-cols-[min-content_max-content] gap-4"
    >
      <div
        i-carbon:user-avatar-filled-alt
        class="color-[var(--blue-500)]"
      ></div>
      {{ t('reset_your_password') }}
    </h1>

    <form
      autocomplete="off"
      @submit.prevent="submitForm"
      class="grid gap-1 w-25rem"
      autofocus="true"
    >
      <div class="m-b-1.5rem">
        <span class="p-float-label">
          <Password
            v-model.trim="user.password"
            id="password"
            name="password"
            type="text"
            class="!w-full"
            aria-describedby="text-error"
            @blur="v$.password.$touch"
            readonly
            onfocus="this.removeAttribute('readonly');"
          />

          <label
            for="password"
            class="!rtl:right-.5rem color-[var(--blue-700)]"
            :class="{
              '!top--.75rem': user.password,
            }"
            >{{ t('new') }} {{ t('password') }}</label
          >
        </span>

        <small class="p-error" id="text-error" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message || '&nbsp;'
        }}</small>
      </div>

      <div class="m-b-1.5rem">
        <span class="p-float-label">
          <Password
            v-model.trim="user.passwordConfirm"
            id="passwordConfirm"
            name="passwordConfirm"
            type="text"
            class="!w-full"
            aria-describedby="text-error"
            @blur="v$.passwordConfirm.$touch"
            readonly
            onfocus="this.removeAttribute('readonly');"
          />

          <label
            for="passwordConfirm"
            class="!rtl:right-.5rem color-[var(--blue-700)]"
            :class="{
              '!top--.75rem': user.passwordConfirm,
            }"
            >{{ t('confirm_password') }}</label
          >
        </span>

        <small
          class="p-error"
          id="text-error"
          v-if="v$.passwordConfirm.$error"
          >{{ v$.passwordConfirm.$errors[0].$message || '&nbsp;' }}</small
        >
      </div>

      <Button type="submit">
        <div class="m-auto">
          {{ t('save') }}
        </div>
      </Button>
    </form>
    <Toast />
  </div>
</template>

<style scoped>
:deep(.p-password-input) {
  background-color: var(--gray-100) !important;
}
</style>
