import MarkdownIt from 'markdown-it';
import { ref } from 'vue';

export function useMarkdownRenderer() {
  const el = ref<HTMLElement | null>(null);

  const renderer = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
  });

  function renderMarkdown(mdText: string | undefined) {
    if (!el.value || !mdText) {
      return;
    }

    el.value.innerHTML = renderer.render(mdText);
  }

  return {
    el,
    renderMarkdown,
  };
}
