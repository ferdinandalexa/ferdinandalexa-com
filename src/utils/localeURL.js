import { rootResolver, languageResolver, collectionResolver } from "./resolvers";

function localeURL({ locale = 'es', collection, slug }) {
  const isRoot = (!collection && !slug);
  if (isRoot) {
    return rootResolver[locale];
  }

  const localeSwitched = languageResolver[locale];
  const collectionLocale = collectionResolver[collection] || ""
  const slugFormated = slug ? `/${slug}` : ""

  const newPath = `${localeSwitched}${collectionLocale}${slugFormated}`;

  return newPath;
}

export { localeURL }