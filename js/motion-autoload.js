document.addEventListener("DOMContentLoaded", async function () {

  const gallery = document.getElementById("motion-gallery");

  // JSON dari Google Apps Script kamu
  const videoListURL = "https://script.google.com/macros/s/AKfycbzv3xeWZYGrppu4pZUxUAxCeYQz8yuoQz7o5w9uTumbfYVPV48QK2N1msHYQHlKX3JNnw/exec";

  let videos = [];
  try {
    const res = await fetch(videoListURL);
    videos = await res.json();
  } catch (err) {
    console.error("Gagal mengambil JSON", err);
    gallery.innerHTML = "<p style='color:white'>Gagal memuat video.</p>";
    return;
  }

  async function detectAspect(url) {
    return new Promise(resolve => {
      const v = document.createElement("video");
      v.src = url;
      v.preload = "metadata";
      v.onloadedmetadata = () => {
        const ratio = v.videoWidth / v.videoHeight;
        resolve(ratio >= 1.3 ? "landscape" : "portrait");
      };
    });
  }

  for (const file of videos) {
    const aspect = await detectAspect(file.url);

    const div = document.createElement("div");
    div.classList.add("portfolio-item", aspect);

    div.innerHTML = `
      <video src="${file.url}" muted preload="metadata" poster="${file.url}#t=0.2"></video>
      <div class="play-overlay">▶</div>
    `;

    gallery.appendChild(div);

    let click = 0;
    div.addEventListener("click", () => {
      click++;
      setTimeout(() => (click = 0), 300);
      if (click === 2) openModal(file.url);
    });
  }

  const modal = document.createElement("div");
  modal.id = "videoModal";
  modal.style.position = "fixed";
  modal.style.inset = "0";
  modal.style.background = "rgba(0,0,0,0.8)";
  modal.style.display = "none";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";

  modal.innerHTML = `
    <div style="position:relative; width:90%; max-width:900px;">
      <span id="closeModal" 
        style="position:absolute; top:-40px; right:0; color:white; font-size:40px; cursor:pointer;">
        ×
      </span>
      <video id="modalVideo" controls autoplay style="width:100%; border-radius:12px;"></video>
    </div>`;
  document.body.appendChild(modal);

  document.getElementById("closeModal").onclick = () => closeModal();
  modal.onclick = e => { if (e.target === modal) closeModal(); };

  function openModal(src) {
    const v = document.getElementById("modalVideo");
    v.src = src;
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
    const v = document.getElementById("modalVideo");
    v.pause();
    v.src = "";
  }
});
