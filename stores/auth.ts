import { defineStore } from 'pinia'
import * as authAPI from '@/api/auth'

import { Alert } from '@/utils/Alert.js'
import catchAsync from '@/utils/catchAsync'

interface INewUser {
  name: string
  email: string
  password?: string
  passwordConfirm?: string
}

export const useAuth = defineStore('auth', () => {
  const user: any = reactive({})
  const isUserExists = ref(false)

  const getUserData = computed(() => user)
  const getUserId = computed(() => user.id)
  const isUserAdmin = computed(() => user.role === 'admin')

  const setUserData = (userData: any) => {
    for (const key in userData) user[key] = userData[key]

    isUserExists.value = true
  }

  const userDataUpdate = (payload: any) => {
    for (const prop in payload) {
      if (prop !== 'photo') user[prop] = payload[prop]
    }
  }

  const resetUserData = () => {
    for (const prop in user) delete user[prop]

    isUserExists.value = false
  }

  const register = catchAsync(
    async ({ name, email, password, passwordConfirm }: INewUser) => {
      const userData: any = await authAPI.signup({
        name,
        email,
        password,
        passwordConfirm,
      })

      setUserData(userData.data)

      await stores.wishlistStore.fetchMyWishlist()
      await stores.cartStore.fetchMyCart()

      Alert('success', 'you registered a new account successfully', 2000)
      return true
    }
  )

  const login = catchAsync(async (payload: any) => {
    const userData: any = await authAPI.login(payload)

    setUserData(userData.data)

    await stores.wishlistStore.fetchMyWishlist()
    await stores.cartStore.fetchMyCart()

    Alert('success', 'logged in successfully', 2000)
    return true
  })

  // const getMyAccount = catchAsync(async () => {
  //   const userData = await authAPI.myAccount()

  //   if (userData.data) setUserData(userData.data.data)
  // })

  const autoLogin = async () => {
    const data: any = await authAPI.isLoggedIn()
    if (data.currentUser) {
      setUserData(data.currentUser)

      await stores.wishlistStore.fetchMyWishlist()
      await stores.cartStore.fetchMyCart()
    }
    // commit('bag/setBag', data.data.currentUser.bag, { root: true })
  }

  const updateUserData = catchAsync(async (payload) => {
    userDataUpdate(payload)

    const data = await authAPI.updateUserData(payload)
    if (data.data.status === 'success')
      Alert('success', 'data updated successfully', 2000)
    else Alert('error', 'Failed To update data', 2000)
  })

  const updateMyPassword = catchAsync(async (payload) => {
    const data = await authAPI.updateMyPassword(payload)
    if (data.data.status === 'success')
      Alert('success', 'password updated successfully', 2000)
    else Alert('error', 'Failed To update password', 2000)
  })

  const logUserOut = catchAsync(async () => {
    await authAPI.logout()
    resetUserData()
    window.location.reload()
  })

  const forgotMyPassword = catchAsync(async (email: any) => {
    const data = await authAPI.forgotMyPassword({ email })
    if (data.status === 'success') Alert('success', data.message, 2000)

    return true
  })

  const resetPassword = catchAsync(async (body: any, token: any) => {
    const data = await authAPI.resetPassword(body, token)
    console.log(data)

    if (data.status === 'success')
      Alert('success', 'password was resetted successfully', 2000)

    return true
  })

  return {
    forgotMyPassword,
    resetPassword,
    user,
    isUserExists,

    getUserData,
    getUserId,
    isUserAdmin,

    register,
    login,
    autoLogin,
    updateUserData,
    updateMyPassword,
    logUserOut,
  }
})
