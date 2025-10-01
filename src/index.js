import './style.css'

const templateLoader = async (htmlPath = '', templateId = '', rootId = '') => {
	try {
		// Fetch the template file
		const response = await fetch(htmlPath);
		const html = await response.text();
		
		// Create a temporary container to parse the HTML
		const tempDiv = document.createElement('div'); // is a node
		tempDiv.innerHTML = html; // give value
		
		// Find the template element
		const template = tempDiv.querySelector(`#${templateId}`);
		
		if (template) {
			// Clone the template content
			const clone = document.importNode(template?.content, true);
			
			// Append to the component template container
			const container = document.querySelector(`#${rootId}`);
			container.innerHTML = ''; // Clear existing content
			container.appendChild(clone); // appendChild can only append a node.
			
			console.log('Template loaded successfully!');
		} else {
			console.error('Template not found');
		}
	} catch (error) {
		console.error('Error loading template:', error);
	}
};

// load appended html node to shadow dom
// document.addEventListener('DOMContentLoaded', templateLoader('./components/gallery/index.html', 'temp-gallery-block', 'gallery-block'));
// document.addEventListener('DOMContentLoaded', templateLoader('./components/cards/index.html', 'temp-cards-block', 'cards-block'));
