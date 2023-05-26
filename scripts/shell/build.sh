#!/bin/bash

npx google-closure-compiler \
--language_in ECMASCRIPT6 \
--language_out ECMASCRIPT5_STRICT \
--warning_level DEFAULT \
--compilation_level SIMPLE \
--isolation_mode IIFE \
--js "./../../lib/rune.js" \
--js "./../../src/scope/Manifest.js" \
--js "./../../src/data/resource/Requests.js" \
--js "./../../src/entity/fire/FireTile.js" \
--js "./../../src/entity/particle/Particle.js" \
--js "./../../src/entity/particle/SecondParticle.js" \
--js "./../../src/entity/fire/Fire.js" \
--js "./../../src/entity/fire/FireController.js" \
--js "./../../src/entity/bullet/Bullet.js" \
--js "./../../src/entity/player/Player.js" \
--js "./../../src/entity/enemy/Enemy.js" \
--js "./../../src/entity/obstacle/Roofs.js" \
--js "./../../src/ui/Minimap.js" \
--js "./../../src/ui/Score.js" \
--js "./../../src/ui/DifficultyText.js" \
--js "./../../src/ui/MainHUD.js" \
--js "./../../src/ui/SplittedHUD.js" \
--js "./../../src/ui/MenuBtn.js" \
--js "./../../src/scene/menu/ControlBtn.js" \
--js "./../../src/scene/menu/HowToPlay.js" \
--js "./../../src/scene/highscore/HighscoreList.js" \
--js "./../../src/scene/gameOver/charWheel/CharWheelArrow.js" \
--js "./../../src/scene/gameOver/charWheel/SaveBtn.js" \
--js "./../../src/scene/gameOver/charWheel/CharWheel.js" \
--js "./../../src/scene/gameOver/NewHighscore.js" \
--js "./../../src/scene/game/Countdown.js" \
--js "./../../src/scene/gameOver/GameOver.js" \
--js "./../../src/scene/game/Game.js" \
--js "./../../src/scene/menu/Menu.js" \
--js "./../../src/system/Main.js" \
--js "./../../src/scope/Alias.js" \
--js_output_file "./../../dist/wildfire.js";