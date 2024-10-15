document.addEventListener('DOMContentLoaded', () => {
    const levelList = document.getElementById('level-list');
    const resourceButtons = document.querySelectorAll('.resource-btn');
    const contentDisplay = document.getElementById('content-display');
    
    let selectedLevel = null;
    let selectedResource = null;

    // Function to update the display content
    function updateContent() {
        if (selectedLevel && selectedResource) {
            contentDisplay.textContent = `You selected ${selectedLevel} level and the resource is ${selectedResource}.`;
        } else {
            contentDisplay.textContent = 'Please select a level and a resource.';
        }
    }

    // Add click event listener for level selection
    levelList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            // Remove active class from all level links
            document.querySelectorAll('.sidebar ul li a').forEach(item => {
                item.classList.remove('active');
            });
            // Add active class to clicked level
            e.target.classList.add('active');
            selectedLevel = e.target.textContent;
            updateContent();
        }
    });

    // Add click event listener for resource buttons
    resourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all resource buttons
            resourceButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            selectedResource = button.textContent;
            updateContent();
        });
    });
});
