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

export const sortByNameAZ = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return xd;
};

export const sortByNameZA = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return b.name.localeCompare(a.name);
  });

  return xd;
};

export const sortBySurnameAZ = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return a.surname.localeCompare(b.surname);
  });

  return xd;
};

export const sortBySurnameZA = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return b.surname.localeCompare(a.surname);
  });

  return xd;
};

export const sortByOccAZ = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return a.occupation.localeCompare(b.occupation);
  });

  return xd;
};

export const sortByOccZA = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return b.occupation.localeCompare(a.occupation);
  });

  return xd;
};

export const sortByEmailAZ = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return a.email.localeCompare(b.email);
  });

  return xd;
};

export const sortByEmailZA = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => {
    return b.email.localeCompare(a.email);
  });

  return xd;
};

export const sortBySalaryAZ = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => a.salary - b.salary);

  return xd;
};

export const sortBySalaryZA = (value) => {
  let xd = [...value];
  xd = xd.sort((a, b) => b.salary - a.salary);
  return xd;
};
