export const createTable = (todos) => {
  //собираем саму таблицу
  const table = document.createElement("table");
  table.className = "modal__table";
  table.appendChild(createTableHeaders(todos[0]));
  for (const todo of todos) {
    table.appendChild(createTableCells(todo));
  }
  return table;
};


//создаем th для таблицы
function createTableHeaders(todo) {
  const headers = Object.keys(todo);
  const tr = document.createElement("tr");
  for (const header of headers) {
    const th = document.createElement("th");
    th.innerText = header;
    tr.appendChild(th);
  }
  return tr;
}
//создаем td для таблицы
function createTableCells(todo) {
  const headers = Object.keys(todo);
  const tr = document.createElement("tr");
  for (const header of headers) {
    const td = document.createElement("td");
    td.innerText = todo[header];
    tr.appendChild(td);
  }
  return tr;
}
