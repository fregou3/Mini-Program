<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simulateur Mini Programme Clarins</title>
    <style>
        body {
            font-family: 'Gotham', 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .wechat-container {
            position: relative;
            width: 375px;
            height: 667px;
            background-color: white;
            border-radius: 30px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .wechat-header {
            height: 64px;
            background-color: #E3001B;
            color: white;
            display: flex;
            align-items: center;
            padding: 0 15px;
            position: relative;
        }
        
        .wechat-header .title {
            font-size: 18px;
            font-weight: 500;
            margin: 0 auto;
            padding-top: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .wechat-header .back {
            position: absolute;
            left: 15px;
            top: 32px;
            font-size: 14px;
        }
        
        .wechat-header .menu {
            position: absolute;
            right: 15px;
            top: 32px;
            font-size: 14px;
        }
        
        .wechat-content {
            height: calc(100% - 114px);
            overflow-y: auto;
            padding: 15px;
        }
        
        .wechat-tabbar {
            height: 50px;
            display: flex;
            border-top: 1px solid #f1f1f1;
            background-color: #fff;
        }
        
        .tab-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            color: #666;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .tab-item.active {
            color: #E3001B;
        }
        
        .tab-icon {
            font-size: 20px;
            margin-bottom: 3px;
        }
        
        .component-demo {
            margin-bottom: 20px;
            border: 1px solid #f1f1f1;
            border-radius: 0;
            overflow: hidden;
        }
        
        .component-title {
            background-color: #f9f9f9;
            padding: 12px 15px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #333;
        }
        
        .component-content {
            padding: 20px;
        }
        
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #E3001B;
            color: white;
            border-radius: 0;
            font-size: 12px;
            border: none;
            cursor: pointer;
            margin-right: 10px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background-color 0.3s;
        }
        
        .btn:hover {
            background-color: #C0001B;
        }
        
        .btn-default {
            background-color: #fff;
            color: #E3001B;
            border: 1px solid #E3001B;
        }
        
        .btn-default:hover {
            background-color: #f9f9f9;
        }
        
        .input-area {
            margin-bottom: 15px;
        }
        
        .input-area input {
            width: 100%;
            padding: 12px;
            border: 1px solid #e0e0e0;
            border-radius: 0;
            box-sizing: border-box;
            font-family: 'Gotham', 'Helvetica Neue', Arial, sans-serif;
        }
        
        .input-area input:focus {
            outline: none;
            border-color: #E3001B;
        }
        
        .cell {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #f1f1f1;
            transition: background-color 0.3s;
        }
        
        .cell:hover {
            background-color: #f9f9f9;
        }
        
        .cell-icon {
            margin-right: 15px;
            font-size: 20px;
            color: #E3001B;
        }
        
        .cell-bd {
            flex: 1;
        }
        
        .cell-text {
            font-size: 14px;
            font-weight: 500;
        }
        
        .cell-desc {
            font-size: 12px;
            color: #888;
            margin-top: 5px;
        }
        
        .cell-ft {
            color: #ccc;
            font-size: 14px;
        }
        
        .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 14px;
            display: none;
        }
        
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
        }
        
        .modal-content {
            background-color: white;
            width: 80%;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .modal-title {
            padding: 20px;
            text-align: center;
            font-weight: 500;
            font-size: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .modal-body {
            padding: 20px;
            font-size: 14px;
            border-top: 1px solid #f1f1f1;
            border-bottom: 1px solid #f1f1f1;
            line-height: 1.6;
        }
        
        .modal-footer {
            display: flex;
        }
        
        .modal-btn {
            flex: 1;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .modal-btn-primary {
            color: #E3001B;
            font-weight: 500;
        }
        
        /* Banner de produit Clarins */
        .product-banner {
            position: relative;
            height: 200px;
            background-color: #f9f9f9;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .product-banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .banner-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 15px;
            text-align: center;
        }
        
        .banner-title {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .banner-desc {
            font-size: 12px;
            color: #666;
        }
        
        /* Product Grid */
        .product-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .product-item {
            background-color: #fff;
            padding: 10px;
            text-align: center;
            border: 1px solid #f1f1f1;
        }
        
        .product-item img {
            width: 100%;
            height: 120px;
            object-fit: contain;
            margin-bottom: 10px;
        }
        
        .product-name {
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 5px;
            height: 36px;
            overflow: hidden;
        }
        
        .product-price {
            font-size: 14px;
            color: #E3001B;
            font-weight: 500;
            margin-bottom: 10px;
        }
        
        .add-to-cart {
            background-color: #E3001B;
            color: white;
            border: none;
            font-size: 11px;
            padding: 5px 10px;
            cursor: pointer;
            width: 100%;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
    <div class="wechat-container">
        <div class="wechat-header">
            <span class="back">←</span>
            <div class="title">Clarins</div>
            <span class="menu">⋮</span>
        </div>
        
        <div class="wechat-content">
            <div class="product-banner">
                <div style="width: 100%; height: 320px; background-color: #f9e8e8; display: flex; justify-content: center; align-items: center; position: relative;">
                    <div style="width: 140px; height: 280px; position: relative; display: flex; flex-direction: column; align-items: center;">
                        <!-- Flacon Double Serum stylisé -->
                        <div style="width: 100px; height: 190px; position: relative; margin-bottom: 10px;">
                            <!-- Bouchon doré -->
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 40px; height: 20px; background: linear-gradient(to bottom, #d4b572, #b3945f); border-radius: 8px 8px 0 0; z-index: 2;"></div>
                            <!-- Corps du flacon -->
                            <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 60px; height: 170px; background: linear-gradient(to right, #9b4b00, #e67e22, #9b4b00); border-radius: 30px; overflow: hidden;">
                                <!-- Logo Clarins -->
                                <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); width: 45px; background-color: rgba(255,255,255,0.2); text-align: center; padding: 2px 0; border-radius: 2px;">
                                    <span style="font-size: 8px; font-weight: bold; color: #fff;">CLARINS</span>
                                </div>
                                <!-- Texte Double Serum -->
                                <div style="position: absolute; top: 40px; left: 50%; transform: translateX(-50%); width: 45px; text-align: center;">
                                    <span style="font-size: 7px; font-weight: bold; color: #fff;">Double<br>Serum</span>
                                </div>
                            </div>
                            <!-- Plante verte (aloe) -->
                            <div style="position: absolute; top: 60px; left: 0; width: 25px; height: 80px;">
                                <div style="position: absolute; width: 6px; height: 70px; background-color: #4CAF50; transform: rotate(-15deg); left: 10px; border-radius: 0 0 3px 10px;"></div>
                                <div style="position: absolute; width: 20px; height: 8px; background-color: #4CAF50; transform: rotate(35deg); left: 0; top: 15px; border-radius: 5px;"></div>
                                <div style="position: absolute; width: 20px; height: 8px; background-color: #4CAF50; transform: rotate(25deg); left: 0; top: 30px; border-radius: 5px;"></div>
                                <div style="position: absolute; width: 20px; height: 8px; background-color: #4CAF50; transform: rotate(15deg); left: 0; top: 45px; border-radius: 5px;"></div>
                            </div>
                            <!-- Tranche d'orange -->
                            <div style="position: absolute; top: 90px; right: 0; width: 25px; height: 50px;">
                                <div style="position: absolute; width: 25px; height: 25px; background-color: #FF9800; border-radius: 50%; right: 0;">
                                    <div style="position: absolute; width: 20px; height: 20px; background: radial-gradient(#FFEB3B, #FF9800); border-radius: 50%; top: 2px; left: 2px;"></div>
                                </div>
                            </div>
                        </div>
                        <div style="font-size: 12px; color: #E3001B; font-weight: bold; text-transform: uppercase; text-align: center;">Double Serum</div>
                        <div style="font-size: 10px; color: #666; text-align: center; margin-top: 5px;">Concentré anti-âge pour tous types de peau</div>
                    </div>
                </div>
                <div class="banner-content">
                    <div class="banner-title">Double Serum</div>
                    <div class="banner-desc">Notre sérum anti-âge le plus complet</div>
                </div>
            </div>
            
            <div class="product-grid">
                <div class="product-item">
                    <div style="width: 100%; height: 120px; background-color: #FFF5F5; display: flex; justify-content: center; align-items: center; position: relative;">
                        <!-- Stylisation du Double Serum basée sur l'image 1 -->
                        <div style="position: relative; width: 60px; height: 110px;">
                            <!-- Bouchon doré -->
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 30px; height: 15px; background: linear-gradient(to bottom, #d4b572, #b3945f); border-radius: 5px 5px 0 0;"></div>
                            <!-- Corps du flacon -->
                            <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 45px; height: 95px; background: linear-gradient(to right, #9b4b00, #e67e22, #9b4b00); border-radius: 22px; overflow: hidden;">
                                <!-- Logo Clarins -->
                                <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 35px; background-color: rgba(255,255,255,0.2); text-align: center; padding: 1px 0; border-radius: 2px;">
                                    <span style="font-size: 6px; font-weight: bold; color: #fff;">CLARINS</span>
                                </div>
                                <!-- Texte Double Serum -->
                                <div style="position: absolute; top: 25px; left: 50%; transform: translateX(-50%); width: 35px; text-align: center;">
                                    <span style="font-size: 5px; font-weight: bold; color: #fff;">Double<br>Serum</span>
                                </div>
                            </div>
                            <!-- Petite feuille verte -->
                            <div style="position: absolute; top: 40px; left: 5px; width: 12px; height: 25px;">
                                <div style="position: absolute; width: 3px; height: 25px; background-color: #4CAF50; transform: rotate(-15deg); left: 5px; border-radius: 0 0 2px 5px;"></div>
                                <div style="position: absolute; width: 10px; height: 4px; background-color: #4CAF50; transform: rotate(25deg); left: 0; top: 10px; border-radius: 3px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="product-name">Double Serum 30ml</div>
                    <div class="product-price">95,00 €</div>
                    <button class="add-to-cart" onclick="showToast('Produit ajouté au panier')">Ajouter</button>
                </div>
                <div class="product-item">
                    <div style="width: 100%; height: 120px; background-color: #FFF5F5; display: flex; justify-content: center; align-items: center; position: relative;">
                        <!-- Stylisation du Double Serum Eye basée sur l'image 2 -->
                        <div style="position: relative; width: 55px; height: 100px;">
                            <!-- Bouchon doré -->
                            <div style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 25px; height: 12px; background: linear-gradient(to bottom, #d4b572, #b3945f); border-radius: 5px 5px 0 0;"></div>
                            <!-- Corps du flacon -->
                            <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 38px; height: 85px; background: linear-gradient(to right, #9b4b00, #e67e22, #9b4b00); border-radius: 19px; overflow: hidden;">
                                <!-- Logo Clarins -->
                                <div style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 30px; background-color: rgba(255,255,255,0.2); text-align: center; padding: 1px 0; border-radius: 2px;">
                                    <span style="font-size: 5px; font-weight: bold; color: #fff;">CLARINS</span>
                                </div>
                                <!-- Texte Double Serum Eye -->
                                <div style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); width: 30px; text-align: center;">
                                    <span style="font-size: 4px; font-weight: bold; color: #fff;">Double<br>Serum<br>Eye</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-name">Double Serum Eye</div>
                    <div class="product-price">72,00 €</div>
                    <button class="add-to-cart" onclick="showToast('Produit ajouté au panier')">Ajouter</button>
                </div>
            </div>
            
            <div class="product-grid">
                <div class="product-item">
                    <div style="width: 100%; height: 120px; background-color: #FFF5F5; display: flex; justify-content: center; align-items: center; position: relative;">
                        <div style="position: absolute; width: 80px; height: 80px; background-color: #FFDDDD; border-radius: 40px; display: flex; justify-content: center; align-items: center;">
                            <div style="width: 70px; height: 70px; background-color: #FFDCB9; border-radius: 35px; position: relative; display: flex; justify-content: center; align-items: center;">
                                <div style="width: 50px; height: 50px; border-radius: 25px; background-color: #FFC69A; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                                    <div style="font-size: 6px; color: #E3001B; font-weight: bold;">CLARINS</div>
                                    <div style="font-size: 5px; color: #E3001B; text-align: center; margin-top: 2px;">FOND DE</div>
                                    <div style="font-size: 5px; color: #E3001B; text-align: center;">TEINT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-name">Fond de Teint Everlasting</div>
                    <div class="product-price">42,00 €</div>
                    <button class="add-to-cart" onclick="showToast('Produit ajouté au panier')">Ajouter</button>
                </div>
                <div class="product-item">
                    <div style="width: 100%; height: 120px; background-color: #FFF5F5; display: flex; justify-content: center; align-items: center; position: relative;">
                        <div style="position: absolute; height: 90px; width: 20px; background-color: #FFDDDD; border-radius: 10px; margin-left: -25px;"></div>
                        <div style="position: absolute; height: 90px; width: 20px; background-color: #E3001B; border-radius: 10px; margin-left: 0px;"></div>
                        <div style="position: absolute; height: 90px; width: 20px; background-color: #C70017; border-radius: 10px; margin-left: 25px;"></div>
                        <div style="position: absolute; bottom: 10px; font-size: 6px; color: #E3001B; font-weight: bold; text-align: center;">CLARINS JOLI ROUGE</div>
                    </div>
                    <div class="product-name">Joli Rouge Brillant</div>
                    <div class="product-price">32,00 €</div>
                    <button class="add-to-cart" onclick="showToast('Produit ajouté au panier')">Ajouter</button>
                </div>
            </div>
            
            <div class="component-demo">
                <div class="component-title">Services</div>
                <div class="component-content">
                    <button class="btn" onclick="showToast('Scan QR code activé')">Scan QR code</button>
                    <button class="btn btn-default" onclick="showToast('Vérification d\'authenticité en cours')">Authenticity</button>
                </div>
            </div>
            
            <div class="component-demo">
                <div class="component-title">Nos Recommandations</div>
                <div class="component-content" style="padding: 0;">
                    <div class="cell" onclick="showToast('Produit sélectionné')">
                        <div class="cell-icon">✨</div>
                        <div class="cell-bd">
                            <div class="cell-text">Double Serum</div>
                            <div class="cell-desc">Anti-âge concentré, toutes peaux</div>
                        </div>
                        <div class="cell-ft">></div>
                    </div>
                    <div class="cell" onclick="showToast('Produit sélectionné')">
                        <div class="cell-icon">✨</div>
                        <div class="cell-bd">
                            <div class="cell-text">Total Eye Lift</div>
                            <div class="cell-desc">Soin anti-âge contour des yeux</div>
                        </div>
                        <div class="cell-ft">></div>
                    </div>
                    <div class="cell" onclick="showModal()">
                        <div class="cell-icon">🎁</div>
                        <div class="cell-bd">
                            <div class="cell-text">Offres spéciales</div>
                            <div class="cell-desc">Découvrez nos offres exclusives</div>
                        </div>
                        <div class="cell-ft">></div>
                    </div>
                </div>
            </div>
            
            <div class="component-demo">
                <div class="component-title">Newsletter</div>
                <div class="component-content">
                    <div class="input-area">
                        <input type="email" placeholder="Votre adresse e-mail">
                    </div>
                    <button class="btn" onclick="showToast('Inscription réussie')">S'inscrire</button>
                </div>
            </div>
        </div>
        
        <div class="wechat-tabbar">
            <div class="tab-item active" onclick="changeTab(this, 'home')">
                <div class="tab-icon">🏠</div>
                <div>Accueil</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'shop')">
                <div class="tab-icon">🛍️</div>
                <div>Boutique</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'cart')">
                <div class="tab-icon">🛒</div>
                <div>Panier</div>
            </div>
            <div class="tab-item" onclick="changeTab(this, 'profile')">
                <div class="tab-icon">👤</div>
                <div>Compte</div>
            </div>
        </div>
    </div>
    
    <div class="toast" id="toast">Message</div>
    
    <div class="modal" id="modal">
        <div class="modal-content">
            <div class="modal-title">Offre spéciale</div>
            <div class="modal-body">
                Profitez de -20% sur votre première commande et recevez un coffret de miniatures pour tout achat supérieur à 60€.
            </div>
            <div class="modal-footer">
                <div class="modal-btn" onclick="hideModal()">Fermer</div>
                <div class="modal-btn modal-btn-primary" onclick="hideModal(); showToast('Offre ajoutée')">Profiter de l'offre</div>
            </div>
        </div>
    </div>
    
    <script>
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.style.display = 'block';
            
            setTimeout(() => {
                toast.style.display = 'none';
            }, 2000);
        }
        
        function showModal() {
            document.getElementById('modal').style.display = 'flex';
        }
        
        function hideModal() {
            document.getElementById('modal').style.display = 'none';
        }
        
        function changeTab(element, tabName) {
            // Désactiver tous les onglets
            const tabs = document.querySelectorAll('.tab-item');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Activer l'onglet sélectionné
            element.classList.add('active');
            
            // Simuler un changement de page
            showToast('Navigation vers ' + tabName);
        }
    </script>
</body>
</html>