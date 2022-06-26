function prepareObject() {
    const form = document.getElementById("element-form");
    const data = new FormData(form);

    const object = {};
    for (let el of data.entries()) {
        object[el[0]] = el[1];
    }

    return object;
}

function addElement() {

    const object = prepareObject();

    const valid = validate(object);
    if (!valid) {
        return;
    }

    const newPre = document.createElement("pre");
    newPre.className = "column half-column element";
    newPre.innerText = JSON.stringify(object, null, 2);

    document.getElementById("db").append(newPre);
}


function validate(object) {

    // walidujemy wszystkie pola
    const validNumber = validateNumber(object.number);
    const validRadio = validateRadio(object.favouriteNumber);
    const validPassword = validatePassword(object.password);
    const validRepeatedPassword = validateRepeatedPassword(object.password, object.password2);

    // zwracamy wynik walidacji - że formularz ją przeszedł, wszystkie pola muszą być wypełnione poprawnie
    return validNumber && validRadio && validPassword && validRepeatedPassword;
}

function validateNumber(number) {

    // walidujemy numer, podany w argumencie - w tym wypadku sprawdzamy, czy jest większy lub równy 0
    const valid = number >= 0;

    // odszukujemy na stronie odpowiednie pole - input, w którym został wpisany numer
    const input = document.querySelector("input[name='number']");

    if (valid) {
        // jeśli numer pasuje do wzorca - usuwamy ewentualne komunikaty walidacyjne, jeśli są

        // ustawiamy pustą klasę - w razie jakby input był wcześniej oznaczony na czerwono
        input.className = "";

        const nameMessage = document.getElementById("number-input-message");
        if (nameMessage) {
            //jeśli wyświetla się komunikat - usuwamy go
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        // numer nie pasuje do wzorca - dodajemy komunikaty walidacyjne, jeśli ich nie ma

        // dodajemy inputowi klasę, która oznacza, że coś z nim nie tak
        input.className = "invalid";

        // sprawdzamy, czy wyświetla się komunikat o błędzie w polu z numerem
        if (!document.getElementById("number-input-message")) {
            // tworzymy element, który będzie mówił o błędzie w wybranym polu
            const small = document.createElement("small");
            small.id = "number-input-message"; // nadajemy id - potem dzięki niemu dostaniemy się do elementu, żeby go usunąć
            small.className = "invalid"; // nadajemy klasę - żeby był czerwony
            small.innerText = "Niepoprawny numer - dopuszczalna tylko dodatnia liczba"; // dodajemy tekst, który wyświetli się użytkownikowi

            // doczepiamy element jako "rodzeństwo" inputa
            input.parentElement.appendChild(small);
        }
    }

    // zwracamy wynik walidacji
    return valid;
}

function validateRadio(radio) {

        const valid = radio > 0;

        const input = document.querySelector("input[name='favouriteNumber']");

        if (valid) {

            input.className = "";

            const nameMessage = document.getElementById("favouriteNumber-input-message");
            if (nameMessage) {
                //jeśli wyświetla się komunikat - usuwamy go
                nameMessage.parentElement.removeChild(nameMessage);
            }
        } else {

            input.className = "invalid";

            // sprawdzamy, czy wyświetla się komunikat o błędzie
            if (!document.getElementById("favouriteNumber-input-message")) {
                // tworzymy element, który będzie mówił o błędzie
                const small = document.createElement("small");
                small.id = "favouriteNumber-input-message"; // nadajemy id -
                small.className = "invalid"; // nadajemy klasę - żeby był czerwony
                small.innerText = "Zaznacz jedną opcję"; // dodajemy tekst, który wyświetli się użytkownikowi

                // doczepiamy element jako "rodzeństwo" inputa
                input.parentElement.appendChild(small);
            }
        }

        // zwracamy wynik walidacji

        return valid;

}

function validatePassword(password) {
    // walidujemy hasło
        const valid = (password.length>7);

        // odszukujemy na stronie odpowiednie pole - input, w którym zostało wpisane hasło
        const input = document.querySelector("input[name='password']");

        if (valid) {
            // jeśli numer pasuje do wzorca - usuwamy ewentualne komunikaty walidacyjne, jeśli są

            // ustawiamy pustą klasę - w razie jakby input był wcześniej oznaczony na czerwono
            input.className = "";

            const nameMessage = document.getElementById("password-input-message");
            if (nameMessage) {
                //jeśli wyświetla się komunikat - usuwamy go
                nameMessage.parentElement.removeChild(nameMessage);
            }
        } else {

            // dodajemy inputowi klasę, która oznacza, że coś z nim nie tak
            input.className = "invalid";

            // sprawdzamy, czy wyświetla się komunikat o błędzie w polu z numerem
            if (!document.getElementById("password-input-message")) {
                // tworzymy element, który będzie mówił o błędzie w wybranym polu
                const small = document.createElement("small");
                small.id = "password-input-message"; // nadajemy id - potem dzięki niemu dostaniemy się do elementu, żeby go usunąć
                small.className = "invalid"; // nadajemy klasę - żeby był czerwony
                small.innerText = "Hasło powinno zawierać przynajmniej 8 znaków."; // dodajemy tekst, który wyświetli się użytkownikowi

                // doczepiamy element jako "rodzeństwo" inputa
                input.parentElement.appendChild(small);
            }
        }

        // zwracamy wynik walidacji
        return valid;
}

function validateRepeatedPassword(password, repeatedPassword) {

            const valid = (password == repeatedPassword);

            const input = document.querySelector("input[name='password2']");

            if (valid) {

                input.className = "";

                const nameMessage = document.getElementById("password2-input-message");
                if (nameMessage) {

                    nameMessage.parentElement.removeChild(nameMessage);
                }
            } else {

                input.className = "invalid";


                if (!document.getElementById("password2-input-message")) {

                    const small = document.createElement("small");
                    small.id = "password2-input-message";
                    small.className = "invalid";
                    small.innerText = "Hasła różnią się.";

                    input.parentElement.appendChild(small);
                }
            }

    return valid;
}
