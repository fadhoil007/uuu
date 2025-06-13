function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = parseInt(document.getElementById("charLength").value) || 9;
  let pwd = "";
  while (true) {
    pwd = "";
    for (let i = 0; i < charLength; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /\d/.test(pwd)) break;
  }

  document.getElementById("password").textContent = pwd;

  const canvas = document.getElementById("qrcodeCanvas");
  canvas.width = 2611;
  canvas.height = 3264;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const ssid = "SRC RIZQI";
  const wifiFormat = `WIFI:T:WPA;S:${ssid};P:${pwd};;`;

  const visibleQR = document.getElementById("visibleQR");
  visibleQR.innerHTML = "";

  new QRCode(visibleQR, {
    text: wifiFormat,
    width: 300,
    height: 300,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Polling QR img until it's ready
  let waitTime = 0;
  const interval = setInterval(() => {
    const qrImg = visibleQR.querySelector("img");
    if (qrImg && qrImg.complete && qrImg.src && qrImg.naturalWidth !== 0) {
      clearInterval(interval);
      const img = new Image();
      img.onload = function () {
        const qrSize = 2200;
        const fontSize = 360;
        const spaceBetween = 200;
        const centerX = canvas.width / 2;
        const totalHeight = qrSize + fontSize + spaceBetween;
        const startY = (canvas.height - totalHeight) / 2;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#000000";
        ctx.font = `bold ${fontSize}px Poppins, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(pwd, centerX, startY + fontSize);

        ctx.drawImage(img, centerX - qrSize / 2, startY + fontSize + spaceBetween, qrSize, qrSize);

        document.getElementById("copyBtn").style.display = "inline-block";
        document.getElementById("downloadBtn").style.display = "inline-block";
      };
      img.src = qrImg.src;
    }

    waitTime += 200;
    if (waitTime > 3000) clearInterval(interval); // stop polling after 3s
  }, 200);
}

function copyPassword() {
  const text = document.getElementById("password").textContent;
  navigator.clipboard.writeText(text);
  const btn = document.querySelector(".copy");
  const icon = document.getElementById("copyIcon");
  btn.classList.add("copied");
  icon.textContent = "✔️";
}

function downloadQRCode() {
  const canvas = document.getElementById("qrcodeCanvas");
  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = canvas.toDataURL();
  link.click();
}
