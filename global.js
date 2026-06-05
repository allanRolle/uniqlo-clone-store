// Base de données élargie - Prix en Euros (€)
const products = [
  // --- CATEGORIE: WOMEN ---
  {
    id: 1,
    name: 'Blue Top Elegant',
    category: 'Women',
    subcategory: 'Tops',
    brand: 'Polo',
    price: 15.0,
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400',
  },
  {
    id: 3,
    name: 'Sleeveless Dress Summer',
    category: 'Women',
    subcategory: 'Dress',
    brand: 'Zara',
    price: 45.0,
    img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
  },
  {
    id: 4,
    name: 'Stylish Evening Dress',
    category: 'Women',
    subcategory: 'Dress',
    brand: 'Madame',
    price: 89.99,
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
  },
  {
    id: 5,
    name: 'Winter Warm Top',
    category: 'Women',
    subcategory: 'Tops',
    brand: 'Mast & Harbour',
    price: 32.5,
    img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400',
  },
  {
    id: 8,
    name: 'Fancy Green Dress',
    category: 'Women',
    subcategory: 'Dress',
    brand: 'Zara',
    price: 59.9,
    img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
  },
  {
    id: 9,
    name: 'Casual Black Top',
    category: 'Women',
    subcategory: 'Tops',
    brand: 'H&M',
    price: 19.99,
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400',
  },

  // --- CATEGORIE: MEN ---
  {
    id: 2,
    name: 'Men Tshirt Classic',
    category: 'Men',
    subcategory: 'Tshirts',
    brand: 'H&M',
    price: 12.99,
    img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400',
  },
  {
    id: 7,
    name: 'Premium Polo Jacket',
    category: 'Men',
    subcategory: 'Tshirts',
    brand: 'Polo',
    price: 75.0,
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
  },
  {
    id: 10,
    name: 'Slim Fit Blue Jeans',
    category: 'Men',
    subcategory: 'Jeans',
    brand: 'Mast & Harbour',
    price: 42.0,
    img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
  },
  {
    id: 11,
    name: 'Casual White Shirt',
    category: 'Men',
    subcategory: 'Tshirts',
    brand: 'Zara',
    price: 29.99,
    img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
  },
  {
    id: 12,
    name: 'Dark Denim Jeans',
    category: 'Men',
    subcategory: 'Jeans',
    brand: 'Polo',
    price: 65.0,
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
  },

  // --- CATEGORIE: KIDS ---
  {
    id: 6,
    name: 'Summer White Dress',
    category: 'Kids',
    subcategory: 'Dress',
    brand: 'Babyhug',
    price: 24.5,
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
  },
  {
    id: 13,
    name: 'Kids Denim Overalls',
    category: 'Kids',
    subcategory: 'Dress',
    brand: 'Babyhug',
    price: 34.99,
    img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400',
  },
  {
    id: 14,
    name: 'Cotton Printed Tshirt',
    category: 'Kids',
    subcategory: 'Tshirts',
    brand: 'H&M',
    price: 9.99,
    img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400',
  },
]

// Gestion de la Session et du Panier
// DANS src/cart.html, remplace l'initialisation par celle-ci :
// Remplace ton ancienne déclaration par celle-ci :
// On tente de lire 'uniqlo_cart' (pour checkout) ou 'cart' (historique)
let cart =
  JSON.parse(localStorage.getItem('uniqlo_cart')) ||
  JSON.parse(localStorage.getItem('cart')) ||
  []
let currentUser = JSON.parse(localStorage.getItem('ae_session')) || null

// Rendu dynamique des produits sur la grille (Corrigé pour le symbole €)
function renderProducts(productsList) {
  const grid = document.getElementById('products-grid')
  if (!grid) return

  grid.innerHTML = '' // Vide le conteneur

  if (productsList.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-xs font-bold text-gray-400 uppercase tracking-wider text-center py-12">Aucun article disponible.</p>`
    return
  }

  productsList.forEach((product) => {
    const imageSource =
      product.img ||
      product.image ||
      product.imageUrl ||
      'https://via.placeholder.com/300x400'

    grid.innerHTML += `
            <div class="group relative space-y-3 cursor-pointer flex flex-col justify-between h-full">
                <div>
                    <div class="aspect-w-3 aspect-h-4 bg-gray-100 overflow-hidden rounded-sm">
                        <img src="${imageSource}" alt="${product.name}" class="w-full h-64 object-center object-cover group-hover:opacity-75 transition">
                    </div>
                    <div class="flex justify-between mx-1 mt-2">
                        <div>
                            <h3 class="text-xs font-bold uppercase tracking-wider text-gray-900">${product.name}</h3>
                            <p class="text-[11px] text-gray-500">${product.category || 'Collection'}</p>
                        </div>
                        <p class="text-xs font-black text-gray-900">${product.price} €</p>
                    </div>
                </div>
                <div class="pt-2 mx-1 border-t border-gray-100 mt-2">
                    <a href="product-detail.html?id=${product.id}" class="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black hover:underline inline-flex items-center gap-1 transition">
                        Voir le produit <i class="fa-solid fa-arrow-right text-[9px]"></i>
                    </a>
                </div>
            </div>
        `
  })
}

