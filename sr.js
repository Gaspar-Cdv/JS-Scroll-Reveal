let durationDefault = 700; // in ms
let slideDefault = 200; // in px
let onceDefault = false; // if true, element doesn't disappear when displayed
let easingDefault = 'cubic-bezier(0,.7,.68,1.17)';

function throttle(callback, delay) {
    var last = 0;
    return function (...args) {
        var now = new Date();
        if (now - last >= delay) {
            callback(...args);
            last = now;
        }
    };
}

document.querySelectorAll("[class^='sr-'], [class*=' sr-']").forEach(element => {
    let sr = Object.fromEntries([...element.classList].filter(x => x.startsWith('sr-')).map(x => [(x = x.split('-'))[1], x.slice(2)]));
    if (sr.out) sr.out = Object.fromEntries([...element.classList].filter(x => x.startsWith('sr-out-')).map(x => [(x = x.split('-'))[2], x.slice(3)]));
    let top = element.getBoundingClientRect().top + window.scrollY;
    let height = element.getBoundingClientRect().height;
    let once = onceDefault; 
    let lastVisible, lastVisibleOut;

    function toogleReveal(init=false) {
        let transform = transformOut = [];
        let topFromBottom = window.innerHeight - (top - window.scrollY);
        let bottomFromTop = top + height - window.scrollY;
        let trigger = sr.trigger?.[0] == 'height' ? height : (sr.trigger?.[0] || height / 2); // default value : half the height
        let triggerOut = sr.out?.trigger?.[0] == 'height' ? height : (sr.out?.trigger?.[0] || height / 2); // default value : half the height
        let invalidArgument = !sr.fade && !sr.slide && !sr.zoom && !sr.flip && !sr.out; // true if invalid sr-argument (=> no animation)

        let visible = once || invalidArgument || topFromBottom > trigger; 
        let visibleOut = !sr.out || once || invalidArgument || bottomFromTop > triggerOut;
        if (lastVisible == undefined) lastVisible = !visible;
        if (lastVisibleOut == undefined) lastVisibleOut = visibleOut;
        if (visible && sr.once) once = true;

        function applyChanges(out=false) {
            let [sr_, visible_, transform_] = out ? [sr.out, visibleOut, transformOut] : [sr, visible, transform];

            if (sr_.slide) {
                let slide = (sr_.distance || slideDefault) * (out ? -1 : 1);
                let translateX = sr_.slide.includes('left') ? slide : sr_.slide.includes('right') ? -slide : 0;
                let translateY = sr_.slide.includes('up') ? slide : sr_.slide.includes('down') ? -slide : 0;
                transform_.push(visible_ ? 'translate(0)' : 'translate(' + translateX + 'px, ' + translateY + 'px)');
            }
            
            if (sr_.zoom) {
                let ratio = 0.5 * (out ? -1 : 1);
                transform_.push(visible_ ? 'scale(1)' : 'scale(' + (1 + (sr_.zoom.includes('in') ? -ratio : sr_.zoom.includes('out') ? ratio : 0 )) + ')');
            }
            
            if (sr_.flip) {
                let angle = 90 * (out ? -1 : 1);
                let angleX = sr_.flip.includes('down') ? angle : sr_.flip.includes('up') ? -angle : 0;
                let angleY = sr_.flip.includes('left') ? angle : sr_.flip.includes('right') ? -angle : 0;
                angleX && transform_.push('perspective(1500px) ' + (visible_ ? 'rotateX(0)' : 'rotateX(' + angleX + 'deg)'));
                angleY && transform_.push('perspective(1500px) ' + (visible_ ? 'rotateY(0)' : 'rotateY(' + angleY + 'deg)'));
            }
            
            if (!init) {
                let duration = !isNaN(sr_.duration?.[0]) ? sr_.duration[0] : durationDefault;
                element.style.transition = 'opacity ' + duration + 'ms,  transform ' + duration + 'ms ' + (sr_.easing?.join('-') || easingDefault); // or ease-in-out
            }
            
            element.style.transform = transform_.join(' ');
            element.style.opacity = +visible_;
        }

        if (init) {
            visible = false;
            return new Promise(resolve => resolve(applyChanges()));
        } else {
            lastVisible != visible && setTimeout(() => applyChanges(), sr.delay || 0);
            lastVisibleOut != visibleOut && sr.out && setTimeout(() => applyChanges(true), sr.out.delay || 0);
        }
        lastVisible = visible;
        lastVisibleOut = visibleOut;
    }

    toogleReveal(true).then(() => { // initialize style then add animation (for animation onload)
        toogleReveal();
        window.addEventListener('scroll', throttle(() => toogleReveal(), 40));
    })
})
