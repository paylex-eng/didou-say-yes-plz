const form = document.getElementById("valentineForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // empêche le refresh

  const formData = {
    activite: document.querySelector("select[name='activite']").value,
    activite_soir: document.querySelector("select[name='activite_soir']").value,
    activite_avant_dodo: document.querySelector("select[name='activite_avant_dodo']").value,
    message: document.querySelector("textarea[name='message']").value
  };

  const response = await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  const result = await response.json();

  if (result.status === "ok") {
    alert("Réponse envoyée 💖");
  }
});