// Assure-toi que cette fonction est bien présente, orthographiée ainsi et au niveau global du fichier
function searchProducts() {
  const searchInput = document.getElementById('search-input')
  if (!searchInput) return

  const query = searchInput.value.trim()
  if (query !== '') {
    window.location.href = `search.html?query=${encodeURIComponent(query)}`
  }
}

function saveCart() {
  localStorage.setItem('ae_cart', JSON.stringify(cart))
  updateCartCounterGlobal()
}

function updateCartCounterGlobal() {
  const counter = document.getElementById('cart-count')
  if (counter)
    counter.innerText = cart.reduce((total, item) => total + item.qty, 0)
}

// L'ancienne fonction est conservée pour ne rien casser sur le catalogue !
// À remplacer au milieu de global_4.js
function addToCart(id) {
  // Ajout direct en taille M et couleur Noir par défaut depuis le catalogue
  addToCartWithSpecs(id, 1, 'M', 'Noir')
}

function logout() {
  localStorage.removeItem('ae_session')
  window.location.href = 'index.html'
}

function updateUserUI() {
  const status = document.getElementById('user-status')
  const logoutBtn = document.getElementById('nav-logout')
  const authNav = document.getElementById('nav-auth')
  if (!status || !logoutBtn || !authNav) return

  if (currentUser) {
    status.innerText = `Logged in as ${currentUser.name}`
    status.classList.remove('hidden')
    logoutBtn.classList.remove('hidden')
    authNav.classList.add('hidden')
  } else {
    status.classList.add('hidden')
    logoutBtn.classList.add('hidden')
    authNav.classList.remove('hidden')
  }
}

// Nouvelle fonction pour ajouter au panier avec une quantité spécifique (Fiche détail)
// À mettre à la place de l'ancienne fonction addToCartWithQty (en bas de global_4.js)
// 2. AJOUT AVEC SPÉCIFICATIONS CROISÉES (Fiche Détail)
function addToCartWithSpecs(productId, qty, size, color) {
  // 1. Récupère le panier existant ou crée un tableau vide
  let cart = JSON.parse(localStorage.getItem('uniqlo_cart')) || []

  // 2. Ajoute le nouveau produit
  cart.push({ id: productId, qty: qty, size: size, color: color })

  // 3. FORCE la sauvegarde dans la CLÉ utilisée par src/checkout.html
  localStorage.setItem('uniqlo_cart', JSON.stringify(cart))

  // 4. MISE À JOUR IMMÉDIATE DU HEADER
  const cartCountEl = document.getElementById('cart-count')
  if (cartCountEl) {
    // On calcule la somme des quantités de tous les objets dans le panier
    const totalItems = cart.reduce((sum, item) => sum + parseInt(item.qty), 0)
    cartCountEl.innerText = totalItems
  }
}

// Initialisation de la base de données des utilisateurs si elle n'existe pas
if (!localStorage.getItem('qa_users_db')) {
  localStorage.setItem('qa_users_db', JSON.stringify([]))
}

// Fonction pour enregistrer un nouvel utilisateur
function registerUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem('qa_users_db'))
  const userExists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  if (userExists) {
    return {
      success: false,
      message: 'Cette adresse email est déjà enregistrée.',
    }
  }
  users.push({ name, email: email.toLowerCase(), password })
  localStorage.setItem('qa_users_db', JSON.stringify(users))
  return { success: true, message: 'Compte créé avec succès !' }
}

// Fonction pour authentifier un utilisateur
function authenticateUser(email, password) {
  const users = JSON.parse(localStorage.getItem('qa_users_db'))
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )
  if (user) {
    localStorage.setItem('qa_user_logged', user.name)
    return { success: true, name: user.name }
  }
  return { success: false, message: 'Identifiants incorrects.' }
}

// ==========================================
// GESTION DYNAMIQUE DE L'AUTHENTIFICATION VISUELLE
// ==========================================

// scripts/global.js

// scripts/global.js

