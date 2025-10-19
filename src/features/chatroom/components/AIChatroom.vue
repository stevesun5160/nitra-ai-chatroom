<script setup lang="ts">
import ChatActions from 'src/features/chatroom/components/ChatActions.vue';
import ChatContainer from 'src/features/chatroom/components/ChatContainer.vue';
import ChatHeader from 'src/features/chatroom/components/ChatHeader.vue';
import HelpButton from 'src/features/chatroom/components/HelpButton.vue';
import { useMessage } from 'src/features/chatroom/composables/useMessage';
import { ref, watch } from 'vue';

const isChatRoomVisible = ref(false);

function toggleChatroom() {
  isChatRoomVisible.value = !isChatRoomVisible.value;
}

function closeChatroom() {
  isChatRoomVisible.value = false;
}

const { isResponding, messages, appendWelcomeMessage, onMessageSent } = useMessage();

watch(isChatRoomVisible, async (isVisible) => {
  if (isVisible) {
    await appendWelcomeMessage();
  }
});
</script>

<template>
  <div class="nitra-chat-bot fixed-bottom-right">
    <Transition name="slide-fade">
      <q-card v-show="isChatRoomVisible" :square="false" class="chat-room-dialog shadow-12">
        <ChatHeader @close="closeChatroom" />
        <ChatContainer :messages :is-responding="isResponding" />
        <q-separator />
        <ChatActions :is-responding="isResponding" @send-message="onMessageSent" />
      </q-card>
    </Transition>
    <HelpButton @click="toggleChatroom" />
  </div>
</template>

<style scoped lang="scss">
$screen-offset: 10px;
$dialog-offset: 12px;

.nitra-chat-bot {
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: $dialog-offset;
  bottom: $screen-offset;
  right: $screen-offset;
}

.chat-room-dialog {
  width: calc(100dvw - ($screen-offset * 2));
  border-radius: 0.5rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-0.25rem);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-fade-leave-to {
  transform: translateY(-0.25rem);
  opacity: 0;
}

@media (min-width: $breakpoint-md-min) {
  .chat-room-dialog {
    max-width: 780px;
    border-radius: 0.5rem;
  }
}
</style>
