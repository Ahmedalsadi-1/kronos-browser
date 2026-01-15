diff --git a/chrome/browser/ui/views/chrome_layout_provider.cc b/chrome/browser/ui/views/chrome_layout_provider.cc
index 0f1e5c46255a1..9d5c67a26e001 100644
--- a/chrome/browser/ui/views/chrome_layout_provider.cc
+++ b/chrome/browser/ui/views/chrome_layout_provider.cc
@@ -160,7 +160,7 @@ int ChromeLayoutProvider::GetDistanceMetric(int metric) const {
     case DISTANCE_INFOBAR_HEIGHT:
       // Spec says height of button should be 36dp, vertical padding on both
       // top and bottom should be 8dp.
-      return 36 + 2 * 8;
+      return 36 + 2 * 3;
     case DISTANCE_PERMISSION_PROMPT_HORIZONTAL_ICON_LABEL_PADDING:
       return 8;
     case DISTANCE_RICH_HOVER_BUTTON_ICON_HORIZONTAL:
