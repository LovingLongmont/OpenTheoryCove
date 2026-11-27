# CoveScapes Mobile — Wolf Haven

A standalone start page from Open Theory Cove.

## Install on iPhone

1. Open the hosted page in Safari while online.
2. Tap Share, then Add to Home Screen. Turn on Open as Web App if Safari shows that switch, then tap Add.
3. Launch Wolf Haven from your Home Screen. Open Settings and wait for Offline access to say it is ready.

Categories and quick launch can be edited on Home or in Settings. Tap a category to expand it and use its star buttons to add or remove favorites. Manage shortcuts to change their order or move a website to a different category.

Notes, tasks, favorites, links and appearance settings are stored locally on the device. Use Settings → Export JSON to back them up, especially before clearing browser data or switching devices. Installation may use a separate storage area from the Safari tab. For existing customizations, export in Safari and import from the installed app. The app accepts its own JSON exports and supported desktop CoveScapes backup versions.

The app caches its own files after the first online launch. External links and Google search need internet access. Public hosting serves the app files, while personal edits stay in local browser storage.

## Host the files

Serve this entire folder on an HTTPS static host or use a localhost server for development. Keep the relative paths. The service worker is scoped to the app folder. Increment the cache version in sw.js after making changes to the app shell.

The page has a noindex directive. Keep the URL out of public navigation and sitemaps.
