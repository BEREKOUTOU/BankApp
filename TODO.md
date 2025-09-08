# Fix MIME Type Error for Module Loading

## Issue

- NS_ERROR_CORRUPTED_CONTENT error when loading modules
- Server trying to load "cards-management.jsx" instead of resolving directory import to "cards-management/index.jsx"
- Multiple modules failing to load with forbidden MIME type error

## Root Cause

- Vite dev server cache issue preventing proper module resolution
- Directory imports not resolving correctly to index.jsx files

## Steps to Fix

- [ ] Clear Vite dev server cache
- [ ] Restart the development server
- [ ] Verify all modules load correctly
- [ ] Test navigation to cards-management page

## Files Involved

- src/Routes.jsx (import paths)
- src/pages/cards-management/index.jsx (target file)
- vite.config.mjs (server configuration)

## Expected Outcome

- All modules should load without MIME type errors
- Directory imports should resolve correctly to index.jsx files
- Navigation to /cards-management should work properly
