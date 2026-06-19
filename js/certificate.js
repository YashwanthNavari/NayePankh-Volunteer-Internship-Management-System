/**
 * Certificate Generator — NayePankh Foundation
 * Renders a beautiful digital certificate on HTML5 Canvas and enables PNG download.
 */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('certificateCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const generateBtn = document.getElementById('generate-cert-btn');
  const downloadBtn = document.getElementById('download-cert-btn');

  // ------------------------------------------------------------------
  // Draw certificate on canvas
  // ------------------------------------------------------------------
  function drawCertificate(name, domain, duration, grade) {
    const W = canvas.width;   // 900
    const H = canvas.height;  // 630

    ctx.clearRect(0, 0, W, H);

    // ---- Background gradient ----
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#f0f6ff');
    bgGrad.addColorStop(1, '#fefce8');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ---- Decorative corner accents ----
    function cornerAccent(x, y, rx, ry) {
      ctx.save();
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x + rx, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + ry);
      ctx.stroke();
      ctx.restore();
    }
    const pad = 30;
    cornerAccent(pad, pad, 50, 50);                     // TL
    cornerAccent(W - pad, pad, -50, 50);                // TR
    cornerAccent(pad, H - pad, 50, -50);                // BL
    cornerAccent(W - pad, H - pad, -50, -50);           // BR

    // ---- Double border ----
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.strokeStyle = 'rgba(37,99,235,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(34, 34, W - 68, H - 68);

    // ---- Top decorative line ----
    const lineGrad = ctx.createLinearGradient(60, 0, W - 60, 0);
    lineGrad.addColorStop(0, 'transparent');
    lineGrad.addColorStop(0.2, '#2563eb');
    lineGrad.addColorStop(0.8, '#f59e0b');
    lineGrad.addColorStop(1, 'transparent');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(60, 100);
    ctx.lineTo(W - 60, 100);
    ctx.stroke();

    // ---- CERTIFICATE OF COMPLETION header ----
    ctx.textAlign = 'center';
    ctx.fillStyle = '#1e40af';
    ctx.font = 'bold 13px Poppins, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('CERTIFICATE OF COMPLETION', W / 2, 80);

    // ---- Org name ----
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 28px Poppins, sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('NayePankh Foundation', W / 2, 145);

    // ---- Tagline ----
    ctx.fillStyle = '#64748b';
    ctx.font = '13px Poppins, sans-serif';
    ctx.fillText('Empowering Communities Through Education & Volunteering', W / 2, 170);

    // ---- "This is to certify" text ----
    ctx.fillStyle = '#475569';
    ctx.font = '15px Poppins, sans-serif';
    ctx.fillText('This is to certify that', W / 2, 230);

    // ---- Recipient name ----
    const nameGrad = ctx.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0);
    nameGrad.addColorStop(0, '#1e40af');
    nameGrad.addColorStop(1, '#2563eb');
    ctx.fillStyle = nameGrad;
    ctx.font = 'bold 42px Georgia, serif';
    ctx.fillText(name || 'Your Name', W / 2, 285);

    // ---- Name underline ----
    const nameWidth = ctx.measureText(name || 'Your Name').width;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nameWidth / 2, 295);
    ctx.lineTo(W / 2 + nameWidth / 2, 295);
    ctx.stroke();

    // ---- "has successfully completed" ----
    ctx.fillStyle = '#475569';
    ctx.font = '15px Poppins, sans-serif';
    ctx.fillText('has successfully completed an internship in', W / 2, 335);

    // ---- Domain pill ----
    const domainText = domain || 'Web Development';
    ctx.font = 'bold 22px Poppins, sans-serif';
    const domainWidth = ctx.measureText(domainText).width;
    const pillW = domainWidth + 60;
    const pillX = W / 2 - pillW / 2;
    const pillY = 350;
    const pillH = 44;
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 22);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(domainText, W / 2, 379);

    // ---- Duration & Grade ----
    ctx.fillStyle = '#475569';
    ctx.font = '14px Poppins, sans-serif';
    ctx.fillText(`Duration: ${duration}   ·   Performance: ${grade}`, W / 2, 430);

    // ---- Bottom line ----
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(60, 455);
    ctx.lineTo(W - 60, 455);
    ctx.stroke();

    // ---- Date issued ----
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Poppins, sans-serif';
    ctx.fillText(`Date of Issue: ${today}`, W / 2, 480);

    // ---- Signatures section ----
    // Signature lines
    const sigPositions = [W / 3, (2 * W) / 3];
    const sigLabels = ['Program Director', 'NayePankh Foundation'];

    sigPositions.forEach((sx, i) => {
      // Decorative script signature simulation
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(sx - 60, 540);
      ctx.bezierCurveTo(sx - 30, 525, sx + 20, 520, sx + 60, 535);
      ctx.stroke();
      // Line under signature
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx - 70, 550);
      ctx.lineTo(sx + 70, 550);
      ctx.stroke();
      ctx.fillStyle = '#64748b';
      ctx.font = '11px Poppins, sans-serif';
      ctx.fillText(sigLabels[i], sx, 568);
    });

    // ---- Certificate ID ----
    const certId = 'NP-' + Date.now().toString().slice(-8);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px Poppins, sans-serif';
    ctx.fillText(`Certificate ID: ${certId}`, W / 2, 600);

    // ---- Watermark star pattern ----
    ctx.save();
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 120px sans-serif';
    ctx.fillText('★', W / 2, H / 2 + 40);
    ctx.restore();
  }

  // Initial placeholder draw
  drawCertificate('Your Name Here', 'Web Development', '2 Months', 'Excellent');

  // Generate button
  generateBtn.addEventListener('click', () => {
    const name = document.getElementById('cert-name').value.trim() || 'Your Name';
    const domain = document.getElementById('cert-domain').value;
    const duration = document.getElementById('cert-duration').value;
    const grade = document.getElementById('cert-grade').value;

    if (!document.getElementById('cert-name').value.trim()) {
      window.showToast('Please enter your name to generate the certificate.', 'error');
      return;
    }

    drawCertificate(name, domain, duration, grade);
    downloadBtn.style.display = 'inline-flex';
    window.showToast('Certificate generated! Click "Download PNG" to save it.');
  });

  // Download button
  downloadBtn.addEventListener('click', () => {
    const name = document.getElementById('cert-name').value.trim() || 'certificate';
    const link = document.createElement('a');
    link.download = `NayePankh_Certificate_${name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    window.showToast('Certificate downloaded successfully!');
  });

});
