<template>
  <div class="thinking">
    <span>Thinking</span>
    <span className="dot1">.</span>
    <span className="dot2">.</span>
    <span className="dot3">.</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes blink {
  0%,
  20% {
    opacity: 0.3;
  }
  40% {
    opacity: 1;
  }
  60%,
  100% {
    opacity: 0;
  }
}

.dot1 {
  animation: blink 1.5s infinite;
  animation-delay: 0s;
  margin-left: 0.25rem;
}

.dot2 {
  animation: blink 1.5s infinite;
  animation-delay: 0.2s;
}

.dot3 {
  animation: blink 1.5s infinite;
  animation-delay: 0.4s;
}
</style>
