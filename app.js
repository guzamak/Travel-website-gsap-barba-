let mouse = document.querySelector(".cursor")
let mouseTxt = document.querySelector(".cursor-text")
let burger = document.querySelector(".burger")
let navBar = document.querySelector(".nav-bar")
const nav = document.querySelector(".nav-header");

function animatieSildes() {
    //item
    const sliders = document.querySelectorAll(".slide");

    sliders.forEach((slider, index) => {
        const revealImg = slider.querySelector(".reveal-img");
        const img = slider.querySelector("img");
        const revealText = slider.querySelector(".reveal-text");

        //Gsap
        //anim1
        const slideTL = gsap.timeline({
            default: { duration: 1, ease: "power2.inOut" },
            scrollTrigger: {
                trigger: slider,
                start: "top +=500",
            }
        })
        slideTL.fromTo(revealImg, { x: "0%" }, { x: "100%" })
        slideTL.fromTo(img, { scale: 2 }, { scale: 1 }, '-=0.5')
        slideTL.fromTo(revealText, { x: "0%" }, { x: "100%" }, '-=0.25')
        slideTL.fromTo(nav, { y: "-100%" }, { y: "0%" })

        //anim2
        slider.style.zIndex = toString(index)
        if (index != sliders.length - 1) {
            const pageTL = gsap.timeline({
                scrollTrigger: {
                    trigger: slider,
                    start: "top top",
                    end: "+=500",
                    scrub: 1,
                    pin: true,
                    pinSpacing: false,
                    fastScrollEnd: true
                }
            })
            pageTL.fromTo(slider, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0 })
        }
    })
}

function cursor(e) {
    mouse.style.top = e.pageY + "px"
    mouse.style.left = e.pageX + "px"
}
function activeCursor(e) {
    const item = e.target
    if (item.id === "logo" || item.classList.contains("burger")) {
        mouse.classList.add("navactive")
    } else {
        mouse.classList.remove("navactive")
    }
    if (item.classList.contains("explore")) {
        mouse.classList.add("exploreactive")
        mouseTxt.innerText = "Tab"
        gsap.to(".title-swipe", 1, { y: "0%" })
    } else {
        mouse.classList.remove("exploreactive")
        mouseTxt.innerText = ""
        gsap.to(".title-swipe", 1, { y: "100%" })
    }
}

function navOpen() {
    if (burger.classList.contains("active")) {
        console.log(navBar.style)
        burger.classList.remove('active')
        gsap.to(".line1", 0.5, { rotate: "0", y: "0", background: "white" })
        gsap.to(".line2", 0.5, { rotate: "0", y: "0", background: "white" })
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" })
        gsap.to("#logo", 1, { color: "white" })
        document.body.style.overflow = ""
    } else {
        console.log(navBar.style)
        burger.classList.add('active')
        gsap.to(".line1", 0.5, { rotate: "45", y: "5", background: "black" })
        gsap.to(".line2", 0.5, { rotate: "-45", y: "-5", background: "black" })
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" })
        gsap.to("#logo", 1, { color: "black" })
        document.body.style.overflow = "hidden"
    }
}

//braba tran
//ต้อง ใส่ data-barba = "wrapper" ไม่ต้องการเปลี่ยน 
// "container" ต้องการเปลี่ยน + data-barba-namespace = "หน้าที่อยู่"
let logo =document.getElementById("logo")
barba.init({
    views: [{
        namespace: "home",//ชื่อ page
        //รันก่อนเริ่ม
        beforeEnter() {
            animatieSildes()
            logo.href = "./index.html"
        },
        //รันก่อนเปลี่ยนหน้า
        beforeLeave() {
        }
    }, {
        namespace: "fashion",
        beforeEnter(){
            logo.href = "../index.html"
            detailSilde()
            gsap.fromTo(".nav-header", 1, {y:"-100%"},{y:"0%"})
        },

    }],
    transitions: [
        {
            //เปลี่ยนหน้า
            leave({ current, next }) {
                let done = this.async()
                const tl = gsap.timeline({default:{ease:"power2.inOut"}})
                tl.fromTo(current.container,1,{opacity: 1},{opacity: 0})          
                tl.fromTo(".swipe",0.75,{x:"-100%"},{x:"0%",onComplete:done},"-=0.5")  
        },
            //เริ่ม
            enter({ current, next }) {
                window.scrollTo(0,0)
                let done = this.async()
                const tl = gsap.timeline({default:{ease:"power2.inOut"}})
                tl.fromTo(".swipe",1,{x:"0%"},{x:"100%",stagger:0.25,onComplete:done})  
                tl.fromTo(next.container,1,{opacity: 0},{opacity: 1})
            }
        }]
});

function detailSilde(){
    const detailslides = document.querySelectorAll(".detail-slide")

    detailslides.forEach((detailslide,index)=>{
        const nextimg = document.querySelectorAll(".fashion-img")[index+1]
        // console.log(nextimg)
        const pageTL = gsap.timeline({
            scrollTrigger: {
                trigger: detailslide,
                start: "top top",
                end: `+=500`,
                scrub: 1,
                pin: true,
                pinSpacing: false,
            }})
            pageTL.fromTo(detailslide,1,{opacity:1},{opacity:0})
            pageTL.fromTo(nextimg,1,{x:"100%"},{x:"0%"})
    })
}   





// หาตำเเหน่ง เมาส์
window.addEventListener("mousemove", cursor)
window.addEventListener("mouseover", activeCursor)
burger.addEventListener("click", navOpen)


