const fs = require("fs");
const path = require("path");

const blogsDir = path.join(__dirname, "src", "content", "blog");

const dict = {
  "website-uptime-monitoring-guide-2026": "Website Uptime Monitoring Guide 2026",
  "how-to-choose-an-uptime-monitoring-service-in-2026": "How to Choose an Uptime Monitoring Service",
  "hosted-vs-self-hosted-uptime-monitoring": "Hosted vs Self-Hosted Uptime Monitoring",
  "uptime-monitoring-check-frequency-20s-1m-5m": "Uptime Monitoring Check Frequency",
  "how-uptime-monitoring-actually-works": "How Uptime Monitoring Works",
  "server-uptime-monitoring": "Server Uptime Monitoring Best Practices",
  "server-uptime-monitoring-setup-guide": "Server Uptime Monitoring Setup Guide",
  "multi-region-uptime-monitoring-location-impacts-reliability": "Multi-Region Uptime Monitoring",
  "uptime-monitoring-for-ecommerce": "E-Commerce Uptime Monitoring",
  "uptime-monitoring-for-wordpress-shopify-webflow": "Uptime Monitoring for WordPress, Shopify & Webflow",
  "best-uptime-monitoring-tools": "7 Best Uptime Monitoring Tools for Startups",
  "hidden-causes-website-downtime-ping-tests-never-catch": "Hidden Causes of Website Downtime",
  "ssl-certificate-monitoring-catch-expiry-before-users": "SSL Certificate Monitoring",
  "dns-change-detection-how-to-know-when-records-change": "DNS Change Detection"
};

const requirements = {
  "best-uptime-monitoring-tools.md": ["website-uptime-monitoring-guide-2026", "how-to-choose-an-uptime-monitoring-service-in-2026", "hosted-vs-self-hosted-uptime-monitoring", "uptime-monitoring-check-frequency-20s-1m-5m", "how-uptime-monitoring-actually-works"],
  "server-uptime-monitoring.md": ["website-uptime-monitoring-guide-2026", "server-uptime-monitoring-setup-guide", "how-uptime-monitoring-actually-works", "multi-region-uptime-monitoring-location-impacts-reliability", "uptime-monitoring-check-frequency-20s-1m-5m"],
  "how-to-choose-an-uptime-monitoring-service-in-2026.md": ["best-uptime-monitoring-tools", "website-uptime-monitoring-guide-2026", "hosted-vs-self-hosted-uptime-monitoring", "uptime-monitoring-check-frequency-20s-1m-5m", "multi-region-uptime-monitoring-location-impacts-reliability"],
  "how-uptime-monitoring-actually-works.md": ["website-uptime-monitoring-guide-2026", "server-uptime-monitoring", "server-uptime-monitoring-setup-guide", "uptime-monitoring-check-frequency-20s-1m-5m", "multi-region-uptime-monitoring-location-impacts-reliability"],
  "server-uptime-monitoring-setup-guide.md": ["server-uptime-monitoring", "website-uptime-monitoring-guide-2026", "how-uptime-monitoring-actually-works", "uptime-monitoring-check-frequency-20s-1m-5m", "multi-region-uptime-monitoring-location-impacts-reliability"],
  "uptime-monitoring-check-frequency-20s-1m-5m.md": ["website-uptime-monitoring-guide-2026", "how-uptime-monitoring-actually-works", "how-to-choose-an-uptime-monitoring-service-in-2026", "multi-region-uptime-monitoring-location-impacts-reliability", "server-uptime-monitoring"],
  "uptime-monitoring-for-ecommerce.md": ["website-uptime-monitoring-guide-2026", "uptime-monitoring-check-frequency-20s-1m-5m", "how-uptime-monitoring-actually-works", "multi-region-uptime-monitoring-location-impacts-reliability", "uptime-monitoring-for-wordpress-shopify-webflow"],
  "hosted-vs-self-hosted-uptime-monitoring.md": ["best-uptime-monitoring-tools", "how-to-choose-an-uptime-monitoring-service-in-2026", "website-uptime-monitoring-guide-2026", "how-uptime-monitoring-actually-works", "server-uptime-monitoring"],
  "uptime-monitoring-for-wordpress-shopify-webflow.md": ["website-uptime-monitoring-guide-2026", "uptime-monitoring-for-ecommerce", "ssl-certificate-monitoring-catch-expiry-before-users", "dns-change-detection-how-to-know-when-records-change", "uptime-monitoring-check-frequency-20s-1m-5m"],
  "website-uptime-monitoring-guide-2026.md": ["best-uptime-monitoring-tools", "how-to-choose-an-uptime-monitoring-service-in-2026", "how-uptime-monitoring-actually-works", "server-uptime-monitoring", "server-uptime-monitoring-setup-guide", "uptime-monitoring-check-frequency-20s-1m-5m", "uptime-monitoring-for-ecommerce", "hosted-vs-self-hosted-uptime-monitoring", "uptime-monitoring-for-wordpress-shopify-webflow", "hidden-causes-website-downtime-ping-tests-never-catch", "multi-region-uptime-monitoring-location-impacts-reliability"],
  "hidden-causes-website-downtime-ping-tests-never-catch.md": ["website-uptime-monitoring-guide-2026", "dns-change-detection-how-to-know-when-records-change", "ssl-certificate-monitoring-catch-expiry-before-users", "uptime-monitoring-for-wordpress-shopify-webflow", "multi-region-uptime-monitoring-location-impacts-reliability", "server-uptime-monitoring"],
  "multi-region-uptime-monitoring-location-impacts-reliability.md": ["website-uptime-monitoring-guide-2026", "how-uptime-monitoring-actually-works", "uptime-monitoring-check-frequency-20s-1m-5m", "server-uptime-monitoring", "hidden-causes-website-downtime-ping-tests-never-catch"]
};

for (const [filename, slugs] of Object.entries(requirements)) {
  const filePath = path.join(blogsDir, filename);
  if (!fs.existsSync(filePath)) continue;
  
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
    if (line === "### Related Guides" || line === "### Related Uptime Monitoring Guides") {
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

  let newSection = "\n\n### Related Uptime Monitoring Guides\n\n";
  for (const slug of slugs) {
    const title = dict[slug];
    newSection += "* <a href=\"/blog/" + slug + "/\" class=\"theme-backlink\">" + title + "</a>\n";
  }
  
  content += newSection + "\n";
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("Updated " + filename + " with " + slugs.length + " links.");
}
