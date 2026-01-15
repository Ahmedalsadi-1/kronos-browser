diff --git a/components/os_crypt/sync/keychain_password_mac.mm b/components/os_crypt/sync/keychain_password_mac.mm
index 1d4c16a300227..af4b3c4c09eb9 100644
--- a/components/os_crypt/sync/keychain_password_mac.mm
+++ b/components/os_crypt/sync/keychain_password_mac.mm
@@ -35,8 +35,8 @@ namespace {
 const char kDefaultServiceName[] = "Chrome Safe Storage";
 const char kDefaultAccountName[] = "Chrome";
 #else
-const char kDefaultServiceName[] = "Chromium Safe Storage";
-const char kDefaultAccountName[] = "Chromium";
+const char kDefaultServiceName[] = "BrowserOS Safe Storage";
+const char kDefaultAccountName[] = "BrowserOS";
 #endif
 
 // These values are persisted to logs. Entries should not be renumbered and
