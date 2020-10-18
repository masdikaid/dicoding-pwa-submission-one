// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => {
        console.log("Pendaftaran ServiceWorker berhasil");
      })
      .catch(() => {
        console.log("Pendaftaran ServiceWorker gagal");
      });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}
console.log("preloaded")
document.addEventListener("DOMContentLoaded", () => {
    // Activate sidebar nav
    console.log("loaded")
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
   
    function loadNav() {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (this.readyState == 4) {
          if (this.status != 200) return;
          console.log("xhttp")
          // Muat daftar tautan menu
          document.querySelectorAll(".topnav, .sidenav").forEach( elm => {
            elm.innerHTML = xhttp.responseText;
          });
        }
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    };

    // Load page content    
    function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if (this.readyState == 4) {
        const content = document.querySelector("#body-content");
        if (this.status == 200) {
            content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
            content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
            content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
        }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
    }
  });