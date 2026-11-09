<script setup lang="ts">
import { ref, useId } from 'vue'
import Icon from '@/components/Icon.vue'

withDefaults(
  defineProps<{
    label: string
    modelValue: string
    placeholder?: string
    type?: string
    hint?: string
    textarea?: boolean
    autocomplete?: string
  }>(),
  { placeholder: '', type: 'text', hint: '', textarea: false, autocomplete: 'off' },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const id = useId()
const show = ref(false)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>

<template>
  <div class="field">
    <label class="field-label" :for="id">{{ label }}</label>
    <div class="input-wrap" :class="{ 'is-area': textarea }">
      <textarea
        v-if="textarea"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        rows="2"
        @input="onInput"
      />
      <input
        v-else
        :id="id"
        :type="type === 'password' && show ? 'text' : type"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @input="onInput"
      />
      <button
        v-if="type === 'password'"
        class="peek"
        type="button"
        :aria-label="show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'"
        @click="show = !show"
      >
        <Icon :name="show ? 'eye-off' : 'eye'" :size="18" />
      </button>
    </div>
    <p v-if="hint" class="field-hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.is-area {
  align-items: flex-start;
  padding-top: 12px;
  padding-bottom: 12px;
}

.peek {
  display: inline-flex;
  padding: 2px;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}
</style>
