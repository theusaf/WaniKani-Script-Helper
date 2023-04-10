const setWindowHeight = () => {
  document.documentElement.style.setProperty(
    "--vh",
    `${(0.01 * visualViewport.height).toFixed(2)}px`
  );
};
setWindowHeight(),
  window.visualViewport.addEventListener("resize", setWindowHeight);
