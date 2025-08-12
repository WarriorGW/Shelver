export function getAvatarUrl(
  email: string,
  style: string = "initials"
): string {
  const seed = encodeURIComponent(email.trim().toLowerCase());
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
}
