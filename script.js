var button = document.getElementById( "button" );
if (
    window.navigator.standalone ||
    ( /android/i.test( navigator.userAgent ) && window.matchMedia( '(display-mode: standalone)' ) )

) {
    urlParams = new URLSearchParams( window.location.search );
    // This will non - deterministicly redirect to FB itself. Maybe sometimes we want to go there?
    if (
        urlParams.get( 'rate' ) &&
        urlParams.get( 'rate' ) > 0 &&
        Math.floor( Math.random() * 100 ) < urlParams.get( 'rate' )
    ) {
        button.setAttribute( 'href', 'fb://' );
    } else if ( urlParams.get( 'to' ) ) {
        //Where to redirect?
        button.setAttribute( 'href', urlParams.get( 'to' ) + '://' );
    }

    // Props IFTTT team for this code:
    var clickEvent = document.createEvent( 'MouseEvents' );
    clickEvent.initEvent( 'click', true, true );
    setTimeout( function() {
        button.dispatchEvent( clickEvent );
    }, 25 );
} else {
    var instructions = document.getElementById( "instructions" );
    instructions.style["display"] = ""
    button.style["display"] = "none";
}