diff --git a/chrome/browser/resources/settings/settings_main/settings_main.ts b/chrome/browser/resources/settings/settings_main/settings_main.ts
index 3781087b3d5e5..47ffeacdf3d9a 100644
--- a/chrome/browser/resources/settings/settings_main/settings_main.ts
+++ b/chrome/browser/resources/settings/settings_main/settings_main.ts
@@ -21,6 +21,8 @@ import '../privacy_page/privacy_page_index.js';
 import '../reset_page/reset_profile_banner.js';
 import '../search_page/search_page_index.js';
 import '../your_saved_info_page/your_saved_info_page_index.js';
+import '../nxtscape_page/nxtscape_page.js';
+import '../browseros_prefs_page/browseros_prefs_page.js';
 // <if expr="not is_chromeos">
 import '../default_browser_page/default_browser_page.js';
 
@@ -47,7 +49,6 @@ import {combineSearchResults} from '../search_settings.js';
 import {getTemplate} from './settings_main.html.js';
 import type {SettingsPlugin} from './settings_plugin.js';
 
-
 export interface SettingsMainElement {
   $: {
     noSearchResults: HTMLElement,
