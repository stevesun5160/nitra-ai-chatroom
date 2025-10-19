<script setup lang="ts">
import type { Message } from 'src/features/chatroom/types/message.ts';

import ChatMessage from 'src/features/chatroom/components/ChatMessage.vue';
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{
  messages: Message[];
  isResponding: boolean;
}>();

const containerRef = ref<HTMLElement | null>(null);

function scrollToBottom() {
  if (!containerRef.value) {
    return;
  }

  containerRef.value.scrollTop = containerRef.value.scrollHeight;
}

watch(
  [() => props.messages, () => props.isResponding],
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true },
);
</script>

<template>
  <div ref="containerRef" class="message-list-container">
    <ChatMessage v-for="message in props.messages" :key="message.timestamp" :message />
  </div>
</template>

<style scoped lang="scss">
.message-list-container {
  display: flex;
  flex-direction: column;
  gap: 35px;
  height: 420px;
  padding: 32px 20px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
</style>
