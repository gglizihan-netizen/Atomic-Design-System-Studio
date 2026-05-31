import fs from 'fs';
let content = fs.readFileSync('src/components/ShowcasePanel.tsx', 'utf8');

content = content.replace(/<labelclassName/g, '<label className');
content = content.replace(/<label className="font-semibold([^"]*)" style=\{\{ color: tokens.colors.textSecondary \}\}/g, '<label className="block text-sm font-medium mb-1.5$1" style={{ color: tokens.colors.textPrimary }}');
content = content.replace(/<span className="font-semibold block text-xs([^"]*)" style=\{\{ color: tokens.colors.textSecondary \}\}/g, '<span className="block text-sm font-medium$1" style={{ color: tokens.colors.textPrimary }}');

fs.writeFileSync('src/components/ShowcasePanel.tsx', content, 'utf8');