/**
 * Met à jour la barre de navigation selon l'état de connexion
 */
function updateNavbarAuth() {
  const authContainer = document.getElementById('auth-container')
  const userName = localStorage.getItem('user_name') // On récupère le nom stocké à la connexion

  if (!authContainer) return

  if (userName) {
    // Utilisateur connecté
    authContainer.innerHTML = `
      <div class="flex items-center space-x-4">
        <span class="text-sm font-bold text-gray-800">Bonjour, ${userName}</span>
        <button id="logout-btn" class="text-xs font-bold uppercase hover:text-red-600 transition underline">
          Déconnexion
        </button>
      </div>
    `

    // Attacher l'événement au bouton de déconnexion
    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('user_name') // Supprime la session
      window.location.reload() // Recharge la page pour réinitialiser l'affichage
    })
  } else {
    // Utilisateur non connecté
    authContainer.innerHTML = `
      <a href="signup.html" class="text-xs font-bold uppercase hover:text-red-600 transition">
        Connexion / Inscription
      </a>
    `
  }
}

// Assurez-vous d'appeler cette fonction dans votre fonction initApp() existante
function initApp() {
  injectGlobalHeader() // Votre fonction existante qui crée le DOM du header
  updateNavbarAuth() // On met à jour l'affichage de l'authentification

  // ... reste de votre code (panier, etc.)
  const storedCart = JSON.parse(localStorage.getItem('uniqlo_cart')) || []
  const cartCountEl = document.getElementById('cart-count')
  if (cartCountEl) {
    const totalItems = storedCart.reduce((sum, item) => sum + item.qty, 0)
    cartCountEl.innerText = totalItems
  }
}

// Fonction de déconnexion globale avec boîte de choix (OK / Annuler)
function logout() {
  const userChoice = confirm('Êtes-vous sûr de vouloir vous déconnecter ?')

  if (userChoice) {
    localStorage.removeItem('qa_user_logged')
    localStorage.removeItem('userProfile')

    alert('Vous avez été déconnecté avec succès.')
    window.location.href = 'index.html'
  } else {
    console.log("Déconnexion annulée par l'utilisateur.")
  }
}

// Lancement automatique au chargement de chaque page
document.addEventListener('DOMContentLoaded', () => {
  updateNavbarAuth()

  // Optionnel : synchronisation automatique du badge compteur du panier si l'élément existe
  const cartCountEl = document.getElementById('cart-count')
  if (cartCountEl && typeof cart !== 'undefined') {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
    cartCountEl.innerText = totalItems
  }
})

