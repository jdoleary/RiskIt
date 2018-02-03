export function formatTime(seconds){
    const minutes = Math.round((seconds - 30)/60);
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;  
    }
    return minutes + ':' + remainingSeconds;

}