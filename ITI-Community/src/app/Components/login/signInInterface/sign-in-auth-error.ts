export enum SignInAuthError {
  InvalidEmail = 'auth/invalid-email',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  EmailAlreadyInUse = 'email-already-in-use',
  WeakPassword = 'auth/weak-password',
  EmailNotVerified = 'auth/email-not-verified',
  Correct = 'auth/correct',
}
