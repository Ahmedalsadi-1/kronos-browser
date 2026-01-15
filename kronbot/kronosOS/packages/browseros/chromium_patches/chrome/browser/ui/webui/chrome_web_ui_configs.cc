diff --git a/chrome/browser/ui/webui/chrome_web_ui_configs.cc b/chrome/browser/ui/webui/chrome_web_ui_configs.cc
index 746ec07198b15..f08d5356a8e44 100644
--- a/chrome/browser/ui/webui/chrome_web_ui_configs.cc
+++ b/chrome/browser/ui/webui/chrome_web_ui_configs.cc
@@ -47,6 +47,7 @@
 #include "chrome/browser/ui/webui/signin_internals_ui.h"
 #include "chrome/browser/ui/webui/sync_internals/sync_internals_ui.h"
 #include "chrome/browser/ui/webui/translate_internals/translate_internals_ui.h"
+#include "chrome/browser/ui/webui/nxtscape_first_run.h"
 #include "chrome/browser/ui/webui/usb_internals/usb_internals_ui.h"
 #include "chrome/browser/ui/webui/user_actions/user_actions_ui.h"
 #include "chrome/browser/ui/webui/version/version_ui.h"
@@ -82,6 +83,7 @@
 #include "chrome/browser/ui/webui/app_service_internals/app_service_internals_ui.h"
 #include "chrome/browser/ui/webui/autofill_ml_internals/autofill_ml_internals_ui.h"
 #include "chrome/browser/ui/webui/bookmarks/bookmarks_ui.h"
+#include "chrome/browser/ui/webui/clash_of_gpts/clash_of_gpts_ui.h"
 #include "chrome/browser/ui/webui/color_pipeline_internals/color_pipeline_internals_ui.h"
 #include "chrome/browser/ui/webui/commerce/product_specifications_ui.h"
 #include "chrome/browser/ui/webui/commerce/shopping_insights_side_panel_ui.h"
@@ -268,6 +270,7 @@ void RegisterChromeWebUIConfigs() {
   map.AddWebUIConfig(std::make_unique<SiteEngagementUIConfig>());
   map.AddWebUIConfig(std::make_unique<SyncInternalsUIConfig>());
   map.AddWebUIConfig(std::make_unique<TranslateInternalsUIConfig>());
+  map.AddWebUIConfig(std::make_unique<NxtscapeFirstRunUIConfig>());
   map.AddWebUIConfig(std::make_unique<UsbInternalsUIConfig>());
   map.AddWebUIConfig(std::make_unique<UserActionsUIConfig>());
   map.AddWebUIConfig(std::make_unique<VersionUIConfig>());
@@ -302,6 +305,7 @@ void RegisterChromeWebUIConfigs() {
   map.AddWebUIConfig(std::make_unique<media_router::AccessCodeCastUIConfig>());
   map.AddWebUIConfig(std::make_unique<BookmarksSidePanelUIConfig>());
   map.AddWebUIConfig(std::make_unique<BookmarksUIConfig>());
+  map.AddWebUIConfig(std::make_unique<ClashOfGptsUIConfig>());
   map.AddWebUIConfig(std::make_unique<ColorPipelineInternalsUIConfig>());
   map.AddWebUIConfig(std::make_unique<CommentsSidePanelUIConfig>());
   map.AddWebUIConfig(std::make_unique<ContextualTasksUIConfig>());
