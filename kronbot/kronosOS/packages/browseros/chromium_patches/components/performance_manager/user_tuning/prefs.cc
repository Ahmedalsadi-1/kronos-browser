diff --git a/components/performance_manager/user_tuning/prefs.cc b/components/performance_manager/user_tuning/prefs.cc
index 5f08b322d8ab0..79677d732fbe6 100644
--- a/components/performance_manager/user_tuning/prefs.cc
+++ b/components/performance_manager/user_tuning/prefs.cc
@@ -25,7 +25,7 @@ void RegisterLocalStatePrefs(PrefRegistrySimple* registry) {
       kMemorySaverModeTimeBeforeDiscardInMinutes,
       kDefaultMemorySaverModeTimeBeforeDiscardInMinutes);
   registry->RegisterIntegerPref(
-      kMemorySaverModeState, static_cast<int>(MemorySaverModeState::kDisabled));
+      kMemorySaverModeState, static_cast<int>(MemorySaverModeState::kEnabled));
   registry->RegisterIntegerPref(
       kMemorySaverModeAggressiveness,
       static_cast<int>(MemorySaverModeAggressiveness::kMedium));
