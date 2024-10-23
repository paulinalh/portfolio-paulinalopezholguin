document.addEventListener('mousemove', function(e) {
    const mybody = document.querySelector('body');
    const round = document.createElement('span');
    round.style.left = -125 + e.pageX + 'px';
    round.style.top = -125 + e.pageY + 'px';
    mybody.appendChild(round);

    // Remove the element after a short delay to prevent too many spans
    setTimeout(() => {
        round.remove();
    }, 500);
});
