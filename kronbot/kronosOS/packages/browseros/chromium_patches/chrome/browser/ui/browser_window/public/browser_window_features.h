diff --git a/chrome/browser/ui/browser_window/public/browser_window_features.h b/chrome/browser/ui/browser_window/public/browser_window_features.h
index 19048c9478592..cc3c846cac900 100644
--- a/chrome/browser/ui/browser_window/public/browser_window_features.h
+++ b/chrome/browser/ui/browser_window/public/browser_window_features.h
@@ -42,6 +42,7 @@ class BrowserUserEducationInterface;
 class BrowserView;
 class BrowserWindowInterface;
 class ChromeLabsCoordinator;
+class ClashOfGptsCoordinator;
 class ColorProviderBrowserHelper;
 class CommentsSidePanelCoordinator;
 class ContentsBorderController;
@@ -75,6 +76,7 @@ class TabSearchToolbarButtonController;
 class TabListBridge;
 class TabStripModel;
 class TabStripServiceFeature;
+class ThirdPartyLlmPanelCoordinator;
 class ToastController;
 class ToastService;
 class TranslateBubbleController;
@@ -253,6 +255,14 @@ class BrowserWindowFeatures {
     return comments_side_panel_coordinator_.get();
   }
 
+  ThirdPartyLlmPanelCoordinator* third_party_llm_panel_coordinator() {
+    return third_party_llm_panel_coordinator_.get();
+  }
+
+  ClashOfGptsCoordinator* clash_of_gpts_coordinator() {
+    return clash_of_gpts_coordinator_.get();
+  }
+
 #if BUILDFLAG(ENABLE_GLIC)
   glic::GlicLegacySidePanelCoordinator* glic_side_panel_coordinator() {
     return glic_side_panel_coordinator_.get();
@@ -546,6 +556,11 @@ class BrowserWindowFeatures {
   std::unique_ptr<CommentsSidePanelCoordinator>
       comments_side_panel_coordinator_;
 
+  std::unique_ptr<ThirdPartyLlmPanelCoordinator>
+      third_party_llm_panel_coordinator_;
+
+  std::unique_ptr<ClashOfGptsCoordinator> clash_of_gpts_coordinator_;
+
   std::unique_ptr<PinnedToolbarActionsController>
       pinned_toolbar_actions_controller_;
 
