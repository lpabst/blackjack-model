
// returns random number between specified min/max values 
// both min and max are included in the available options
function random(min, max) {
    let range = max - min + 1;
    let randomNumber = Math.floor(Math.random() * range) + min;
    return randomNumber
}

