diff --git a/chrome/browser/themes/theme_service_factory.cc b/chrome/browser/themes/theme_service_factory.cc
index 8634cbb4dc17a..3bd0aec1c7095 100644
--- a/chrome/browser/themes/theme_service_factory.cc
+++ b/chrome/browser/themes/theme_service_factory.cc
@@ -131,11 +131,11 @@ void ThemeServiceFactory::RegisterProfilePrefs(
                                 SK_ColorTRANSPARENT);
   registry->RegisterIntegerPref(
       prefs::kDeprecatedBrowserColorSchemeDoNotUse,
-      static_cast<int>(ThemeService::BrowserColorScheme::kSystem),
+      static_cast<int>(ThemeService::BrowserColorScheme::kLight),
       user_prefs::PrefRegistrySyncable::SYNCABLE_PREF);
   registry->RegisterIntegerPref(
       prefs::kBrowserColorScheme,
-      static_cast<int>(ThemeService::BrowserColorScheme::kSystem));
+      static_cast<int>(ThemeService::BrowserColorScheme::kLight));
   registry->RegisterIntegerPref(
       prefs::kDeprecatedUserColorDoNotUse, SK_ColorTRANSPARENT,
       user_prefs::PrefRegistrySyncable::SYNCABLE_PREF);
