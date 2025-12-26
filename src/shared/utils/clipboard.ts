// Copy to clipboard with auto-clear for security
export async function copyToClipboard(
  text: string,
  autoClearMs: number = 3000
): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);

    // Auto-clear after timeout
    setTimeout(async () => {
      try {
        const currentClipboard = await navigator.clipboard.readText();
        if (currentClipboard === text) {
          await navigator.clipboard.writeText('');
        }
      } catch {
        try {
          await navigator.clipboard.writeText('');
        } catch {
          // Ignore permission errors
        }
      }
    }, autoClearMs);

    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
