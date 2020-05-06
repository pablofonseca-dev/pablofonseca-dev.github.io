'use strict';

const TRANSLATE_API_KEY = "trnsl.1.1.20200505T081723Z.be4db8823ff3a9ef.893d44e347802aca8d7c55117351aff7093ecc85";

//CODE TO GET A LIST OF AVAILABLE LANGUAGES 
let languagesList;
let fromLanguageDropDown = document.getElementById('fromLanguage');
let toLanguageDropDown = document.getElementById('toLanguage');

loadAvailableLanguages();

function loadAvailableLanguages() {
    fetch(`https://translate.yandex.net/api/v1.5/tr.json/getLangs
?key=${TRANSLATE_API_KEY}
&ui=es`)
        .then((data) => {
            return data.json()
        })
        .then((data) => {
            //debugger;
            let JSONReceivedData = data.langs;
            for (let x in JSONReceivedData) {
                fromLanguageDropDown.insertAdjacentHTML("beforeend", '<option value="' + x + '">' + JSONReceivedData[x] + '</option>');
                toLanguageDropDown.insertAdjacentHTML("beforeend", '<option value="' + x + '">' + JSONReceivedData[x] + '</option>');
            }
        })
        .then(() => {
            setSelectedLanguages();
        });
}

function setSelectedLanguages(){
    let translateFromLanguage = localStorage.getItem('translateFromLanguage');
    let translateToLanguage = localStorage.getItem('translateToLanguage');
    let selectedOptions = fromLanguageDropDown.options;
    for(let option, index = 0; option = selectedOptions[index]; index++){
        if(option.value == translateFromLanguage){
            fromLanguageDropDown.selectedIndex = index;
            break;
        }
    }
    for(let option, index = 0; option = selectedOptions[index]; index++){
        if(option.value == translateToLanguage){
            toLanguageDropDown.selectedIndex = index;
            break;
        }
    }
}

let translatorForm = document.getElementById('translator_form');
let dropdownFromLanguage = document.getElementById('fromLanguage');
let dropdownToLanguage = document.getElementById('toLanguage');

let translateFromLanguage;
let translateToLanguage;
let contentToTranslate; 
let translatedContent = document.getElementById('content_translated');

translatorForm.addEventListener('submit', function () {

    //Remove text area value 
    translatedContent.value = ''; 
    //Load the selecteded languages in the Drop Downs.
    translateFromLanguage = dropdownFromLanguage.value;
    translateToLanguage = dropdownToLanguage.value;
    contentToTranslate = document.getElementById('content_to_translate').value;
    translateContent(translateFromLanguage, translateToLanguage, contentToTranslate);
    
    localStorage.setItem('translateFromLanguage', translateFromLanguage);
    localStorage.setItem('translateToLanguage', translateToLanguage);

});


//CODE FOR TRANSLATE
function translateContent(translateFromLanguage, translateToLanguage, textToTranslate) {
    let translatedText = "";
    // let textToTranslate = "What the fuck are you doing?";
    // let translateFromLanguage = 'en';
    // let translateToLanguage = 'es';
    fetch(`
    https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_KEY}
    &text=${textToTranslate}
    &lang=${translateFromLanguage}-${translateToLanguage}
    &[format=plain]`)
    .then(data => data.json())
    .then(data => {
        //debugger;
        translatedText = data;
        translatedContent.value = translatedText.text[0];             
    });
}