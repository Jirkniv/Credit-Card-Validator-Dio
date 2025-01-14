function Verificar(event) {
    event.preventDefault(); // Prevent form submission
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const resultDiv = document.getElementById('result');
    const bandHeader = document.getElementById('band');
    
    const validationResult = isValidCardNumber(cardNumber);
    if (!validationResult.isValid) {
        resultDiv.innerHTML = `<p>${validationResult.message}</p>`;
        resultDiv.style.backgroundImage = 'none';
        bandHeader.innerHTML = 'Bandeiras';
        return;
    }

    const cardType = getCardType(cardNumber);

    if (cardType) {
        resultDiv.innerHTML = `<p></p>`;
        resultDiv.style.backgroundImage = `url('Imagens/Card${cardType}.png')`;
        bandHeader.innerHTML = cardType;
    } else {
        resultDiv.innerHTML = `<p>Bandeira não reconhecida.</p>`;
        resultDiv.style.backgroundImage = 'none';
        bandHeader.innerHTML = 'Bandeiras';
    }
}

function isValidCardNumber(number) {
    if (!/^\d{13,19}$/.test(number)) {
        return { isValid: false, message: 'O número do cartão deve conter entre 13 e 19 dígitos.' };
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    if (sum % 10 !== 0) {
        return { isValid: false, message: 'O número do cartão é inválido. Verifique se digitou corretamente.' };
    }

    return { isValid: true, message: '' };
}

function getCardType(number) {
    const cardPatterns = {
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
        hiper: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        aura: /^50([0-9]{2})(\d{12})$/,
        voyager: /^8699([0-9]{11})$/,
        enroute:/^2(?:149|014)[0-9]{11}$/
    };

    for (const [card, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(number)) {
            return card.charAt(0).toUpperCase() + card.slice(1);
        }
    }

    return null;
}

document.getElementById('form').addEventListener('submit', Verificar);