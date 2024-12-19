document.querySelector("#filter").addEventListener("change", async function() {
    const filter = this.value;
    const response = await fetch(`/todos?filter=${filter}`);
    const data = await response.text();
    document.querySelector("#todo-list").innerHTML = data;
  });
  