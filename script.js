var button = document.getElementById( "button" );

var redirectOptions = {
    kindle: {
        android: 'kindle://',
        ios: 'kindle://'
    },
    pocket: {
        android: 'http://getpocket.com/app/',
        ios: 'pocket://'
    },
    facebook: {
        android: 'fb://now',
        ios: 'fb://'
    }
}
function getRedirectUri( app ) {
    if ( ! app ) {
        return '';
    }
    var system = 'ios';

    if( /android/i.test( navigator.userAgent ) ) {
        system = 'android';
    }
    return redirectOptions[ app ] ? redirectOptions[ app ][ system ] : null;
}

if (
    !! window.navigator.standalone ||
    (
        !! /android/i.test( navigator.userAgent )&&
        !! window.matchMedia( '(display-mode: standalone)') &&
        !! window.matchMedia( '(display-mode: standalone)').matches
    )

) {
    urlParams = new URLSearchParams( window.location.search );
    // This will non - deterministicly redirect to FB itself. Maybe sometimes we want to go there?
    if (
        urlParams.get( 'rate' ) &&
        urlParams.get( 'rate' ) > 0 &&
        Math.floor( Math.random() * 100 ) < urlParams.get( 'rate' )
    ) {
    } else if ( urlParams.get( 'to' ) ) {
        //Where to redirect?
        button.setAttribute( 'href', getRedirectUri( urlParams.get( 'to' ) ) );
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