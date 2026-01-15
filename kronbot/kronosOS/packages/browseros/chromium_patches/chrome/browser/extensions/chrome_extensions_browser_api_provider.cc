diff --git a/chrome/browser/extensions/chrome_extensions_browser_api_provider.cc b/chrome/browser/extensions/chrome_extensions_browser_api_provider.cc
index f64f81b90b4fb..73c22ae9e77f8 100644
--- a/chrome/browser/extensions/chrome_extensions_browser_api_provider.cc
+++ b/chrome/browser/extensions/chrome_extensions_browser_api_provider.cc
@@ -4,6 +4,7 @@
 
 #include "chrome/browser/extensions/chrome_extensions_browser_api_provider.h"
 
+#include "chrome/browser/extensions/api/browser_os/browser_os_api.h"
 #include "chrome/browser/extensions/api/commands/commands.h"
 #include "chrome/browser/extensions/api/generated_api_registration.h"
 #include "extensions/browser/extension_function_registry.h"
@@ -23,6 +24,14 @@ void ChromeExtensionsBrowserAPIProvider::RegisterExtensionFunctions(
   // Commands
   registry->RegisterFunction<GetAllCommandsFunction>();
 
+  // Browser OS API
+  registry->RegisterFunction<api::BrowserOSGetAccessibilityTreeFunction>();
+  registry->RegisterFunction<api::BrowserOSGetInteractiveSnapshotFunction>();
+  registry->RegisterFunction<api::BrowserOSClickFunction>();
+  registry->RegisterFunction<api::BrowserOSInputTextFunction>();
+  registry->RegisterFunction<api::BrowserOSClearFunction>();
+  registry->RegisterFunction<api::BrowserOSExecuteJavaScriptFunction>();
+
   // Generated APIs from Chrome.
   api::ChromeGeneratedFunctionRegistry::RegisterAll(registry);
 }
