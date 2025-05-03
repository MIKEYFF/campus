// Wait for intro animation to finish, then show the main content
window.onload = function () {
    setTimeout(() => {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('main').style.display = 'block';
    }, 4000); // 4 seconds total for intro fade out
  };
  