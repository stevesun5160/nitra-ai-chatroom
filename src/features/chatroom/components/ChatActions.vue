<script setup lang="ts">
import { computed, nextTick, ref } from 'vue';

const props = defineProps<{
  isResponding: boolean;
}>();

const emits = defineEmits<{
  (e: 'sendMessage', message: string): void;
}>();

const message = ref('');
const isComposing = ref(false);

const isDisabled = computed(() => props.isResponding || !message.value);

function sendMessage() {
  if (props.isResponding || message.value.length === 0) {
    return;
  }

  if (message.value.length > 0) {
    emits('sendMessage', message.value);
    message.value = '';
  }
}

function onClickEnter(event: KeyboardEvent) {
  if (isComposing.value || event.isComposing) {
    return;
  }

  sendMessage();
}

function onCompositionStart() {
  isComposing.value = true;
}

async function onCompositionEnd() {
  await nextTick();
  isComposing.value = false;
}
</script>

<template>
  <div class="action-row q-px-md">
    <q-input
      v-model.trim="message"
      borderless
      class="text-input"
      placeholder="Say Something..."
      autofocus
      @keydown.enter.prevent="onClickEnter"
      @compositionstart="onCompositionStart"
      @compositionend="onCompositionEnd"
    />
    <q-btn
      flat
      round
      class="q-pa-0"
      size="0.75rem"
      :class="{ 'pointer-events-none': props.isResponding }"
    >
      <label for="upload-file">
        <q-icon name="fa-solid fa-paperclip" class="text-grey-6" />
      </label>
      <input id="upload-file" type="file" class="hidden" :disabled="props.isResponding" />
    </q-btn>
    <q-btn
      flat
      round
      class="text-white bg-primary"
      :class="{ 'pointer-events-none': isDisabled }"
      icon="fa-solid fa-chevron-right"
      size="0.75rem"
      :loading="props.isResponding"
      :disabled="isDisabled"
      @click="sendMessage"
    />
  </div>
</template>

<style scoped lang="scss">
.action-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 10px;
  padding-bottom: 10px;

  .text-input {
    flex-grow: 1;
  }

  label[for='upload-file'] {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}

.pointer-events-none {
  pointer-events: none;
}
</style>
