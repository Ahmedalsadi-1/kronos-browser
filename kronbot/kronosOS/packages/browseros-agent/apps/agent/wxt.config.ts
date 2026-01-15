import { sentryVitePlugin } from "@sentry/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";
import { LEGACY_AGENT_EXTENSION_ID } from "./lib/constants/legacyAgentExtensionId";
import { PRODUCT_WEB_HOST } from "./lib/constants/productWebHost";

// biome-ignore lint/style/noProcessEnv: build config file needs env access
const env = process.env;

// See https://wxt.dev/api/config.html
// Extension ID will be bflpfmnmnokmjhmgnolecpppdbdophmk
export default defineConfig({
  outDir: "dist",
  modules: ["@wxt-dev/module-react"],
  manifest: (target) => ({
    name: target === 'firefox' ? 'Kronbot AI Assistant' : 'kronosOS-assistant',
    description: 'AI-powered browser assistant with MCP tools. Control your browser with AI agents.',

    update_url: "https://cdn.kronos-os.com/extensions/update-manifest.xml",
    web_accessible_resources: [
      {
        resources: [
          "onboarding.html",
          "options.html",
          "widget.html",
          "injected-ui.html",
        ], // Added injected-ui.html
        matches: [`https://kronos-os.com/*`, `https://*.kronos-os.com/*`],
      },
      {
        resources: ["widget.html"],
        matches: ["<all_urls>"],
      },
    ],
    chrome_url_overrides: {
      newtab: "newtab.html",
    },
    browser_specific_settings: {
      gecko: {
        id: "agent@kronos-os.com",
        strict_min_version: "109.0",
      },
    },
    permissions: [
      "topSites",
      "tabs",
      "storage",
      // 'sidePanel', // Removed
      "browserOS",
      "alarms",
    ],
    content_scripts: [
      // Added content script configuration
      {
        matches: ["<all_urls>"],
        js: ["content-script.js"], // This will be our new entry point
        run_at: "document_end",
      },
    ],
  }),
  // Missing comma between manifest and vite
  vite: () => ({
    build: {
      sourcemap: "hidden",
    },
    plugins: [
      tailwindcss(),
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          // Bug with sentry & WXT - refer: https://github.com/wxt-dev/wxt/issues/1735
          // As you're enabling client source maps, you probably want to delete them after they're uploaded to Sentry.
          // Set the appropriate glob pattern for your output folder - some glob examples below:
          // filesToDeleteAfterUpload: ['./dist/**/*.map'],
        },
      }),
    ],
  }),
});
