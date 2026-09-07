const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src', 'content', 'blog');

const modifications = {
  'prevent-ssl-certificate-expiry-downtime.md': [
    { dest: 'ssl-certificate-monitoring-catch-expiry-before-users', regex: /(SSL certificate monitoring|SSL expiry monitoring|SSL expiry alerts|monitoring certificates)/i }
  ],
  'ssl-certificate-monitoring-catch-expiry-before-users.md': [
    { dest: 'prevent-ssl-certificate-expiry-downtime', regex: /(prevent SSL certificate expiry|SSL certificate expiry monitoring|SSL downtime prevention|preventing certificate expiry)/i }
  ],
  'multi-region-uptime-monitoring-location-impacts-reliability.md': [
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|website uptime monitoring guide)/i },
    { dest: 'how-uptime-monitoring-actually-works', regex: /(how uptime monitoring works|uptime monitoring process)/i },
    { dest: 'how-to-choose-an-uptime-monitoring-service-in-2026', regex: /(choose an uptime monitoring service|uptime monitoring service)/i }
  ],
  'hidden-causes-website-downtime-ping-tests-never-catch.md': [
    { dest: 'how-uptime-monitoring-actually-works', regex: /(how uptime monitoring works|uptime monitoring process)/i },
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'multi-region-uptime-monitoring-location-impacts-reliability', regex: /(multi-region uptime monitoring|monitoring from multiple locations)/i },
    { dest: 'best-uptime-monitoring-tools', regex: /(uptime monitoring tools|website monitoring tools)/i }
  ],
  'website-uptime-monitoring-guide-2026.md': [
    { dest: 'how-uptime-monitoring-actually-works', regex: /(how uptime monitoring works|uptime monitoring process)/i },
    { dest: 'uptime-monitoring-check-frequency-20s-1m-5m', regex: /(check frequency|monitoring check frequency|1-minute checks|5-minute checks)/i },
    { dest: 'multi-region-uptime-monitoring-location-impacts-reliability', regex: /(multi-region uptime monitoring|monitoring from multiple locations)/i },
    { dest: 'hidden-causes-website-downtime-ping-tests-never-catch', regex: /(hidden causes of website downtime|ping tests never catch)/i },
    { dest: 'best-uptime-monitoring-tools', regex: /(best uptime monitoring tools|uptime monitoring tools)/i },
    { dest: 'how-to-choose-an-uptime-monitoring-service-in-2026', regex: /(choose an uptime monitoring service|uptime monitoring service)/i }
  ],
  'hosted-vs-self-hosted-uptime-monitoring.md': [
    { dest: 'best-uptime-monitoring-tools', regex: /(uptime monitoring tools|best uptime monitoring tools)/i },
    { dest: 'how-to-choose-an-uptime-monitoring-service-in-2026', regex: /(choose an uptime monitoring service|uptime monitoring service)/i },
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i }
  ],
  'uptime-monitoring-check-frequency-20s-1m-5m.md': [
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'how-uptime-monitoring-actually-works', regex: /(how uptime monitoring works|uptime monitoring process)/i },
    { dest: 'multi-region-uptime-monitoring-location-impacts-reliability', regex: /(multi-region uptime monitoring|monitoring from multiple locations)/i }
  ],
  'uptime-monitoring-for-ecommerce.md': [
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'best-uptime-monitoring-tools', regex: /(best uptime monitoring tools|uptime monitoring tools)/i },
    { dest: 'multi-region-uptime-monitoring-location-impacts-reliability', regex: /(multi-region uptime monitoring|monitoring from multiple locations)/i }
  ],
  'uptime-monitoring-for-wordpress-shopify-webflow.md': [
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'best-uptime-monitoring-tools', regex: /(best uptime monitoring tools|uptime monitoring tools)/i },
    { dest: 'uptime-monitoring-for-ecommerce', regex: /(uptime monitoring for ecommerce|ecommerce uptime monitoring|e-commerce)/i }
  ],
  'best-uptime-monitoring-tools.md': [
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'hosted-vs-self-hosted-uptime-monitoring', regex: /(hosted vs self-hosted uptime monitoring|hosted vs self-hosted)/i },
    { dest: 'how-to-choose-an-uptime-monitoring-service-in-2026', regex: /(choose an uptime monitoring service|uptime monitoring service)/i }
  ],
  'how-uptime-monitoring-actually-works.md': [
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'uptime-monitoring-check-frequency-20s-1m-5m', regex: /(check frequency|monitoring frequency)/i },
    { dest: 'multi-region-uptime-monitoring-location-impacts-reliability', regex: /(multi-region uptime monitoring|monitoring from multiple locations)/i },
    { dest: 'server-uptime-monitoring-setup-guide', regex: /(server uptime monitoring setup|setup guide)/i },
    { dest: 'server-uptime-monitoring', regex: /(server uptime monitoring|monitoring server uptime)/i }
  ],
  'server-uptime-monitoring-setup-guide.md': [
    { dest: 'server-uptime-monitoring', regex: /(server uptime monitoring|monitoring server uptime)/i },
    { dest: 'how-uptime-monitoring-actually-works', regex: /(how uptime monitoring works|uptime monitoring process)/i },
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i }
  ],
  'how-to-choose-an-uptime-monitoring-service-in-2026.md': [
    { dest: 'best-uptime-monitoring-tools', regex: /(best uptime monitoring tools|uptime monitoring tools)/i },
    { dest: 'hosted-vs-self-hosted-uptime-monitoring', regex: /(hosted vs self-hosted uptime monitoring|hosted vs self-hosted)/i },
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i },
    { dest: 'multi-region-uptime-monitoring-location-impacts-reliability', regex: /(multi-region uptime monitoring|monitoring from multiple locations)/i }
  ],
  'server-uptime-monitoring.md': [
    { dest: 'server-uptime-monitoring-setup-guide', regex: /(server uptime monitoring setup|setup guide)/i },
    { dest: 'how-uptime-monitoring-actually-works', regex: /(how uptime monitoring works|uptime monitoring process)/i },
    { dest: 'website-uptime-monitoring-guide-2026', regex: /(website uptime monitoring|uptime monitoring guide)/i }
  ]
};