// Fonction pour injecter le Header Uniqlo sur toutes les pages
// ==========================================
// 1. INJECTION DU HEADER GLOBAL ET RESPONSIVE
// ==========================================
// ==========================================
// 1. INJECTION DU HEADER GLOBAL ET RESPONSIVE
// ==========================================
function injectGlobalHeader() {
  const headerContainer = document.getElementById('global-header')
  if (!headerContainer) return

  headerContainer.innerHTML = `
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="bg-black text-white text-[10px] tracking-widest text-center py-1.5 font-bold uppercase">
        Livraison standard gratuite dès 60 € d'achat
      </div>

      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <div class="flex items-center gap-4">
          <button id="mobile-menu-btn" class="block md:hidden text-gray-800 hover:text-red-600 text-lg p-1 focus:outline-none" aria-label="Ouvrir le menu">
            <i class="fa-solid fa-bars"></i>
          </button>
          
         <a href="index.html" class="flex items-center">
            <div class="border-2 border-black px-2 py-1 bg-white group-hover:bg-black transition-colors">
                <span class="font-black text-xl tracking-tighter text-black group-hover:text-white uppercase">QA<span class="text-red-600">LO</span></span>
            </div>
        </a>
        </div>

        <nav class="hidden md:flex items-center space-x-8 text-xs font-black uppercase tracking-widest">
          <a href="products.html" class="hover:text-red-600 transition">Tous les produits</a>
          <a href="products.html?cat=women" class="hover:text-red-600 transition">Femme</a>
          <a href="products.html?cat=men" class="hover:text-red-600 transition">Homme</a>
          <a href="products.html?cat=kids" class="hover:text-red-600 transition">Enfant</a>
        </nav>

        <div class="flex items-center space-x-5 text-sm">
          <a id="nav-login-link" href="signup.html" class="hover:text-red-600 transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
            <i class="fa-solid fa-user text-base"></i>
            <span class="hidden sm:inline">Connexion</span>
          </a>

          <a href="cart.html" class="hover:text-red-600 transition relative py-1">
            <i class="fa-solid fa-bag-shopping text-lg"></i>
            <span id="cart-count" class="absolute -top-1 -right-2 bg-red-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </a>
        </div>
      </div>
    </header>

    <div id="mobile-sidebar" class="fixed inset-0 z-50 bg-black bg-opacity-50 opacity-0 pointer-events-none transition-opacity duration-300 md:hidden">
      <div id="mobile-sidebar-panel" class="w-72 bg-white h-full shadow-2xl p-6 transform -translate-x-full transition-transform duration-300 flex flex-col justify-between">
        
        <div>
          <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <span class="text-sm font-black uppercase tracking-widest text-gray-400">Navigation</span>
            <button id="mobile-menu-close" class="text-gray-500 hover:text-black p-1 text-lg">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div id="mobile-auth-status" class="mb-6 p-3 bg-gray-50 border border-gray-100 rounded-sm text-xs font-bold uppercase tracking-wider">
             </div>

          <nav class="flex flex-col space-y-4 text-sm font-black uppercase tracking-widest">
            <a href="products.html" class="py-2 border-b border-gray-50 hover:text-red-600 transition flex justify-between items-center">
              <span>Tous les produits</span> <i class="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
            </a>
            <a href="products.html?cat=women" class="py-2 border-b border-gray-50 hover:text-red-600 transition flex justify-between items-center">
              <span>Femme</span> <i class="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
            </a>
            <a href="products.html?cat=men" class="py-2 border-b border-gray-50 hover:text-red-600 transition flex justify-between items-center">
              <span>Homme</span> <i class="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
            </a>
            <a href="products.html?cat=kids" class="py-2 border-b border-gray-50 hover:text-red-600 transition flex justify-between items-center">
              <span>Enfant</span> <i class="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
            </a>
          </nav>
        </div>

        <div class="space-y-4">
          <div id="mobile-logout-container" class="hidden">
             <button onclick="logoutUser()" class="w-full border border-red-200 text-red-600 text-center text-xs font-black uppercase tracking-widest py-2 hover:bg-red-50 transition">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion
             </button>
          </div>
          <div class="pt-4 border-t border-gray-100 text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
            © QAQLO STYLE 2026
          </div>
        </div>

      </div>
    </div>
  `

  setupMobileMenuEvents()
}

// ==========================================
// MISE À JOUR DYNAMIQUE DE L'AUTHENTIFICATION (PC + MOBILE)
// ==========================================
function updateNavbarAuth() {
  const isUserLogged = localStorage.getItem('qa_user_logged')

  // Éléments du menu ordinateur / barre principale
  const loginLinkEl = document.getElementById('nav-login-link')

  // Éléments du menu mobile (tiroir)
  const mobileAuthStatus = document.getElementById('mobile-auth-status')
  const mobileLogoutContainer = document.getElementById(
    'mobile-logout-container'
  )

  if (isUserLogged) {
    // ---- MODIFICATIONS LOGIQUE BARRE PRINCIPALE (PC) ----
    if (loginLinkEl) {
      loginLinkEl.innerHTML = `
        <span class="text-gray-900 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 ml-4">
          <i class="fa-solid fa-user text-sm"></i> 
          <span class="hidden md:inline">Hello, ${isUserLogged}</span>
        </span>
        <a href="orders-history.html" class="hidden md:inline ml-3 text-[9px] text-gray-500 hover:text-black hover:underline normal-case font-medium"><i class="fa-solid fa-box text-[8px]"></i> Mes commandes</a>
        <button onclick="logoutUser()" class="hidden md:inline ml-2 text-[9px] text-red-500 hover:underline normal-case font-normal">(Déconnexion)</button>
      `
      loginLinkEl.href = 'account-information.html'
    }

    // ---- MODIFICATIONS LOGIQUE TIROIR MOBILE (VOTRE CODE INTÉGRÉ) ----
    if (mobileAuthStatus) {
      mobileAuthStatus.innerHTML = `
        <div class="flex items-center gap-2 text-gray-900">
           <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span>Connecté : <span class="text-red-600 font-black">${isUserLogged}</span></span>
        </div>
        <div class="mt-2 space-y-1">
           <a href="account-information.html" class="block text-[10px] text-gray-400 underline normal-case font-normal">Gérer mon profil</a>
           <a href="orders-history.html" class="block text-[10px] text-red-500 underline normal-case font-bold"><i class="fa-solid fa-box"></i> Consulter mes commandes</a>
        </div>
      `
    }
    if (mobileLogoutContainer) {
      mobileLogoutContainer.classList.remove('hidden')
    }
  } else {
    // ---- ÉTAT PAR DÉFAUT (NON CONNECTÉ) ----
    if (loginLinkEl) {
      loginLinkEl.className =
        'hover:text-red-600 transition flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider ml-4'
      loginLinkEl.innerHTML = `<i class="fa-solid fa-user text-base"></i> <span class="hidden sm:inline">Connexion</span>`
      loginLinkEl.href = 'signup.html'
    }
    if (mobileAuthStatus) {
      mobileAuthStatus.innerHTML = `
        <a href="signup.html" class="flex items-center justify-between text-gray-800 hover:text-red-600 transition">
           <span>Se connecter / S'inscrire</span>
           <i class="fa-solid fa-arrow-right-to-bracket text-gray-400"></i>
        </a>
      `
    }
    if (mobileLogoutContainer) {
      mobileLogoutContainer.classList.add('hidden')
    }
  }
}

