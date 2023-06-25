<script setup lang="ts">
import { PropType } from 'vue'
import { getSearchHighlightHTML } from '../../hooks'

defineProps({
  icons: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  selected: {
    type: Array,
    default: () => [],
  },
  size: {
    type: String,
    default: '2xl',
  },
  spacing: {
    type: String,
    default: 'm-2',
  },
  search: {
    type: String,
    default: '',
  },
  display: {
    type: String,
    default: 'grid',
  },
  namespace: {
    type: String,
    default: '',
  },
  colorClass: {
    type: String,
    default: 'text-dark-600',
  },
})

defineEmits<{
  (event: 'select', id: string): void
}>()
</script>

<template>
  <div
    class="non-dragging flex flex-wrap select-none justify-center"
    :class="`text-${size} ${colorClass}`"
  >
    <div
      v-for="icon of icons"
      :key="icon"
      class="non-dragging icons-item flex tooltip"
      :class="[spacing, selected.includes(namespace + icon) ? 'active' : '']"
      @click="$emit('select', namespace + icon)"
    >
      <Icon
        class="tooltip-content non-dragging leading-none h-1em"
        :icon="namespace + icon"
      />
      <span
        v-if="display === 'list'"
        class="tooltip-content text-sm ml-1 px-1 m-auto"
        v-html="getSearchHighlightHTML(icon, search)"
      />
      <span
        v-else
        class="
          tooltip-text bg shadow leading-none whitespace-no-wrap
          border border-transparent dark:border-dark-200 dark:bg-dark-400"
      >
        <span class="opacity-75">
          {{ icon }}
        </span>
      </span>
    </div>
  </div>
</template>
