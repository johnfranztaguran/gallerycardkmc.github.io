
const handleAnchorCard = () => {
  // selecting block elements
  const linkEventData = document.querySelectorAll(".cards-section .card-link");
  // linkEventData return arrays of nodes list
  linkEventData.forEach(element => {
    // listening to click user event to card img
    element.addEventListener('click', function(event) {
      // Prevent the default behavior of the anchor tag (e.g., navigating to href)
      // event.preventDefault();

      // Access event data logs here
      console.log('Card event data:', {
        element: this,
        // href: this.href,
        href: event.target.currentSrc,
        cardId: this.getAttribute('data-card-id'),
        timestamp: new Date().toISOString()
      });
      window.open(event.target.currentSrc, '_blank').focus();
    });
  });
};
