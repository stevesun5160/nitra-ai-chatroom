# Quasar App (nitra-ai-chatbot)

Nitra AI Chatroom UI Challenge

[Demo Site](https://nitra-ai-chatroom.vercel.app/)

## Install the dependencies

```bash
pnpm i
# or
npm i
```

# Quasar App (nitra-ai-chatbot)

Nitra AI Chatroom UI Challenge

## Install the dependencies

```bash
pnpm i
```

## Architecture

### Feature-Based Structure

The codebase follows a feature-based organization under `src/features/`:

- **chatroom feature** (`src/features/chatroom/`):
  - `components/` - Vue components specific to the chatroom (ChatMessage, ChatContainer, ChatActions, etc.)
  - `composables/` - Reusable Vue composition functions
  - `types/` - TypeScript type definitions

### Key Composables

**useMessage** (`src/features/chatroom/composables/useMessage.ts`)

- Central message management logic
- Handles user messages and simulated AI responses
- Fetches mock responses from `MESSAGE_MOCK_MAP` with random delays (5-10s)
- Manages message state and streaming status
- Key functions: `onMessageSent()`, `appendWelcomeMessage()`, `fetchBotResponseMessage()`

**useTypingAnimation** (`src/features/chatroom/composables/useTypingAnimation.ts`)

- Character-by-character typing animation for AI responses
- Configurable speed and callbacks (onBegin, onTyping, onComplete)
- Auto-cleanup on component unmount

**useMarkdownRenderer** (`src/features/chatroom/composables/useMarkdownRenderer.ts`)

- Renders markdown content using markdown-it library
- Configured with: linkify, typographer, breaks enabled, html disabled

### Message Flow

1. User sends message via `onMessageSent()`
2. User message appended to messages array
3. "Thinking" placeholder message created with `content: undefined`
4. After 300ms delay, placeholder is appended
5. Mock response fetched from `MESSAGE_MOCK_MAP` (5-10s random delay)
6. Typing animation renders response character-by-character
7. Message streaming state tracked via `isStreaming` flag
