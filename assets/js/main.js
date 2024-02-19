/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () => {
    login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () => {
    login.classList.remove('show-login')
})

/*=============== FORGOT ===============*/
const forgot = document.getElementById('forgot'),
      forgotBtn = document.getElementById('login-forgot'),
      forgotClose = document.getElementById('forgot-close'),
      forgotToLogin = document.getElementById('forgot-log-in')

/* Forgot show */
forgotBtn.addEventListener('click', () => {
    forgot.classList.add('show-forgot')
    login.classList.remove('show-login')
})

/* Forgot hidden */
forgotClose.addEventListener('click', () => {
    forgot.classList.remove('show-forgot')
})

/* Login show */
forgotToLogin.addEventListener('click', () => {
    forgot.classList.remove('show-forgot')
    login.classList.add('show-login')
})

/*=============== REGISTER ===============*/
const register = document.getElementById('register'),
      registerBtn = document.getElementById('login-sign-up'),
      registerClose = document.getElementById('register-close'),
      registerToLogin = document.getElementById('register-log-in')

/* Register show */
registerBtn.addEventListener('click', () => {
    register.classList.add('show-register')
    login.classList.remove('show-login')
})

/* Register hidden */
registerClose.addEventListener('click', () => {
    register.classList.remove('show-register')
})

/* Login show */
registerToLogin.addEventListener('click', () => {
    register.classList.remove('show-register')
    login.classList.add('show-login')
})

/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper('.card__content', {
    loop: true,
    spaceBetween: 32,
    grabCursor: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints:{
        600:{
            slidesPerView: 2,
        },
        968:{
            slidesPerView: 3,
        },
    },
  });

/*=============== FEED RSS ===============*/
const loadRSS = (feedSrc) => {
    const src = feedSrc
    const xhttp = new XMLHttpRequest();
    xhttp.responseType = 'json'
    xhttp.open("get", src, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showRSS(this)
        }
    };
    xhttp.send();
}

const showRSS = (json) => {
    const div = document.getElementById('card-wrapper'),
          objJson = json.response;
    let result = ''

    objJson.items.forEach((item) => {
        date = new Date(item.pubDate)
        day = date.getDate()
        mouth = date.getMonth() + 1
        year = date.getFullYear()
        hour = date.getHours()
        minute = date.getMinutes()

        result += `
                  <article class="card__article swiper-slide">
                    <div class="card__data">
                      <h3 class="card__title">${item.title}</h3>
                      <div class="card__info">
                          <p class="card__author">Author: <b>${item.author}</b></p>
                          <p class="card__date">${day}-${mouth}-${year} | ${hour}:${minute}</p>
                      </div>
                      <p class="card__description">
                        ${item.description}
                      </p>
                      <a href="${item.link}" class="card__button" target="_blank">Read More</a>
                    </div>
                  </article>
                  `
    })

    div.innerHTML = result
}

window.onload = loadRSS('https://api.rss2json.com/v1/api.json?rss_url=https://www.fashionbeans.com/feed/')