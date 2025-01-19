<script setup>
const { t, locale } = useLang()
const route = useRoute()

const props = defineProps(['curCategory'])
const emit = defineEmits([
  'filterApplied',
  'filterClosed',
  'filterReseted',
  'filterToggled',
  'filterOpenned',
])

const curCategoryRef = ref(props.curCategory)
const catIdRef = ref(curCategoryRef.value ? curCategoryRef.value.id : undefined)

const visible = ref(false)

const openFilter = () => {
  visible.value = true
}

const close = () => {
  visible.value = false

  emit('filterApplied', selectedFiltersData.value)
}

const filtersStore = stores.filtersStore

const filtersData = computed(() => filtersStore.getFilters(catIdRef.value))

const selectedFiltersData = computed(() =>
  filtersStore.getSelectedFilters(catIdRef.value)
)

;(async () => {
  await filtersStore.fetchFilters(route.params.categoryId, {
    ...curCategoryRef.value,
  })
})()

const resetSelectedFiltersForCategory = () => {
  // reset selected items in store
  filtersStore.resetSelectedFiltersForCategory(route.params.categoryId, {
    ...curCategoryRef.value,
  })

  // reset selected items inside the components
  resetFilterComponent()

  // close the filter component
  visible.value = false

  // emit and event to refetch the data
  emit('filterReseted')
}

const updateSelection = (value, catId, propName) => {
  filtersStore.updateSelectedFiltersForCategory(catId, propName, value)
}

// the below code used to add all filter components in side a reactive object
const curCollectionComponent = reactive({})
const addToRefs = (element) => {
  if (curCollectionComponent[catIdRef.value]) {
    curCollectionComponent[catIdRef.value].push(element)
    return
  }

  curCollectionComponent[catIdRef.value] = [element]
}

// this code for reseting the filter components to empty values
const resetFilterComponent = () => {
  for (const key in curCollectionComponent[catIdRef.value]) {
    if (
      curCollectionComponent[catIdRef.value][key] &&
      curCollectionComponent[catIdRef.value][key].updateSelectedItems
    )
      curCollectionComponent[catIdRef.value][key].updateSelectedItems([])
    else if (
      curCollectionComponent[catIdRef.value][key] &&
      curCollectionComponent[catIdRef.value][key].resetSelection
    )
      curCollectionComponent[catIdRef.value][key].resetSelection()
  }
}

defineExpose({
  openFilter,
})
</script>

<template>
  <Transition name="slide-up">
    <div
      class="filter overflow-y-scroll border-t-2 rtl:border-r-2 ltr:border-l-2 bg-white ltr:rounded-[2rem_0_0] rtl:rounded-[0_2rem_0_0] fixed ltr:right-0 rtl:left-0 bottom-0 h-[calc(100vh-7rem)] w-28rem z-7"
      v-if="visible"
    >
      <div
        class="bg-white sticky top-0 p-y-2rem !w-[100%] !h-[2rem] flex items-center z-[8] p-x-[0rem]"
      >
        <button
          @click="visible = false"
          class="ltr:m-l-auto rtl:m-r-auto pointer color-red !w-[2rem] !h-[2rem]"
          i-carbon:close
        ></button>
      </div>

      <div class="content p-x-[2rem] min-h-[70vh]">
        <section
          class="border-b-1px last:border-b-0px m-b-2rem"
          v-for="item in filtersData"
        >
          <div class="autogrid justify-between">
            <h5 class="autogrid w-fit bold color-[var(--blue-900)]">
              <div
                i-carbon:arrow-shift-down
                class="color-[var(--blue-600)] ltr:rotate--90deg rtl:rotate-90deg"
              ></div>
              {{ item[$filters.t('name_', locale)] }}
            </h5>

            <!-- <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                placeholder="Search"
                class="!rounded-full !p-y-.3rem"
              />
            </span> -->
          </div>

          <div class="values p-t-1rem p-b-.5rem">
            <div v-if="item.type == 'range'">
              <div
                dir="ltr"
                class="p-b-1rem !ltr:m-l-auto !rtl:m-r-auto w-fit text-1.2rem"
              >
                {{
                  formatNumber(
                    locale,

                    selectedFiltersData[item.property_name][0]
                      ? selectedFiltersData[item.property_name][0]
                      : 0
                  )
                }}
                -
                {{
                  formatNumber(
                    locale,
                    selectedFiltersData[item.property_name][1]
                      ? selectedFiltersData[item.property_name][1] * 1
                      : 0
                  )
                }}
              </div>

              <Slider
                v-model="selectedFiltersData[item.property_name]"
                :min="item.min_value"
                :max="item.max_value"
                range
                class="m-b-1rem"
                >range</Slider
              >
            </div>

            <SelectBox
              v-else-if="item.type === 'selectbox'"
              :id="`selectbox${item.id}`"
              :ref="
                (el) => {
                  addToRefs(el)
                }
              "
              :values="item[$filters.t('options_', locale)]"
              :selected="selectedFiltersData[item.property_name]"
              @value-updated="
                updateSelection($event, item.category, item.property_name)
              "
            />

            <shortcuts-component
              v-else
              :ref="
                (el) => {
                  addToRefs(el)
                }
              "
              :behavior="item.type"
              :initial-value="selectedFiltersData[item.property_name]"
              :tags="item[$filters.t('options_', locale)]"
              @selection-updated="
                updateSelection($event, item.category, item.property_name)
              "
            ></shortcuts-component>

            <!-- 
             -->
          </div>
        </section>
      </div>

      <div
        class="sticky bottom-1rem p-.8rem autogrid bg-white m-[1rem_1rem] rounded-full basicshadow border-2"
      >
        <Button
          class="!p-[.4rem_.5rem]"
          severity="primary"
          rounded
          @click="close()"
        >
          <span class="w-full text-center"> {{ t('apply') }}</span>
        </Button>
        <Button
          class="!p-[.4rem_.5rem]"
          severity="secondary"
          rounded
          @click="resetSelectedFiltersForCategory"
        >
          <span class="w-full text-center"> {{ t('reset') }}</span>
        </Button>
      </div>
    </div>
  </Transition>
</template>
