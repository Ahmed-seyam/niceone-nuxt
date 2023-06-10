<script setup>
const { t } = useLang();
const router = useRouter();
const navigate = (e, id) => {
  console.log(e.target.classList.contains("do_not_navigate"));
  if (!e.target.classList.contains("do_not_navigate")) {
    router.push("/products/" + id);
  }
};

const wishlisted = ref(false);

const productDetailsPopup = ref(false);
const addToCartPopup = ref(false);

const sizeOptions = ref([
  { value: "زجاجة 100 ملل" },
  { value: "زجاجه 10 ملل" },
  { value: "زجاجه 150 ملل" },
  { value: "زجاجه 300 ملل" },
  { value: "زجاجه 500 ملل" },
  { value: "زجاجه 1000 ملل" },
]);

const colorOptions = ref([
  { value: "#e5f2c3" },
  { value: "#e5ddc3" },
  { value: "#ddddc3" },
  { value: "#99ddc3" },
]);
</script>

<template>
  <div @click="navigate($event, 'id')"
    class="pointer relative grid product w-[18rem] p-[1.8rem] rounded-[2.5rem] basicshadow overflow-hidden bg-white">
    <div
      class="tags !rtl:left-unset !rtl:right-2rem h-[12rem] items-start text-[.8rem] font-bold absolute left-2rem top-2rem grid grid-cols-1 gap-[.4rem] justify-start rtl:justify-items-start">
      <div class="tag w-[fit-content] bg-[var(--gray-200)] p-[.2rem_.7rem] rounded-[.3rem]">
        {{ t("product.new") }}
      </div>

      <div class="self-end grid grid-cols-[fit-content] gap-1">
        <div class="tag w-[fit-content] self-end translate-y-[50%] bg-rose color-white p-[.2rem_.7rem] rounded-[.3rem]">
          1 + 2 مجانا
        </div>
      </div>
    </div>

    <div
      class="add__to__fav do_not_navigate transition-all absolute opacity-0 right-2rem rtl:right-unset rtl:left-2rem translate-x-[50%] rtl:translate-x-[-50%] top-2rem">
      <div class="p-.7rem do_not_navigate rounded-[.8rem] bg-white shadow-[0_0_.6rem_rgba(0,0,0,.1)] m-b-.5rem"
        @click="wishlisted = !wishlisted">
        <div i-carbon:favorite-filled class="color-[red] do_not_navigate" v-if="wishlisted"></div>
        <div i-carbon:favorite class="do_not_navigate color-[red]" v-else></div>
      </div>

      <div class="do_not_navigate p-.7rem rounded-[.8rem] bg-white shadow-[0_0_.6rem_rgba(0,0,0,.1)]"
        @click="productDetailsPopup = true">
        <div i-carbon:view class="do_not_navigate color-[var(--color-primary)]"></div>
      </div>
    </div>

    <img src="/images/products/image.png"
      class="h-[12rem] m-auto w-[100%] bg-[var(--bluegray-50)] object-contain rounded-1rem m-b-[1.4rem]" alt="" />

    <div
      class="absolute rtl:right-unset rtl:left-2rem top-13.5rem right-2rem reviews autogrid items-center gap-1 w-[fit-content]">
      <span class="color-[var(--bluegray-400)] font-thin text-[.7rem] font-[Jost,sans-serif]">( 520 )</span>
      <div i-carbon:star-filled class="color-yellow w-[.9rem]"></div>

      <div class="font-[Jost,sans-serif] text-[.9rem]">4.9</div>
    </div>

    <div class="brand font-[Jost,sans-serif] color-[var(--bluegray-400)] capitalize font-thin !text-[.75rem]">
      maybelline
    </div>
    <h3 class="text-[1.1rem]">كونسيلر خافي عيوب العين</h3>

    <div
      class="m-b-1rem m-t-[-.6rem] grid grid-cols-2 gap-x-.6rem grid-rows-[min-content_max-content] items-end p-t-[1rem] w-[fit-content]">
      <div class="col-[1/2] row-[1/2] relative color-[var(--bluegray-500)] font-thin m-b-[-.1rem]">
        <span
          class="absolute left-50% top-50% rotate-[-3deg] translate-x-[-40%] translate-y-[-150%] w-[80%] z-3 flex h-[1px] rounded-full bg-[var(--bluegray-400)]"></span>
        50 ريال
      </div>

      <div class="col-[1/2] row-[2/3] text-[1.1rem]">
        <span class="font-[Jost,sans-serif] font-bold"> 43 </span>
        <span class="p-x-.1rem">ريال</span>
      </div>

      <div
        class="col-[2/3] row-[1/3] font-[Jost,sans-serif] font-medium p-.1rem rounded-[.5rem] bg-red/10 color-red text-[.8rem] flex items-center justify-center">
        17%
      </div>
    </div>

    <Button class="do_not_navigate autogrid !p-y-.5rem relative !p-x-[.5rem]" severity="primary" rounded
      @click="addToCartPopup = true">
      <div i-carbon:add class="do_not_navigate w-[2rem]"></div>
      <div class="do_not_navigate absolute left-50% top-50% translate-x-[-50%] translate-y-[-50%]">
        {{ t("product.add_to_cart") }}
      </div>
    </Button>

    <Dialog v-model:visible="productDetailsPopup" modal
      :style="{ width: '90rem', maxWidth: '90%', 'background-color': 'red' }" :draggable="false">
      <product-details :sizeOptions="sizeOptions" :colorOptions="colorOptions"></product-details>
    </Dialog>

    <Dialog v-model:visible="addToCartPopup" modal :style="{ width: '70rem', 'background-color': 'red' }"
      :draggable="false">
    </Dialog>
  </div>
</template>

<style>
.product:hover .add__to__fav {
  transform: translateX(0);
  opacity: 1;
}

.p-dialog {
  border-radius: 2rem !important;
  overflow: hidden;
}

.p-dialog-content,
.p-dialog-header {
  background-color: var(--bluegray-50) !important;
}

.p-dialog-content {
  padding: 1rem 3rem 3rem !important;
}
</style>
