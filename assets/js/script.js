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
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
   
    function loadNav() {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          document.querySelectorAll(".topnav, .sidenav").forEach( elm => {
            elm.innerHTML = xhttp.responseText;
          });
        };
      };
      xhttp.open("GET", "nav.html", true);
      xhttp.send();
    };

    // Load page content    
    function loadPage(page) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = () => {
        let content = document.querySelector("#body-content");
        if (xhttp.readyState === 4 && xhttp.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (xhttp.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        };
      };
      xhttp.open("GET", `pages/${page}.html`, true);
      xhttp.send();
    };
  });