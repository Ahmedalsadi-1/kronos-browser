diff --git a/chrome/browser/ui/ui_features.cc b/chrome/browser/ui/ui_features.cc
index c03c8ac6f6e00..0c0b83dfe9fef 100644
--- a/chrome/browser/ui/ui_features.cc
+++ b/chrome/browser/ui/ui_features.cc
@@ -106,14 +106,14 @@ BASE_FEATURE(kReloadSelectionModel, base::FEATURE_DISABLED_BY_DEFAULT);
 // Enforces close tab hotkey to only close the active view of a split tab,
 // when it is the only tab in selection model.
 BASE_FEATURE(kCloseActiveTabInSplitViewViaHotkey,
-             base::FEATURE_DISABLED_BY_DEFAULT);
+             base::FEATURE_ENABLED_BY_DEFAULT);
 
 #if BUILDFLAG(IS_MAC)
 // Add tab group colours when viewing tab groups using the top mac OS menu bar.
 BASE_FEATURE(kShowTabGroupsMacSystemMenu, base::FEATURE_DISABLED_BY_DEFAULT);
 #endif  // BUILDFLAG(IS_MAC)
 
-BASE_FEATURE(kSideBySide, base::FEATURE_DISABLED_BY_DEFAULT);
+BASE_FEATURE(kSideBySide, base::FEATURE_ENABLED_BY_DEFAULT);
 
 // The delay before showing the drop target for the side-by-side drag-and-drop
 // entrypoint.
@@ -242,7 +242,7 @@ BASE_FEATURE_PARAM(int,
 
 // When enabled along with SideBySide flag, split tabs will be restored on
 // startup.
-BASE_FEATURE(kSideBySideSessionRestore, base::FEATURE_DISABLED_BY_DEFAULT);
+BASE_FEATURE(kSideBySideSessionRestore, base::FEATURE_ENABLED_BY_DEFAULT);
 
 bool IsRestoringSplitViewEnabled() {
   return base::FeatureList::IsEnabled(features::kSideBySide) &&
@@ -251,7 +251,7 @@ bool IsRestoringSplitViewEnabled() {
 
 BASE_FEATURE(kSideBySideLinkMenuNewBadge, base::FEATURE_DISABLED_BY_DEFAULT);
 
-BASE_FEATURE(kSideBySideKeyboardShortcut, base::FEATURE_DISABLED_BY_DEFAULT);
+BASE_FEATURE(kSideBySideKeyboardShortcut, base::FEATURE_ENABLED_BY_DEFAULT);
 
 bool IsSideBySideKeyboardShortcutEnabled() {
   return base::FeatureList::IsEnabled(features::kSideBySide) &&
@@ -260,6 +260,14 @@ bool IsSideBySideKeyboardShortcutEnabled() {
 
 BASE_FEATURE(kSidePanelResizing, base::FEATURE_ENABLED_BY_DEFAULT);
 
+BASE_FEATURE(kThirdPartyLlmPanel,
+             "ThirdPartyLlmPanel",
+             base::FEATURE_ENABLED_BY_DEFAULT);
+
+BASE_FEATURE(kClashOfGpts,
+             "ClashOfGpts",
+             base::FEATURE_ENABLED_BY_DEFAULT);
+
 BASE_FEATURE(kTabDuplicateMetrics, base::FEATURE_ENABLED_BY_DEFAULT);
 
 // Enables buttons when scrolling the tabstrip https://crbug.com/951078
