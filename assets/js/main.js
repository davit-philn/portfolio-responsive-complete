/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

/*==================== WORK FILTERS ====================*/
const filterBtns = document.querySelectorAll('.work__filter');
const workImgs = document.querySelectorAll('.work__img');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.work__filter.active').classList.remove('active');
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        workImgs.forEach(img => {
            const category = img.getAttribute('data-category');
            if(filter === 'all' || category === filter){
                img.style.display = '';
            }else{
                img.style.display = 'none';
            }
        });
    });
});

/*==================== WORK MODAL ====================*/
const modal = document.getElementById('work-modal');
const modalImg = modal.querySelector('.work-modal__img');
const modalDesc = modal.querySelector('.work-modal__description');
const modalLink = modal.querySelector('.work-modal__link');

workImgs.forEach(img => {
    img.addEventListener('click', e => {
        e.preventDefault();
        modalImg.src = img.querySelector('img').src;
        modalDesc.textContent = img.getAttribute('data-description');
        modalLink.href = img.getAttribute('data-link');
        modal.classList.add('show');
    });
});

modal.addEventListener('click', e => {
    if(e.target.classList.contains('work-modal__close') || e.target === modal){
        modal.classList.remove('show');
    }
});
