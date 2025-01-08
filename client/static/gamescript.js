const gameContainer = document.getElementById('gameContainer');
        const player = document.getElementById('player');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const livesDisplay = document.getElementById('livesDisplay');
        const gameOverScreen = document.getElementById('gameOverScreen');
        const pauseScreen = document.getElementById('pauseScreen');
        const pauseScreenScore = document.getElementById('pauseScreenScore');
        const finalScoreDisplay = document.getElementById('finalScoreDisplay');
        const restartButton = document.getElementById('restartButton');
        const pauseButton = document.getElementById('pauseButton');
        const resumeButton = document.getElementById('resumeButton');
        const backgrounds = [
        'url("./imagenes/background1.jpg")', 
        'url("./imagenes/background2.jpg")', 
        'url("./imagenes/background3.jpg")', 
        'url("./imagenes/background4.jpg")',
        'url("./imagenes/background5.jpg")',
        'url("./imagenes/background6.jpg")'  
        ];
        const trashImages = [
            './imagenes/trash1.png',
            './imagenes/trash3.png',
            './imagenes/trash4.png'
        ];

        document.body.style.backgroundImage = backgrounds[0];
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';

        let playerX = 175;
        let score = 0;
        let lives = 3;
        let gameActive = true;
        let gamePaused = false;
        let fallSpeedMultiplier = 1;
        let trashIntervalId;
        let trashSpawnInterval = 1000; 
        let trashSpawnDecreaseRate = 20; 
        let spawnThreshold = 5; 
        let currentBackgroundIndex = 0;

        function updateBackground(score) {
        const changeInterval = 30;

        const newBackgroundIndex = Math.floor(score / changeInterval) % backgrounds.length;

        if (newBackgroundIndex !== currentBackgroundIndex) {
            currentBackgroundIndex = newBackgroundIndex;
            document.body.style.backgroundImage = backgrounds[currentBackgroundIndex];
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        }
        }

        // Función para verificar si el jugador toca la basura mejorada
        function checkTrashCollision(playerRect, trashRect) {
            const topCollision = 
                trashRect.bottom >= playerRect.top &&
                trashRect.top <= playerRect.bottom &&
                trashRect.right >= playerRect.left &&
                trashRect.left <= playerRect.right;

            const sideCollision = 
                trashRect.right >= playerRect.left &&
                trashRect.left <= playerRect.right &&
                trashRect.bottom >= playerRect.top &&
                trashRect.top <= playerRect.bottom;

            return topCollision || sideCollision;
        }

        // Configuración inicial del juego
        function initGame() {
            playerX = 175;
            score = 0;
            lives = 3;
            gameActive = true;
            gamePaused = false;
            fallSpeedMultiplier = 1;
            trashSpawnInterval = 1000; 

            player.style.left = `${playerX}px`;
            scoreDisplay.textContent = 'Puntos: 0';
            pauseScreenScore.textContent = 'Puntos: 0';
            livesDisplay.textContent = 'Vidas: 3';
            gameOverScreen.style.display = 'none';
            pauseScreen.style.display = 'none';
            pauseButton.textContent = 'Pausar';
            
            // Limpiar cualquier basura restante
            const trashElements = document.querySelectorAll('.trash');
            trashElements.forEach(trash => trash.remove());
            
            player.innerHTML = '<img src="./imagenes/player.png" alt="Jugador" style="width: 100%; height: 100%;">';
            
            // Limpiar los intervalos previos
            if (trashIntervalId) clearInterval(trashIntervalId);
            
            // Reiniciar la generación de basura
            trashIntervalId = setInterval(createTrash, trashSpawnInterval);
        }

        // Configuración del jugador
        player.style.left = `${playerX}px`;
        player.style.width = '50px';
        player.style.height = '50px';

        // Poder mover al jugador con teclas más fluido
        const keys = {
            left: false,
            right: false
        };

        document.addEventListener('keydown', (e) => {
            if (gamePaused || !gameActive) return;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A'){
                keys.left = true; 
                player.querySelector('img').style.transform = 'scaleX(1)';} 
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
                keys.right = true;
                player.querySelector('img').style.transform = 'scaleX(-1)';} 
            
            // Opcion de poder pausar con la tecla ESC
            if (e.key === 'Escape') {
                pauseGame();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (gamePaused || !gameActive) return;
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
        });

        function updatePlayerMovement() {
            if (!gameActive || gamePaused) return;

            if (keys.left && playerX > 0) {
                playerX -= 5;
            }
            if (keys.right && playerX < 350) {
                playerX += 5;
            }
            player.style.left = `${playerX}px`;
        }

        // Bucle de juego para tener un movimiento más fluido
        function gameLoop() {
            updatePlayerMovement();
            
            // Actualiza la velocidad de caída
            if (gameActive && !gamePaused) {
                fallSpeedMultiplier = Math.min(3, 1 + (score * 0.01));
            }
            
            requestAnimationFrame(gameLoop);
        }
        gameLoop();

        // Crear basura
        function createTrash() {
            if (!gameActive || gamePaused) return;

            const randomTrashImage = trashImages[Math.floor(Math.random() * trashImages.length)];
            const trash = document.createElement('div');
            trash.classList.add('trash');
            trash.style.left = `${Math.random() * 370}px`;
            trash.style.top = '0px';
            trash.innerHTML = `<img src="${randomTrashImage}" alt="Basura" style="width: 100%; height: 100%; object-fit: contain;">`;
            gameContainer.appendChild(trash);

            // Animacion de la basura cayendo
            let trashY = 0;
            let missed = false;

            const fallInterval = setInterval(() => {
                if (!gameActive || gamePaused) {
                    trash.dataset.fallInterval = fallInterval;
                    clearInterval(fallInterval);
                    return;
                }

                // La velocidad de caída aumenta progresivamente
                trashY += 5 * fallSpeedMultiplier;
                trash.style.top = `${trashY}px`;

                // Detectar si el jugador captura la basura con el jugador
                const playerRect = player.getBoundingClientRect();
                const trashRect = trash.getBoundingClientRect();

                // Capturar la basura si el jugador lo toca
                if (checkTrashCollision(playerRect, trashRect)) {
                    gameContainer.removeChild(trash);
                    clearInterval(fallInterval);
                    score++;
                    scoreDisplay.textContent = `Puntos: ${score}`;
                    
                    updateBackground(score);

                    // Reducir intervalo de generación de basura
                    if (score % spawnThreshold === 0) {
                        clearInterval(trashIntervalId);
                        trashSpawnInterval = Math.max(400, trashSpawnInterval - trashSpawnDecreaseRate);
                        trashIntervalId = setInterval(createTrash, trashSpawnInterval);
                    }
                }

                // Detectar cuando la basura toca el suelo
                if (trashY > 550 && !missed) {
                    missed = true;
                    lives--;
                    livesDisplay.textContent = `Vidas: ${lives}`;
                    gameContainer.removeChild(trash);
                    clearInterval(fallInterval);

                    // Si las vidas acaban finalizar el juego
                    if (lives <= 0) {
                        gameActive = false;
                        finalScoreDisplay.textContent = `Puntuación final: ${score}`;
                        gameOverScreen.style.display = 'flex';
                    }
                }
            }, 50);
        }

        // Pausar juego
        function pauseGame() {
            if (!gameActive) return;
            
            gamePaused = !gamePaused;
            
            if (gamePaused) {
                // Pausar
                pauseButton.textContent = 'Continuar';
                pauseScreen.style.display = 'flex';
                pauseScreenScore.textContent = `Puntos: ${score}`;
                clearInterval(trashIntervalId);

                // Detener la basura cuando se pausa
                const trashElements = document.querySelectorAll('.trash');
                trashElements.forEach(trash => {
                    trash.dataset.pausedY = trash.style.top;
                    trash.dataset.fallInterval = trash.dataset.fallInterval || 'active';
                });
            } else {
                // Reanudar
                pauseButton.textContent = 'Pausar';
                pauseScreen.style.display = 'none';
                
                const trashElements = document.querySelectorAll('.trash');
                trashElements.forEach(trash => {
                    const oldInterval = trash.dataset.fallInterval;
                    if (oldInterval && oldInterval !== 'active') {
                        clearInterval(parseInt(oldInterval));
                    }

                    let trashY = parseFloat(trash.dataset.pausedY || '0');
                    let missed = false;

                    // Crear nuevo intervalo para cada elemento de basura
                    const fallInterval = setInterval(() => {
                        if (!gameActive || gamePaused) {
                            trash.dataset.fallInterval = fallInterval;
                            clearInterval(fallInterval);
                            return;
                        }

                        trashY += 5 * fallSpeedMultiplier;
                        trash.style.top = `${trashY}px`;

                        const playerRect = player.getBoundingClientRect();
                        const trashRect = trash.getBoundingClientRect();

                        // Capturar basura si el personake toca la basura
                        if (checkTrashCollision(playerRect, trashRect)) {
                            gameContainer.removeChild(trash);
                            clearInterval(fallInterval);
                            score++;
                            scoreDisplay.textContent = `Puntos: ${score}`;

                            // Reducir intervalo de generación de basura
                            if (score % spawnThreshold === 0) {
                                clearInterval(trashIntervalId);
                                trashSpawnInterval = Math.max(400, trashSpawnInterval - trashSpawnDecreaseRate);
                                trashIntervalId = setInterval(createTrash, trashSpawnInterval);
                            }
                        }

                        // Detectar cuando la basura toca el suelo
                        if (trashY > 550 && !missed) {
                            missed = true;
                            lives--;
                            livesDisplay.textContent = `Vidas: ${lives}`;
                            gameContainer.removeChild(trash);
                            clearInterval(fallInterval);

                            // Si las vidas acaban finalizar el juego
                            if (lives <= 0) {
                                gameActive = false;
                                finalScoreDisplay.textContent = `Puntuación final: ${score}`;
                                gameOverScreen.style.display = 'flex';
                            }
                        }
                    }, 50);
                });

                // Reiniciar caída de basura
                trashIntervalId = setInterval(createTrash, trashSpawnInterval);
            }
        }

        // Pausar cuando se minimiza o se sale de la pantalla
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden' && gameActive && !gamePaused) {
                pauseGame();
            }
        });

        // Botones de control
        pauseButton.addEventListener('click', pauseGame);
        resumeButton.addEventListener('click', pauseGame);
        restartButton.addEventListener('click', initGame);

        // Iniciar juego
        initGame();