(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=function(){function t(e,n,r,o,i,a,c){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._cardElement=document.querySelector("#".concat(n.nameIdTemplateCard)).content.querySelector(".".concat(n.nameClassCardElement)).cloneNode(!0),this._cardImg=this._cardElement.querySelector(".".concat(n.nameClassCardImg)),this._cardTitle=this._cardElement.querySelector(".".concat(n.nameClassCardTitle)),this._cardButtonDelete=this._cardElement.querySelector(".".concat(n.nameClassCardButtonDelete)),this._cardButtonLike=this._cardElement.querySelector(".".concat(n.nameClassCardButtonLike)),this._cardLikeNumber=this._cardElement.querySelector(".".concat(n.nameClassLikeNumber)),this._nameClassCardButtonLikeAction=n.nameClassCardButtonLikeAction,this._nameClassCardButtonDeleteAction=n.nameClassCardButtonDeleteAction,this._idUser=c,this._name=e.name,this._link=e.link,this._alt="Фотография ".concat(e.name),this._likeNumber=e.likes.length,this._idCard=e._id,this._idOwnerCard=e.owner._id,this._isMyLike=1===e.likes.filter((function(e){return e._id===s._idUser})).length,this._openPopupCardView=r,this._openPopupCardDelete=o,this._callBackAddLike=i,this._callBackDeleteLike=a}var n,r;return n=t,(r=[{key:"_fillCardElement",value:function(){this._cardImg.src=this._link,this._cardImg.alt=this._alt,this._cardTitle.textContent=this._name,this._updateLikeNumber(),this._idUser===this._idOwnerCard?this._cardButtonDelete.classList.add(this._nameClassCardButtonDeleteAction):this._cardButtonDelete.classList.remove(this._nameClassCardButtonDeleteAction),this._toggleLike()}},{key:"_openPopup",value:function(){this._openPopupCardView(this._name,this._link,this._alt)}},{key:"_deleteElement",value:function(){this._cardElement.remove()}},{key:"_toggleLike",value:function(){this._isMyLike?this._cardButtonLike.classList.add(this._nameClassCardButtonLikeAction):this._cardButtonLike.classList.remove(this._nameClassCardButtonLikeAction)}},{key:"_updateLikeNumber",value:function(){this._cardLikeNumber.textContent=this._likeNumber}},{key:"_updateCard",value:function(e){var t=this;this._likeNumber=e.likes.length,this._isMyLike=1===e.likes.filter((function(e){return e._id===t._idUser})).length,this._fillCardElement()}},{key:"_addEventListener",value:function(){var e=this;this._cardImg.addEventListener("click",(function(){e._openPopup()})),this._cardButtonDelete.addEventListener("click",(function(){e._openPopupCardDelete((function(){e._deleteElement()}),e._idCard)})),this._cardButtonLike.addEventListener("click",(function(){e._isMyLike?e._callBackDeleteLike(e._idCard,(function(t){e._updateCard(t)})):e._callBackAddLike(e._idCard,(function(t){e._updateCard(t)}))}))}},{key:"setCardElement",value:function(){return this._fillCardElement(),this._addEventListener(),this._cardElement}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}(),n={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_disabled",inputErrorClass:"form__input_type_error",errorClass:"form__error_visible"},r={nameIdTemplateCard:"template-card",nameClassCardElement:"element",nameClassCardImg:"element__img",nameClassCardTitle:"element__title",nameClassCardButtonLike:"element__like",nameClassCardButtonDelete:"element__delete",nameClassCardButtonLikeAction:"element__like_action",nameClassInsertForCard:"places__elements",nameClassLikeNumber:"element__like-number",nameClassCardButtonDeleteAction:"element__delete-action"},o="popup_opened",i="popup-edit-profile",a="popup-add-card",c="popup-edit-avatar";function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupElement=document.querySelector(t),this._buttonXElement=this._popupElement.querySelector(".".concat("popup__button-x")),this._handleEscCloseBind=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupElement.classList.toggle(o),document.addEventListener("keydown",this._handleEscCloseBind)}},{key:"close",value:function(){this._popupElement.classList.toggle(o),document.removeEventListener("keydown",this._handleEscCloseBind)}},{key:"setEventListeners",value:function(){this._buttonXElement.addEventListener("click",this.close.bind(this)),this._popupElement.addEventListener("click",this._handleOverlayClose.bind(this))}},{key:"_handleEscClose",value:function(e){this._popupElement.classList.contains("popup_opened")&&"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){this._popupElement&&this._popupElement===e.target&&this.close()}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(){return p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=h(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},p.apply(this,arguments)}function h(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=y(e)););return e}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function _(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}var m=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=y(r);if(o){var n=y(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return _(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._cardImg=t._popupElement.querySelector(".".concat("element-view__img")),t._cardTitle=t._popupElement.querySelector(".".concat("element-view__title")),t}return t=a,(n=[{key:"open",value:function(e,t,n){this._cardImg.src=t,this._cardImg.alt=n,this._cardTitle.textContent=e,p(y(a.prototype),"open",this).call(this)}}])&&f(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(l);function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function k(){return k="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=g(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},k.apply(this,arguments)}function g(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=w(e)););return e}function E(e,t){return E=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},E(e,t)}function C(e,t){if(t&&("object"===b(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function w(e){return w=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},w(e)}var O=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=w(r);if(o){var n=w(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return C(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._form=r._popupElement.querySelector("form"),r._submitButton=r._popupElement.querySelector(".".concat("form__button")),r._inputList=r._form.querySelectorAll(".form__input"),r._textSubmitButton=r._submitButton.textContent,r._callbackSubmit=t,r._callbackOpen=n,r}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.id]=t.value})),this._formValues}},{key:"setInputValues",value:function(e){this._inputList.forEach((function(t){t.value=e[t.name]}))}},{key:"setEventListeners",value:function(){var e=this;this._form.addEventListener("submit",(function(t){t.preventDefault(),e._submitButton.textContent="Сохранение...",e._callbackSubmit(e._getInputValues(),(function(){e.close(),e._submitButton.textContent=e._textSubmitButton}))})),k(w(a.prototype),"setEventListeners",this).call(this)}},{key:"open",value:function(){this._callbackOpen&&this._callbackOpen(),k(w(a.prototype),"open",this).call(this)}},{key:"close",value:function(){this._form.reset(),k(w(a.prototype),"close",this).call(this)}}])&&v(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(l);function L(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var j=function(){function e(t){var n=t.nameSelector,r=t.jobSelector,o=t.imgAvatar;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameElement=document.querySelector(n),this._jobElement=document.querySelector(r),this._imgAvatar=document.querySelector(o)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}},{key:"setUserInfo",value:function(e){var t=e.name,n=e.job,r=e.url,o=e.idUser;this._nameElement.textContent=t,this._jobElement.textContent=n,this._idUser=o,this.setImgAvatar(r)}},{key:"setImgAvatar",value:function(e){this._imgAvatar.src=e}},{key:"getIdUser",value:function(){return this._idUser}}])&&L(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._arg=t,this._formElement=n.querySelector(t.formSelector),this._inputList=Array.from(this._formElement.querySelectorAll(this._arg.inputSelector)),this._buttonElement=this._formElement.querySelector(this._arg.submitButtonSelector)}var t,n;return t=e,(n=[{key:"resetValidation",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)})),this._toggleButtonState()}},{key:"_showInputError",value:function(e){var t=e.nextElementSibling;e.classList.add(this._arg.inputErrorClass),t.textContent=e.validationMessage,t.classList.add(this._arg.errorClass)}},{key:"_hideInputError",value:function(e){var t=e.nextElementSibling;e.classList.remove(this._arg.inputErrorClass),t.classList.remove(this._arg.errorClass),t.textContent=""}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput(this._inputList)?(this._buttonElement.classList.contains(this._arg.inactiveButtonClass)||this._toggleButtonClassInactive(),this._buttonElement.hasAttribute("disabled")||this._toggleButtonAttributeDisabled()):(this._buttonElement.classList.contains(this._arg.inactiveButtonClass)&&this._toggleButtonClassInactive(),this._buttonElement.hasAttribute("disabled")&&this._toggleButtonAttributeDisabled())}},{key:"_toggleButtonAttributeDisabled",value:function(){this._buttonElement.toggleAttribute("disabled")}},{key:"_toggleButtonClassInactive",value:function(){this._buttonElement.classList.toggle(this._arg.inactiveButtonClass)}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._formElement.addEventListener("submit",(function(e){e.preventDefault()})),this._setEventListeners()}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function B(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var I=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"renderItems",value:function(e){var t=this;e.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(e){this._container.prepend(e)}}])&&B(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function R(e){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R(e)}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function A(){return A="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=T(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},A.apply(this,arguments)}function T(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}function q(e,t){return q=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},q(e,t)}function U(e,t){if(t&&("object"===R(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var V=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&q(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return U(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._button=t._popupElement.querySelector(".".concat("form__button")),t}return t=a,(n=[{key:"setEventListeners",value:function(){var e=this;this._button.addEventListener("click",(function(t){t.preventDefault(),e._button.textContent="Удаление...",e._callbackCardDelete((function(){A(x(a.prototype),"close",e).call(e),e._button.textContent="Да"}))})),A(x(a.prototype),"setEventListeners",this).call(this)}},{key:"open",value:function(e){this._callbackCardDelete=e,A(x(a.prototype),"open",this).call(this)}}])&&D(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(l);function N(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function M(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?N(Object(n),!0).forEach((function(t){J(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function H(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var X=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._baseUrl=t.baseUrl,this._headers=t.headers}var t,n;return t=e,(n=[{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then(this._checkResponse)}},{key:"getProfile",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then(this._checkResponse)}},{key:"editProfile",value:function(e){var t=e.name,n=e.about;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:M(M({},this._headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({name:String(t),about:String(n)})}).then(this._checkResponse)}},{key:"addNewCard",value:function(e){var t=e.name,n=e.link;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:M(M({},this._headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({name:String(t),link:String(n)})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"addLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"deleteLike",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e,"/likes"),{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"editAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:M(M({},this._headers),{},{"Content-Type":"application/json"}),body:JSON.stringify({avatar:String(e)})}).then(this._checkResponse)}},{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}}])&&H(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),z=new P(n,document.querySelector("#".concat(a))),F=new P(n,document.querySelector("#".concat(i))),G=new P(n,document.querySelector("#".concat(c))),K=document.querySelector(".".concat("profile__add-button")),Q=document.querySelector(".".concat("profile__edit-button")),W=document.querySelector(".".concat("profile__edit-avatar-button")),Y=new X({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-39",headers:{authorization:"1a6dfae6-e589-4ac5-b4e8-0d2fd3606062"}}),Z=function(e){console.log(e)};Promise.all([Y.getProfile(),Y.getInitialCards()]).then((function(e){ee.setUserInfo({name:e[0].name,job:e[0].about,url:e[0].avatar,idUser:e[0]._id});var t=e[1].map((function(e){return e}));te.renderItems(t)})).catch(Z),z.enableValidation(),F.enableValidation(),G.enableValidation();var $=new V("#".concat("popup-card-delete"));$.setEventListeners();var ee=new j({nameSelector:".".concat("profile__name"),jobSelector:".".concat("profile__job"),imgAvatar:".".concat("profile__avatar")}),te=new I({renderer:function(e){te.addItem(ae(e))}},".places__elements"),ne=new m("#".concat("popup-card-view"));ne.setEventListeners();var re=new O("#".concat(a),(function(e,t){Y.addNewCard({name:e.cardName,link:e.cardLink}).then((function(e){var n=ae(e);te.addItem(n),t()})).catch(Z)}));re.setEventListeners();var oe=new O("#".concat(i),(function(e,t){Y.editProfile({name:e.profileName,about:e.profileJob}).then((function(e){ee.setUserInfo({name:e.name,job:e.about,url:e.avatar,idUser:e._id}),t()})).catch(Z)}),(function(){var e=ee.getUserInfo(),t=e.name,n=e.job;oe.setInputValues({name:t,job:n})}));oe.setEventListeners();var ie=new O("#".concat(c),(function(e,t){Y.editAvatar(e.avatarLink).then((function(e){ee.setImgAvatar(e.avatar),t()})).catch(Z)}));function ae(e){return new t(e,r,(function(e,t,n){ne.open(e,t,n)}),(function(e,t){$.open((function(n){Y.deleteCard(t).then((function(){e(),n()})).catch(Z)}))}),(function(e,t){Y.addLike(e).then((function(e){t(e)})).catch(Z)}),(function(e,t){Y.deleteLike(e).then((function(e){t(e)})).catch(Z)}),ee.getIdUser()).setCardElement()}ie.setEventListeners(),K.addEventListener("click",(function(){z.resetValidation(),re.open()})),Q.addEventListener("click",(function(){F.resetValidation(),oe.open()})),W.addEventListener("click",(function(){G.resetValidation(),ie.open()}))})();