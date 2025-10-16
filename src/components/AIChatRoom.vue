<script setup lang="ts"></script>

<template>
  <q-card :square="false" class="chat-room">
    <q-card-section class="bg-primary text-white">
      <div class="chat-room-header">
        <svg
          width="46"
          height="24"
          viewBox="0 0 46 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.4991 23.5C15.9867 23.4468 21.9402 12.0151 11.501 12.0002V0.5C27.339 0.523016 23.0696 11.9835 34.4991 11.9998V23.4995V23.5Z"
            fill="white"
          />
          <path d="M46 0.5H34.499V11.9998H46V0.5Z" fill="white" />
          <path d="M11.501 11.9998H0V23.4995H11.501V11.9998Z" fill="white" />
        </svg>
        <span class="text-h6">Nitra AI</span>
        <q-icon name="fa-solid fa-wand-magic-sparkles" size="1.5rem" />
      </div>
      <div class="text-subtitle2">Hi there, How can we help?</div>
    </q-card-section>
    <div class="message-container"></div>
    <q-separator />
    <div class="action-row q-px-md">
      <q-input borderless class="text-input" placeholder="Say Something..." />
      <q-btn flat round class="q-pa-0" size="0.75rem">
        <label for="upload-file">
          <q-icon name="fa-solid fa-paperclip" class="text-grey-6" icon="fa-solid fa-paperclip" />
        </label>
        <input id="upload-file" type="file" class="hidden" />
      </q-btn>
      <q-btn
        flat
        round
        class="text-white bg-primary"
        icon="fa-solid fa-chevron-right"
        size="0.75rem"
      />
    </div>
  </q-card>
</template>

<style scoped lang="scss">
.chat-room {
  max-width: 780px;
}

.chat-room-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.message-container {
  min-height: 500px;
}

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
    flex-grow: 1;
  }
}
</style>
