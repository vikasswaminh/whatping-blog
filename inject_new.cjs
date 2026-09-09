const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'src', 'content', 'blog');

const tasks = [
  // Links for Blog 15
  { file: 'monitor-ssl-certificate-renewal-lets-encrypt.md', dest: 'prevent-ssl-certificate-expiry-downtime', anchor: 'prevent SSL certificate expiry downtime' },
  { file: 'monitor-ssl-certificate-renewal-lets-encrypt.md', dest: 'ssl-certificate-monitoring-catch-expiry-before-users', anchor: 'SSL certificate monitoring to catch expiry before users' },
  { file: 'monitor-ssl-certificate-renewal-lets-encrypt.md', dest: 'hidden-causes-website-downtime-ping-tests-never-catch', anchor: 'hidden causes of website downtime' },
  { file: 'monitor-ssl-certificate-renewal-lets-encrypt.md', dest: 'website-uptime-monitoring-guide-2026', anchor: 'website uptime monitoring' },

  // Links for Blog 16
  { file: 'monitor-https-certificate-expiry-apex-www-api.md', dest: 'prevent-ssl-certificate-expiry-downtime', anchor: 'prevent SSL certificate expiry downtime' },
  { file: 'monitor-https-certificate-expiry-apex-www-api.md', dest: 'ssl-certificate-monitoring-catch-expiry-before-users', anchor: 'SSL certificate monitoring' },
  { file: 'monitor-https-certificate-expiry-apex-www-api.md', dest: 'multi-region-uptime-monitoring-location-impacts-reliability', anchor: 'multi-region uptime monitoring' },
  { file: 'monitor-https-certificate-expiry-apex-www-api.md', dest: 'server-uptime-monitoring-setup-guide', anchor: 'server uptime monitoring setup guide' },
  { file: 'monitor-https-certificate-expiry-apex-www-api.md', dest: 'how-to-choose-an-uptime-monitoring-service-in-2026', anchor: 'choose an uptime monitoring service' }
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
    
    // We'll append each link to a slightly different paragraph to space them out.
    // Instead of always using the first paragraph, let's use the nth paragraph.
    // To do this simply, we will find the first occurrence of '\n\n' after index offset.
    // We will randomly or incrementally increase the offset.
    let offset = 200 + (Math.random() * 2000); // randomize insertion point slightly so they don't all cluster
    
    let idx = body.indexOf('\n\n', offset);
    if (idx === -1) idx = body.indexOf('\n\n', 200); // fallback
    if (idx === -1) idx = body.length;
    
    const before = body.substring(0, idx);
    const after = body.substring(idx);
    
    let injectedSentence = ` This highlights the importance of having a robust [${task.anchor}](/blog/${task.dest}/) strategy.`;
    if (task.anchor.includes("guide")) {
        injectedSentence = ` For a deeper dive into this topic, refer to our [${task.anchor}](/blog/${task.dest}/).`;
    } else if (task.anchor.includes("choose")) {
        injectedSentence = ` For evaluating solutions, check out our guide on how to [${task.anchor}](/blog/${task.dest}/).`;
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
