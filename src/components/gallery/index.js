
const onOpenModal = (imageSrc) => {
	// modal wrapper id
	const modal = document.getElementById('imageModal');
	// img tag id
	const modalImage = document.getElementById('modalImage');

	// reassign display from none to block
	modal.style.display = 'block';
	// dynamic string source fromm args function
	// since our modal init value was empty the default was our root path (ex: /index.html)
	// we reassign value from click event arg to load it to our modal img src
	modalImage.src = imageSrc;
	
	// Prevent body scroll when modal is open
	document.body.style.overflow = 'hidden';
};

const onCloseModal = () => {
	const modal = document.getElementById('imageModal');
	// revert to default value
	modal.style.display = 'none';
	
	// Restore body scroll
	document.body.style.overflow = 'auto';
};

// Close modal when clicking outside the image
window.onclick = function(event) {
	const modal = document.getElementById('imageModal');
	if (event.target === modal) {
		onCloseModal();
	}
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
	if (event.key === 'Escape') {
		onCloseModal();
	}
});