function getData() {

    fetch("https://api.myjson.com/bins/zyv02")
    
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(function(json) {
      data = json
      bookArray = data.books;    
      runAll(bookArray);
    })
    .catch(function(error) {
      console.log("Request denied " + error.message)
    })
  }
  
  getData();
  
  function runAll() {
    getAll(bookArray) 
  }

    /*BOOKS*/  
function getAll(bookArray) {
  let cardsGroup = document.getElementById("cards-section");
  bookArray.forEach(book => {
    let card = `<div class="flip-card">
                  <div class="flip-card-inner">
                    <div id="frontcard" class="flip-card-front">
                      <img class="image-fluid frontcard-image" src="${book.cover}" alt="book cover">
                    </div>
                    <div id="backcard" class="flip-card-back">
                      <div class="header">
                        <h2 class="cardtitle">${book.title}</h2>
                      </div>
                      <div class="body">
                        <p class="cardtext">${book.description}</p>
                      </div>
                      <div class="footer">
                        <button type="button" id="${book.detail}" class="btn btn-info" data-toggle="modal" href="#detailModal" onclick="activate(this.id)">More Info</button>  
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal" id="detailModal">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div> 
                      <div class="modal-body">
                        <img id="modalImage" class="detail" src="" alt="book detail">
                      </div>
                    </div> 
                  </div>
                </div>`;
    cardsGroup.innerHTML += card;
  })
}
    /*MODAL*/
function activate(id) {
  let image = document.getElementById("modalImage")
  image.src = id;
  let getModal = document.getElementById("detailModal");
  getModal.style.display = "block";
}

    /*SEARCH*/
function searchArray() {
  document.getElementById("search-input").addEventListener("keyup", () => searchAll());
}
searchArray();

function searchAll() {
  for (i=0; i< bookArray.length; i++) {
    let input, innercard, card, title, description;
    input = document.getElementById("search-input").value.toUpperCase();
    title = document.getElementsByClassName("cardtitle")[i].outerText.toUpperCase();
    description = document.getElementsByClassName("cardtext")[i].outerText.toUpperCase();
    innercard = title + " " + description;
    card = document.getElementsByClassName("flip-card")[i];
        if(innercard.includes(input) === true) {
         card.style.display = "block";
        } else {
          card.style.display = "none";
        }
  }
}


