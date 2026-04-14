import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const API_URL = 'https://adi-product-portfolio-inventory-idea.onrender.com'; 
const CATEGORY_API_URL = '/api/categories'; 

interface Category {
  id: number;
  name: string;
}

export default function GameForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form state matching ADI Product DTOs
  const [partNumber, setPartNumber] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // 1. Fetch the ADI categories for the dropdown menu
    fetch(CATEGORY_API_URL)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (!id && data.length > 0) setCategoryId(data[0].id.toString()); 
      })
      .catch(err => console.error("Error fetching categories:", err));

    // 2. If editing, fetch the specific product's data to fill the form
    if (id) {
      fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
          setPartNumber(data.partNumber);
          setCategoryId(data.categoryId.toString());
          setPrice(data.price.toString());
          setReleaseDate(data.releaseDate);
          setImageUrl(data.imageUrl || '');
        })
        .catch(err => console.error("Error fetching product details:", err));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the payload matching the backend DTOs
    const productData = {
      partNumber,
      categoryId: parseInt(categoryId),
      price: parseFloat(price),
      releaseDate,
      imageUrl
    };

    const url = id ? `${API_URL}/${id}` : API_URL;
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        navigate('/'); 
      } else {
        const errorData = await response.json();
        console.error("Backend Validation Error:", errorData);
        alert("Failed to save! Press F12 and check the Console tab to see exactly what the backend rejected.");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("A network error occurred. Is your .NET backend running?");
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        {/* Added ADI styling: white background, light border, and soft shadow */}
        <div className="col-md-6 p-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #dee2e6', borderRadius: '8px' }}>
          
          <div className="d-flex align-items-center mb-4 pb-2 border-bottom">
             {/* Dynamic icon based on Create vs Edit */}
             <i className={`bi ${id ? 'bi-pencil-square' : 'bi-plus-circle'} fs-3 me-3`} style={{ color: '#00549F' }}></i>
             <h3 className="m-0 fw-bold" style={{ color: '#003B6F' }}>
               {id ? 'Edit Product Details' : 'Add New Product'}
             </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Part Number
              </label>
              <input 
                type="text" 
                className="form-control" 
                value={partNumber} 
                onChange={e => setPartNumber(e.target.value)} 
                required 
                placeholder="e.g. ADBMS2950B"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Category
              </label>
              <select 
                className="form-select" 
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Unit Price (₱)
              </label>
              <input 
                type="number" 
                step="0.01" 
                className="form-control" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                required 
                placeholder="0.00"
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Release Date
              </label>
              <input 
                type="date" 
                className="form-control" 
                value={releaseDate} 
                onChange={e => setReleaseDate(e.target.value)} 
                required 
              />
            </div>
            
            <div className="mb-5">
              <label className="form-label text-muted fw-bold" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Reference Image URL
              </label>
              <input 
                type="url" 
                className="form-control" 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
                placeholder="https://www.analog.com/..." 
              />
            </div>
            
            <div className="d-flex justify-content-end pt-3 border-top">
              <Link to="/" className="btn btn-outline-secondary me-3 px-4">Cancel</Link>
              {/* Primary button styled with ADI Blue */}
              <button type="submit" className="btn text-white px-5 fw-semibold" style={{ backgroundColor: '#00549F' }}>
                <i className="bi bi-floppy me-2"></i> Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}