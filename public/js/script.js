form = document.querySelector(".task-form form");
tbody = document.querySelector(".tasks-tbody");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  fetch("http://localhost:5000/tasks/create-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskName: formData.get("taskName"),
      status: formData.get("status"),
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.message == "success") {
        let tr = document.createElement("tr");
        console.log(data.taskName);
        console.log(data.data.taskName);
        tr.innerHTML = `<td> ${data.data.taskName} </td> <td> ${data.data.status} </td> <td>
        <a href="/tasks/task/${data.data._id}">
          <button class="btn btn-info">
            <i class="fa-solid fa-pen-to-square"></i></button
        ></a>
      </td>  <td>
      <form
        action="/tasks/task/${data.data._id}?_method=DELETE"
        method="post"
      >
        <button type="submit" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
      </form>
    </td>`;

        tbody.append(tr);
      }
    })
    .catch((err) => console.log(err));

  e.target.elements.taskName.value = "";
});
