import { toRef, watch } from 'vue';
import type { MaybeRef } from 'vue';

type TextTipEls = {
  outerDiv: HTMLDivElement;
  innerDiv: HTMLDivElement;
};

const TRANSITION_DURATION = 300;

const outerDivClasslist = [
  'absolute',
  'top-6',
  'w-full',
  'flex',
  'justify-center',
  'items-center',
  'transition-opacity',
  'duration-[300ms]',
  'pointer-events-none',
];

const innerDivClasslist = [
  'text-white',
  'font-bold',
  'bg-gray-800',
  'p-3',
  'px-10',
  'rounded-xl',
];

const createTextTipEls: () => TextTipEls = () => {
  const outerDiv = document.createElement('div');
  const innerDiv = document.createElement('div');

  outerDiv.classList.add(...outerDivClasslist);
  innerDiv.classList.add(...innerDivClasslist);

  return { outerDiv, innerDiv };
};

export const useTextTip = (textInput?: MaybeRef<string>) => {
  const text = toRef(textInput);
  const { outerDiv, innerDiv } = createTextTipEls();

  const mountTextTip = () => {
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);
  };

  const unmountTextTip = () => {
    outerDiv.remove();
  };

  if (text.value) innerDiv.textContent = text.value;

  const showText = async () => {
    if (outerDiv.isConnected) return;

    mountTextTip();
    outerDiv.style.opacity = '0';
    await new Promise((res) => setTimeout(res, 0));
    outerDiv.style.opacity = '1';
    await new Promise((res) => setTimeout(res, TRANSITION_DURATION));
  };

  const hideText = async () => {
    if (!outerDiv.isConnected) return;

    outerDiv.style.opacity = '0';
    await new Promise((res) => setTimeout(res, TRANSITION_DURATION));
    unmountTextTip();
  };

  const transitionTextContent = async (newText: string | undefined) => {
    await hideText();
    if (!newText) return;
    innerDiv.textContent = newText;
    await showText();
  };

  watch(text, transitionTextContent);

  return {
    showText,
    hideText,
    text,

    /**
     * for customizing the HTML elements used in the text tip
     */
    els: {
      outerDiv,
      innerDiv,
    },
  };
};
