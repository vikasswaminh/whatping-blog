const fs = require("fs");
const path = require("path");

const blogsDir = path.join(__dirname, "src", "content", "blog");

const dict = {
  "ssl-certificate-monitoring-catch-expiry-before-users": "SSL Certificate Monitoring: Catch Expiry Before Users Do",
  "monitor-ssl-certificate-renewal-lets-encrypt": "How to Monitor SSL Certificate Renewal Without Missing Let's Encrypt Cycles",
  "monitor-https-certificate-expiry-apex-www-api": "Monitor HTTPS Certificate Expiry Across Apex, www, and API Hostnames",
  "expired-ssl-certificate-alerts-detect-escalate-recover": "Expired SSL Certificate Alerts",
  "hidden-causes-website-downtime-ping-tests-never-catch": "Hidden Causes of Website Downtime",
  "website-uptime-monitoring-guide-2026": "Website Uptime Monitoring Guide 2026",
  "uptime-monitoring-for-wordpress-shopify-webflow": "Uptime Monitoring for WordPress, Shopify & Webflow"
};

const requirements = {
  "ssl-certificate-monitoring-catch-expiry-before-users.md": [
    "monitor-ssl-certificate-renewal-lets-encrypt",
    "monitor-https-certificate-expiry-apex-www-api",
    "expired-ssl-certificate-alerts-detect-escalate-recover",
    "hidden-causes-website-downtime-ping-tests-never-catch",
    "website-uptime-monitoring-guide-2026"
  ],
  "monitor-ssl-certificate-renewal-lets-encrypt.md": [
    "ssl-certificate-monitoring-catch-expiry-before-users",
    "monitor-https-certificate-expiry-apex-www-api",
    "expired-ssl-certificate-alerts-detect-escalate-recover",
    "website-uptime-monitoring-guide-2026",
    "hidden-causes-website-downtime-ping-tests-never-catch"
  ],
  "monitor-https-certificate-expiry-apex-www-api.md": [
    "ssl-certificate-monitoring-catch-expiry-before-users",
    "monitor-ssl-certificate-renewal-lets-encrypt",
    "expired-ssl-certificate-alerts-detect-escalate-recover",
    "uptime-monitoring-for-wordpress-shopify-webflow",
    "website-uptime-monitoring-guide-2026"
  ],
  "expired-ssl-certificate-alerts-detect-escalate-recover.md": [
    "ssl-certificate-monitoring-catch-expiry-before-users",
    "monitor-ssl-certificate-renewal-lets-encrypt",
    "monitor-https-certificate-expiry-apex-www-api",
    "hidden-causes-website-downtime-ping-tests-never-catch",
    "website-uptime-monitoring-guide-2026"
  ]
};

for (const [filename, slugs] of Object.entries(requirements)) {
  const filePath = path.join(blogsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn("Missing file: " + filename);
    continue;
  }
  
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Strip old boilerplate lines individually using precise matching
  let lines = content.split('\n');
  let cleanLines = [];
  let skip = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("This highlights the importance of")) {
       continue;
    }
    if (line === "### Related Guides" || line === "### Related SSL Monitoring Guides" || line === "### Related Uptime Monitoring Guides") {
       skip = true;
       continue;
    }
    if (skip && line.startsWith("* <a")) {
       continue;
    }
    if (skip && line.trim() === "") {
       continue;
    }
    if (skip && !line.startsWith("* <a") && line.trim() !== "") {
       skip = false;
    }
    
    if (!skip) {
       cleanLines.push(line);
    }
  }

  content = cleanLines.join('\n').trim();

  let newSection = "\n\n### Related SSL Monitoring Guides\n\n";
  for (const slug of slugs) {
    const title = dict[slug];
    newSection += "* <a href=\"/blog/" + slug + "/\" class=\"theme-backlink\">" + title + "</a>\n";
  }
  
  content += newSection + "\n";
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("Updated " + filename + " with " + slugs.length + " links.");
}
