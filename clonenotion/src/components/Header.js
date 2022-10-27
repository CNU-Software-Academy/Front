export default function Header({ $target }) {
  const $header = document.createElement('div');
  $header.classList.toggle('header');
  $target.appendChild($header);

  this.template = `
    <div class="header-notion">
      <img src="/src/img/profile.png" alt="notion-profile" class="header-notion__profile">
      <h2 class="header-notion__text">
       <strong>Notion</strong>
      </h2><span class="material-icons">unfold_more</span>
    </div>

    <ul class="header-list">
      <li class="header-list__item">
        <span class="material-icons">search</span>
        <a href="https://linearode.tistory.com/" >만든 사람</a>
      </li>
      </li>
    </ul>
  `;

  this.render = () => {
    $header.innerHTML = this.template;
  };
  this.render();
}
