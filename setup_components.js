const fs = require('fs');
const comps = ['Hero', 'Problem', 'HowItWorks', 'Contributor', 'Volunteer', 'NGO', 'Institutions', 'LiveImpact', 'Trust', 'Storytelling', 'AppShowcase', 'FinalCTA', 'Footer'];
comps.forEach(c => {
  fs.writeFileSync(`src/components/${c}.tsx`, `export function ${c}() {\n  return (\n    <section className="py-24 border-b border-neki-charcoal/10">\n      <h2>${c}</h2>\n    </section>\n  );\n}`);
});
