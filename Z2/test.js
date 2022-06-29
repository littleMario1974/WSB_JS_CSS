function getFact() {


    const animalType = document.getElementById("animalType").value;
    const number = document.getElementById("number").value;


    axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=" + animalType + "&amount=" + number).then(response => {
        response.data.forEach(d => console.log(d.text));
        const fact = response.data.text;
        document.getElementById("fact").innerText = fact;
    });
}