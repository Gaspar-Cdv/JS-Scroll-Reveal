# Scroll Reveal

## Presentation

Scroll Reveal is a JavaScript library, used to display an HTML element with a CSS animation, when it is visible in the viewport (like AOS, scrollReveal.js, and so on...). This library simply uses classes, and can be easily customizable.

## How to use

Just insert the JS file before your closing body tag :

	<script src="sr.js"></script>

Then add one or many classes to the element you want to reveal. A Scroll Reveal class looks like `sr-argument-values`. Here is an exhaustive list of all arguments and values you can use :

## Animations

### Fade

The simplest animation : just a fade-in on scroll.

	<div class='sr-fade'></div>

### Slides

A slide animation (with a fade). You can choose the direction of your slide.

	<div class='sr-slide-right'></div>
	<div class='sr-slide-left'></div>
	<div class='sr-slide-up'></div>
	<div class='sr-slide-down'></div>
	<div class='sr-slide-up-right'></div>
	<div class='sr-slide-up-left'></div>
	<div class='sr-slide-down-right'></div>
	<div class='sr-slide-down-left'></div>

Note : the order of the values is not decisive. `sr-slide-top-left` is the same as `sr-slide-left-top`.

### Zooms

A zoom animation (also with a fade). Only to values are possibles : in and out.

	<div class='sr-zoom-in'></div>
	<div class='sr-zoom-out'></div>

### Flips

A flip animation (still with a fade). You can choose the direction of your flip.

	<div class='sr-flip-right'></div>
	<div class='sr-flip-left'></div>
	<div class='sr-flip-up'></div>
	<div class='sr-flip-down'></div>
	<div class='sr-flip-up-right'></div>
	<div class='sr-flip-up-left'></div>
	<div class='sr-flip-down-right'></div>
	<div class='sr-flip-down-left'></div>

Note : like slides animation, the order of the values is not decisive.

### Mixed animations

You can use many animations together. For example : 

	<div class='sr-slide-left sr-zoom-in'></div>

## Settings

### Duration of the animation

It is possible to customize the duration of your animation. Just add a sr-duration class followed by your value in ms. In the example below, the animation will last one second (1000ms) :

	<div class='sr-slide-left sr-duration-1000'></div>

If the duration value is not a valid number, the duration will be the default value, that is 700ms. You can change it in the first line of the JS file :

	let durationDefault = 700; // in ms


### Delay before the animation

If you want to delay the display of your element, use the sr-delay class, followed by your value in ms. It can be useful on the head of your website, when the page is just loaded.


	<div class='sr-slide-left sr-delay-200'></div>
	<div class='sr-slide-right sr-delay-800'></div>

If the delay value is not a valid number, the element will appear with no delay.

### Trigger of the animation

When you scroll down, the animation will start when the element is half visible on the viewport. You can change it using sr-trigger. The value can be a number : it will **correspondre** to the distance between the top of the element and the bottom of the screen. If you want the element to be totally visible before launch the animation, use `sr-trigger-height`.

	<div class='sr-slide-left sr-trigger-50'></div>
	<div class='sr-slide-left sr-trigger-height'></div>

### One shot animation

By default, the element will appear and desappear each time you scroll up and down. If you want your element to appear one time only, use `sr-once`. The element won't disappear any more.

	<div class='sr-slide-left sr-once'></div>

### Distance of the animation (slide only)

When you use `sr-slide`, the default distance of the slide is 200px. There are two ways to change it. You can change the distance of every slide effect by changing the second line of the JS file :

	let slideDefault = 200; // in px

Or you can change the distance of a specific element, using `sr-distance`, followed by your value (in px). For example : 

	<div class='sr-slide-left sr-distance-500'></div>