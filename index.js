let currencyLeft = document.querySelector(".currency").childNodes;
currencyLeft.forEach((currencyLeft) => {
  currencyLeft.addEventListener("click", (e) => {
    let active = document.querySelector(".currency .active");
    active.classList.remove("active");
    e.target.classList.add("active");
  });
});

let currencyRight = document.querySelector(".currency_1").childNodes;
currencyRight.forEach((currencyRight) => {
  currencyRight.addEventListener("click", (e) => {
    let active2 = document.querySelector(".currency_1 .active");
    active2.classList.remove("active");
    e.target.classList.add("active");
  });
});

document.querySelector(".arrows").onclick = () => {
  let activeLeft = document.querySelector(".currency .active").getAttribute('data-id');
  let activeRight = document.querySelector(".currency_1 .active").getAttribute('data-id');
  const selectRightValue = document.querySelector(".currency_1 select").value;
  const selectLeftValue = document.querySelector(".currency select").value;
  if (activeLeft == activeRight && selectRightValue == selectLeftValue) return;

  if(activeRight == 5){
    document.querySelector(`.currency [data-id="${activeRight}"]`).value = selectRightValue;
  }
  if(activeLeft == 5){
    document.querySelector(`.currency_1 [data-id="${activeLeft}"]`).value = selectLeftValue;
  }

  document.querySelector(".currency .active").classList.remove("active");;
  document.querySelector(`.currency [data-id="${activeRight}"]`).classList.add('active');


  document.querySelector(".currency_1 .active").classList.remove("active");
  document.querySelector(`.currency_1 [data-id="${activeLeft}"]`).classList.add('active');
  currencyChange();
};

document.querySelectorAll(".currency_value").forEach(item => item.onclick = currencyChange);
document.querySelectorAll(".currency-value").forEach(item => item.onchange = currencyChange);



let timeout;

document.querySelector(".count").oninput = () => {
  clearTimeout(timeout);
  
  timeout = setTimeout(()=>{
    currencyChange();
    }, 1000);
};

function currencyChange() {
  console.log("fetch");
  let from;
  let to;
  let activeLeft = document.querySelector(".currency .active").getAttribute('data-id');
  let activeRight = document.querySelector(".currency_1 .active").getAttribute('data-id');

  if(activeLeft == 5){
    from = document.querySelector(".currency .active").value;
  }else{
    from = document.querySelector(".currency .active").textContent;
  }

  if(activeRight == 5){
    to = document.querySelector(".currency_1 .active").value;
  }else{
    to = document.querySelector(".currency_1 .active").textContent;
  }

  let input = document.querySelector(".count").value;
  if (input == "") return;

  let myHeaders = new Headers();
  myHeaders.append("apikey", "zu5w2qLZG6u75cwaL8um06NQje3ZbxX9");
  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  const loading = document.querySelector(".backdrop");
  loading.style.display = "block";
  fetch(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${input}`,
    requestOptions
  )
    .then((response) => {
      loading.style.display = "none";
      return response.text();
    })
    .then((result) => {
      let obj = JSON.parse(result);
      document.querySelector(".out").textContent = obj.result;
      document.querySelector(
        ".rate"
      ).textContent = `1 ${from} = ${obj.info.rate}`;
      document.querySelector(
        ".rate1"
      ).textContent = `1 ${to} = ${obj.info.rate}`;
    });
}
