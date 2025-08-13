// 在生產環境中，請使用後端 API 來驗證 flag
// 透過後端 API 驗證 flag
export async function validateFlag(
  challengeId: string,
  userInput: string
): Promise<boolean> {
  try {
    const response = await fetch('/api/stages/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challengeId,
        userInput: userInput.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to validate flag');
    }

    const data = await response.json();
    return !!data.valid;
  } catch (error) {
    console.error('Flag validation error:', error);
    return false;
  }
}
