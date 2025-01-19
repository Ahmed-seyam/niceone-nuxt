<script setup>
import { email, minLength, required, sameAs } from '@vuelidate/validators'

import { useVuelidate } from '@vuelidate/core'
const authStore = stores.authStore

const { t, locale } = useLang()
const router = useRouter()

const password = computed(() => user.password)

const user = reactive({
  name: 'ahmed',
  email: 'ahmedseyam9090@yahoo.com',
  password: 'test1234',
  passwordConfirm: 'test1234',
})

const rules = {
  name: {
    required,
  },
  email: {
    required,
    email,
  },
  password: {
    required,
    minLengthValue: minLength(8),
  },

  passwordConfirm: {
    required,
    sameAsPassword: sameAs(password),
  },
}

const v$ = useVuelidate(rules, user, { $lazy: true })

const userIsBeingLoggedIn = ref(false)

const submitForm = async (e) => {
  e.preventDefault()
  v$.value.$touch()

  if (userIsBeingLoggedIn.value || v$.value.$invalid) return
  userIsBeingLoggedIn.value = true
  const res = await authStore.register(user)
  userIsBeingLoggedIn.value = false
  console.log(res)
  if (res) router.push('/auth/activation')
}
</script>

<template>
  <div
    class="grid gap-3rem border-2 p-x-2rem p-t-3rem p-b-1.5rem rounded-2rem bg-white color-[var(--blue-900)]"
  >
    <h1
      class="text-1.4rem autogrid items-center grid-cols-[min-content_max-content] gap-4"
    >
      <div
        i-carbon:user-avatar-filled-alt
        class="color-[var(--blue-500)]"
      ></div>
      {{ t('register_new_account') }}
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
            v-model.trim="user.name"
            id="name"
            name="name"
            type="text"
            :class="{
              '!bg-[var(--gray-100)]': true,
              '!p-x-1rem': true,
            }"
            aria-describedby="text-error"
            @blur="v$.name.$touch"
            readonly
            onfocus="this.removeAttribute('readonly');"
          />

          <label
            for="name"
            class="!rtl:right-.5rem color-[var(--blue-700)]"
            :class="{
              '!top--.75rem': user.name,
            }"
            >{{ t('name') }}</label
          >
        </span>

        <small class="p-error" id="text-error" v-if="v$.email.$error">{{
          v$.email.$errors[0].$message || '&nbsp;'
        }}</small>
      </div>

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
            >{{ t('password_confirm') }}</label
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
          {{ t('nav.register') }}
        </div>
      </Button>

      <div
        class="text-1rem p-t-.5rem uppercase autogrid items-center justify-start text-center color-[var(--blue-500)]"
      >
        do u have an account ?

        <nuxt-link to="/auth/login">
          <Button text type="button" class="!w-fit !p-x-1rem !p-y-0">
            <div class="underline">
              {{ t('nav.login') }}
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
