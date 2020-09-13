import * as SORT_OPTIONS from './sort-options'

export default {
  [SORT_OPTIONS.CREATION_DATE_ASC]: (todo1, todo2) => {
    return todo1.id - todo2.id;
  },

  [SORT_OPTIONS.CREATION_DATE_DESC]: (todo1, todo2) => {
    return todo2.id - todo1.id;
  },

  [SORT_OPTIONS.RECORDS_ASC]: (todo1, todo2) => {
    return todo1.text.localeCompare(todo2.text);
  },

  [SORT_OPTIONS.RECORDS_DESC]: (todo1, todo2) => {
    return todo2.text.localeCompare(todo1.text);
  },

  [SORT_OPTIONS.DUE_DATE_ASC]: (todo1, todo2) => {
    return todo1.dueDate - todo2.dueDate;
  },

  [SORT_OPTIONS.DUE_DATE_DESC]: (todo1, todo2) => {
    return todo2.dueDate - todo1.dueDate;
  },

}
