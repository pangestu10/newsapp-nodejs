async function getArticles() {
  const articlesContainer = document.getElementById("articles-container");
  const token = localStorage.getItem("token");

  const response = await fetch("/api/v1/articles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    let articlesHtml = "";
    data.data.forEach((article) => {
      articlesHtml += `
                <div class="article">
                    <h2>${article.title}</h2>
                    <p>${article.content}</p>
                </div>
            `;
    });
    articlesContainer.innerHTML = articlesHtml;
  } else {
    alert(data.message);
  }
}

getArticles();
