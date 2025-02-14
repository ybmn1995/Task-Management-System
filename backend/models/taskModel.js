const db = require('../db/db');

const Task = {
  getAll: (callback) => {
    db.all('SELECT * FROM tasks', [], callback);
  },

  getById: (id, callback) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [id], callback);
  },

  create: (title, description, callback) => {
    db.run(
      `INSERT INTO tasks (title, description, completed, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
      [title, description || null, 0],
      function (err) {
        callback(err, { id: this.lastID });
      }
    );
  },

  update: (id, title, description, completed, callback) => {
    db.run(
      `UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?`,
      [title || null, description || null, completed, id],
      function (err) {
        callback(err, this.changes);
      }
    );
  },

  delete: (id, callback) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, id, function (err) {
      callback(err, this.changes);
    });
  },
};

module.exports = Task;
