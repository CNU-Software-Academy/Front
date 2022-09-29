export default function Header({ $target }) {

    const $header = document.createElement('div');
    $header.classList.toggle('header');
    $target.appendChild($header);
  
    this.template = `
      <div class="header-notion">
        <img src="/src/img/profile.png" alt="notion-profile" class="header-notion__profile">
        <h2 class="header-notion__text">
        <strong>NotionClone</strong>
    `;
  
    this.render = () => {
      $header.innerHTML = this.template;
    };
    this.render();
  }