function getResult() {


    const amount1 = document.getElementById("amount1").value;
    const amount2 = document.getElementById("amount2").value;

    axios.get("https://api.exchangerate.host/convert?from=" + amount1 +"&to" + amount2).then(response => {

        const result = response.data.text;
        document.getElementById("result").innerText = result;
    });
}
