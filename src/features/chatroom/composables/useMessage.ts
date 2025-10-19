import type { Message, MessageRole } from 'src/features/chatroom/types/message';

import { MESSAGE_MOCK_MAP } from 'src/mock/messages';
import { createRandomNumber } from 'src/utils/random';
import { computed, nextTick, ref } from 'vue';

import { useTypingAnimation } from './useTypingAnimation';

export function useMessage() {
  const FIRST_MESSAGE_CONTENT = 'Welcome to Nitra AI!';
  const ERROR_MESSAGE_CONTENT = 'Sorry, I encountered an error. Please try again later.';
  const RESPONSE_DELAY = 300;

  function createMessage({
    content,
    role,
  }: {
    content: string | undefined;
    role: MessageRole;
  }): Message {
    const isFromBot = role === 'assistant';

    return {
      role,
      content,
      timestamp: new Date().toISOString(),
      displayedContent: isFromBot && content === undefined ? '' : content, // 使用者訊息直接顯示, AI 訊息從空字串開始
      isStreaming: false,
    };
  }

  const messages = ref<Message[]>([]);

  const isResponding = computed<boolean>(
    () =>
      // Welcome Message should not shows loading
      messages.value.length > 1 &&
      messages.value.some(
        ({ role, isStreaming, content }) =>
          role === 'assistant' && (isStreaming || content === undefined), // isStreaming || Loading...
      ),
  );

  function fetchBotResponseMessage(message: string) {
    return new Promise<string>((resolve) => {
      const response = MESSAGE_MOCK_MAP[message]?.message.content || ERROR_MESSAGE_CONTENT;
      const randomNumber = createRandomNumber({ min: 5000, max: 10000 });

      setTimeout(() => {
        resolve(response);
      }, randomNumber);
    });
  }

  function delayAppend(message: Message, delay: number = RESPONSE_DELAY) {
    return new Promise((resolve) => {
      setTimeout(() => {
        messages.value.push(message);
        resolve(null);
      }, delay);
    });
  }

  const { startTyping } = useTypingAnimation();

  function animateResponseMessage(content: string) {
    const lastMessage = messages.value[messages.value.length - 1];

    startTyping({
      fullText: content,
      speed: 10,
      onBegin: () => {
        lastMessage.content = content;
        lastMessage.isStreaming = true;
        lastMessage.displayedContent = '';
      },
      onTyping: (displayedText) => {
        lastMessage.displayedContent = displayedText;
      },
      onComplete: () => {
        lastMessage.isStreaming = false;
      },
    });
  }

  async function appendWelcomeMessage() {
    if (messages.value.length > 0) {
      return;
    }

    const welcomeMessage = createMessage({
      content: undefined,
      role: 'assistant',
    });
    await delayAppend(welcomeMessage);

    animateResponseMessage(FIRST_MESSAGE_CONTENT);
  }

  async function onMessageSent(message: string) {
    const userMessage = createMessage({ content: message, role: 'user' });
    messages.value.push(userMessage);

    await nextTick();

    const thinkingMsg = createMessage({ content: undefined, role: 'assistant' });
    await delayAppend(thinkingMsg);

    const botResponseMessage = await fetchBotResponseMessage(message);
    // Replace Thinking... with new response
    animateResponseMessage(botResponseMessage);
  }

  return {
    messages,
    isResponding,
    appendWelcomeMessage,
    onMessageSent,
  };
}
