export class Section {
  constructor({items, renderer}, containerSelector){
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this.addItem(this._renderer(item))
      /*Нужно исправить - Рендерер не должен заниматься размещением в секции. Вам нужно здесь только вызвать функцию рендерер с параметром - элементом массива.*/
      /*Ответ - не могу пока понять что не так. У меня размещением занимаеться addItem,
      производством элементов renderer, а renderItems просто переберает массив и косвено при переборе добовляються элементы в дом*/
    });
  }

  addItem(element) {
    this._container.append(element);
  }
}
