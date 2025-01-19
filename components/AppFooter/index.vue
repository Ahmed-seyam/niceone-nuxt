<script setup>
const { t, locale } = useLang()
</script>

<template>
  <footer
    class="footer w[100%] p-t-[20rem] overflow-hidden relative m-t-[4rem] grid"
  >
    <div
      class="rtl:scale-x-[-1] absolute top-2rem left-0 w-full height-full"
      id="Layer_2"
    >
      <svg
        class="fill-[var(--primary-400)] background-to-shake w-full height-full"
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1127.49 602.04"
      >
        <g id="PREVIEW">
          <path
            class="cls-1"
            d="m1127.49,0c-.51,200.68-1.02,401.36-1.53,602.04H0V98.34S54.93,38.31,154.41,11.41c112.38-30.39,183.05,22.51,386.36,86.93,211.84,67.11,340.79,106.11,451.34,50.11,73.34-37.15,113.88-103.59,135.38-148.45Z"
          />
        </g>
      </svg>
    </div>

    <div
      class="rtl:scale-x-[-1] absolute top-3rem left-0 w-full height-full"
      id="Layer_2"
    >
      <svg
        class="fill-[var(--primary-700)] background-to-shake w-full height-full"
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1127.49 602.04"
      >
        <g id="PREVIEW">
          <path
            class="cls-1"
            d="m1127.49,0c-.51,200.68-1.02,401.36-1.53,602.04H0V98.34S54.93,38.31,154.41,11.41c112.38-30.39,183.05,22.51,386.36,86.93,211.84,67.11,340.79,106.11,451.34,50.11,73.34-37.15,113.88-103.59,135.38-148.45Z"
          />
        </g>
      </svg>
    </div>

    <div
      class="rtl:scale-x-[-1] absolute top-4rem left-0 w-full height-full"
      id="Layer_2"
    >
      <svg
        class="fill-[var(--primary-900)] background-to-shake w-full height-full"
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1127.49 602.04"
      >
        <g id="PREVIEW">
          <path
            class="cls-1"
            d="m1127.49,0c-.51,200.68-1.02,401.36-1.53,602.04H0V98.34S54.93,38.31,154.41,11.41c112.38-30.39,183.05,22.51,386.36,86.93,211.84,67.11,340.79,106.11,451.34,50.11,73.34-37.15,113.88-103.59,135.38-148.45Z"
          />
        </g>
      </svg>
    </div>

    <div
      class="rtl:scale-x-[-1] z-2 absolute top-3rem left-0 w-full height-full"
    >
      <svg
        class="fill-[#0c1d38] z-2 w-full height-full"
        id="Layer_2"
        data-name="Layer 2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1127.49 602.04"
      >
        <g id="PREVIEW">
          <path
            class="cls-1"
            d="m1127.49,0c-.51,200.68-1.02,401.36-1.53,602.04H0V98.34S54.93,38.31,154.41,11.41c112.38-30.39,183.05,22.51,386.36,86.93,211.84,67.11,340.79,106.11,451.34,50.11,73.34-37.15,113.88-103.59,135.38-148.45Z"
          />
        </g>
      </svg>
    </div>

    <!-- <img src=""  alt=""> -->
    <div
      class="md:autogrid xl:p-x-8rem p-x-2rem items-start bg-[#0c1d38] color-white z-5 min-h-[18rem] p-b-0rem"
    >
      <div class="w-[fit-content] m-b-2rem">
        <img
          src="/images/logo.png"
          class="w-5rem h-5rem rounded-full bg-white p-1rem m-t-[-6rem] m-b-1rem"
          alt=""
        />
        <h3
          class="text-[1.1rem] font-300 m-b-[1.5rem] border-b-2 w-fit uppercase w-[fit-content] m-b-[1.5rem] border-b-2"
        >
          {{ t('company') }}
        </h3>
        <p
          class="text-[1.1rem] w-[18rem] color-[var(--gray-330)] lowercase font-thin"
        >
          {{ t('footer.overview') }}
        </p>
      </div>

      <div class="w-[fit-content] m-b-2rem">
        <h3
          class="text-[1.1rem] font-300 m-b-[1.5rem] border-b-2 w-fit uppercase autogrid m-b-[1.5rem]"
        >
          {{ t('footer.quick_links') }}
        </h3>
        <ul
          class="grid text-[1.1rem] grid-cols-1 gap-3 color-[var(--gray-330)] font-thin"
        >
          <li class="hover:color-white autogrid w-[fit-content] gap-2">
            <div i-carbon:chevron-right class="rtl:rotate-180"></div>

            <a href="#">
              {{ t('footer.home') }}
            </a>
          </li>
          <li class="autogrid w-[fit-content] hover:color-white gap-2">
            <div i-carbon:chevron-right class="rtl:rotate-180"></div>

            <a href="#">
              {{ t('footer.about') }}
            </a>
          </li>
          <li class="autogrid w-[fit-content] hover:color-white gap-2">
            <div i-carbon:chevron-right class="rtl:rotate-180"></div>

            <a href="#"> {{ t('footer.store') }} </a>
          </li>
          <li class="autogrid w-[fit-content] hover:color-white gap-2">
            <div i-carbon:chevron-right class="rtl:rotate-180"></div>

            <a href="#"> {{ t('footer.contact') }} </a>
          </li>
        </ul>
      </div>

      <div class="w-[fit-content] m-b-2rem">
        <h3
          class="text-[1.1rem] font-300 m-b-[1.5rem] border-b-2 w-fit uppercase m-b-[1.5rem] autogrid w-[fit-content]"
        >
          {{ t('footer.contact') }}
        </h3>
        <ul class="grid grid-cols-1 gap-3 text-[1.1rem]">
          <div
            class="color-[var(--gray-330)] font-thin autogrid gap-3 w-[fit-content]"
          >
            <div i-carbon:location-person class=""></div>
            123 Main St, New York, NY 10001
          </div>
          <div
            class="color-[var(--gray-330)] font-thin autogrid gap-3 w-[fit-content]"
          >
            <div i-carbon:phone-ip class=""></div>
            Phone: (123) 456-7890
          </div>

          <div
            class="color-[var(--gray-330)] font-thin autogrid gap-3 w-[fit-content]"
          >
            <div i-carbon:email class=""></div>
            Email: info@companyname.com
          </div>
        </ul>
      </div>

      <img
        src="/images/footer/footer-2.svg"
        class="lg:block hidden xl:w-[25rem] xl:h-[25rem] w-[18rem] h-[18rem] element-to-shake m-t-[-15rem] justify-self-end"
        alt=""
      />
    </div>

    <div
      class="bottom-bar bg-[#0c1d38] xl:p-x-8rem p-x-2rem z-9 w-[100%] color-white"
    >
      <div class="row gap-y-3 p-y-[1.2rem] items-center">
        <div class="col-md-6">
          <p class="text-1rem font-thin color-[var(--gray-300)]">
            &copy;
            {{ t('footer.copy_right') }}
          </p>
        </div>

        <div class="col-md-6">
          <ul
            class="autogrid !gap-[1.5rem] p-[1rem_1.5rem] bg-[rgba(0,0,0,.3)] shadow-[0_0_30rem_rgba(0,0,0,.3)] rounded-10rem"
          >
            <li
              class="flex transition-all hover:translate-y-[-.2rem] hover:scale-[1.2] pointer transtion"
            >
              <a href="#">
                <div class="w-[1.5rem] h-[1.5rem]" i-logos:facebook></div>
              </a>
            </li>
            <li
              class="flex transition-all hover:translate-y-[-.2rem] hover:scale-[1.2] pointer transtion"
            >
              <a href="#">
                <div class="w-[1.5rem] h-[1.5rem]" i-logos:twitter></div>
              </a>
            </li>
            <li
              class="flex transition-all hover:translate-y-[-.2rem] hover:scale-[1.2] pointer transtion"
            >
              <a href="#">
                <div class="w-[1.5rem] h-[1.5rem]" i-logos:google-gmail></div>
              </a>
            </li>
            <li
              class="flex transition-all hover:translate-y-[-.2rem] hover:scale-[1.2] pointer transtion"
            >
              <a href="#">
                <div
                  class="w-[1.5rem] h-[1.5rem] invert-80"
                  i-logos:instagram-icon
                ></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.col-md-3 {
  width: calc(25% - 20px);
}
</style>
