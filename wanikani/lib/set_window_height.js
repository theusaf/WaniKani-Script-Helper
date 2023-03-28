const setWindowHeight = () => {
  document.documentElement.style.setProperty(
    "--vh",
    0.01 * window.innerHeight + "px"
  );
};
setWindowHeight(), window.addEventListener("resize", setWindowHeight);
