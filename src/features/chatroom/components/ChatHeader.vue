<script setup lang="ts">
const emits = defineEmits<{
  close: [];
}>();

function onClick() {
  emits('close');
}
</script>

<template>
  <q-card-section class="chat-room-header bg-primary text-white">
    <div class="header-title">
      <img src="/nitra.svg" alt="nitra-icon" class="nitra-icon" />
      <span class="header-title">Nitra AI</span>
      <q-icon name="fa-solid fa-wand-magic-sparkles" size="24px" />
    </div>
    <div class="font-md subtitle">Hi there, How can we help?</div>
    <q-btn flat color="white" icon="fa-solid fa-xmark" class="close-btn" @click="onClick" />
  </q-card-section>
</template>

<style scoped lang="scss">
.chat-room-header {
  position: relative;
  font-family: 'Source Sans Pro', sans-serif;
  padding: 18px 20px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nitra-icon {
  max-width: 46px;
}

.header-title {
  font-size: 30px;
  font-weight: bold;
  line-height: 1em;
}

.subtitle {
  margin-top: 4px;
}

.close-btn {
  position: absolute;
  padding: 5px;
  top: 16px;
  right: 20px;
}
</style>
