document.addEventListener('DOMContentLoaded', () => {
    const levelList = document.getElementById('level-list');
    const resourceButtons = document.querySelectorAll('.resource-btn');
    const contentDisplay = document.getElementById('content-display');
    const courseForm = document.getElementById('course-form');

    let selectedLevel = null;
    let selectedResource = null;

    const coursesData = {
        Book: [
            { title: "Book Course 1", pdfLink: "https://app.box.com/s/wlrcpuv7bm0qqvxjwx67dj9taaadfhl2/file/763275533770" },
            { title: "Book Course 2", pdfLink: "link_to_book2.pdf" }
        ],
        Slides: [
            { title: "Slides Course 1", pdfLink: "link_to_slides1.pdf" },
            { title: "Slides Course 2", pdfLink: "link_to_slides2.pdf" }
        ],
        Tutorial: [
            { title: "Tutorial Course 1", pdfLink: "link_to_tutorial1.pdf" },
            { title: "Tutorial Course 2", pdfLink: "link_to_tutorial2.pdf" }
        ],
        Extra_Resources: [] // Add extra resources as well
    };

    // Function to update the display content
    function updateContent() {
        if (selectedLevel && selectedResource) {
            contentDisplay.innerHTML = `You selected ${selectedLevel} level and the resource is ${selectedResource}.`;
            createCourseButtons(); // Ensure this is called to create buttons
        } else {
            contentDisplay.textContent = 'Please select a level and a resource.';
        }
    }

    // Create buttons for each course based on the selected resource
    function createCourseButtons() {
        contentDisplay.innerHTML = ""; 
        const courses = coursesData[selectedResource] || [];
        courses.forEach(course => {
            const button = document.createElement("button");
            button.className = "btn-course"; 
            button.textContent = course.title; 

            button.addEventListener("click", function () {
                window.open(course.pdfLink, "_blank");
            });

            contentDisplay.appendChild(button); 
        });
    }

    levelList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            document.querySelectorAll('.sidebar ul li a').forEach(item => {
                item.classList.remove('active');
            });
            e.target.classList.add('active');
            selectedLevel = e.target.textContent;
            updateContent();
        }
    });

    // Add click event listener for resource buttons
    resourceButtons.forEach(button => {
        button.addEventListener('click', () => {
            resourceButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedResource = button.textContent;
            updateContent();
        });
    });

    // Handle form submission
    courseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const title = document.getElementById('Course_Title').value.trim();
        const type = document.getElementById('select2').value; // Select2 for Subject Type
        const url = document.getElementById('Course_url').value.trim();

        if (title && url) {
            // Check if the resource type exists in coursesData, create if not
            if (!coursesData[type]) {
                coursesData[type] = [];
            }

            coursesData[type].push({ title: title, pdfLink: url });
            selectedResource = type; 

            updateContent(); 

            this.reset(); 
        } else {
            alert("Please fill in all fields.");
        }
    });
});
