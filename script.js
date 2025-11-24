let form = document.getElementById('converterForm');
let amount = document.getElementById('amount');
let fromCurrency = document.getElementById('fromCurrency');
let convertedAmount = document.getElementById('convertedAmount');
let toCurrency = document.getElementById('toCurrency');
let loading = document.getElementById('loading');

// API 1 — ExchangeRate API
const API_URL = "https://v6.exchangerate-api.com/v6/7032b55bb405be5dbc403144/latest/";

async function convertMoney() {

    loading.style.display = 'block'; // Mostrar ícone de carregando

    try {

        // Faz a requisição só com a moeda de origem:
        const response = await fetch(API_URL + fromCurrency.value);

        if (!response.ok) {
            throw new Error("Erro ao acessar a API.");
        }

        const data = await response.json();

        // Pega a taxa da moeda destino
        const rate = data.conversion_rates[toCurrency.value];

        // Calcula o valor final
        const finalValue = amount.value * rate;

        // Exibe no input de resultado
        convertedAmount.value = finalValue.toFixed(2);

    } catch (error) {
        alert("Erro: " + error.message);
    } finally {
        loading.style.display = 'none'; // Esconde o carregamento
    }
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    convertMoney();
});
