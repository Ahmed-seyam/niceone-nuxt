<script setup>
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const authStore = stores.authStore

const { t, locale } = useLang()
const router = useRouter()

const user = reactive({
  email: '',
})

const rules = {
  email: {
    required,
    email,
  },
}

const v$ = useVuelidate(rules, user, { $lazy: true })

const loading = ref(false)

const submitForm = async (e) => {
  e.preventDefault()
  v$.value.$touch()

  if (loading.value || v$.value.$invalid) return
  loading.value = true
  const res = await authStore.forgotMyPassword(user.email)
  loading.value = false
  console.log(res)

  if (res) router.push(`/auth/reset-token-sent`)
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
      {{ t('type_your_email') }}
    </h1>

    <form
      autocomplete="off"
      @submit.prevent="submitForm"
      class="grid gap-1 w-25rem"
      autofocus="true"
    >
      <div class="m-b-1rem">
        <span class="p-float-label">
          <InputText
            v-model.trim="user.email"
            id="email"
            name="email"
            type="text"
            :class="{
              '!bg-[var(--gray-100)]': true,
              '!p-x-1rem': true,
            }"
            aria-describedby="text-error"
            @blur="v$.email.$touch"
            readonly
            onfocus="this.removeAttribute('readonly');"
          />

          <label
            for="email"
            class="!rtl:right-.5rem color-[var(--blue-700)]"
            :class="{
              '!top--.75rem': user.email,
            }"
            >{{ t('email') }}</label
          >
        </span>

        <small class="p-error" id="text-error" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message || '&nbsp;'
        }}</small>
      </div>

      <Button type="submit">
        <div class="m-auto">
          {{ t('send') }}
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
