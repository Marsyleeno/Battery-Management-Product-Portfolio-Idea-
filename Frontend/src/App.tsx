import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GameList from './GameList';
import GameForm from './GameForm';

export default function App() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [showInventory, setShowInventory] = useState(false);  
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'white' | 'onyx'>('white');

  // Sidebar Resize State
  const [inventoryWidth, setInventoryWidth] = useState(380);
  const [isResizing, setIsResizing] = useState(false);

  // Derived State: Calculates the sum of all confirmed products
  const totalPrice = inventory.reduce((sum, item) => {
    return item.isConfirmed ? sum + item.price : sum;
  }, 0);

  // Mouse Tracking Hook for Sidebar Resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = document.documentElement.clientWidth - e.clientX;
      if (newWidth > 320 && newWidth < 800) {
        setInventoryWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; 
    } else {
      document.body.style.userSelect = 'auto';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Global Theme Injector (Preserved your Onyx theme, but made White match ADI)
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme === 'onyx' ? 'dark' : 'light');
    document.body.style.backgroundColor = theme === 'onyx' ? '#353839' : '#ffffff';
    document.body.style.color = theme === 'onyx' ? '#e0e0e0' : '#333333';
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [theme]); 

  // Add Item to Cart
  const handleAddToCart = (product: any) => {
    const newCartItem = {
      ...product,
      cartId: Date.now().toString() + Math.random().toString(),
      isConfirmed: false
    };
    setInventory([...inventory, newCartItem]);
    setShowInventory(true);
  };

  // Confirm Purchase
  const handleConfirmPurchase = (cartId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.cartId === cartId ? { ...item, isConfirmed: true } : item
      )
    );
    setActiveItemId(null); 
  };

  // Cancel Order
  const handleCancelOrder = (cartId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInventory(prevInventory => prevInventory.filter(i => i.cartId !== cartId));
    setActiveItemId(null); 
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Official ADI Styled Navbar */}
      <nav 
        className="navbar navbar-expand-lg px-4 mb-4 shadow-sm" 
        style={{ 
          backgroundColor: theme === 'onyx' ? '#1c1e1f' : '#003B6F', // ADI Blue for light theme
          transition: 'background-color 0.3s' 
        }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold d-flex align-items-center text-white" to="/">
          <img 
            // Change the src line from "/adi-logo.png" to this:
            src={`${import.meta.env.BASE_URL}adi-logo.png`} 
            alt="Analog Devices Logo" 
            style={{ height: '28px', marginRight: '12px' }} 
          />
            Battery Monitors & Fuel Gauges
          </Link>
          
          <div className="d-flex align-items-center">
            {/* --- Neumorphic Theme Switch --- */}
            <div 
              onClick={() => setTheme(theme === 'white' ? 'onyx' : 'white')}
              className="me-4 position-relative d-flex align-items-center"
              style={{
                width: '80px',
                height: '32px',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                // The container gets the "inset" shadow to look carved out
                backgroundColor: theme === 'onyx' ? '#2c2e33' : '#e6e9ef',
                boxShadow: theme === 'onyx' 
                  ? 'inset 3px 3px 6px #1a1b1e, inset -3px -3px 6px #3e4148' 
                  : 'inset 3px 3px 6px #c8cbd1, inset -3px -3px 6px #ffffff',
                padding: '3px'
              }}
            >
              {/* Text label indicating current mode */}
              <span 
                className="position-absolute fw-bold" 
                style={{ 
                  right: theme === 'white' ? '10px' : 'auto', 
                  left: theme === 'onyx' ? '10px' : 'auto',
                  color: theme === 'onyx' ? '#6b7280' : '#9ca3af',
                  fontSize: '0.65rem',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease'
                }}
              >
                {theme === 'white' ? 'LIGHT' : 'DARK'}
              </span>

              {/* The movable slider knob */}
              <div 
                className="d-flex justify-content-center align-items-center position-relative z-1"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                  transform: theme === 'white' ? 'translateX(0)' : 'translateX(48px)',
                  // The knob gets outer shadow to look raised
                  backgroundColor: theme === 'onyx' ? '#353839' : '#f0f3f8',
                  boxShadow: theme === 'onyx'
                    ? '3px 3px 6px #1a1b1e, -3px -3px 6px #505556'
                    : '3px 3px 6px #c8cbd1, -3px -3px 6px #ffffff',
                }}
              >
                {/* The Icon inside the knob */}
                <i 
                  className={`bi ${theme === 'white' ? 'bi-brightness-high' : 'bi-moon-stars'}`}
                  style={{ 
                    color: theme === 'white' ? '#9ca3af' : '#a1a8b5',
                    fontSize: '0.9rem'
                  }}
                ></i>
              </div>
            </div>
            
            {/* Cart Button */}
            <button 
              className="btn btn-outline-light fs-5 px-3 py-1" 
              onClick={() => setShowInventory(true)}
            >
              <i className="bi bi-cart3 me-2"></i> eShop Cart
              {inventory.length > 0 && (
                <span className="badge bg-danger rounded-pill ms-2 fs-6 pb-1">
                  {inventory.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* The Dark Backdrop */}
      {showInventory && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1040 }}
          onClick={() => setShowInventory(false)}
        />
      )}

      {/* The Resizable Inventory Overlay */}
      {showInventory && (
        <div 
          className="position-fixed top-0 end-0 h-100 shadow-lg p-3" 
          style={{ 
            width: `${inventoryWidth}px`, 
            zIndex: 1050, 
            overflowY: 'auto',
            overflowX: 'hidden', 
            backgroundColor: theme === 'onyx' ? '#242628' : '#ffffff', 
            color: theme === 'onyx' ? '#c7d5e0' : '#333333',          
            borderLeft: theme === 'onyx' ? '1px solid #4a4d50' : '1px solid #dee2e6',
            transition: isResizing ? 'none' : 'background-color 0.3s ease' 
          }}
        >
          {/* The Draggable Resize Handle */}
          <div 
            className="position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center shadow-sm"
            style={{ 
              width: '20px', 
              height: '60px', 
              cursor: 'ew-resize', 
              backgroundColor: theme === 'onyx' ? '#4a4d50' : '#00549F', // ADI secondary blue
              color: '#fff',
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '6px',
              transform: 'translateX(-100%)', 
            }}
            onMouseDown={() => setIsResizing(true)}
          >
            <i className="bi bi-three-dots-vertical fs-6"></i>
          </div>

          <div className={`d-flex justify-content-between align-items-center mb-4 border-bottom pb-2 ${theme === 'onyx' ? 'border-secondary' : ''}`}>
            <div className="d-flex align-items-center">
              <h4 className="m-0 fw-bold me-3" style={{ color: theme === 'onyx' ? '#fff' : '#003B6F' }}>Shopping Cart</h4>
              <div className="bg-success text-white px-3 py-1 rounded-pill fw-bold fs-6 shadow-sm">
                ₱{totalPrice.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <button 
              onClick={() => setShowInventory(false)} 
              className={`btn btn-sm border-0 fs-5 ${theme === 'onyx' ? 'btn-outline-secondary text-white' : 'btn-outline-dark text-dark'}`}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Grid setup */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            {inventory.length === 0 ? (
              <div className="text-center mt-5 text-muted" style={{ gridColumn: 'span 2' }}>No item in cart</div>
            ) : (
              inventory.map((item) => (
                <div 
                  key={item.cartId} 
                  className="p-1 d-flex flex-column position-relative rounded shadow-sm" 
                  style={{ 
                    backgroundColor: theme === 'onyx' ? '#1c1e1f' : '#f8f9fa', 
                    border: item.isConfirmed 
                      ? '3px solid #198754' 
                      : (theme === 'onyx' ? '1px solid #456C8A' : '1px solid #dee2e6'),
                    cursor: 'pointer',
                    transition: 'border 0.2s ease'
                  }}
                  onClick={() => setActiveItemId(item.cartId)} 
                >
                  <img 
                    src={item.imageUrl || 'https://via.placeholder.com/100x140?text=No+Image'} 
                    alt={item.partNumber} 
                    className="w-100 object-fit-contain rounded-top bg-white" // ADI diagrams look best on white
                    style={{ height: '180px', opacity: activeItemId === item.cartId ? 0.2 : 1, transition: 'opacity 0.2s', padding: '5px' }}
                  />
                  {/* Fixed bug: Changed item.name to item.partNumber */}
                  <div className={`text-truncate text-center mt-2 mb-1 fw-semibold ${theme === 'onyx' ? 'text-info' : 'text-primary'}`} style={{ fontSize: '0.8rem' }}>
                    {item.partNumber}
                  </div>

                  {/* Visual 'OWNED' Badge */}
                  {item.isConfirmed && (
                    <div className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 m-1 rounded fw-bold" style={{ fontSize: '0.65rem' }}>
                      <i className="bi bi-check-circle-fill me-1"></i>
                      PURCHASED
                    </div>
                  )}

                  {/* Popup Menu */}
                  {activeItemId === item.cartId && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center rounded" style={{ backgroundColor: theme === 'onyx' ? 'rgba(36, 38, 40, 0.85)' : 'rgba(255, 255, 255, 0.85)' }}>
                      
                      {!item.isConfirmed && (
                        <button 
                          className="btn btn-success btn-sm mb-2 w-75 fw-bold shadow-sm py-2" 
                          style={{ fontSize: '0.75rem' }}
                          onClick={(e) => handleConfirmPurchase(item.cartId, e)}
                        >
                          CONFIRM
                        </button>
                      )}
                      
                      <button 
                        className="btn btn-danger btn-sm w-75 fw-bold shadow-sm py-2" 
                        style={{ fontSize: '0.75rem' }}
                        onClick={(e) => handleCancelOrder(item.cartId, e)} 
                      >
                        {item.isConfirmed ? 'REFUND & REMOVE' : 'REMOVE'}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      <Routes>
        <Route path="/" element={<GameList onAddToCart={handleAddToCart} />} />
        <Route path="/edit" element={<GameForm />} />
        <Route path="/edit/:id" element={<GameForm />} />
      </Routes>
    </BrowserRouter>
  );
}