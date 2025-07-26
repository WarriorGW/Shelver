export function getAvatarUrl(email: string, style: string = "bottts"): string {
  const seed = encodeURIComponent(email.trim().toLowerCase());
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
}
