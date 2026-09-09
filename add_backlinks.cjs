const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src', 'content', 'blog');
const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));

// Expanded list of keywords for each blog to maximize linking potential
const links = [
  { slug: 'best-uptime-monitoring-tools', title: '7 Best Uptime Monitoring Tools', regex: /(best uptime monitoring tools|monitoring tools for startups|uptime monitoring tools|uptime tools)/ig },
  { slug: 'how-to-choose-an-uptime-monitoring-service-in-2026', title: 'How to Choose an Uptime Monitoring Service', regex: /(choose an uptime monitoring service|uptime monitoring service|evaluating monitoring services|monitoring vendor)/ig },
  { slug: 'how-uptime-monitoring-actually-works', title: 'How Uptime Monitoring Works', regex: /(how uptime monitoring works|how monitoring works|verdict engines|schedulers|probe execution|active liveness|state machine)/ig },
  { slug: 'server-uptime-monitoring-setup-guide', title: 'Server Uptime Monitoring Setup Guide', regex: /(uptime monitoring setup|server monitoring setup|setup guide for monitoring|setup guide|server setup)/ig },
  { slug: 'server-uptime-monitoring', title: 'Server Uptime Monitoring Best Practices', regex: /(server uptime monitoring|monitoring best practices|best practices for server monitoring|server monitoring)/ig },
  { slug: 'uptime-monitoring-check-frequency-20s-1m-5m', title: 'Uptime Monitoring Check Frequency', regex: /(check frequency|monitoring frequency|20-second checks|1-minute checks|5-minute checks|polling interval)/ig },
  { slug: 'uptime-monitoring-for-ecommerce', title: 'E-Commerce Uptime Monitoring', regex: /(ecommerce|e-commerce|black friday monitoring|cart health|revenue-critical)/ig },
  { slug: 'hosted-vs-self-hosted-uptime-monitoring', title: 'Hosted vs Self-Hosted Uptime Monitoring', regex: /(hosted vs self-hosted|self-hosted uptime monitoring|hosted monitoring|self-hosted monitor)/ig },
  { slug: 'uptime-monitoring-for-wordpress-shopify-webflow', title: 'Uptime Monitoring for WordPress, Shopify & Webflow', regex: /(wordpress|shopify|webflow|platform-specific monitoring|custom domain|cms)/ig },
  { slug: 'prevent-ssl-certificate-expiry-downtime', title: 'Prevent SSL Certificate Expiry Downtime', regex: /(ssl certificate expiry|prevent ssl|certificate expiry|ssl expiry downtime)/ig },
  { slug: 'ssl-certificate-monitoring-catch-expiry-before-users', title: 'SSL Certificate Monitoring', regex: /(ssl certificate monitoring|tls certificate monitoring|certificate monitor)/ig },
  { slug: 'multi-region-uptime-monitoring-location-impacts-reliability', title: 'Multi-Region Uptime Monitoring', regex: /(multi-region uptime monitoring|multi-region monitoring|probe location|global monitoring nodes)/ig },
  { slug: 'hidden-causes-website-downtime-ping-tests-never-catch', title: 'Hidden Causes of Website Downtime', regex: /(hidden causes of (website )?downtime|ping tests never catch|dns drift|partial outage)/ig },
  { slug: 'website-uptime-monitoring-guide-2026', title: 'Website Uptime Monitoring Guide', regex: /(website uptime monitoring guide|uptime monitoring guide|uptime monitoring 2026)/ig },
  { slug: 'monitor-ssl-certificate-renewal-lets-encrypt', title: "Monitor SSL Certificate Renewal Let's Encrypt", regex: /(let's encrypt|acme renewal|certificate renewal cycle|acme challenge|90.day (ssl|tls|certificate)|certbot renewal)/ig },
  { slug: 'monitor-https-certificate-expiry-apex-www-api', title: 'Monitor HTTPS Certificate Expiry Apex www API', regex: /(apex (domain|hostname)|www.*api.*certificate|multi-hostname (ssl|tls)|sni probing|server name indication|wildcard.*apex|multi-domain ssl)/ig },
  { slug: 'expired-ssl-certificate-alerts-detect-escalate-recover', title: 'Expired SSL Certificate Alerts', regex: /(expired ssl certificate( alerts)?|ssl expiration monitoring|tls certificate alert|detect expired ssl|ssl incident escalation)/ig },
];

for (const file of files) {
  const filePath = path.join(blogsDir, file);
  const fullContent = fs.readFileSync(filePath, 'utf-8');
  
  // Split frontmatter and body
  const parts = fullContent.split('---');
  if (parts.length < 3) continue; // Invalid markdown format
  
  const frontmatter = '---' + parts[1] + '---';
  let bodyContent = parts.slice(2).join('---');
  
  const currentSlug = file.replace('.md', '');
  let replacedCount = 0;

  for (const link of links) {
    if (link.slug === currentSlug) continue; // don't link to itself
    
    // Convert to regex and find all occurrences
    const matches = [...bodyContent.matchAll(link.regex)];
    for (const match of matches) {
      // Check if match is inside a link by counting [ vs ] and <a vs </a> before it
      const before = bodyContent.substring(0, match.index);
      const inMarkdownLink = (before.match(/\[/g) || []).length > (before.match(/\]/g) || []).length;
      const inHtmlLink = (before.match(/<a/g) || []).length > (before.match(/<\/a>/g) || []).length;
      
      if (!inMarkdownLink && !inHtmlLink) {
         bodyContent = bodyContent.substring(0, match.index) + '<a href="/blog/' + link.slug + '/" class="theme-backlink">' + match[0] + '</a>' + bodyContent.substring(match.index + match[0].length);
         replacedCount++;
         break; // Only replace the first valid occurrence per keyword group
      }
    }
  }
  
  if (replacedCount > 0) {
    fs.writeFileSync(filePath, frontmatter + bodyContent);
    console.log(`Replaced ${replacedCount} links in ${file}`);
  }
}

