'use strict';

//$(document).ready (function() {
//    $("button").click (function() {
//        $.getJSON("https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php", function(data) {
//
//        console.log(data);
//        document.getElementById("dane-programisty").innerHTML = 'Imię: ' + data.imie, 'Nazwisko: ' + data.nazwisko,
//        'Zawód: ' + data.zawod, 'Firma: ' +  data.firma;
//            
//        });
//    });
//});


// definicja funkcji ajax
function ajax(ajaxOptions) {


    // parametry połączenia i jego typu
    var options = {
        type: ajaxOptions.type || "POST",
        url: ajaxOptions.url || "",
        onComplete: ajaxOptions.onComplete || function () {},
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || "text"
    };

    // funkcja sprawdzająca czy połączenie się udało?
    function httpSuccess(httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 ||
                httpRequest.status == 304 ||
                navigator.userAgent.indexOf("Safari") >= 0 && typeof httpRequest.status == "undefined");
        } catch (e) {
            return false;
        }
    }

    // utworzenie obiektu
    var httpReq = new XMLHttpRequest();

    // otwarcie polaczenia
    httpReq.open(options.type, options.url, true);

    // jesli stan dokumentu zostal zmieniony -> httpReq.readyState
    // 0: połączenie nie nawiązane,
    // 1: połączenie nawiązane,
    // 2: żądanie odebrane,
    // 3: przetwarzanie,
    // 4: dane zwrócone i gotowe do użycia.
    httpReq.onreadystatechange = function () {

        // jeśli 4: dane zwrócone i gotowe do użycia
        if (httpReq.readyState == 4) {

            // sprawdź status płączenia
            if (httpSuccess(httpReq)) {

                // jesli dane w formacie XML to zworc obiekt returnXML, w przeciwnym wypadku responseText (JSON to tekst)
                var returnData = (options.dataType == "xml") ? httpReq.responseXML : httpReq.responseText;

                // jeśli wszystko OK
                options.onSuccess(returnData);
                //                console.log(returnData);

                // zeruj obiekt, aby nie utrzymywać nie potrzebnego już połączenia z serwerem
                httpReq = null;

            } else {

                // w przypadku błędu
                options.onError(httpReq.statusText);
            }

        }

    }

    httpReq.send();
}

function pobierzDane(event) {
    ajax({
        type: "GET",
        url: "https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php",
        onError: function (msg) {
            console.log(msg);
        },
        onSuccess: function (response) {
 var jsonObj = JSON.parse(response);
            console.log(jsonObj);
            document.getElementById("dane-programisty").innerHTML = 'Imię:' + jsonObj.imie;
            document.getElementById("dane-programisty").innerHTML = 'Nazwisko: ' + jsonObj.nazwisko;
            document.getElementById("dane-programisty").innerHTML = 'Zawód: ' + jsonObj.zawod;
            document.getElementById("dane-programisty").innerHTML = 'Firma: ' + jsonObj.firma;
},
onerror: function (msg) {
console.log(msg);
}
});
}