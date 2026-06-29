(function () {
  var scenes = [
    {
      tag: "第 1 幕",
      title: "沉寂的工厂",
      text: "懿动工厂……好久没有甜味了。",
      image: "assets/frame01.jpg"
    },
    {
      tag: "第 2 幕",
      title: "门被推开",
      text: "直到这一天，有个小孩推开了门。",
      image: "assets/frame02.jpg"
    },
    {
      tag: "第 3 幕",
      title: "跳进盒子·变身",
      text: "逸逸跳进盒子的那一刻，封印碎了。",
      image: "assets/frame03.jpg"
    },
    {
      tag: "第 4 幕",
      title: "芒果布丁精灵",
      text: "哇！原来逸逸是芒果布丁精灵！",
      image: "assets/frame04.jpg"
    },
    {
      tag: "第 5 幕",
      title: "彩色泡泡护体",
      text: "别怕，我们有彩色泡泡护体！",
      image: "assets/frame05.jpg"
    },
    {
      tag: "第 6 幕",
      title: "甜味反击",
      text: "懿动一下，世界就亮啦！",
      image: "assets/frame06.jpg"
    }
  ];

  var current = 0;
  var app = document.getElementById("app");
  var sceneImage = document.getElementById("sceneImage");
  var sceneTag = document.getElementById("sceneTag");
  var sceneTitle = document.getElementById("sceneTitle");
  var sceneText = document.getElementById("sceneText");
  var energyText = document.getElementById("energyText");
  var toast = document.getElementById("toast");
  var modal = document.getElementById("orderModal");
  var toastTimer;

  function showToast(text) {
    window.clearTimeout(toastTimer);
    toast.textContent = text;
    toast.classList.add("show");
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("show");
    }, 1400);
  }

  function setScene(index) {
    current = (index + scenes.length) % scenes.length;
    var scene = scenes[current];
    sceneImage.style.opacity = "0";
    window.setTimeout(function () {
      sceneImage.src = scene.image;
      sceneImage.style.opacity = "1";
    }, 120);
    sceneTag.textContent = scene.tag;
    sceneTitle.textContent = scene.title;
    sceneText.textContent = scene.text;
    energyText.textContent = "已点亮 " + (current + 1) + " / " + scenes.length;
    document.querySelectorAll(".thumb").forEach(function (button) {
      button.classList.toggle("active", Number(button.dataset.scene) === current);
    });
  }

  function switchPage(pageName) {
    document.querySelectorAll(".page").forEach(function (page) {
      page.classList.toggle("active", page.dataset.page === pageName);
    });
    document.querySelectorAll(".tab").forEach(function (tab) {
      tab.classList.toggle("active", tab.dataset.tab === pageName);
    });
  }

  function sprinkleCandy() {
    var colors = ["var(--accent)", "var(--accent2)", "var(--green)", "var(--purple)", "var(--cream)"];
    for (var i = 0; i < 24; i += 1) {
      var candy = document.createElement("span");
      candy.className = "candy";
      candy.style.left = (165 + Math.random() * 60) + "px";
      candy.style.top = (385 + Math.random() * 80) + "px";
      candy.style.background = colors[i % colors.length];
      candy.style.setProperty("--x", (Math.random() * 260 - 130) + "px");
      candy.style.setProperty("--y", (-80 - Math.random() * 220) + "px");
      candy.style.animationDelay = (Math.random() * 160) + "ms";
      app.appendChild(candy);
      window.setTimeout(function (node) {
        if (node && node.parentNode) node.parentNode.removeChild(node);
      }, 1100, candy);
    }
    showToast(current === 5 ? "甜味反击成功！" : "甜味能量 +1");
  }

  function openModal() {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".thumb").forEach(function (button) {
    button.addEventListener("click", function () {
      setScene(Number(button.dataset.scene));
      showToast("已切换到" + scenes[current].tag);
    });
  });

  document.querySelectorAll(".tab").forEach(function (button) {
    button.addEventListener("click", function () {
      switchPage(button.dataset.tab);
    });
  });

  document.getElementById("nextBtn").addEventListener("click", function () {
    setScene(current + 1);
    if (current === 0) {
      showToast("剧情已重播");
    } else {
      showToast("剧情推进：" + scenes[current].title);
    }
  });

  document.getElementById("candyBtn").addEventListener("click", sprinkleCandy);

  document.getElementById("goProduct").addEventListener("click", function () {
    switchPage("product");
  });

  document.getElementById("openOrder").addEventListener("click", openModal);
  document.getElementById("closeOrder").addEventListener("click", closeModal);

  document.getElementById("confirmOrder").addEventListener("click", function () {
    closeModal();
    showToast("已加入甜盒，等待结算");
  });

  document.querySelectorAll(".orderBtn").forEach(function (button) {
    button.addEventListener("click", openModal);
  });

  document.querySelectorAll(".option").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll(".option").forEach(function (item) {
        item.classList.remove("active");
      });
      button.classList.add("active");
    });
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) closeModal();
  });

  setScene(0);
})();
