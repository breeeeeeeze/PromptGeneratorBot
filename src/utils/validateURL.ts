export function validateURL(url: string) {
  const imageExtensionRegex = /\.(jpeg|jpg|gif|png|webp)$/;
  const urlRegex =
    /^(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/;
  return urlRegex.test(url) && imageExtensionRegex.test(url);
}
