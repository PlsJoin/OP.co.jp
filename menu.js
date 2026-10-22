(function () {
  var MENU_ITEMS = [
    { label: "概要", href: "#about" },
    { label: "理念", href: "#philosophy" },
    { label: "経営目標", href: "#goals" },
    { label: "製品", href: "#products" },
    { label: "お問い合わせ", href: "#contact" }
  ];

  var PRODUCTS = [
    {
      name: "plsjoin.domain",
      description: "OP Portalが公開しているWebサイトをまとめた窓口です。",
      href: "https://plsjoin.domain",
      external: true
    },
    {
      name: "製品名 2",
      description: "ここに製品の説明を入力します。",
      href: "#",
      external: true
    },
    {
      name: "製品名 3",
      description: "ここに製品の説明を入力します。",
      href: "#",
      external: true
    }
  ];

  function createLink(item) {
    var a = document.createElement("a");
    a.textContent = item.label;
    a.href = item.href;
    if (item.external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function renderMenu() {
    var nav = document.getElementById("site-menu");
    if (!nav) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "menu-toggle";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "site-menu-list");
    button.textContent = "メニュー";

    var list = document.createElement("ul");
    list.id = "site-menu-list";
    list.className = "menu-list";

    MENU_ITEMS.forEach(function (item) {
      var li = document.createElement("li");
      li.appendChild(createLink(item));
      list.appendChild(li);
    });

    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      list.classList.toggle("is-open", !open);
    });

    list.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        button.setAttribute("aria-expanded", "false");
        list.classList.remove("is-open");
      }
    });

    nav.appendChild(button);
    nav.appendChild(list);
  }

  function renderProducts() {
    var container = document.getElementById("product-list");
    if (!container) return;

    PRODUCTS.forEach(function (product) {
      var row = document.createElement("a");
      row.className = "product-row";
      row.href = product.href;
      if (product.external) {
        row.target = "_blank";
        row.rel = "noopener noreferrer";
      }

      var name = document.createElement("span");
      name.className = "product-name";
      name.textContent = product.name;

      var desc = document.createElement("span");
      desc.className = "product-desc";
      desc.textContent = product.description;

      var action = document.createElement("span");
      action.className = "product-action";
      action.textContent = "サイトを開く";

      row.appendChild(name);
      row.appendChild(desc);
      row.appendChild(action);
      container.appendChild(row);
    });
  }

  function highlightCurrentSection() {
    if (!("IntersectionObserver" in window)) return;
    var links = document.querySelectorAll("#site-menu-list a");
    var map = {};
    links.forEach(function (link) {
      var hash = link.getAttribute("href");
      if (hash && hash.charAt(0) === "#") map[hash.slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) {
              l.removeAttribute("aria-current");
            });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderMenu();
    renderProducts();
    highlightCurrentSection();
  });
})();
