const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src', 'content', 'blog');

const tasks = [
  { file: 'website-uptime-monitoring-guide-2026.md', dest: 'multi-region-uptime-monitoring-location-impacts-reliability', anchor: 'multi-region uptime monitoring' },
  { file: 'website-uptime-monitoring-guide-2026.md', dest: 'hidden-causes-website-downtime-ping-tests-never-catch', anchor: 'hidden causes of website downtime' },
  { file: 'uptime-monitoring-check-frequency-20s-1m-5m.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },
  { file: 'uptime-monitoring-check-frequency-20s-1m-5m.md', dest: 'multi-region-uptime-monitoring-location-impacts-reliability', anchor: 'multi-region uptime monitoring' },
  { file: 'uptime-monitoring-for-wordpress-shopify-webflow.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },
  { file: 'uptime-monitoring-for-wordpress-shopify-webflow.md', dest: 'best-uptime-monitoring-tools', anchor: 'uptime monitoring tools' },
  { file: 'best-uptime-monitoring-tools.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },
  { file: 'how-uptime-monitoring-actually-works.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },
  { file: 'how-uptime-monitoring-actually-works.md', dest: 'multi-region-uptime-monitoring-location-impacts-reliability', anchor: 'multi-region uptime monitoring' },
  { file: 'how-uptime-monitoring-actually-works.md', dest: 'server-uptime-monitoring-setup-guide', anchor: 'server uptime monitoring setup' },
  { file: 'server-uptime-monitoring-setup-guide.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },
  { file: 'how-to-choose-an-uptime-monitoring-service-in-2026.md', dest: 'hosted-vs-self-hosted-uptime-monitoring', anchor: 'hosted vs self-hosted uptime monitoring' },
  { file: 'how-to-choose-an-uptime-monitoring-service-in-2026.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },
  { file: 'how-to-choose-an-uptime-monitoring-service-in-2026.md', dest: 'multi-region-uptime-monitoring-location-impacts-reliability', anchor: 'multi-region uptime monitoring' },
  { file: 'server-uptime-monitoring.md', dest: 'how-uptime-monitoring-actually-works', anchor: 'how uptime monitoring works' }
];

let replacedCount = 0;

for (const task of tasks) {
  const filePath = path.join(blogsDir, task.file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(`/blog/${task.dest}/`)) {
    console.log(`[SKIP] Link to ${task.dest} already exists in ${task.file}`);
    continue;
  }
  
  const parts = content.split('---');
  if (parts.length >= 3) {
    const frontmatter = '---' + parts[1] + '---';
    let body = parts.slice(2).join('---');
    
    // Find the end of the first paragraph after "## Executive Summary" or "## Key Takeaways"
    // We'll just look for the first occurrence of "\n\n" after character 200 of the body
    let idx = body.indexOf('\n\n', 200);
    if (idx === -1) idx = body.length;
    
    const before = body.substring(0, idx);
    const after = body.substring(idx);
    
    let injectedSentence = ` This highlights the importance of having a robust [${task.anchor}](/blog/${task.dest}/) strategy.`;
    if (task.anchor.includes("guide")) {
        injectedSentence = ` For a deeper dive into this topic, refer to our [${task.anchor}](/blog/${task.dest}/).`;
    } else if (task.anchor.includes("tools")) {
        injectedSentence = ` For evaluating solutions, check out our comparison of [${task.anchor}](/blog/${task.dest}/).`;
    } else if (task.anchor.includes("causes")) {
        injectedSentence = ` To understand more about this, read our analysis on [${task.anchor}](/blog/${task.dest}/).`;
    }
    
    body = before + injectedSentence + after;
    
    fs.writeFileSync(filePath, frontmatter + body);
    replacedCount++;
    console.log(`[OK] Appended link for ${task.dest} in ${task.file}`);
  }
}
console.log('Total injected:', replacedCount);
