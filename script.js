document.addEventListener("DOMContentLoaded", () => {
    const subtitle = document.querySelector(".subtitle");
    setInterval(() => {
        subtitle.style.opacity = subtitle.style.opacity == "1" ? "0.5" : "1";
    }, 1500);
});