export const checkPasswordStrength = (password: string) => {
  if (!password) return 0;
  let strength = 0;
  if (password.length >= 6) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  if (strength <= 1) return 1;
  if (strength <= 2) return 2;
  return 3;
};
