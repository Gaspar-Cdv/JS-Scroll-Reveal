let durationDefault = 700; // in ms
let slideDefault = 200; // in px 

document.querySelectorAll("[class^='sr-'], [class*=' sr-']").forEach(element => {
    let sr = Object.fromEntries([...element.classList].filter(x => x.startsWith('sr-')).map(x => [(x = x.split('-'))[1], x.slice(2)]));
    if (sr.out) sr.out = Object.fromEntries([...element.classList].filter(x => x.startsWith('sr-out-')).map(x => [(x = x.split('-'))[2], x.slice(3)]));
    let top = element.getBoundingClientRect().top + window.scrollY;
    let height = element.getBoundingClientRect().height;
    let once = false; // if true, element doesn't disappear when displayed (use sr-once)

    function toogleReveal(init=false) {
        function slide(out=false) {
            let [obj, trig] = out ? [sr.out, triggerOut] : [sr, trigger];
            let slide = (obj.distance || slideDefault) * (out ? -1 : 1);
            let translateX = obj.slide.includes('left') ? slide : obj.slide.includes('right') ? -slide : 0;
            let translateY = obj.slide.includes('up') ? slide : obj.slide.includes('down') ? -slide : 0;
            transform.push(trig ? 'translate(0)' : 'translate(' + translateX + 'px, ' + translateY + 'px)');
        }

        function zoom(out=false) {
            let [obj, trig] = out ? [sr.out, triggerOut] : [sr, trigger];
            let ratio = 0.5 * (out ? 1 : -1);
            transform.push(trig ? 'scale(1)' : 'scale(' + (1 + (obj.zoom.includes('in') ? ratio : obj.zoom.includes('out') ? -ratio : 0 )) + ')');
        }

        function flip(out=false) {
            let [obj, trig] = out ? [sr.out, triggerOut] : [sr, trigger];
            let angle = 90 * (out ? -1 : 1);
            let angleX = obj.flip.includes('down') ? angle : obj.flip.includes('up') ? -angle : 0;
            let angleY = obj.flip.includes('left') ? angle : obj.flip.includes('right') ? -angle : 0;
            angleX && transform.push('perspective(1500px) ' + (trig ? 'rotateX(0)' : 'rotateX(' + angleX + 'deg)'));
            angleY && transform.push('perspective(1500px) ' + (trig ? 'rotateY(0)' : 'rotateY(' + angleY + 'deg)'));
        }

        function applyChanges(out=false) {
            element.style.transform = transform.join(' ') + ' ';
            element.style.opacity = triggerOut && trigger ? 1 : 0;
        }

        let topFromBottom = window.innerHeight - (top - window.scrollY); // let bottomFromBottom = topFromBottom - height;
        let invalidArgument = !sr.fade && !sr.slide && !sr.zoom && !sr.flip && !sr.out; // true if invalid sr-argument (=> no animation)
        let trigger = once || invalidArgument || !init && topFromBottom > (sr.trigger?.[0] == 'height' ? height : (sr.trigger?.[0] || height / 2)); // default value : half the height
        let triggerOut = !sr.out || once || invalidArgument || !init && element.getBoundingClientRect().bottom > (sr.out.trigger?.[0] == 'height' ? height : (sr.out.trigger?.[0] || height / 2));
        if (trigger && sr.once) once = true;

        let transform = [];

        sr.slide && slide();
        sr.out?.slide && slide(true);
        sr.zoom && zoom();
        sr.out?.zoom && zoom(true);
        sr.flip && flip();
        sr.out?.flip && flip(true);

        if (init) {
            return new Promise(resolve => resolve(applyChanges()));
        } else {
            setTimeout(applyChanges, sr.delay || 0);
        }
    }

    toogleReveal(true).then(() => { // initialize style then add animation (for animation onload)
        let duration = !isNaN(sr.duration?.[0]) ? sr.duration[0] : durationDefault;
        element.style.transition = 'opacity ' + duration + 'ms,  transform ' + duration + 'ms cubic-bezier(0,.7,.68,1.17)'; // or ease-in-out
        toogleReveal();
        window.addEventListener('scroll', () => toogleReveal());
    })
})