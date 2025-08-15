document.addEventListener("DOMContentLoaded", function () {
   const currentPage = window.location.pathname;
  
   // === ADD TODO PAGE ===
   if (currentPage.includes("add_todo.html")) {
       const form = document.querySelector("form");


       form.addEventListener("submit", function (e) {
           e.preventDefault(); // Prevent page reload


           // Get form values
           const title = form.querySelector('input[name="title"]').value.trim();
           const description = form.querySelector('input[name="task-description"]').value.trim();
           const dueDate = form.querySelector('input[name="due-date"]').value;
           const priority = form.querySelector('select[name="priority-level"]').value;
           const notes = form.querySelector('textarea[name="additional-notes"]').value.trim();


           if (!title || !description || !dueDate) {
               alert("Please fill all required fields!");
               return;
           }


           // Create task object
           const task = {
               title,
               description,
               dueDate,
               priority,
               notes,
               status: "Pending"
           };


           let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


           // Add new task
           tasks.push(task);


           // Save back to localStorage
           localStorage.setItem("tasks", JSON.stringify(tasks));


           alert("✅ Task added successfully!");
           form.reset(); // Clear form
       });
   }


   // === VIEW TODO PAGE ===
   if (currentPage.includes("view_todo.html")) {
       const tableBody = document.querySelector("tbody");


       // Get tasks from localStorage
       let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


       function renderTasks() {
           tableBody.innerHTML = "";


           tasks.forEach((task, index) => {
               const row = document.createElement("tr");


               row.innerHTML = `
                   <td>${task.title}</td>
                   <td>${task.status}</td>
                   <td>${task.dueDate}</td>
                   <td><button class="complete-btn">✔️</button></td>
                   <td><button class="delete-btn">🗑️</button></td>
               `;


               // Mark as completed
               row.querySelector(".complete-btn").addEventListener("click", function () {
                   tasks[index].status = "Done";
                   localStorage.setItem("tasks", JSON.stringify(tasks));
                   renderTasks();
               });


               // Delete task
               row.querySelector(".delete-btn").addEventListener("click", function () {
                   tasks.splice(index, 1);
                   localStorage.setItem("tasks", JSON.stringify(tasks));
                   renderTasks();
               });


               tableBody.appendChild(row);
           });
       }


       renderTasks();
   }
});


