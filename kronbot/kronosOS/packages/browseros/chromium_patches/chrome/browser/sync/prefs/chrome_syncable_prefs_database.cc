diff --git a/chrome/browser/sync/prefs/chrome_syncable_prefs_database.cc b/chrome/browser/sync/prefs/chrome_syncable_prefs_database.cc
index b4ff6805bf506..fdce0d4e90463 100644
--- a/chrome/browser/sync/prefs/chrome_syncable_prefs_database.cc
+++ b/chrome/browser/sync/prefs/chrome_syncable_prefs_database.cc
@@ -402,6 +402,8 @@ enum {
   kDesktopToiOSLensPromoLastImpressionTimestamp = 100335,
   kDesktopToiOSLensPromoImpressionsCounter = 100336,
   kDesktopToiOSLensPromoOptOut = 100337,
+  kPinnedThirdPartyLlmMigrationComplete = 100338,
+  kPinnedClashOfGptsMigrationComplete = 100339,
   // See components/sync_preferences/README.md about adding new entries here.
   // vvvvv IMPORTANT! vvvvv
   // Note to the reviewer: IT IS YOUR RESPONSIBILITY to ensure that new syncable
@@ -590,6 +592,14 @@ constexpr auto kChromeSyncablePrefsAllowlist = base::MakeFixedFlatMap<
      {syncable_prefs_ids::kVerticalTabsEnabled, syncer::PREFERENCES,
       sync_preferences::PrefSensitivity::kNone,
       sync_preferences::MergeBehavior::kNone}},
+    {prefs::kPinnedThirdPartyLlmMigrationComplete,
+     {syncable_prefs_ids::kPinnedThirdPartyLlmMigrationComplete, syncer::PREFERENCES,
+      sync_preferences::PrefSensitivity::kNone,
+      sync_preferences::MergeBehavior::kNone}},
+    {prefs::kPinnedClashOfGptsMigrationComplete,
+     {syncable_prefs_ids::kPinnedClashOfGptsMigrationComplete, syncer::PREFERENCES,
+      sync_preferences::PrefSensitivity::kNone,
+      sync_preferences::MergeBehavior::kNone}},
 #endif  // BUILDFLAG(IS_ANDROID)
 #if BUILDFLAG(ENABLE_EXTENSIONS_CORE)
     {extensions::pref_names::kPinnedExtensions,
