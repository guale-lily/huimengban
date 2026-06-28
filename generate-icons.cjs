const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const iconDir = path.join(__dirname, 'huimengban-h5', 'icons');

if (!fs.existsSync(iconDir)) {
  fs.mkdirSync(iconDir, { recursive: true });
}

const sizes = [
  { name: 'mdpi', size: 48 },
  { name: 'hdpi', size: 72 },
  { name: 'xhdpi', size: 96 },
  { name: 'xxhdpi', size: 144 },
  { name: 'xxxhdpi', size: 192 },
  { name: 'playstore', size: 512 }
];

function drawGuestAvatar(ctx, centerX, centerY, radius, strokeColor) {
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = radius * 0.07;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  const eyeWidth = radius * 0.22;
  const eyeHeight = radius * 0.56;
  const eyeY = centerY - radius * 0.15;
  const eyeSpacing = radius * 0.35;
  const eyeRadius = radius * 0.07;
  
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = radius * 0.05;
  
  function drawRoundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
  
  drawRoundedRect(centerX - eyeSpacing - eyeWidth / 2, eyeY - eyeHeight / 2, eyeWidth, eyeHeight, eyeRadius);
  ctx.stroke();
  
  drawRoundedRect(centerX + eyeSpacing - eyeWidth / 2, eyeY - eyeHeight / 2, eyeWidth, eyeHeight, eyeRadius);
  ctx.stroke();
  
  const noseRadius = radius * 0.09;
  const noseY = centerY + radius * 0.18;
  
  ctx.fillStyle = strokeColor;
  ctx.beginPath();
  ctx.arc(centerX, noseY, noseRadius, 0, Math.PI * 2);
  ctx.fill();
  
  const cheekY = noseY + radius * 0.15;
  const cheekRx = radius * 0.25;
  const cheekRy = radius * 0.08;
  const cheekOffset = radius * 0.52;
  
  ctx.fillStyle = 'rgba(255, 182, 193, 0.4)';
  
  ctx.beginPath();
  ctx.ellipse(centerX - cheekOffset, cheekY, cheekRx, cheekRy, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(centerX + cheekOffset, cheekY, cheekRx, cheekRy, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawGradientBg(ctx, width, height) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#fde1f3');
  gradient.addColorStop(1, '#fbc8e0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

sizes.forEach(item => {
  const canvas = createCanvas(item.size, item.size);
  const ctx = canvas.getContext('2d');
  
  drawGradientBg(ctx, item.size, item.size);
  
  const centerX = item.size / 2;
  const centerY = item.size / 2;
  const radius = item.size * 0.45;
  
  drawGuestAvatar(ctx, centerX, centerY, radius, '#9caad6');
  
  const filePath = path.join(iconDir, `${item.name}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
  console.log(`生成图标: ${item.name}.png (${item.size}x${item.size})`);
});

console.log('\n所有图标已生成到目录: ', iconDir);
console.log('\n接下来请使用HBuilderX打开项目进行云打包！');