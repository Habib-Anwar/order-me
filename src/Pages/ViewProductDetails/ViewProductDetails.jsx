import React, { useEffect, useState } from 'react'

export const ViewProductDetails = () => {

  const [showExtraInputs, setShowExtraInputs] = useState(false);

  const handleMainOptionChange = () => {
    setShowExtraInputs(true);
  };

    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
  return (
    <div>
    <label>
      <input
        type="radio"
        onChange={handleMainOptionChange}
        name="mainOption"
      />
      Apple
    </label>
    {showExtraInputs && (
      <div>
        <label>
          <input type="radio" name="extraOption" />
          Other Choice 1
        </label>
        <label>
          <input type="radio" name="extraOption" />
          Other Choice 2
        </label>
      </div>
    )}
  </div>
  )
}
