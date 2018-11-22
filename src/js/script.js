const chooseItem = function(e) {
  /*when an item is clicked, update the original select box,
  and the selected item:*/
  var y, i, k, s, h;
  s = this.parentNode.parentNode.getElementsByTagName("select")[0];
  h = this.parentNode.previousSibling;
  for (i = 0; i < s.length; i++) {
    if (s.options[i].innerHTML == this.innerHTML) {
      s.selectedIndex = i;
      h.innerHTML = this.innerHTML;
      y = this.parentNode.getElementsByClassName("same-as-selected");
      for (k = 0; k < y.length; k++) {
        y[k].removeAttribute("class");
      }
      this.setAttribute("class", "same-as-selected");
      break;
    }
  }
  h.click();
};
const closeAllSelect = function(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
const toggleCustomSelect = function(e) {
  /*when the select box is clicked, close any other select boxes,
  and open/close the current select box:*/
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
};

/*look for any elements with the class "custom-select":*/
const customSelects = document.getElementsByClassName("custom-select");
for (let i = 0; i < customSelects.length; i++) {
  let selectEl = customSelects[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  let newSelect = document.createElement("DIV");
  newSelect.setAttribute("class", "select-selected");
  newSelect.innerHTML = selectEl.options[selectEl.selectedIndex].innerHTML;
  customSelects[i].appendChild(newSelect);
  /*for each element, create a new DIV that will contain the option list:*/
  let optionContainer = document.createElement("DIV");
  optionContainer.setAttribute("class", "select-items select-hide");
  for (let j = 1; j < selectEl.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    const optionItem = document.createElement("DIV");
    optionItem.innerHTML = selectEl.options[j].innerHTML;
    optionItem.addEventListener("click", chooseItem)
    optionContainer.appendChild(optionItem);
  }
  customSelects[i].appendChild(optionContainer);
  newSelect.addEventListener("click", toggleCustomSelect); 
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

let select = document.querySelector('select');
select.addEventListener('change', () => { console.log('New value is' + select.value) });