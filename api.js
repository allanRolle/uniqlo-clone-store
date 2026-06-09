// api.js - Service d'abstraction API
// On utilise API_BASE_URL pour gérer la bascule entre local et production
const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://uniqlo-clone-store-7.onrender.com'

export async function registerUser(userData) {
  try {
    // 1. Récupérer tous les utilisateurs pour vérifier l'unicité
    const existingUsersResponse = await fetch(`${API_BASE_URL}/users`)
    const users = await existingUsersResponse.json()

    // 2. Vérifier si l'email existe déjà
    const userExists = users.find((user) => user.email === userData.email)

    if (userExists) {
      alert('Cet email est déjà utilisé par un autre compte.')
      return null
    }

    // 3. Si l'email est libre, on procède à l'inscription
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })

    if (!response.ok) throw new Error('Erreur lors de la création du compte')
    return await response.json()
  } catch (error) {
    console.error('Registration Error:', error)
    return null
  }
}

/**
 * Vérifie les identifiants utilisateur
 */
export async function authenticateUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)
    const users = await response.json()

    // On cherche l'utilisateur qui correspond à l'email ET au mot de passe
    const user = users.find((u) => u.email === email && u.password === password)

    if (user) {
      return { success: true, name: user.name }
    } else {
      return { success: false, message: 'Email ou mot de passe incorrect.' }
    }
  } catch (error) {
    console.error('Login Error:', error)
    return { success: false, message: 'Erreur de connexion au serveur.' }
  }
}

/**
 * Récupère tous les produits
 */
export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des produits')
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    return []
  }
}

/**
 * Récupère un produit unique par son ID
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
  }
}

/**
 * Ajoute un produit au panier
 */
export async function addToCart(product) {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, quantity: 1 }),
    })
    return await response.json()
  } catch (error) {
    console.error('Error adding to cart:', error)
  }
}

/**
 * Met à jour la quantité d'un article dans le panier
 */
export async function updateCartItem(id, quantity) {
  try {
    return await fetch(`${API_BASE_URL}/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty: quantity }),
    })
  } catch (error) {
    console.error('Error updating cart:', error)
  }
}

/**
 * Supprime un article du panier
 */
export async function removeFromCart(id) {
  try {
    await fetch(`${API_BASE_URL}/cart/${id}`, { method: 'DELETE' })
  } catch (error) {
    console.error('Error removing from cart:', error)
  }
}

/**
 * Sauvegarde/Met à jour le profil utilisateur
 */
export async function saveUserProfile(profileData) {
  try {
    const response = await fetch(`${API_BASE_URL}/userProfile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    })
    return await response.json()
  } catch (error) {
    console.error('Error saving profile:', error)
  }
}

/**
 * Récupère l'historique des commandes
 */
export async function getOrders() {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}

/**
 * Enregistre une nouvelle commande
 */
export async function saveOrder(orderData) {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    })
    return await response.json()
  } catch (error) {
    console.error('Error saving order:', error)
  }
}
