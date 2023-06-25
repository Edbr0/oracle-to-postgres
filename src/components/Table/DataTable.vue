<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    props: {
        columns: Object,
        entries: Array,
        height: Number
    },
    setup(props, { slots }) {

        let itemSelected = $ref()

        const tableHeader = computed(() => {
            return props.columns || []
        })

        const tableData = computed(() => {
            return props.entries || []
        })

        const heightTable = computed(() => {
            return props.height ? `height: ${props.height}px` : 'height: 300px'
        })

        const slotsProceced = [];
        for (const key in props.columns) {
            if (Object.prototype.hasOwnProperty.call(props.columns, key)) {
                const slotName = 'item-' + key;
                slotsProceced.push({
                    key: key,
                    hasSlot: !!slots[slotName],
                    slotName: slotName
                });
            }
        }

        function selected (item) {
            itemSelected = item
        }

        const itemSelecteds = computed(() => {
            return itemSelected
        })

        return {
            tableHeader,
            tableData,
            slotsProceced,
            heightTable,
            selected,
            itemSelecteds
        }
    },
})
</script>

<template>
    <div bg-gray-200 dark:bg-dark-400 dark:text-gray-200>
        <table w-full table-fixed cellpadding="0" cellspacing="0" border="0">
            <thead>
                <tr>
                    <th v-for="(th, index) in tableHeader" :key="index" pt-5 px-3.8 text-left font-500>
                        <div flex items-center px-4 text-3 font-600 b-b="2 gray-200 dark:gray-400">
                            <span color="#adadad" mb-2>{{ th }}</span>
                        </div>
                    </th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="tbl-content" :style="heightTable">
        <table w-full table-fixed cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <tr v-for="(item, i) of tableData" :key="i" 
                    hover:bg-yellow-200 dark:hover:bg-yellow-400 cursor-pointer dark:hover:text-gray-900
                    :class="itemSelecteds === i ? 'bg-yellow-300 dark:bg-yellow-500 dark:text-gray-900' : 'dark:text-gray-200'" 
                    @click="selected(i)"
                    @dblclick="$emit('onDoubleClick', item)"
                >
                    <td v-for="(td, j) of slotsProceced" :key="i + '-' + j" font-600 pl-4 py-4 b-b="2 gray-200 dark:gray-700">
                        <slot v-if="td.hasSlot" :name="td.slotName" :item="item" />
                        <span v-else>{{ item[td.key] }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

.tbl-content {
  overflow-x:auto;
  margin-top: 0px;
}

td {
  text-align: left;
  vertical-align:middle;
  font-size: 12px;
}

</style>