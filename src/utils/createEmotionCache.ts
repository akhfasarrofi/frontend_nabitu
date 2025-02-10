import createCache from '@emotion/cache'

/**
 * Creates and configures an Emotion cache instance for CSS-in-JS styling
 * @returns {EmotionCache} Configured Emotion cache instance
 *
 * @description
 * This utility function creates a new Emotion cache configuration with:
 * - key: 'css' - Identifies the cache instance
 * - Used for server-side rendering and client-side hydration of styles
 * - Ensures consistent styling between server and client
 *
 * @example
 * const cache = createEmotionCache();
 * // Use with Emotion provider
 * <CacheProvider value={cache}>
 *   <App />
 * </CacheProvider>
 */
export default function createEmotionCache() {
  return createCache({
    key: 'css',
  })
}
