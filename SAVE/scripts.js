document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const addProductBtn = document.getElementById('addProductBtn');
    const addProductModal = document.getElementById('addProductModal');
    const closeBtn = document.querySelector('.close');
    const addProductForm = document.getElementById('addProductForm');

    // Sample product data (replace with actual data from a backend)
    let products = [
        { id: 1, name: 'TV', price: 500, location: 'New York', photo: 'TV.webp' },
        { id: 2, name: 'Mobile Phone', price: 300, location: 'Los Angeles', photo: 'goa.jpg' }
    ];
    
    // Function to display products
    function displayProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = `
                <div class="product-item" style="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 2px 6px 2px ;padding-left:5%;padding-right:5%";padding-top:100px">
                <div>
                    <img src="${product.photo}" alt="${product.name}" height=150px width=150px>
                 </div>
                    <h3>${product.name}</h3>
                    <p>Price: $${product.price}</p>
                    <p>Location: ${product.location}</p>
                </div>
            `;
            productList.innerHTML += productItem;
        });
    }

    // Show add product modal
    addProductBtn.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    // Handle form submission
    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productLocation = document.getElementById('productLocation').value;
        const productPhotoInput = document.getElementById('productPhoto');

        // Validate form fields
        if (productName && !isNaN(productPrice) && productPrice > 0 && productLocation && productPhotoInput.files.length > 0) {
            const productPhotoFile = productPhotoInput.files[0];
            const photoUrl = `${productPhotoFile.name}`;

            const newProduct = {
                id: products.length + 1,
                name: productName,
                price: productPrice,
                location: productLocation,
                photo: productPhotoFile.name
            };

            // Upload photo (for demonstration, you can implement file upload logic on the server)
            // For now, we assume there's an 'images' folder where photos are stored locally
            const reader = new FileReader();
            reader.onload = () => {
                // Save the product to the list and display products
                products.push(newProduct);
                displayProducts();
                addProductModal.style.display = 'none';
                addProductForm.reset();
            };
            reader.readAsDataURL(productPhotoFile);
        } else {
            alert('Please fill out all fields with valid data and upload a photo.');
        }
    });

    // Initial display of products
    displayProducts();
});

