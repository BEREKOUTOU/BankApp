# TODO: Set up Security for Dashboard Access

- [x] Add authentication check in Dashboard component to redirect to /login if not authenticated
- [ ] Test the fix by accessing /dashboard directly

# TODO: Implement Biometric Registration and Authentication

- [ ] Modify BiometricAuth component to use WebAuthn API for real registration and authentication
- [ ] Add state to check if biometrics are registered
- [ ] Implement registration flow using navigator.credentials.create()
- [ ] Implement authentication flow using navigator.credentials.get()
- [ ] Update login page to require biometric registration before login
- [ ] Test on supported devices
