const headerRoot = document.getElementById('headerRoot');

function createElement(type, parent, classList){
    const newElement = document.createElement(type);
    if(classList.length > 0) {
        for(var c in classList){
            newElement.classList.add(classList[c])
        }
    }
    parent.appendChild(newElement);
    return newElement;
}

function addNavbar(){
    const n1 = createElement('nav', headerRoot, ['navbar', 'navbar-expand-lg', 'navbar-dark', 'bg-dark'])
    const d1 = createElement('div', n1, ['container-fluid'])

    const a1 = createElement('a', d1, ['navbar-brand']);
    a1.innerText = 'Ana Sayfa';
    a1.href = '/';

    const b1 = createElement('button', d1, ['navbar-toggler']);
    b1.type = 'button';
    b1.setAttribute('data-bs-toggle', 'collapse');
    b1.setAttribute('data-bs-target', '#navbarSupportedContent');
    b1.setAttribute('aria-controls', 'navbarSupportedContent');
    b1.setAttribute('aria-expanded', 'false');
    b1.setAttribute('aria-label', 'Toggle navigation');

    const s1 = createElement('span', b1, ['navbar-toggler-icon']);

    const d2 = createElement('div', d1, ['collapse', 'navbar-collapse']);
    d2.id = 'navbarSupportedContent';
    
    const ul2 = createElement('ul', d2, ['navbar-nav', 'ms-auto', 'mb-2', 'mb-lg-0']);
    
    const li2 = createElement('li', ul2, ['nav-item', 'dropdown']);
    
    const a3 = createElement('a', li2, ['btn', 'btn-secondary', 'dropdown-toggle']);
    a3.href = '#';
    a3.role = 'button';
    a3.setAttribute('data-bs-toggle', 'dropdown');
    a3.setAttribute('aria-expanded', 'false');
    a3.innerText = 'Profil';

    const s2 = createElement('span', a3, ['caret']);

    const ul3 = createElement('ul', li2, ['dropdown-menu', 'dropdown-menu-end']);
    const li3 = createElement('li', ul3, []);
    const li4 = createElement('li', ul3, []);
    const li5 = createElement('li', ul3, []);
    const li6 = createElement('li', ul3, []);

    const a4 = createElement('a', li3, ['dropdown-item']);
    a4.id = 'profileName';
    a4.innerText = '--isim--';

    const a5 = createElement('a', li4, ['dropdown-item']);
    a5.id = 'profileEmail';
    a5.innerText = '--email--';

    const hr1 = createElement('hr', li5, ['dropdown-divider']);
    const a6 = createElement('a', li6, ['dropdown-item']);
    a6.id = 'logoutButton';
    a6.href = '#';
    a6.innerText = 'Çıkış';
}

addNavbar();


function addLoading(){
    const d1 = createElement('div', headerRoot, ['d-flex', 'justify-content-center']);
    const d2 = createElement('div', d1, ['spinner-border']);
    d2.role = 'status';
    d2.style = 'display: none;'
    d2.id = 'loadingSpinner';

    const s1 = createElement('span', d2, ['sr-only']);
    s1.innerText = 'Loading...'
}

addLoading();

window.electronAPI.onLoadingStarted(() => {
    loadingSpinner.style.display = 'block';
    var childButtons = document.querySelectorAll('button');
    childButtons.forEach((button) => {
        button.disabled = true;
    })
    childButtons = document.querySelectorAll('input');
    childButtons.forEach((button) => {
        button.disabled = true;
    })
})

window.electronAPI.onLoadingEnded(() => {
    loadingSpinner.style.display = 'none';
    var childButtons = document.querySelectorAll('button');
    childButtons.forEach((button) => {
        button.disabled = false;
    })
    childButtons = document.querySelectorAll('input');
    childButtons.forEach((button) => {
        button.disabled = false;
    })
})