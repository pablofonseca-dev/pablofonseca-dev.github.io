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
                if(JSONReceivedData[x] != 'Spanish'){
                    fromLanguageDropDown.insertAdjacentHTML("beforeend", '<option value="' + x + '">' + JSONReceivedData[x] + '</option>');
                }else{
                    fromLanguageDropDown.insertAdjacentHTML("beforeend", '<option value="' + x + '" selected="true">' + JSONReceivedData[x] + '</option>');
                }
            }
            for (let x in JSONReceivedData) {
                if(JSONReceivedData[x] != 'English'){
                    toLanguageDropDown.insertAdjacentHTML("beforeend", '<option value="' + x + '">' + JSONReceivedData[x] + '</option>');
                }else{
                    toLanguageDropDown.insertAdjacentHTML("beforeend", '<option value="' + x + '" selected="true">' + JSONReceivedData[x] + '</option>');
                }
            }
        })
        // .then(() => {
        //     setSelectedLanguages();
        // });
}



function setSelectedLanguages() {
    let translateFromLanguage = localStorage.getItem('translateFromLanguage');
    let translateToLanguage = localStorage.getItem('translateToLanguage');
    let selectedOptions = fromLanguageDropDown.options;
    for (let option, index = 0; option = selectedOptions[index]; index++) {
        if (option.value == translateFromLanguage) {
            fromLanguageDropDown.selectedIndex = index;
            break;
        }
    }
    for (let option, index = 0; option = selectedOptions[index]; index++) {
        if (option.value == translateToLanguage) {
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
let contentToTranslate = document.getElementById('content_to_translate');
let translatedContent = document.getElementById('content_translated');

contentToTranslate.addEventListener('keyup', function (event) {

        localStorage.setItem('translateFromLanguage', translateFromLanguage);
        localStorage.setItem('translateToLanguage', translateToLanguage);

        //Remove text area value 
        translatedContent.value = '';
        //Load the selecteded languages in the Drop Downs.
        translateFromLanguage = dropdownFromLanguage.value;
        translateToLanguage = dropdownToLanguage.value;
        translateContent(translateFromLanguage, translateToLanguage, contentToTranslate.value);

});


//CODE FOR TRANSLATE
function translateContent(translateFromLanguage, translateToLanguage, textToTranslate) {
    let translatedText = "";
    fetch(`
    https://translate.yandex.net/api/v1.5/tr.json/translate?key=${TRANSLATE_API_KEY}
    &text=${escape(textToTranslate)}
    &lang=${translateFromLanguage}-${translateToLanguage}
    &[format=plain]`)
        .then(data => data.json())
        .then(data => {
            //debugger;
            translatedText = data;
            translatedContent.value = translatedText.text[0];
        });
}

translateContent();