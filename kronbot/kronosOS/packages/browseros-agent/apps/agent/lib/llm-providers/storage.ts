import { storage } from '@wxt-dev/storage'
import { getBrowserOSAdapter } from '@/lib/browseros/adapter'
import { BROWSEROS_PREFS } from '@/lib/browseros/prefs'
import type { LlmProviderConfig, LlmProvidersBackup } from './types'

// Removed DEFAULT_PROVIDER_ID constant as browseros is no longer the default
// export const DEFAULT_PROVIDER_ID = 'browseros' 

/** Storage key for LLM providers array */
export const providersStorage = storage.defineItem<LlmProviderConfig[]>(
  'local:llm-providers',
)

/** Backup providers to BrowserOS prefs (write-only, best-effort) */
async function backupToBrowserOS(backup: LlmProvidersBackup): Promise<void> {
  try {
    const adapter = getBrowserOSAdapter()
    await adapter.setPref(BROWSEROS_PREFS.PROVIDERS, JSON.stringify(backup))
  } catch {
    // BrowserOS API not available - ignore
  }
}

/**
 * Setup one-way sync of LLM providers to BrowserOS prefs
 * @public
 */
export function setupLlmProvidersBackupToBrowserOS(): () => void {
  const unsubscribe = providersStorage.watch(async (providers) => {
    if (providers) {
      const defaultProviderId = await defaultProviderIdStorage.getValue()
      await backupToBrowserOS({ defaultProviderId, providers })
    }
  })
  return unsubscribe
}

/** Load providers from storage */
export async function loadProviders(): Promise<LlmProviderConfig[]> {
  const providers = await providersStorage.getValue()
  return providers || []
}

/** Creates the default BrowserOS provider configuration */
export function createDefaultBrowserOSProvider(): LlmProviderConfig {
  const timestamp = Date.now()
  return {
    id: 'browseros', // Keep id as browseros for consistency if needed internally
    type: 'browseros',
    name: 'BrowserOS (Internal)', // Renamed to indicate internal use
    baseUrl: 'https://api.browseros.com/v1',
    modelId: 'browseros-auto',
    supportsImages: true,
    contextWindow: 400000,
    temperature: 0.2,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
}

/** Creates the default providers configuration. Only call when storage is empty. */
export function createDefaultProvidersConfig(): LlmProviderConfig[] {
  const timestamp = Date.now()

  const opencodeAiZenProvider: LlmProviderConfig = {
    id: 'opencode-ai-zen',
    type: 'opencodeai', // Updated to custom type
    name: 'generalist', // Display name changed
    baseUrl: 'https://opencode.ai/zen/v1',
    modelId: 'gpt-5-nano',
    apiKey: process.env.OPENCODEAI_API_KEY, // Using environment variable
    supportsImages: false, // Defaulting to false, can be changed if needed
    contextWindow: 400000,
    temperature: 0.2,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  const opencodeAiGrokCodeModel: LlmProviderConfig = {
    ...opencodeAiZenProvider, // Copy base config
    id: 'opencode-ai-grok-code',
    type: 'opencodeai', // Updated to custom type
    modelId: 'grok-code',
    name: 'kron-coder', // Display name changed
  }

  const zAiProvider: LlmProviderConfig = {
    id: 'z-ai',
    type: 'z_ai', // Updated to custom type
    name: 'kron-beta', // Display name changed
    baseUrl: 'https://api.z.ai/api/paas/v4',
    modelId: 'glm-4.5-flash',
    apiKey: process.env.ZAI_API_KEY, // Using environment variable
    supportsImages: false, // Defaulting to false, can be changed if needed
    contextWindow: 400000,
    temperature: 0.2,
    createdAt: timestamp,
    updatedAt: timestamp,
  }

  // Include the internal BrowserOS provider if needed for internal operations, but not as a selectable option
  // Or completely remove it if it's not needed at all. For now, removing from default config.
  return [opencodeAiZenProvider, opencodeAiGrokCodeModel, zAiProvider]
}

/** Storage key for the default provider ID */
export const defaultProviderIdStorage = storage.defineItem<string>(
  'local:default-provider-id',
  {
    fallback: 'opencode-ai-zen', // Fallback changed to one of the new providers
  },
)
