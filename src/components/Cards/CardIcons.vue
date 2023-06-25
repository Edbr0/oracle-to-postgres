
<script lang="ts">
    import { computed, defineComponent } from 'vue'

    const icons = Array.from({
        length: 10,
    }).map((_) => ({
        icon: 'i-fluent-emoji-high-contrast:package'
    }))

    export default defineComponent({
        props: {},
        setup(props){
            return {
                icons
            }
        }
    })
</script>

<template>
    <div non-dragging flex flex-wrap select-none justify-center text-2xl>
        <div v-for="(icon, index) of icons" :key="index" class="icons-item">
            <!-- <span :class="icon.icon" @click="$emit('select', icon)">
                {{ icon.icon }}
            </span> -->
            <Icon :icon="icon.icon" @click="$emit('select', icon)" />
        </div>
    </div>
</template>

<style scoped>
.icons-item:hover, .icons-item.active {
  color: gray;
  position: relative;
}
.icons-item.active::after {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: gray;
  opacity: 0.1;
}
.icons-item:hover::before {
  content: "";
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 4px;
  opacity: 0.4;
}
</style>