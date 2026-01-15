diff --git a/chrome/browser/ui/ui_features.h b/chrome/browser/ui/ui_features.h
index 24bf81e4b6e3c..1056daae1f563 100644
--- a/chrome/browser/ui/ui_features.h
+++ b/chrome/browser/ui/ui_features.h
@@ -225,6 +225,8 @@ inline constexpr char kTabScrollingButtonPositionParameterName[] =
 
 BASE_DECLARE_FEATURE(kSidePanelResizing);
 BASE_DECLARE_FEATURE(kSidePanelSearchCompanion);
+BASE_DECLARE_FEATURE(kThirdPartyLlmPanel);
+BASE_DECLARE_FEATURE(kClashOfGpts);
 
 BASE_DECLARE_FEATURE(kTabGroupsCollapseFreezing);
 BASE_DECLARE_FEATURE(kTabGroupHoverCards);
