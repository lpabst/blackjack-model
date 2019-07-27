
// returns random number between specified min/max values 
// both min and max are included in the available options
function random(min, max) {
    const range = max - min + 1;
    const randomNumber = Math.floor(Math.random() * range) + min;
    return randomNumber
}

