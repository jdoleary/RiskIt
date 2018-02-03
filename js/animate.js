import TweenMax from 'gsap';

export function blink(element,toColor,finalColor,speed = 0.2){
    
    TweenMax.to(element, speed, {color:toColor});
    TweenMax.to(element,speed,{delay:speed,color:finalColor});
}