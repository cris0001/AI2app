export const checkName = (value) => {
  const reg =
    /^([A-Z][a-zA-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/;
  if (!value.match(reg)) {
    alert("Podaj poprawne imie");
  } else return true;
};

export const checkSurname = (value) => {
  const reg =
    /^([A-Z][a-zA-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/;
  if (!value.match(reg)) {
    alert("Podaj poprawne nazwisko");
  } else return true;
};

export const checkOccupation = (value) => {
  if (value.length < 3) {
    alert("Podaj poprawne stanowisko");
  } else return true;
};
export const checkEmail = (value) => {
  const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!value.match(reg)) {
    alert("Wprowadź poprawny adres email");
  } else return true;
};
