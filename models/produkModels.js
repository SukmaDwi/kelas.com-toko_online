const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'olshop'
});

exports.getAllProduk = (callback) => {
  const sql = 'SELECT * FROM produk';

  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error getting all products:', err);
      callback(err, null);
      return;
    }

    callback(null, results);
  });
};

exports.getProdukById = (id, callback) => {
  const sql = 'SELECT * FROM produk WHERE id = ?';

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error getting product by ID:', err);
      callback(err, null);
      return;
    }

    if (result.length === 0) {
      callback(null, null); // Product not found
    } else {
      callback(null, result[0]);
    }
  });
};

exports.createProduk = (data, callback) => {
  const { nama_produk, harga, stok } = data;
  const sql = 'INSERT INTO produk (nama_produk, harga, stok) VALUES (?, ?, ?)';

  pool.query(sql, [nama_produk, harga, stok], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      callback(err, null);
      return;
    }

    callback(null, result);
  });
};

exports.updateProduk = (id, data, callback) => {
  const { nama_produk, harga, stok } = data;
  const sql = 'UPDATE produk SET nama_produk = ?, harga = ?, stok = ? WHERE id = ?';

  pool.query(sql, [nama_produk, harga, stok, id], (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      callback(err, null);
      return;
    }

    if (result.affectedRows === 0) {
      callback(null, null); // Product not found
    } else {
      callback(null, result);
    }
  });
};

exports.deleteProduk = (id, callback) => {
  const sql = 'DELETE FROM produk WHERE id = ?';

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      callback(err, null);
      return;
    }

    if (result.affectedRows === 0) {
      callback(null, null); // Product not found
    } else {
      callback(null, result);
    }
  });
};