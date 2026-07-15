export async function verifyPasswordResetCode(email: string, code: string): Promise<{ message: string }> {
  const response = await fetch('/api/auth/verify-code', { // فرض می‌کنیم این endpoint شماست
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, code }),
  });

  if (!response.ok) {
    // اگر سرور با خطا پاسخ داد، یک خطا پرتاب می‌کنیم
    const errorData = await response.json();
    throw new Error(errorData.message || 'خطا در تایید کد');
  }

  return await response.json();
}