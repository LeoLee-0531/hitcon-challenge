// 挑戰的 Flag 答案
// 注意：這些 flag 僅供開發測試使用
// 在生產環境中，應該使用後端 API 來驗證 flag

export const challengeFlags: Record<string, string> = {
  instagram: 'SITCON{instagram_secret}',
  'prompt-injection': 'SITCON{prompt_hack}',
  'worker-recruitment': 'SITCON{worker_2024}',
  'elf-text': 'SITCON{elf_language}',
  'git-leak': 'SITCON{git_secrets}',
  'python-jail': 'SITCON{python_escape}',
  'about-sitcon': 'SITCON{about_2024}',
};

// 驗證 flag 的函數
export const validateFlag = (
  challengeId: string,
  userInput: string
): boolean => {
  const correctFlag = challengeFlags[challengeId];
  return correctFlag === userInput.trim();
};
