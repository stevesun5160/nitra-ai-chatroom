import { onUnmounted, ref } from 'vue';

type StartTypingOptions = {
  fullText: string;
  speed?: number;
  onBegin?: () => void;
  onTyping?: (displayedText: string) => void;
  onComplete?: () => void;
};

export function useTypingAnimation() {
  const timerId = ref<number | null>(null);

  function stopTyping() {
    if (timerId.value === null) {
      return;
    }

    clearTimeout(timerId.value);
    timerId.value = null;
  }

  function scheduleNextChar(currentIndex: number, options: StartTypingOptions) {
    const { fullText, speed = 50, onTyping, onComplete } = options;

    if (currentIndex === fullText.length) {
      stopTyping();
      onComplete?.();
      return;
    }

    const displayedText = fullText.slice(0, currentIndex);
    onTyping?.(displayedText);

    timerId.value = setTimeout(
      () => scheduleNextChar(currentIndex + 1, options),
      speed,
    ) as unknown as number;
  }

  function startTyping(options: StartTypingOptions) {
    const { onBegin } = options;

    stopTyping();
    onBegin?.();

    scheduleNextChar(1, options);
  }

  onUnmounted(() => {
    stopTyping();
  });

  return {
    startTyping,
    stopTyping,
  };
}
