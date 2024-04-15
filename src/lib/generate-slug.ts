export const generateSlug = (string: string) => {
  return string
    .toLowerCase() // Convert the string to lowercase
    .trim() // Remove leading and trailing whitespaces
    .replace(/\s+/g, '-') // Replace whitespaces with dashes
    .replace(/[^\w\-]+/g, '') // Remove non-word characters except dashes
    .replace(/\-\-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-+/, '') // Remove leading dashes
    .replace(/-+$/, ''); // Remove trailing dashes
};
