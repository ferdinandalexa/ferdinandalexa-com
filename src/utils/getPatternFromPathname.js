function getPatternFromPathname({ pathname }) {
  const matcherURL =
    /\/(?<locale>en|es)\/?(?<collection>projects|proyectos|blog)?\/?(?<slug>.*)?\/?/i;

  const patternGroups = pathname.match(matcherURL)?.groups || {}
  return patternGroups;
}

export { getPatternFromPathname }