// Fonction globale pour déconnecter proprement l'utilisateur
function logoutUser() {
  localStorage.removeItem('qa_user_logged')
  alert('Vous avez été déconnecté avec succès.')
  window.location.href = 'products.html'
}

// ==========================================
// 3. LOGIQUE JAVASCRIPT DU MENU RESPONSIVE
// ==========================================
function setupMobileMenuEvents() {
  const burgerBtn = document.getElementById('mobile-menu-btn')
  const closeBtn = document.getElementById('mobile-menu-close')
  const sidebar = document.getElementById('mobile-sidebar')
  const sidebarPanel = document.getElementById('mobile-sidebar-panel')

  if (!burgerBtn || !sidebar || !sidebarPanel) return

  // Fonction pour ouvrir le menu
  function openMenu() {
    sidebar.classList.remove('opacity-0', 'pointer-events-none')
    sidebar.classList.add('opacity-100', 'pointer-events-auto')
    sidebarPanel.classList.remove('-translate-x-full')
    sidebarPanel.classList.add('translate-x-0')
    document.body.style.overflow = 'hidden' // Empêche le défilement en arrière-plan
  }

  // Fonction pour fermer le menu
  function closeMenu() {
    sidebar.classList.remove('opacity-100', 'pointer-events-auto')
    sidebar.classList.add('opacity-0', 'pointer-events-none')
    sidebarPanel.classList.remove('translate-x-0')
    sidebarPanel.classList.add('-translate-x-full')
    document.body.style.overflow = '' // Rétablit le défilement
  }

  // Clics sur les boutons
  burgerBtn.addEventListener('click', openMenu)
  if (closeBtn) closeBtn.addEventListener('click', closeMenu)

  // Fermer si l'utilisateur clique sur la zone d'ombre grise extérieure
  sidebar.addEventListener('click', (e) => {
    if (e.target === sidebar) {
      closeMenu()
    }
  })
}

// 1. Gestion des ouvertures / fermetures du menu latéral (Accordéon)
function toggleAccordion(menuId) {
  const menu = document.getElementById(menuId)
  if (!menu) return
  menu.classList.toggle('hidden')
}

// Double sécurité de chargement pour s'assurer que les éléments existent
// DANS scripts/global.js, dans la fonction initApp() :
function initApp() {
  injectGlobalHeader()
  updateNavbarAuth()

  // Initialisation sécurisée du panier depuis le stockage
  const storedCart = JSON.parse(localStorage.getItem('uniqlo_cart')) || []

  const cartCountEl = document.getElementById('cart-count')
  if (cartCountEl) {
    const totalItems = storedCart.reduce((sum, item) => sum + item.qty, 0)
    cartCountEl.innerText = totalItems
  }
}

// Fonction appelée pour réinitialiser les filtres de catégorie
function resetFilters() {
  console.log('Réinitialisation des filtres de catégorie...')

  // Si on a un paramètre dans l'URL (ex: ?cat=enfant), on redirige vers la page propre
  if (window.location.search !== '') {
    window.location.href = 'products.html'
    return
  }

  // Sinon, on se contente de réafficher tout le catalogue
  if (typeof products !== 'undefined' && typeof renderProducts === 'function') {
    const pageTitleEl =
      document.querySelector('h1') ||
      document.getElementById('products-page-title')
    if (pageTitleEl) pageTitleEl.innerText = 'TOUS LES PRODUITS'
    renderProducts(products)
  }
}

// AJOUTE CECI DANS scripts/global.js
function saveCartToLocalStorage(cartArray) {
  localStorage.setItem('uniqlo_cart', JSON.stringify(cartArray))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp)
} else {
  initApp()
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounterGlobal()
  updateUserUI()
})
