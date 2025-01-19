<script setup>
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const authStore = stores.authStore

const { t, locale } = useLang()
const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

const rules = {
  email: {
    required,
    email,
  },
  password: {
    required,
  },
}

const v$ = useVuelidate(rules, user, { $lazy: true })

const userIsBeingLoggedIn = ref(false)

const submitForm = async (e) => {
  e.preventDefault()
  v$.value.$touch()

  if (userIsBeingLoggedIn.value || v$.value.$invalid) return
  userIsBeingLoggedIn.value = true
  const res = await authStore.login(user)
  userIsBeingLoggedIn.value = false
  console.log(res)
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
      {{ t('login_into_your_account') }}
    </h1>

    <form
      autocomplete="off"
      @submit.prevent="submitForm"
      class="grid gap-1 w-25rem"
      autofocus="true"
    >
      <div class="m-b-1.5rem">
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
            >{{ t('password') }}</label
          >
        </span>

        <small class="p-error" id="text-error" v-if="v$.password.$error">{{
          v$.password.$errors[0].$message || '&nbsp;'
        }}</small>
      </div>

      <Button type="submit">
        <div class="m-auto">
          {{ t('nav.login') }}
        </div>
      </Button>

      <div
        class="text-1rem p-t-.5rem autogrid items-center justify-between text-center color-[var(--blue-500)]"
      >
        forgot your password ?

        <nuxt-link to="/auth/forgot-my-password">
          <Button text type="button" class="!w-fit !p-x-1rem !p-y-0">
            <div class="underline">
              {{ t('forgot-my-password') }}
            </div>
          </Button>
        </nuxt-link>
      </div>

      <div
        class="text-1rem p-t-.5rem autogrid items-center justify-between text-center color-[var(--blue-500)]"
      >
        you don't have an account ?

        <nuxt-link to="/auth/register">
          <Button text type="button" class="!w-fit !p-x-1rem !p-y-0">
            <div class="underline">
              {{ t('nav.register') }}
            </div>
          </Button>
        </nuxt-link>
      </div>
    </form>
    <Toast />
  </div>
</template>

<style scoped>
:deep(.p-password-input) {
  background-color: var(--gray-100) !important;
}
</style>
