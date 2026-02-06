const API_URL = 'http://localhost:3000/phones';

async function fetchPhones() {
    try {
        const response = await fetch(API_URL);
        const phones = await response.json();
        displayPhones(phones);
        displayPhoneTable(phones);
    } catch (error) {
        console.error('Error fetching phones:', error);
    }
}

function displayPhones(phones) {
    const phonesGrid = document.getElementById('phonesGrid');
    phonesGrid.innerHTML = '';
    
    phones.forEach(phone => {
        const statusBadge = phone.status === 'Available' 
            ? '<span class="badge bg-success">Available</span>' 
            : '<span class="badge bg-danger">Sold Out</span>';
        
        let imageUrl;
        if (phone.brand === 'Xiaomi') {
            imageUrl = 'https://images.unsplash.com/photo-1624434207284-727cf0e6ea8e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
        } else {
            imageUrl = `https://images.unsplash.com/photo-${getPhoneImage(phone.brand)}?w=300&q=80`;
        }
        
        const phoneCard = `
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm h-100">
                    <div class="p-4 text-center" style="background: linear-gradient(135deg, #f8f9fa, #ffffff); height: 250px; display: flex; align-items: center; justify-content: center;">
                        <img src="${imageUrl}" alt="${phone.phoneName}" class="img-fluid" style="max-height: 200px; object-fit: contain;">
                    </div>
                    <div class="card-body">
                        <p class="text-uppercase fw-semibold mb-2" style="color: #ffafcc; font-size: 0.85rem;">${phone.brand}</p>
                        <h5 class="card-title fw-bold mb-3">${phone.phoneName}</h5>
                        <p class="fs-4 fw-bold mb-3">$${phone.price}</p>
                        ${statusBadge}
                    </div>
                </div>
            </div>
        `;
        phonesGrid.innerHTML += phoneCard;
    });
}

function getPhoneImage(brand) {
    const images = {
        'Apple': '1695048133142-1a20484d2569',
        'Samsung': '1610945415295-d9bbf067e59c',
        'Google': '1598327105666-5b89351aff97',
        'OnePlus': '1511707171634-5f897ff02aa9',
        'Xiaomi': '1624434207284-727cf0e6ea8e',
        'default': '1511707171634-5f897ff02aa9'
    };
    return images[brand] || images['default'];
}

function displayPhoneTable(phones) {
    const tableBody = document.getElementById('phonesTableBody');
    tableBody.innerHTML = '';
    
    phones.forEach(phone => {
        const statusBadge = phone.status === 'Available' 
            ? '<span class="badge bg-success">Available</span>' 
            : '<span class="badge bg-danger">Sold Out</span>';
        
        const row = `
            <tr>
                <td>${phone.id}</td>
                <td>${phone.phoneName}</td>
                <td>${phone.brand}</td>
                <td>$${phone.price}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-primary btn-sm me-1" onclick="editPhone(${phone.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deletePhone(${phone.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

async function editPhone(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const phone = await response.json();
        
        document.getElementById('phoneName').value = phone.phoneName;
        document.getElementById('brand').value = phone.brand;
        document.getElementById('price').value = phone.price;
        document.getElementById('status').value = phone.status;
        
        const form = document.getElementById('phoneForm');
        form.dataset.editId = id;
        
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Update Phone';
        
        document.querySelector('#admin').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching phone:', error);
        alert('Error loading phone data');
    }
}

document.getElementById('phoneForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const editId = form.dataset.editId;
    
    const phoneName = document.getElementById('phoneName').value;
    const brand = document.getElementById('brand').value;
    const price = parseFloat(document.getElementById('price').value);
    const status = document.getElementById('status').value;
    
    const phoneData = {
        phoneName,
        brand,
        price,
        status
    };
    
    try {
        let response;
        if (editId) {
            response = await fetch(`${API_URL}/${editId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(phoneData)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(phoneData)
            });
        }
        
        if (response.ok) {
            form.reset();
            delete form.dataset.editId;
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Add Phone';
            fetchPhones();
            alert(editId ? 'Phone updated successfully!' : 'Phone added successfully!');
        }
    } catch (error) {
        console.error('Error saving phone:', error);
        alert('Error saving phone');
    }
});

async function deletePhone(id) {
    if (!confirm('Are you sure you want to delete this phone?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchPhones();
            alert('Phone deleted successfully!');
        }
    } catch (error) {
        console.error('Error deleting phone:', error);
        alert('Error deleting phone');
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

fetchPhones();