type ImageCacheEntry = {
  image: HTMLImageElement | null;
  loading: boolean;
  error: boolean;
}

const imageCache = new Map<string, ImageCacheEntry>();

export type LoadImageOptions = {
  onLoad: () => void;
  onLoadError: () => void
}

export const loadImage = async (
  src: string,
  options: Partial<LoadImageOptions>,
) => new Promise<ImageCacheEntry>((res) => {
  if (imageCache.has(src)) res(imageCache.get(src)!)

  const cacheEntry: ImageCacheEntry = {
    image: null,
    loading: true,
    error: false,
  };

  imageCache.set(src, cacheEntry);

  const img = new Image();

  img.onload = () => {
    cacheEntry.image = img;
    cacheEntry.loading = false;
    options.onLoad?.();
    res(cacheEntry)
  };

  img.onerror = () => {
    cacheEntry.loading = false;
    cacheEntry.error = true;
    options.onLoadError?.();
    res(cacheEntry)
  };

  img.src = src;
})
