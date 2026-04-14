import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://adi-product-portfolio-inventory-idea.onrender.com'; 

interface Product {
  id: number;
  partNumber: string;
  categoryName: string;
  price: number;
  releaseDate: string;
  imageUrl?: string;
}

export default function GameList({ onAddToCart }: { onAddToCart: (product: any) => void }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => fetchProducts());
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        {/* Updated Button to ADI Blue */}
        <Link to="/edit" className="btn text-white px-4 py-2 shadow-sm" style={{ backgroundColor: '#00549F', borderRadius: '4px' }}>
          <i className="bi bi-plus-lg me-2"></i>New Product
        </Link>
      </div>
      
      {/* Removed table-striped and table-dark, added borders to match ADI */}
      <div className="table-responsive shadow-sm rounded" style={{ border: '1px solid #dee2e6' }}>
        
        {/* ADDED: 'text-nowrap' class prevents the text from wrapping and breaking into multiple lines */}
        <table className="table align-middle text-center mb-0 text-nowrap" style={{ borderCollapse: 'collapse', backgroundColor: '#FFFFFF' }}>
          <thead style={{ borderBottom: '2px solid #dee2e6' }}>
            <tr>
              {/* ADDED: minWidth to each column. This guarantees the columns hold their shape on portrait monitors! */}
              <th className="py-3 fw-semibold border-0" style={{ backgroundColor: '#5C6670', color: '#FFFFFF', minWidth: '220px' }}>Model</th>
              <th className="py-3 fw-semibold border-0" style={{ backgroundColor: '#5C6670', color: '#FFFFFF', minWidth: '180px' }}>Category</th>
              <th className="py-3 fw-semibold border-0" style={{ backgroundColor: '#5C6670', color: '#FFFFFF', minWidth: '130px' }}>Price</th>
              <th className="py-3 fw-semibold border-0" style={{ backgroundColor: '#5C6670', color: '#FFFFFF', minWidth: '130px' }}>Release Date</th>
              <th className="border-0" style={{ backgroundColor: '#5C6670', width: '80px', minWidth: '80px' }}></th>
              <th className="border-0" style={{ backgroundColor: '#5C6670', width: '120px', minWidth: '120px' }}></th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-muted py-5 fs-5">No item in inventory</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td className="py-3">
                    {/* Dark Blue text for Part Number */}
                    <div className="fw-bold mb-2" style={{ color: '#003B6F', fontSize: '1.1rem' }}>
                      {product.partNumber}
                    </div>
                    <img 
                      src={product.imageUrl || 'https://via.placeholder.com/100x140?text=No+Image'} 
                      alt={`${product.partNumber} diagram`} 
                      className="rounded border bg-white shadow-sm"
                      style={{ width: '100px', height: '100px', objectFit: 'contain', padding: '5px' }}
                    />
                  </td>
                  <td className="py-3 text-secondary fw-medium">{product.categoryName}</td>
                  <td className="py-3 fw-bold text-success">
                    ₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-secondary">{product.releaseDate}</td>
                  <td className="py-3">
                    <button 
                      onClick={() => onAddToCart(product)} 
                      className="btn btn-sm text-white shadow-sm"
                      style={{ backgroundColor: '#00549F' }}
                      title="Add to eShop Cart"
                    >
                      <i className="bi bi-cart-plus"></i>
                    </button>
                  </td>
                  <td className="py-3">
                    <Link to={`/edit/${product.id}`} className="btn btn-outline-secondary btn-sm me-2 shadow-sm">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="btn btn-outline-danger btn-sm shadow-sm">
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}