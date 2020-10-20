const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-yaz');
const todoItemsList = document.querySelector('.todo-items');


let veri = [];

todoForm.addEventListener('submit', function(event) { //submit türü olan listeye inputtaki yazıyı ekler
  event.preventDefault();
  addTodo(todoInput.value.trim());
});

function addTodo(item) { //eklenen verinin bilgileri
  if (item !== '') {
    const todo = {
      id: Date.now(),
      isim: item,
      yapildi: false
    };

    veri.push(todo);
    addToLocalStorage(veri);

    todoInput.value = '';
  }
}

function renderVeri(veri) { // yazılan itemi aşağıya ekler
  todoItemsList.innerHTML = '';

  veri.forEach(function(item) {
    const kontrol = item.yapildi ? 'checked': null;
    const li = document.createElement('li');
    const hepsi = document.getElementById('hepsi');
    const aktif = document.getElementById('aktif');
    const yapildi = document.getElementById('yapildi');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.yapildi === true) {
      li.classList.add('checked');
      li.classList.remove('item');
    }

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${kontrol}>
      ${item.isim}
      <button class="sil-buton">X</button>
    `;
    todoItemsList.append(li);

    hepsi.innerHTML =
    "Hepsi: " + document.querySelectorAll("li").length;

    aktif.innerHTML =
    "Aktif: " + document.querySelectorAll(".item").length;

    yapildi.innerHTML =
    "Yapıldı: " + document.querySelectorAll(".checked").length;
  });

}

function addToLocalStorage(veri) { // veriyi local storageye yazdırır
  localStorage.setItem('veri', JSON.stringify(veri));
  renderVeri(veri);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('veri');
  if (reference) {
    veri = JSON.parse(reference);
    renderVeri(veri);
  }
}

function toggle(id) { // kutucuk işaretlediğinde local storage günceller
  veri.forEach(function(item) {
    if (item.id == id) {
      item.yapildi = !item.yapildi;
    }
  });

  addToLocalStorage(veri);
}

function deleteTodo(id) { //item silindiğinde local storage günceller
  veri = veri.filter(function(item) {
    return item.id != id;
  });
window.location.reload()
  addToLocalStorage(veri);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') { // kutucuk işaretlenince data key günceller
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.classList.contains('sil-buton')) { // silince data key günceller
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});


var temizleButon= document.querySelector(".temizle-buton"); //temizle tuşu
temizleButon.addEventListener('click', temizle, false); //temizle tuşu dinleme

function temizle(e) { //temizle butonu işlevi
	localStorage.clear();
	window.location.reload();
}