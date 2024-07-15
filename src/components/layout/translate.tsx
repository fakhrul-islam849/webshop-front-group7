import React, {useEffect} from 'react';

function Translate() {
    useEffect(() => {
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages : "bn,en", // include this for selected languages
                layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                autoDisplay: 'true'
            },
            'google_translate_element');
    }
    return <div id="google_translate_element"></div>
    
}
export default Translate;