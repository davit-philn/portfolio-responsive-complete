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

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message'),
      contactButton = document.querySelector('#contact-form .contact__button')

const sendEmail = async (e) => {
    e.preventDefault()

    contactMessage.classList.remove('color-green')
    contactMessage.classList.remove('color-red')

    const name = contactForm.name.value.trim(),
          email = contactForm.email.value.trim(),
          message = contactForm.message.value.trim()

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!name || !email || !message || !emailRegex.test(email)) {
        contactMessage.classList.add('color-red')
        contactMessage.textContent = 'Please enter a valid name, email and message'
        return
    }

    contactButton.disabled = true

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })

        if (res.ok) {
            contactMessage.classList.add('color-green')
            contactMessage.textContent = 'Message sent successfully'
            contactForm.reset()
        } else {
            throw new Error('Error')
        }
    } catch (error) {
        contactMessage.classList.add('color-red')
        contactMessage.textContent = 'Message not sent'
    } finally {
        contactButton.disabled = false
        setTimeout(() => {
            contactMessage.textContent = ''
        }, 5000)
    }
}

if(contactForm){
    contactForm.addEventListener('submit', sendEmail)
}
