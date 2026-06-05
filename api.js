// api.js - Service d'abstraction API
const API_URL = 'http://localhost:3000'

/**
 * Récupère tous les produits depuis le json-server
 */
export async function getProducts() {
  try {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok)
      throw new Error('Erreur lors de la récupération des produits')
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    return []
  }
}

/**
 * Récupère un produit par son ID depuis le json-server
 */
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`)
  return response.json()
}

/**
 * Ajoute un produit au panier via POST
 */
export async function addToCart(product) {
  try {
    const response = await fetch(`${API_URL}/cart`, {
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
 * Met à jour la quantité d'un produit dans le panier
 */
export async function updateCartItem(id, quantity) {
  return fetch(`${API_URL}/cart/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qty: quantity }),
  })
}

/**
 * Supprime un article du panier
 */
export async function removeFromCart(id) {
  await fetch(`${API_URL}/cart/${id}`, { method: 'DELETE' })
}

/**
 * Sauvegarde les données du profil utilisateur
 */
export async function saveUserProfile(profileData) {
  return fetch(`${API_URL}/userProfile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  })
}
