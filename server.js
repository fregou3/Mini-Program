const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;

// Créer le répertoire public s'il n'existe pas
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Servir les fichiers statiques du répertoire public
app.use(express.static(publicDir));
app.use(express.static(__dirname)); // Pour servir les images à la racine

// Créer le fichier HTML pour le mini programme
const htmlContent = `<!DOCTYPE html>
<html lang="fr">
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
        }
        
        body {
            font-family: 'Noto Sans SC', 'Montserrat', sans-serif;
            background-color: #f5f5f5;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
            height: 100vh;
            overflow: hidden;
            touch-action: pan-y;
        }
        
        .wechat-container {
            width: 375px;
            height: 667px;
            margin: 20px auto;
            border: 10px solid #f1f1f1;
            border-radius: 30px;
            overflow: hidden;
            position: relative;
            background-color: #FFF6F6;
            font-family: 'Noto Sans SC', sans-serif;
            touch-action: pan-y;
            -webkit-user-select: none;
            user-select: none;
        }
        
        .wechat-header {
            height: 44px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            background-color: white;
            border-bottom: 1px solid #f1f1f1;
        }
        
        .wechat-time {
            font-weight: 600;
            font-size: 14px;
        }
        
        .wechat-status {
            display: flex;
            gap: 5px;
        }
        
        .wechat-content {
            height: calc(100% - 110px);
            position: relative;
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
            overflow-y: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .wechat-content::-webkit-scrollbar {
            display: none;
        }

        .wechat-tabbar {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60px;
            background-color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #f1f1f1;
        }
        
        .tab-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px 0;
            color: #999;
            font-size: 12px;
        }
        
        .tab-icon {
            margin-bottom: 3px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .tab-label {
            font-size: 11px;
        }
        
        .tab-item.active .tab-icon {
            color: #C00A27;
        }
        
        .tab-item.active .tab-label {
            color: #C00A27;
        }
        
        .tab-item.active {
            position: relative;
        }
        
        .tab-item.active::before {
            content: '';
            position: absolute;
            top: 2px;
            left: 50%;
            transform: translateX(-50%);
            width: 42px;
            height: 42px;
            background-color: rgba(192, 10, 39, 0.1);
            border-radius: 50%;
            z-index: -1;
        }
        
        .component-demo {
            margin: 0 0 15px 0;
            border: 1px solid #f1f1f1;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .component-title {
            padding: 10px 15px;
            background-color: #f9f9f9;
            border-bottom: 1px solid #f1f1f1;
            font-weight: 500;
            font-size: 14px;
        }
        
        .component-content {
            padding: 15px;
            background-color: white;
        }
        
        .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0,0,0,0.7);
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal {
            background-color: white;
            border-radius: 12px;
            width: 80%;
            max-width: 300px;
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .modal-header {
            padding: 15px;
            border-bottom: 1px solid #f1f1f1;
            text-align: center;
            font-weight: 600;
        }
        
        .modal-content {
            padding: 20px 15px;
            text-align: center;
        }
        
        .modal-footer {
            display: flex;
            border-top: 1px solid #f1f1f1;
        }
        
        .modal-button {
            flex: 1;
            padding: 12px;
            text-align: center;
            background-color: white;
            border: none;
            font-size: 16px;
            cursor: pointer;
        }
        
        .modal-button:not(:last-child) {
            border-right: 1px solid #f1f1f1;
        }
        
        .modal-button.primary {
            color: #E3001B;
            font-weight: 500;
        }
        
        .modal-overlay.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay.visible .modal {
            transform: scale(1);
        }
        
        /* Clarins specific styles based on the image */
        .clarins-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 15px;
            background-color: white;
            margin-bottom: 0;
            height: 45px;
        }
        
        .clarins-logo {
            text-align: center;
            flex: 1;
            display: flex;
            justify-content: center;
        }
        
        .clarins-logo img {
            height: 40px;
            width: auto;
            max-width: 180px;
        }
        
        .search-icon, .menu-icon {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #333;
        }
        
        .category-menu {
            width: 90px;
            background-color: #f7f7f7;
            border-right: 1px solid #f1f1f1;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
            overflow-y: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .category-menu::-webkit-scrollbar {
            display: none;
        }

        .category-item {
            padding: 14px 6px;
            text-align: center;
            border-bottom: 1px solid #f1f1f1;
            font-size: 11px;
            color: #666;
            cursor: pointer;
            line-height: 1.2;
        }

        .category-item.active {
            background-color: #C00A27;
            color: white;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            font-weight: 500;
        }
        
        .product-grid {
            margin-left: 90px;
            padding: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 15px;
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
            overflow-y: auto;
            height: 100%;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .product-grid::-webkit-scrollbar {
            display: none;
        }

        .product-card {
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            margin-bottom: 10px;
        }
        
        .product-image {
            width: 100%;
            height: 120px;
            background-size: cover;
            background-position: center;
        }
        
        .product-title {
            position: relative;
            margin-top: 8px;
            padding: 0 5px;
            font-size: 13px;
            font-weight: 500;
            color: #333;
            border-top: 1px solid #f8f8f8;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 32px;
        }
        
        .product-title:hover::after {
            content: attr(title);
            position: absolute;
            background: #FFF7D1;
            color: #333;
            padding: 0px 4px;
            border-radius: 2px;
            font-size: 10px;
            line-height: 14px;
            white-space: nowrap;
            z-index: 1000;
            bottom: -16px;
            left: 50%;
            transform: translateX(-50%);
            border: 1px solid #FFE58F;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.03);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: normal;
            width: auto;
            min-width: 45px;
            text-align: center;
            pointer-events: none;
            letter-spacing: 0;
            opacity: 0.98;
        }
        
        .featured-banner {
            width: 100%;
            height: 150px;
            background-color: #000;
            margin-bottom: 10px;
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }
        
        .featured-banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .featured-text {
            position: absolute;
            bottom: 10px;
            right: 10px;
            color: white;
            font-size: 18px;
            font-weight: 300;
            text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .tab-item .tab-icon {
            width: 28px;
            height: 28px;
            margin-bottom: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        
        .tab-item .tab-icon svg {
            width: 100%;
            height: 100%;
        }
        
        .tab-item:not(.active) .tab-icon {
            color: #666;
        }
        
        .tab-item.active .tab-icon {
            color: #C00A27;
        }
        
        .tab-item.active::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 42px;
            height: 42px;
            background-color: rgba(192, 10, 39, 0.1);
            border-radius: 50%;
            z-index: -1;
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
        
        .category-item, .tab-item {
            position: relative;
        }
        
        .category-item:hover::after, .tab-item:hover::after {
            content: attr(title);
            position: absolute;
            background: #FFF7D1;
            color: #333;
            padding: 0px 4px;
            border-radius: 2px;
            font-size: 10px;
            line-height: 14px;
            white-space: nowrap;
            z-index: 1000;
            left: 105%;
            top: 50%;
            transform: translateY(-50%);
            border: 1px solid #FFE58F;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.02);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: normal;
            width: auto;
            min-width: 45px;
            text-align: center;
            pointer-events: none;
            letter-spacing: 0;
            opacity: 0.99;
        }
        
        .tab-item:hover::after {
            left: 50%;
            top: -20px;
            transform: translateX(-50%);
        }
    </style>
</head>
<body>
    <div class="wechat-container">
        <div class="wechat-header">
            <div class="wechat-time">16:03</div>
            <div class="wechat-status">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 10V8a6 6 0 0 1 12 0v2"></path>
                        <path d="M5 18a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2"></path>
                        <rect x="8" y="15" width="8" height="6" rx="1"></rect>
                    </svg>
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                        <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                        <line x1="12" y1="20" x2="12.01" y2="20"></line>
                    </svg>
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M7 19h10"></path>
                        <path d="M7 14a6 6 0 0 1 10 0"></path>
                        <line x1="12" y1="8" x2="12" y2="10"></line>
                        <line x1="8" y1="3" x2="16" y2="3"></line>
                    </svg>
                </span>
            </div>
        </div>
        
        <div class="clarins-header">
            <div class="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
            <div class="clarins-logo">
                <img src="/Logo.jpg" alt="Clarins">
            </div>
            <div class="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
            </div>
        </div>
        
        <div class="wechat-content">
            <div class="category-menu">
                <div class="category-item active" title="Produits Recommandés">星品推荐</div>
                <div class="category-item" title="Cadeaux">送礼专区</div>
                <div class="category-item" title="Besoins de la Peau">肌肤需求</div>
                <div class="category-item" title="Soins du Visage">面部护理</div>
                <div class="category-item" title="Soins du Corps">身体护理</div>
                <div class="category-item" title="Maquillage Sûr">安心彩妆</div>
                <div class="category-item" title="Soins Homme">男士护肤</div>
                <div class="category-item" title="Nouveautés">新品日历</div>
                <div class="category-item" title="Tout">全部</div>
            </div>
            
            <div class="product-grid">
                <div class="featured-banner" style="grid-column: span 2;">
                    <img src="/precious.jpg" alt="Precious">
                    <div class="featured-text">至臻凝时</div>
                </div>
                
                <div class="product-card">
                    <div class="product-image" style="background-image: url('/double_serum.jpg');"></div>
                    <div class="product-title" title="Double Serum">黄金双萃精华露</div>
                </div>
                
                <div class="product-card">
                    <div class="product-image" style="background-image: url('/double_serum_eye.jpg');"></div>
                    <div class="product-title" title="Double Serum Yeux">双萃精华眼霜</div>
                </div>
                
                <div class="product-card">
                    <div class="product-image" style="background-image: url('/multi-intensive.jpg');"></div>
                    <div class="product-title" title="Multi-Intensive">光芒小瓷瓶</div>
                </div>
                
                <div class="product-card">
                    <div class="product-image" style="background-image: url('/hydra.jpg');"></div>
                    <div class="product-title" title="Crème Solaire Légère">轻透防晒乳</div>
                </div>
            </div>
        </div>
        
        <div class="wechat-tabbar">
            <div class="tab-item active" onclick="changeTab(this, 'home')" title="Accueil">
                <div class="tab-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
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
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 1-2 1.61h9.72a2 2 0 0 1 2-1.61L23 6H6"></path>
                    </svg>
                </div>
                <div class="tab-label">购物车</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'profile')" title="Mon Compte">
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
            <div class="modal-header">提示</div>
            <div class="modal-content" id="modal-content">
                这是一个模态框示例
            </div>
            <div class="modal-footer">
                <button class="modal-button" onclick="closeModal()">取消</button>
                <button class="modal-button primary" onclick="closeModal()">确定</button>
            </div>
        </div>
    </div>
    
    <script>
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.style.opacity = '1';
            
            setTimeout(() => {
                toast.style.opacity = '0';
            }, 2000);
        }
        
        function showModal(message) {
            const modalContent = document.getElementById('modal-content');
            const modalOverlay = document.getElementById('modal-overlay');
            
            modalContent.textContent = message;
            modalOverlay.classList.add('visible');
        }
        
        function closeModal() {
            const modalOverlay = document.getElementById('modal-overlay');
            modalOverlay.classList.remove('visible');
        }
        
        window.changeTab = function(element, tabName) {
            // Mettre à jour la classe active
            document.querySelectorAll('.tab-item').forEach(tab => {
                tab.classList.remove('active');
            });
            element.classList.add('active');
            
            // Afficher le contenu correspondant
            if (tabName === 'scan') {
                // Afficher l'écran de scan QR code en remplaçant seulement le contenu principal (product-grid)
                const productGrid = document.querySelector('.product-grid');
                if (productGrid) {
                    productGrid.innerHTML = 
                        '<div class="scan-screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; padding: 20px; text-align: center; position: relative;">' +
                            '<img id="qrCodeImage" src="/qrcode2.png" alt="QR Code" style="width: 200px; height: auto; position: absolute; top: calc(50% - 38px); left: calc(50% + 57px); transform: translate(-50%, -50%);">' +
                            '<div id="scanButton" style="width: 70px; height: 70px; border-radius: 50%; border: 3px solid #fff; background-color: #0c6e8a; box-shadow: 0 0 0 2px #0c6e8a; display: flex; justify-content: center; align-items: center; color: white; font-size: 18px; position: absolute; bottom: 80px; left: 60%; transform: translateX(-50%); cursor: pointer;">扫描</div>' +
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
                                        productGrid.innerHTML = `
                                            <div class="product-detail" style="padding: 15px; height: 100%; overflow-y: auto;">
                                                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                                                    <img src="/page_produit.png" alt="Double Serum" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                                                    <div style="margin-left: 15px;">
                                                        <h2 style="font-size: 18px; margin-bottom: 5px; font-weight: bold;">双萃精华液</h2>
                                                        <p style="font-size: 14px; color: #888; margin-bottom: 5px;">克莱恩斯经典抗衰老精华</p>
                                                        <div style="color: #c00a27; font-size: 16px; font-weight: bold;">¥ 890</div>
                                                    </div>
                                                </div>
                                                
                                                <div style="margin: 20px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 15px 0;">
                                                    <h3 style="font-size: 16px; margin-bottom: 10px; font-weight: bold;">产品描述</h3>
                                                    <p style="font-size: 14px; line-height: 1.5; color: #333;">
                                                        克莱恩斯双萃精华液是一款革命性的抗衰老精华，结合了21种植物精华，有效改善肌肤老化迹象。独特的双层配方，水油结合，为肌肤提供全面呵护。
                                                    </p>
                                                </div>
                                                
                                                <div style="margin: 20px 0;">
                                                    <h3 style="font-size: 16px; margin-bottom: 10px; font-weight: bold;">主要成分</h3>
                                                    <ul style="padding-left: 20px; font-size: 14px; line-height: 1.5; color: #333;">
                                                        <li>姜黄提取物 - 抗氧化</li>
                                                        <li>有机绿香蕉提取物 - 促进细胞再生</li>
                                                        <li>燕麦多糖 - 提升紧致度</li>
                                                        <li>有机玉米提取物 - 增强保湿</li>
                                                    </ul>
                                                </div>
                                                
                                                <div style="margin: 20px 0; border-top: 1px solid #eee; padding-top: 15px;">
                                                    <h3 style="font-size: 16px; margin-bottom: 10px; font-weight: bold;">使用方法</h3>
                                                    <p style="font-size: 14px; line-height: 1.5; color: #333;">
                                                        早晚使用。取适量产品，混合后轻轻按摩于面部和颈部，避开眼周。可在使用面霜前使用。
                                                    </p>
                                                </div>
                                                
                                                <button style="background-color: #c00a27; color: white; border: none; border-radius: 20px; padding: 10px 0; width: 100%; font-size: 16px; margin-top: 20px; font-weight: bold;">
                                                    立即购买
                                                </button>
                                            </div>
                                        `;
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

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});