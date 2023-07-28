const myModal = document.getElementById('myModal')
const modalButton = document.querySelector('.modalButton')


setTimeout(showApp, 1500)

function showApp() {
  myModal.classList.add('show')
  myModal.style.display = 'block'
}


// carkin oranını hesaplayan fonksiyon

function rateCalculate() {
  let rateCount = Math.random()*100
  let rateReturn = 0

  if(rateCount <= 5) {
      rateReturn = Math.round(Math.random() * (59 - 1) + 1) + (720 * Math.floor(Math.random()*10))
  }else if(rateCount <= 15) {
      rateReturn = Math.round(Math.random() * (119 - 61) + 61) + (720 * Math.floor(Math.random()*10))
  }else if(rateCount <= 25) {
      rateReturn = Math.round(Math.random() * (179 - 121) + 121) + (720 * Math.floor(Math.random()*10))
  }else if(rateCount <= 35) {
      rateReturn = Math.round(Math.random() * (239 - 181) + 181) + (720 * Math.floor(Math.random()*10))
  }else if(rateCount <= 50) {
      rateReturn = Math.round(Math.random() * (299 - 241) + 241) + (720 * Math.floor(Math.random()*10))
  }else {
      rateReturn = Math.round(Math.random() * (359 - 301) + 301) + (720 * Math.floor(Math.random()*10))
  }

  console.log(`
  rateCount: ${rateCount}  
  rateReturn: ${rateReturn} %360: ${rateReturn%360}
  `)
  return rateReturn
}

// <======================================>

// Immediately invoked function expression
// to not pollute the global scope
(function() {
  const wheel = document.querySelector('.wheel');
  const spinButton = document.querySelector('.spinButton');
  const display = document.querySelector('.display');
  
  let deg = 0;
  let zoneSize = 60; // deg

  // Counter clockwise
  const symbolSegments = {
    1: "%5 indirim",
    2: "+1 ay ek süre",
    3: "1 ay VIP destek",
    4: "%10 indirim",
    5: "%15 indirim",
    6: "+3 ay ek süre",
  }

  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    display.innerHTML = `Tebrikler kısa süreliğine ${symbolSegments[winningSymbolNr]} kuponu kazandınız.
    Aşağıdaki linke tıklayarak bu kupona sahip olabilirsiniz.
    `
  }


  spinButton.addEventListener('click', () => {
    // Reset display
    display.innerHTML = "";
    // Disable button during spin
    spinButton.style.pointerEvents = 'none';
    // Calculate a new rotation between 5000 and 10 000
    // deg = Math.floor(5000 + Math.random() * 5000);
    deg = 3600 + rateCalculate();
    // Set the transition on the wheel (10s)
    wheel.style.transition = 'all 5.5s ease-out';
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    // wheel.classList.add('blur');

  });

  wheel.addEventListener('transitionend', () => {
    // Remove blur
    wheel.classList.remove('blur');
    // Enable button when spin is over
    spinButton.style.pointerEvents = 'auto';
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = 'none';
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);

    spinButton.style.display = 'none'/* */
    modalButton.style.display = 'block'
  });
})();

