async function fetchMono() {
  try {
    const proxyUrl = "https://api.allorigins.win/raw?url=";
    const targetUrl = "https://api.monobank.ua/bank/currency";
    const res = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Дані Монобанку не є масивом");

    rateData.mono.UAH = 1;
    data.forEach(item => {
      if (item.currencyCodeA === 840 && item.currencyCodeB === 980) {
        rateData.mono.USD = item.rateSell;
      }
      if (item.currencyCodeA === 978 && item.currencyCodeB === 980) {
        rateData.mono.EUR = item.rateSell;
      }
    });

    updateConversion();
    updateTable();
  } catch (err) {
    console.error("Помилка Монобанку: ", err);
  }
}
