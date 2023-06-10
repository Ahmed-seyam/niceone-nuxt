<script setup>
const { t } = useLang();
</script>

<template>
  <div class="grid grid-cols-1 gap-[1rem]">
    <div class="bg-[var(--primary-50)] p-.6rem rounded-.5rem text-[var(--bluegray-500)] text-[.85rem]">
      {{ t("footer.overview") }}
    </div>

    <footer>
      <ul class="flex flex-wrap text-.8rem color-[var(--blue-500)]">
        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">{{ t("footer.contact") }}</router-link>
        </li>

        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">{{ t("footer.home") }}</router-link>
        </li>

        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">{{ t("footer.store") }}</router-link>
        </li>

        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">{{ t("footer.policy") }}</router-link>
        </li>

        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">
            {{ t("footer.terms_and_conditions") }}</router-link>
        </li>
      </ul>

      <ul class="flex flex-wrap text-.8rem color-[var(--blue-500)]">
        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">
            {{ t("dashboard.orders") }}
          </router-link>
        </li>

        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">{{
            t("dashboard.returns")
          }}</router-link>
        </li>

        <li class="ltr:m-r-.7rem m-b-.3rem underline ltr:last:m-r-0 rtl:m-l-.7rem rtl:last:m-l-0">
          <router-link to="/profile/id">{{
            t("dashboard.user_info")
          }}</router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>
