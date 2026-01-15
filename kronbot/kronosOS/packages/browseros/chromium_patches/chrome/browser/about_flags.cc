diff --git a/chrome/browser/about_flags.cc b/chrome/browser/about_flags.cc
index e80a06d6cb742..967bee782659a 100644
--- a/chrome/browser/about_flags.cc
+++ b/chrome/browser/about_flags.cc
@@ -12068,6 +12068,11 @@ const FeatureEntry kFeatureEntries[] = {
     {"bookmarks-tree-view", flag_descriptions::kBookmarksTreeViewName,
      flag_descriptions::kBookmarksTreeViewDescription, kOsDesktop,
      FEATURE_VALUE_TYPE(features::kBookmarksTreeView)},
+
+    {"enable-browseros-alpha-features",
+     flag_descriptions::kBrowserOsAlphaFeaturesName,
+     flag_descriptions::kBrowserOsAlphaFeaturesDescription, kOsDesktop,
+     FEATURE_VALUE_TYPE(features::kBrowserOsAlphaFeatures)},
 #endif
 
     {"enable-secure-payment-confirmation-availability-api",
