export const getFirstLetters = (name: string) => {
  const names = name.split(' ');
  return names.length > 1 ? `${names.at(0)!.at(0)}${names.at(1)!.at(0)}` : `${names.at(0)!.at(0)}`;
}
