const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// Créer le dossier public s'il n'existe pas
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(publicDir));
app.use(express.static(__dirname));

// Contenu HTML pour la page d'accueil
const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulateur Mini Programme Clarins</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Noto Sans SC', sans-serif;
        }
        
        body {
            background-color: #f5f5f5;
        }
        
        .wechat-container {
            width: 100%;
            max-width: 414px;
            height: 100vh;
            margin: 0 auto;
            background-color: white;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .clarins-header {
            height: 50px;
            background-color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            border-bottom: 1px solid #e5e5e5;
        }
        
        .clarins-logo {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .clarins-logo img {
            height: 30px;
        }
        
        .search-icon, .menu-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .wechat-header {
            height: 44px;
            background-color: #f8f8f8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            border-bottom: 1px solid #e5e5e5;
        }
        
        .wechat-time {
            font-size: 14px;
            font-weight: 500;
        }
        
        .wechat-status {
            display: flex;
            align-items: center;
        }
        
        .wechat-status span {
            margin-left: 5px;
        }
        
        .wechat-content {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
        
        .category-menu {
            width: 90px;
            background-color: #f5f5f5;
            overflow-y: auto;
            border-right: 1px solid #e5e5e5;
        }
        
        .category-item {
            padding: 15px 10px;
            text-align: center;
            font-size: 14px;
            border-bottom: 1px solid #e5e5e5;
            position: relative;
        }
        
        .category-item.active {
            background-color: #c00a27;
            color: white;
            border-radius: 0 20px 20px 0;
        }
        
        .product-grid {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            background-color: #fff1f0;
        }
        
        .product-row {
            display: flex;
            margin-bottom: 10px;
        }
        
        .product-card {
            flex: 1;
            margin: 5px;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .product-image {
            width: 100%;
            height: 120px;
            object-fit: cover;
        }
        
        .product-info {
            padding: 10px;
        }
        
        .product-title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
            position: relative;
        }
        
        .product-price {
            font-size: 14px;
            color: #c00a27;
            font-weight: 700;
        }
        
        .wechat-tabbar {
            height: 50px;
            background-color: #f8f8f8;
            display: flex;
            border-top: 1px solid #e5e5e5;
        }
        
        .tab-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #888;
            font-size: 12px;
        }
        
        .tab-item.active {
            color: #c00a27;
        }
        
        .tab-icon {
            margin-bottom: 3px;
        }
        
        .tab-label {
            font-size: 10px;
        }
        
        .header-icons {
            display: flex;
            align-items: center;
        }
        
        .toast {
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
            pointer-events: none;
        }
        
        .toast.show {
            opacity: 1;
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }
        
        .modal-overlay.show {
            opacity: 1;
            pointer-events: auto;
        }
        
        .modal {
            background-color: white;
            border-radius: 12px;
            width: 80%;
            max-width: 300px;
            padding: 20px;
            text-align: center;
        }
        
        .modal-title {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
        }
        
        .modal-content {
            font-size: 14px;
            margin-bottom: 20px;
            color: #666;
        }
        
        .modal-button {
            background-color: #c00a27;
            color: white;
            border: none;
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 14px;
            cursor: pointer;
        }
        
        /* Styles pour les infobulles */
        .product-title:hover::after {
            content: attr(title);
            position: absolute;
            background: #FFF7D1;
            color: #333;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            border: 1px solid #FFE58F;
        }
        
        /* Style pour l'écran de scan */
        .scan-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
        }
        
        .scan-title {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 20px;
        }
        
        .scan-image {
            width: 80%;
            max-width: 250px;
            margin-bottom: 20px;
        }
        
        .scan-button {
            background-color: #1aad19;
            color: white;
            border: none;
            padding: 10px 30px;
            border-radius: 30px;
            font-size: 16px;
            margin-top: 20px;
            cursor: pointer;
        }
        
        .tab-item[onclick*="scan"] .tab-icon svg {
            width: 26px;
            height: 26px;
        }

        .tab-item[onclick*="scan"].active .tab-icon {
            color: #C00A27;
        }

        .tab-item[onclick*="scan"]:not(.active) .tab-icon {
            color: #666;
        }

        .tab-item[onclick*="scan"].active::before {
            background-color: rgba(192, 10, 39, 0.1);
            width: 42px;
            height: 42px;
        }
    </style>
</head>
<body>
    <div class="wechat-container">
        <div class="clarins-header">
            <div class="clarins-logo">
                <img src="/Logo.jpg" alt="Clarins Logo">
            </div>
            <div class="header-icons">
                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <div class="menu-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </div>
            </div>
        </div>
        <div class="wechat-header">
            <div class="wechat-time">16:03</div>
            <div class="wechat-status">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                    </svg>
                </span>
            </div>
        </div>
        
        <div class="wechat-content">
            <div class="category-menu">
                <div class="category-item active" title="Produits Recommandés">星品推荐</div>
                <div class="category-item" title="Cadeaux">送礼专区</div>
                <div class="category-item" title="Besoins de la Peau">肌肤需求</div>
                <div class="category-item" title="Soins du Visage">面部护理</div>
                <div class="category-item" title="Soins du Corps">身体护理</div>
                <div class="category-item" title="Maquillage">安心彩妆</div>
                <div class="category-item" title="Soins Homme">男士护肤</div>
                <div class="category-item" title="Nouveautés">新品日历</div>
                <div class="category-item" title="Tous les Produits">全部</div>
            </div>
            
            <div class="product-grid">
                <div class="product-row">
                    <div class="product-card">
                        <img src="/double_serum.jpg" alt="Double Serum" class="product-image">
                        <div class="product-info">
                            <div class="product-title" title="Double Serum">双萃精华露</div>
                            <div class="product-price">¥ 890</div>
                        </div>
                    </div>
                    <div class="product-card">
                        <img src="/double_serum_eye.jpg" alt="Double Serum Eye" class="product-image">
                        <div class="product-info">
                            <div class="product-title" title="Double Serum Eye">双萃精华眼霜</div>
                            <div class="product-price">¥ 690</div>
                        </div>
                    </div>
                </div>
                <div class="product-row">
                    <div class="product-card">
                        <img src="/multi-intensive.jpg" alt="Multi-Intensive" class="product-image">
                        <div class="product-info">
                            <div class="product-title" title="Multi-Intensive">赋活紧致系列</div>
                            <div class="product-price">¥ 790</div>
                        </div>
                    </div>
                    <div class="product-card">
                        <img src="/hydra.jpg" alt="Hydra-Essentiel" class="product-image">
                        <div class="product-info">
                            <div class="product-title" title="Hydra-Essentiel">水润奇肌系列</div>
                            <div class="product-price">¥ 490</div>
                        </div>
                    </div>
                </div>
                <div class="product-row">
                    <div class="product-card">
                        <img src="/precious.jpg" alt="Precious" class="product-image">
                        <div class="product-info">
                            <div class="product-title" title="Precious">金纯系列</div>
                            <div class="product-price">¥ 1290</div>
                        </div>
                    </div>
                    <div class="product-card">
                        <img src="/double_serum.jpg" alt="Double Serum" class="product-image">
                        <div class="product-info">
                            <div class="product-title" title="Double Serum">双萃精华露</div>
                            <div class="product-price">¥ 890</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="wechat-tabbar">
            <div class="tab-item active" onclick="changeTab(this, 'home')" title="Accueil">
                <div class="tab-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    </svg>
                </div>
                <div class="tab-label">首页</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'scan')" title="Scanner">
                <div class="tab-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <!-- Carrés de positionnement -->
                        <path d="
                            M2,2 h8 v8 h-8 Z
                            M14,2 h8 v8 h-8 Z
                            M2,14 h8 v8 h-8 Z
                        "/>
                        <path fill="white" d="
                            M4,4 h4 v4 h-4 Z
                            M16,4 h4 v4 h-4 Z
                            M4,16 h4 v4 h-4 Z
                            
                            M5.5,5.5 h1 v1 h-1 Z
                            M17.5,5.5 h1 v1 h-1 Z
                            M5.5,17.5 h1 v1 h-1 Z
                        "/>
                        
                        <!-- Points du QR code -->
                        <path d="
                            M11,3 h2 v2 h-2 Z
                            M11,7 h2 v2 h-2 Z
                            M7,11 h2 v2 h-2 Z
                            M11,11 h2 v2 h-2 Z
                            
                            M15,7 h2 v2 h-2 Z
                            M19,7 h2 v2 h-2 Z
                            M15,11 h2 v2 h-2 Z
                            M19,11 h2 v2 h-2 Z
                            
                            M11,15 h2 v2 h-2 Z
                            M7,19 h2 v2 h-2 Z
                            M11,19 h2 v2 h-2 Z
                            
                            M15,15 h2 v2 h-2 Z
                            M19,15 h2 v2 h-2 Z
                            M15,19 h2 v2 h-2 Z
                        "/>
                    </svg>
                </div>
                <div class="tab-label">扫一扫</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'cart')" title="Panier">
                <div class="tab-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <div class="tab-label">购物车</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'profile')" title="Profil">
                <div class="tab-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="tab-label">我的</div>
            </div>
        </div>
    </div>
    
    <div class="toast" id="toast"></div>
    
    <div class="modal-overlay" id="modal-overlay">
        <div class="modal">
            <div class="modal-title">提示</div>
            <div class="modal-content" id="modal-content"></div>
            <button class="modal-button" onclick="closeModal()">确定</button>
        </div>
    </div>
    
    <script>
        // Fonction pour afficher un toast
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
        
        // Fonction pour afficher une modal
        function showModal(message) {
            const modalContent = document.getElementById('modal-content');
            const modalOverlay = document.getElementById('modal-overlay');
            
            modalContent.textContent = message;
            modalOverlay.classList.add('show');
        }
        
        // Fonction pour afficher le QR code d'authentification
        function authenticateProduct() {
            const modalContent = document.getElementById('modal-content');
            const modalOverlay = document.getElementById('modal-overlay');
            
            modalContent.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">' +
                '<img src="/qrcode4.png" alt="QR Code Authentification" style="width: 200px; height: auto; margin: 10px 0;">' +
                '<p style="margin-top: 10px; font-size: 14px;">扫描二维码验证产品真伪</p>' +
            '</div>';
            
            modalOverlay.classList.add('show');
        }
        
        // Fonction pour fermer la modal
        function closeModal() {
            const modalOverlay = document.getElementById('modal-overlay');
            modalOverlay.classList.remove('show');
            
            // Afficher l'icône "produit authentifié" en chinois
            const authenticationStatus = document.getElementById('authenticationStatus');
            if (authenticationStatus) {
                authenticationStatus.style.display = 'block';
            }
        }
        
        // Fonction pour changer d'onglet
        const changeTab = function(element, tabName) {
            // Mettre à jour les classes des onglets
            document.querySelectorAll('.tab-item').forEach(tab => {
                tab.classList.remove('active');
            });
            element.classList.add('active');
            
            if (tabName === 'scan') {
                // Afficher l'écran de scan QR code en remplaçant seulement le contenu principal (product-grid)
                const productGrid = document.querySelector('.product-grid');
                if (productGrid) {
                    productGrid.innerHTML = 
                        '<div class="scan-screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px; text-align: center; position: relative;">' +
                            '<img id="qrCodeImage" src="/qrcode2.png" alt="QR Code" style="width: 200px; height: auto; position: absolute; top: calc(50% - 38px); left: calc(50% - 10px); transform: translate(-50%, -50%);">' +
                            '<div id="scanButton" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #fff; background-color: #0c6e8a; box-shadow: 0 0 0 2px #0c6e8a; display: flex; justify-content: center; align-items: center; color: white; font-size: 18px; position: absolute; bottom: 80px; left: calc(50% - 10px); transform: translateX(-50%); cursor: pointer;">扫描</div>' +
                        '</div>';
                    
                    // Ajouter l'écouteur d'événement après avoir inséré le HTML
                    setTimeout(() => {
                        const scanButton = document.getElementById('scanButton');
                        if (scanButton) {
                            let scanCount = 0;
                            scanButton.addEventListener('click', function() {
                                const qrCodeImage = document.getElementById('qrCodeImage');
                                scanCount++;
                                
                                if (scanCount === 1) {
                                    // Premier clic : changer l'image en qrcode3.png
                                    if (qrCodeImage) {
                                        qrCodeImage.src = '/qrcode3.png';
                                    }
                                } else if (scanCount >= 2) {
                                    // Deuxième clic : afficher la page produit
                                    const productGrid = document.querySelector('.product-grid');
                                    if (productGrid) {
                                        productGrid.innerHTML = 
                                            '<div class="product-detail" style="padding: 15px; height: 100%; overflow-y: auto;">' +
                                                '<div style="display: flex; align-items: center; margin-bottom: 15px;">' +
                                                    '<img src="/double_serum.jpg" alt="Double Serum" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">' +
                                                    '<div style="margin-left: 15px;">' +
                                                        '<h2 style="font-size: 18px; margin-bottom: 5px; font-weight: bold;">双萃精华液</h2>' +
                                                        '<p style="font-size: 14px; color: #888; margin-bottom: 5px;">克莱恩斯经典抗衰老精华</p>' +
                                                        '<div style="color: #c00a27; font-size: 16px; font-weight: bold;">¥ 890</div>' +
                                                    '</div>' +
                                                '</div>' +
                                                
                                                '<button style="background-color: #0c6e8a; color: white; border: none; border-radius: 20px; padding: 8px 0; width: 100%; font-size: 14px; margin: 15px 0; font-weight: bold;" onclick="authenticateProduct()">' +
                                                    '验证真伪' +
                                                '</button>' +
                                                '<div id="authenticationStatus" style="display: none; color: #2ecc71; text-align: center; margin-top: -10px; margin-bottom: 15px;">' +
                                                    '<span style="background-color: #e8f8e8; border-radius: 12px; padding: 4px 8px; font-size: 12px;">' +
                                                    '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>' +
                                                    '产品已验证 ✓' +
                                                    '</span>' +
                                                '</div>' +
                                                
                                                '<div style="margin: 20px 0;">' +
                                                    '<div style="height: 120px;"></div>' +
                                                '</div>' +
                                                
                                                '<button style="background-color: #c00a27; color: white; border: none; border-radius: 20px; padding: 10px 0; width: 100%; font-size: 16px; margin-top: 20px; font-weight: bold;">' +
                                                    '立即购买' +
                                                '</button>' +
                                            '</div>';
                                    }
                                }
                            });
                        }
                    }, 100);
                }
            } else if (tabName === 'home') {
                // Recharger la page pour revenir à l'écran d'accueil
                location.reload();
            }
            
            // Show toast notification
            showToast('Onglet ' + tabName + ' sélectionné');
        };
        
        // Ajouter des gestionnaires d'événements pour les boutons
        document.addEventListener('DOMContentLoaded', function() {
            // Exemple d'utilisation du toast
            document.querySelector('.clarins-logo').addEventListener('click', function() {
                showToast('Bienvenue chez Clarins');
            });
            
            // Exemple d'utilisation du modal
            document.querySelector('.menu-icon').addEventListener('click', function() {
                showModal('Fonctionnalité en cours de développement');
            });
            
            // Gestion des catégories
            document.querySelectorAll('.category-item').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.category-item').forEach(cat => {
                        cat.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Gestion des produits
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', function() {
                    const productName = this.querySelector('.product-title').textContent;
                    showModal('Vous avez sélectionné: ' + productName);
                });
            });
        });
    </script>
</body>
</html>`;

// Écrire le fichier HTML dans le dossier public
fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
