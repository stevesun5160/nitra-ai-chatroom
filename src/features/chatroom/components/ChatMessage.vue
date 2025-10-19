<script setup lang="ts">
import type { Message } from 'src/features/chatroom/types/message';

import ThinkingText from 'src/features/chatroom/components/ThinkingText.vue';
import { useMarkdownRenderer } from 'src/features/chatroom/composables/useMarkdownRenderer';
import { computed, watchEffect } from 'vue';

const props = defineProps<{
  message: Message;
}>();

const isSentByUser = computed(() => props.message.role === 'user');
const showThinkingText = computed(() => props.message.content === undefined);

const { el: messageRef, renderMarkdown } = useMarkdownRenderer();

watchEffect(() => {
  renderMarkdown(props.message.displayedContent);
});
</script>

<template>
  <div class="message-row font-md" :class="{ sent: isSentByUser }">
    <img v-if="!isSentByUser" src="/nitra-filled.svg" alt="nitra-icon" />
    <div
      class="message-container"
      :class="{ 'bg-gray-0': !isSentByUser, 'bg-teal-100': isSentByUser }"
    >
      <ThinkingText v-if="showThinkingText" />
      <div v-else ref="messageRef" class="message-text" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;

  .nitra-icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  .message-container {
    display: flex;
    flex-direction: column;
    gap: 35px;
    border-radius: 0 10px 10px 10px;
    padding: 10px 16px;
  }

  &.sent {
    justify-content: end;

    .message-container {
      border-radius: 10px 0 10px 10px;
    }
  }
}

:deep(.message-text) {
  line-height: 1.6;
  text-wrap: pretty;

  p,
  strong,
  em,
  a,
  li,
  blockquote {
    font-size: inherit;
    line-height: inherit;
  }

  p {
    margin: 0;
    padding: 0;

    & + p {
      margin-top: 0.5em;
    }
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  ul,
  ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }

  li {
    margin: 0.25em 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.75em 0 0.5em;
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.3em;
  }
  h3 {
    font-size: 1.1em;
  }
  h4,
  h5,
  h6 {
    font-size: 1em;
  }

  blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    padding-left: 1em;
    margin: 0.5em 0;
    color: rgba(0, 0, 0, 0.7);
  }

  hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 1em 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.5em 0;
  }

  th,
  td {
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 6px 12px;
    text-align: left;
  }

  th {
    background-color: rgba(0, 0, 0, 0.05);
    font-weight: 600;
  }
}
</style>
