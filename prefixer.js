export default function prefixer (prefix, { postcss, selectorParser }) {
  return postcss.plugin(`postcss-makelovenotwar-${prefix}`, () => {
    return root => {
      root.walkRules(rule => {
        if (rule.parent && rule.parent.name && /keyframes/.test(rule.parent.name)) return;
        const transformSelector = selectorParser(selectors => {
          selectors.walkClasses(classNode => {
            if (!classNode.value.startsWith(prefix)) {
              const original = classNode.raws && classNode.raws.value || classNode.value;
              classNode.value = `${prefix}${classNode.value}`;
              classNode.raws = classNode.raws || {};
              classNode.raws.value = `${prefix}.${original}`;
            }
          });
        });
        rule.selectors = rule.selectors.map(selector =>
          transformSelector.processSync(selector)
        );
      });
    };
  });
};