let totalReplaced = 0;
let modifiedFiles = 0;
let notFoundLinks = [];

for (const [file, links] of Object.entries(modifications)) {
  const filePath = path.join(blogsDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    continue;
  }
  let fullContent = fs.readFileSync(filePath, 'utf-8');
  const parts = fullContent.split('---');
  if (parts.length < 3) continue;
  
  const frontmatter = '---' + parts[1] + '---';
  let bodyContent = parts.slice(2).join('---');
  let fileReplaced = 0;

  for (const link of links) {
    // We shouldn't link to the same file we are in.
    if (file === link.dest + '.md') continue;

    // Check if link to this dest already exists anywhere
    // Using simple search for the URL
    if (bodyContent.includes(`/blog/${link.dest}/`)) {
      continue;
    }

    const matches = [...bodyContent.matchAll(new RegExp(link.regex, 'ig'))];
    let found = false;
    for (const match of matches) {
      const before = bodyContent.substring(0, match.index);
      
      // Avoid headings
      const currentLine = before.substring(before.lastIndexOf('\n') + 1);
      if (currentLine.trim().startsWith('#')) {
         continue;
      }

      const inMarkdownLink = (before.match(/\[/g) || []).length > (before.match(/\]/g) || []).length;
      const inHtmlLink = (before.match(/<a\b[^>]*>/g) || []).length > (before.match(/<\/a>/g) || []).length;
      
      if (!inMarkdownLink && !inHtmlLink) {
         bodyContent = bodyContent.substring(0, match.index) + `[${match[0]}](/blog/${link.dest}/)` + bodyContent.substring(match.index + match[0].length);
         fileReplaced++;
         totalReplaced++;
         found = true;
         break;
      }
    }
    if (!found) {
      notFoundLinks.push(`${file} -> ${link.dest}`);
    }
  }

  if (fileReplaced > 0) {
    fs.writeFileSync(filePath, frontmatter + bodyContent);
    modifiedFiles++;
    console.log(`Replaced ${fileReplaced} links in ${file}`);
  }
}

console.log(`\nModified ${modifiedFiles} files. Added ${totalReplaced} links.`);
if (notFoundLinks.length > 0) {
  console.log('Not found (could not insert naturally):', notFoundLinks);
}
