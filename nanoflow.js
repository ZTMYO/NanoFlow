window.addEventListener('load', function () {
    // Canvas 初始化
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 自适应居中
    function resizeCanvasAndCenter() {
        // 设置新的画布大小
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (mode === 'text') {
            const newParticles = textToParticles(displayText);
            smoothTransitionToParticles(newParticles, false);
        } else if (mode === 'image' && lastImg) {
            generateImageParticles(lastImg);
        }
    }
    window.addEventListener('resize', resizeCanvasAndCenter);
    // 默认参数
    const DEFAULT_DENSITY = 6;
    const DEFAULT_SCALE = 2;
    const DEFAULT_ELASTICITY = 50;
    const DEFAULT_FORCE = 40;
    const DEFAULT_MONO_THRESHOLD = 170;
    const DEFAULT_MONO_INVERT = false;
    const DEFAULT_REMOVE_BG_COLOR = '#ffffff';
    const DEFAULT_REMOVE_BG_THRESHOLD = 32;

    // 手动上色状态
    let manualCanvasData = null;
    let manualCanvasParticlePositions = [];


    // DOM 元素
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeHelpModal = document.getElementById('closeHelpModal');
    const textGenBtn = document.getElementById('textGenBtn');
    const textGenBtnMobile = document.getElementById('textGenBtnMobile');
    const imgGenBtn = document.getElementById('imgGenBtn');
    const imgGenBtnMobile = document.getElementById('imgGenBtnMobile');
    const exportBtnMobile = document.getElementById('exportBtnMobile');
    const colorCirclePreview = document.getElementById('colorCirclePreview');
    const densitySlider = document.getElementById('densitySlider');
    const densityValue = document.getElementById('densityValue');
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomValue = document.getElementById('zoomValue');
    const elasticitySlider = document.getElementById('elasticitySlider');
    const elasticityValue = document.getElementById('elasticityValue');
    const forceSlider = document.getElementById('forceSlider');
    const forceValue = document.getElementById('forceValue');
    const densitySliderMobile = document.getElementById('densitySliderMobile');
    const densityValueMobile = document.getElementById('densityValueMobile');
    const zoomSliderMobile = document.getElementById('zoomSliderMobile');
    const zoomValueMobile = document.getElementById('zoomValueMobile');
    const elasticitySliderMobile = document.getElementById('elasticitySliderMobile');
    const elasticityValueMobile = document.getElementById('elasticityValueMobile');
    const forceSliderMobile = document.getElementById('forceSliderMobile');
    const forceValueMobile = document.getElementById('forceValueMobile');
    const mouseEffectBtn = document.getElementById('mouseEffectBtn');
    const mouseEffectBtnMobile = document.getElementById('mouseEffectBtnMobile');
    const particleSizeToggleBtn = document.getElementById('particleSizeToggleBtn');
    const textModal = document.getElementById('textModal');
    const closeTextModal = document.getElementById('closeTextModal');
    const fontSelect = document.getElementById('fontSelect');
    const textInput = document.getElementById('textInput');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const textGenDoBtn = document.getElementById('textGenDoBtn');
    const imgModal = document.getElementById('imgModal');
    const closeImgModal = document.getElementById('closeImgModal');
    const imgInput = document.getElementById('imgInput');
    const imgPreview = document.getElementById('imgPreview');
    const imgGenDoBtn = document.getElementById('imgGenDoBtn');
    const binarizeBtn = document.getElementById('binarizeBtn');
    const imgModeTip = document.getElementById('imgModeTip');
    const imgModeOrigin = document.getElementById('imgModeOrigin');
    const imgModeMono = document.getElementById('imgModeMono');
    const imgModeRemoveBg = document.getElementById('imgModeRemoveBg');
    const monoGroup = document.getElementById('monoGroup');
    const monoThreshold = document.getElementById('monoThreshold');
    const monoThresholdValue = document.getElementById('monoThresholdValue');
    const monoInvert = document.getElementById('monoInvert');
    const removeBgGroup = document.getElementById('removeBgGroup');
    const removeBgColor = document.getElementById('removeBgColor');
    const removeBgThreshold = document.getElementById('removeBgThreshold');
    const removeBgThresholdValue = document.getElementById('removeBgThresholdValue');
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    const exportHtmlBtn = document.getElementById('exportHtmlBtn');
    const exportImageBtn = document.getElementById('exportImageBtn');
    const exportTxtBtn = document.getElementById('exportTxtBtn');
    const imageFormatOptions = document.querySelectorAll('input[name="imageFormat"]');
    const imageQualityOption = document.getElementById('imageQualityOption');
    const imageQuality = document.getElementById('imageQuality');
    const imageQualityValue = document.getElementById('imageQualityValue');
    const txtExportSymbolFgInput = document.getElementById('txtExportSymbolFg');
    const txtExportSymbolBgInput = document.getElementById('txtExportSymbolBg');
    const gradientModal = document.getElementById('gradientModal');
    const closeGradientModal = document.getElementById('closeGradientModal');
    const gradientTypeOptions = document.querySelectorAll('input[name="gradientType"]');
    const gradientColor1Input = document.getElementById('gradientColor1');
    const gradientColor2Input = document.getElementById('gradientColor2');
    const gradientColor2Group = document.getElementById('gradientColor2Group');
    const gradientDirectionGroup = document.getElementById('gradientDirectionGroup');
    const gradientDirectionOptions = document.querySelectorAll('input[name="gradientDirection"]');
    const radialGradientGroup = document.getElementById('radialGradientGroup');
    const applyGradientBtn = document.getElementById('applyGradientBtn');
    const resetGradientBtn = document.getElementById('resetGradientBtn');
    const gradientPreview = document.getElementById('gradientPreview');
    const linearGradientPreview = document.getElementById('linearGradientPreview');
    const radialGradientPreview = document.getElementById('radialGradientPreview');
    const linearOffsetInput = document.getElementById('linearOffset');
    const linearOffsetValue = document.getElementById('linearOffsetValue');
    const linearOffsetSizeInput = document.getElementById('linearOffsetSize');
    const linearOffsetSizeValue = document.getElementById('linearOffsetSizeValue');
    const radialCenterXInput = document.getElementById('radialCenterX');
    const radialCenterXValue = document.getElementById('radialCenterXValue');
    const radialCenterYInput = document.getElementById('radialCenterY');
    const radialCenterYValue = document.getElementById('radialCenterYValue');
    const radialSizeInput = document.getElementById('radialSize');
    const radialSizeValue = document.getElementById('radialSizeValue');
    const radialShapeInput = document.getElementById('radialShape');
    const manualColorGroup = document.getElementById('manualColorGroup');
    const manualCanvasElement = document.getElementById('manualCanvas');
    const manualColorPicker = document.getElementById('manualColorPicker');
    const brushSizeInput = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const fillCanvasBtn = document.getElementById('fillCanvasBtn');
    const particleSizeToggleBtnMobile = document.getElementById('particleSizeToggleBtnMobile');

    // 全局变量
    let mode = 'text';
    let imageParticles = [];
    let lastImg = null;
    let latticeScale = DEFAULT_SCALE;
    let particleGap = 9 - DEFAULT_DENSITY;
    let elasticityFactor = 0.05;
    let maxPushForce = 0.15;
    let particles = [];
    let displayText = "NanoFlow⚛";
    let currentParticleSize = 1;
    let currentMonoThreshold = DEFAULT_MONO_THRESHOLD;
    let currentMonoInvert = DEFAULT_MONO_INVERT;
    let currentRemoveBgColor = DEFAULT_REMOVE_BG_COLOR;
    let currentRemoveBgThreshold = DEFAULT_REMOVE_BG_THRESHOLD;
    let savedDensity = String(DEFAULT_DENSITY);
    let savedScale = String(DEFAULT_SCALE);
    let savedElasticity = String(DEFAULT_ELASTICITY);
    let savedForce = String(DEFAULT_FORCE);
    let gradientType = 'linear';
    let gradientColor1 = '#000000';
    let gradientColor2 = '#ffffff';
    let gradientDirection = 'to-right';
    let radialCenterX = 50;
    let radialCenterY = 50;
    let radialSize = 100;
    let radialShape = 'circle';
    let linearOffset = 50;
    let linearOffsetSize = 100;
    let linearCenterY = 50;
    let manualCanvas = null;
    let manualCtx = null;
    let isDrawing = false;
    let brushSize = 20;
    let manualColor = '#000000';
    let previewStack = null;
    let imgElem = null;
    let canvasElem = null;
    let isPreviewed = false;
    let currentFont = '80px 微软雅黑';
    let mouseEffect = 'push';
    let lastDrawX = null, lastDrawY = null;

    // 通用样式设置函数
    function setPreviewElementStyle(element) {
        element.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            object-fit: contain;
        `;
    }

    // 字体选择事件监听
    if (fontSelect) {
        fontSelect.addEventListener('change', function () {
            const size = fontSizeSlider ? fontSizeSlider.value : 80;
            currentFont = `${size}px ${fontSelect.value}`;
            ctx.font = currentFont;
            const newParticles = textToParticles(displayText);
            smoothTransitionToParticles(newParticles, false);
        });
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (removeBgColor) {
        removeBgColor.addEventListener('input', function () {
            currentRemoveBgColor = this.value;
            if (imgModeRemoveBg && imgModeRemoveBg.checked && isPreviewed && canvasElem && canvasElem.style.display !== 'none') {
                removeBgPreviewImage(lastImg, currentRemoveBgColor, currentRemoveBgThreshold).then(newCanvas => {
                    if (canvasElem && canvasElem.parentNode) {
                        canvasElem.parentNode.removeChild(canvasElem);
                    }
                    canvasElem = newCanvas;
                    if (previewStack) {
                        previewStack.appendChild(canvasElem);
                        setPreviewElementStyle(canvasElem);
                    }
                    if (imgElem) imgElem.style.display = 'none';
                    if (canvasElem) canvasElem.style.display = 'block';
                });
            }
        });
    }
    if (removeBgThreshold && removeBgThresholdValue) {
        removeBgThreshold.addEventListener('input', function () {
            currentRemoveBgThreshold = parseInt(this.value, 10);
            removeBgThresholdValue.textContent = this.value;
            if (imgModeRemoveBg && imgModeRemoveBg.checked && isPreviewed && canvasElem && canvasElem.style.display !== 'none') {
                removeBgPreviewImage(lastImg, currentRemoveBgColor, currentRemoveBgThreshold).then(newCanvas => {
                    if (canvasElem && canvasElem.parentNode) {
                        canvasElem.parentNode.removeChild(canvasElem);
                    }
                    canvasElem = newCanvas;
                    if (previewStack) {
                        previewStack.appendChild(canvasElem);
                        setPreviewElementStyle(canvasElem);
                    }
                    if (imgElem) imgElem.style.display = 'none';
                    if (canvasElem) canvasElem.style.display = 'block';
                });
            }
        });
    }
    if (monoInvert) monoInvert.addEventListener('change', function () {
        currentMonoInvert = this.checked;
        if (imgModeMono && imgModeMono.checked && isPreviewed && canvasElem && canvasElem.style.display !== 'none') {
            // 直接刷新二值化canvas
            binarizeImage(lastImg, currentMonoThreshold, currentMonoInvert).then(newCanvas => {
                if (canvasElem && canvasElem.parentNode) {
                    canvasElem.parentNode.removeChild(canvasElem);
                }
                canvasElem = newCanvas;
                if (previewStack) {
                    previewStack.appendChild(canvasElem);
                    setPreviewElementStyle(canvasElem);
                }
                if (imgElem) imgElem.style.display = 'none';
                if (canvasElem) canvasElem.style.display = 'block';
            });
        }
    });

    // 切换模式时显示/隐藏参数
    function updateModeGroups() {
        if (imgModeMono && imgModeMono.checked) {
            // 切换到二值化模式
            if (monoGroup) monoGroup.style.display = 'flex';
            if (removeBgGroup) removeBgGroup.style.display = 'none';
            if (binarizeBtn) {
                binarizeBtn.style.display = '';
                binarizeBtn.textContent = '二值化预览';
            }
            if (imgModeTip) imgModeTip.style.display = 'none';
        } else if (imgModeRemoveBg && imgModeRemoveBg.checked) {
            // 切换到去背景模式
            if (monoGroup) monoGroup.style.display = 'none';
            if (removeBgGroup) removeBgGroup.style.display = 'flex';
            if (binarizeBtn) {
                binarizeBtn.style.display = '';
                binarizeBtn.textContent = '去背景预览';
            }
            if (imgModeTip) imgModeTip.style.display = 'none';
        } else if (imgModeOrigin && imgModeOrigin.checked) {
            // 切换到原图模式
            if (monoGroup) monoGroup.style.display = 'none';
            if (removeBgGroup) removeBgGroup.style.display = 'none';
            if (binarizeBtn) binarizeBtn.style.display = 'none';
            if (imgModeTip) {
                imgModeTip.style.display = '';
                imgModeTip.textContent = '原图模式较卡顿，建议降低密度';
            }
        }
        updateColorCirclePreview();
    }
    if (imgModeOrigin) imgModeOrigin.addEventListener('change', updateModeGroups);
    if (imgModeMono) imgModeMono.addEventListener('change', updateModeGroups);
    if (imgModeRemoveBg) imgModeRemoveBg.addEventListener('change', updateModeGroups);

    // 粒子类
    class Particle {
        constructor(x, y, cx, cy) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = x;
            this.baseY = y;
            this.cx = cx;
            this.cy = cy;
            this.destX = x;
            this.destY = y;
            this.size = currentParticleSize;
            this.vx = 0;
            this.vy = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.orbiting = false;
            this.orbitRadius = 0;
            this.orbitAngle = 0;
            this._orbitAngleInitialized = false;
            this.attracting = false;
            this.attractTargetX = 0;
            this.attractTargetY = 0;
            this.alpha = 1.0;
            this.targetAlpha = 1.0;
            this.fadeSpeed = 0.05;
            this.isFadingOut = false;
            this.isFadingIn = false;
        }
        update(mouse, disperseFactor, scatterStrength) {
            if (this.isFadingOut) {
                this.alpha -= this.fadeSpeed;
                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.isFadingOut = false;
                }
            } else if (this.isFadingIn) {
                this.alpha += this.fadeSpeed;
                if (this.alpha >= this.targetAlpha) {
                    this.alpha = this.targetAlpha;
                    this.isFadingIn = false;
                }
            }
            if (scatterStrength > 0.01) {
                let explosionFactor = Math.min(scatterStrength * 2.5, 6);
                this.offsetX += (Math.random() - 0.5) * scatterStrength * explosionFactor;
                this.offsetY += (Math.random() - 0.5) * scatterStrength * explosionFactor;
                let maxOffset = scatterStrength * 18 + 18;
                this.offsetX = Math.max(-maxOffset, Math.min(maxOffset, this.offsetX));
                this.offsetY = Math.max(-maxOffset, Math.min(maxOffset, this.offsetY));
                if (scatterStrength > 6) {
                    this.vx += (Math.random() - 0.5) * scatterStrength * 2;
                    this.vy += (Math.random() - 0.5) * scatterStrength * 2;
                }
            } else {
                this.offsetX *= 0.8;
                this.offsetY *= 0.8;
            }
            this.destX = this.cx + (this.baseX - this.cx) * disperseFactor + this.offsetX;
            this.destY = this.cy + (this.baseY - this.cy) * disperseFactor + this.offsetY;
            let dx = this.destX - this.x;
            let dy = this.destY - this.y;
            this.vx += dx * elasticityFactor;
            this.vy += dy * elasticityFactor;
            let enableEffect = (disperseFactor <= 1.01 && scatterStrength < 0.05 && mouse) || (scatterStrength > 0 && mouse);
            if (enableEffect) {
                let mx = mouse.x;
                let my = mouse.y;
                let dist2 = (this.x - mx) * (this.x - mx) + (this.y - my) * (this.y - my);
                let minDist = 18 + Math.min(mouse.speed * 2.5, 120);
                let thickness = (minDist * (1.5 + maxPushForce * 7)) ** 2;
                let baseForce = Math.min(mouse.speed * 0.02, maxPushForce);
                let angle = Math.atan2(this.y - my, this.x - mx);
                if (window.mouseEffect === 'attract') {
                    if (dist2 < thickness) {
                        let f = thickness / dist2;
                        f = Math.max(0.1, Math.min(f, 20));
                        if (f > 0.5 && f <= 1.5) f = 0.5;
                        let vx = f * Math.cos(angle);
                        let vy = f * Math.sin(angle);
                        this.vx -= vx * maxPushForce * 1.5 + ((this.baseX - this.x) * elasticityFactor) / 250;
                        this.vy -= vy * maxPushForce * 1.5 + ((this.baseY - this.y) * elasticityFactor) / 250;
                    }
                } else if (window.mouseEffect === 'orbit') {
                    let thickness = (minDist * (2.5 + maxPushForce * 7)) ** 2;
                    if (dist2 < thickness) {
                        let orbitStrength = 0.02 + 1.8 * Math.tanh(maxPushForce * 2);
                        let tangentAngle = angle + Math.PI / 2;
                        this.vx += Math.cos(tangentAngle) * orbitStrength;
                        this.vy += Math.sin(tangentAngle) * orbitStrength;
                    }
                } else {
                    if (dist2 < minDist * minDist) {
                        let force = (minDist - Math.sqrt(dist2)) * baseForce;
                        this.vx += Math.cos(angle) * force;
                        this.vy += Math.sin(angle) * force;
                    }
                }
            }
            if (!this.orbiting) {
                this.vx *= 0.7;
                this.vy *= 0.7;
                this.x += this.vx;
                this.y += this.vy;
            }
            if (this.orbiting && window.mouseEffect === 'orbit' && mouse.x >= 0 && mouse.y >= 0) {
                let bdx = this.baseX - mouse.x;
                let bdy = this.baseY - mouse.y;
                this.orbitRadius = Math.sqrt(bdx * bdx + bdy * bdy);
                if (!this._orbitAngleInitialized) {
                    this.orbitAngle = Math.atan2(bdy, bdx);
                    this._orbitAngleInitialized = true;
                }
                let speed = 0.012 + 0.018 * Math.tanh(maxPushForce * 2);
                this.orbitAngle += speed;
                let tx = mouse.x + this.orbitRadius * Math.cos(this.orbitAngle);
                let ty = mouse.y + this.orbitRadius * Math.sin(this.orbitAngle);
                let dx = tx - this.x;
                let dy = ty - this.y;
                this.vx += dx * elasticityFactor * 1.1;
                this.vy += dy * elasticityFactor * 1.1;
                this.vx *= 0.92;
                this.vy *= 0.92;
                this.x += this.vx;
                this.y += this.vy;
                return;
            } else {
                this._orbitAngleInitialized = false;
            }
        }
        draw() {
            if (this.alpha <= 0) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 文本转粒子
    function textToParticles(text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = currentFont;
        let maxTxtWidth = Math.min(canvas.width * 0.98, canvas.width - 10);
        function splitWord(word) {
            let result = [];
            let start = 0;
            while (start < word.length) {
                let end = start + 1;
                while (end <= word.length && ctx.measureText(word.slice(start, end)).width <= maxTxtWidth) {
                    end++;
                }
                result.push(word.slice(start, end - 1));
                start = end - 1;
            }
            return result;
        }
        let words = text.split(' ');
        let segments = [];
        for (let word of words) {
            if (ctx.measureText(word).width <= maxTxtWidth) {
                segments.push(word);
            } else {
                segments.push(...splitWord(word));
            }
        }
        let linesArray = [];
        let line = '';
        for (let seg of segments) {
            let testLine = line ? line + ' ' + seg : seg;
            if (ctx.measureText(testLine).width > maxTxtWidth) {
                if (line) linesArray.push(line);
                line = seg;
            } else {
                line = testLine;
            }
        }
        if (line) linesArray.push(line);
        let maxLineWidth = 0;
        linesArray.map(el => {
            let w = ctx.measureText(el).width;
            if (w > maxLineWidth) maxLineWidth = w;
            return w;
        });
        let offsetY = canvas.height / 2 - (linesArray.length - 1) * 60;
        ctx.textAlign = 'left';
        linesArray.forEach((el, index) => {
            ctx.fillStyle = 'white';
            ctx.fillText(el, canvas.width / 2 - maxLineWidth / 2, offsetY + index * 120);
        });
        ctx.textAlign = 'center';
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        let newParticles = [];
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;
        for (let y = 0; y < canvas.height; y += particleGap) {
            for (let x = 0; x < canvas.width; x += particleGap) {
                let sx = (x - cx) / latticeScale + cx;
                let sy = (y - cy) / latticeScale + cy;
                if (sx < 0 || sx >= canvas.width || sy < 0 || sy >= canvas.height) continue;
                let index = (Math.round(sy) * canvas.width + Math.round(sx)) * 4;
                if (index >= 0 && index < data.length && data[index + 3] > 128) {
                    let particle = new Particle(x, y, cx, cy);
                    particle.color = getParticleColor(x, y);
                    newParticles.push(particle);
                }
            }
        }
        return newParticles;
    }



    // 生成图片粒子点阵
    function generateImageParticles(img) {
        const maxW = 500, maxH = 500;
        let w = img.naturalWidth, h = img.naturalHeight;
        let scale = Math.min(maxW / w, maxH / h, 1);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
        const offCanvas = document.createElement('canvas');
        offCanvas.width = w;
        offCanvas.height = h;
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
        offCtx.drawImage(img, 0, 0, w, h);
        let imgData = offCtx.getImageData(0, 0, w, h);
        const gap = particleGap;
        const scaleL = latticeScale;
        let cx = canvas.width / 2;
        let cy = canvas.height / 2;
        imageParticles = [];
        const [bgR, bgG, bgB] = hexToRgb(currentRemoveBgColor);
        let maxX = 0, maxY = 0;
        for (let y = 0; y < canvas.height; y += gap) {
            for (let x = 0; x < canvas.width; x += gap) {
                let sx = (x - cx) / scaleL + w / 2;
                let sy = (y - cy) / scaleL + h / 2;
                if (sx < 0 || sx >= w || sy < 0 || sy >= h) continue;
                const idx = (Math.round(sy) * w + Math.round(sx)) * 4;
                const r = imgData.data[idx];
                const g = imgData.data[idx + 1];
                const b = imgData.data[idx + 2];
                const a = imgData.data[idx + 3];
                if (a > 128) {
                    let px = x, py = y;
                    let p = new Particle(px, py, cx, cy);
                    if (imgModeMono && imgModeMono.checked) {
                        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
                        if (currentMonoInvert ? gray >= currentMonoThreshold : gray < currentMonoThreshold) {
                            p.color = getParticleColor(px, py);
                            imageParticles.push(p);
                        }
                    } else if (imgModeRemoveBg && imgModeRemoveBg.checked) {
                        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
                        if (dist > currentRemoveBgThreshold) {
                            p.color = `rgba(${r},${g},${b},${a / 255})`;
                            imageParticles.push(p);
                        }
                    } else {
                        p.color = `rgba(${r},${g},${b},${a / 255})`;
                        imageParticles.push(p);
                    }
                    if (px > maxX) maxX = px;
                    if (py > maxY) maxY = py;
                }
            }
        }

    }

    function getCurrentParticles() {
        return (mode === 'image' && imageParticles.length) ? imageParticles : particles;
    }

    // 动画主循环
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, speed: 0 };
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        if (mouse.x < 0 || mouse.y < 0) {
            mouse.vx = 0;
            mouse.vy = 0;
            mouse.speed = 0;
        } else {
            mouse.vx = cx - mouse.x;
            mouse.vy = cy - mouse.y;
            mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        }
        mouse.x = cx;
        mouse.y = cy;
    });
    canvas.addEventListener('mouseleave', function () {
        mouse.x = -1000;
        mouse.y = -1000;
        mouse.vx = 0;
        mouse.vy = 0;
        mouse.speed = 0;
        let ps = getCurrentParticles();
        for (let p of ps) {
            p.orbiting = false;
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let disperseFactor = 1;
        let scatterStrength = 0;
        if (mouse) {
            if (mouse.speed > 220) {
                scatterStrength = Math.min((mouse.speed - 220) / 8, 16);
            }
        }
        let ps = getCurrentParticles();
        for (let p of ps) {
            p.update(mouse, disperseFactor, scatterStrength);
            if (p.alpha <= 0) continue;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            let color = p.color;
            if (p.alpha < 1.0) {
                if (color.startsWith('rgba')) {
                    color = color.replace(/[\d.]+\)$/, p.alpha + ')');
                } else if (color.startsWith('rgb')) {
                    color = color.replace('rgb', 'rgba').replace(')', `, ${p.alpha})`);
                } else {
                    const rgb = hexToRgb(color);
                    color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${p.alpha})`;
                }
            }
            ctx.fillStyle = color;
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }



    // 输入框事件
    textInput.addEventListener('input', function (e) {
        const newText = e.target.value || ' ';
        if (newText !== displayText) {
            displayText = newText;
            const newParticles = textToParticles(displayText);
            smoothTransitionToParticles(newParticles, false);
        }
    });

    // 字数统计
    if (textInput && charCount) {
        textInput.addEventListener('input', function () {
            charCount.textContent = textInput.value.length + '/150';
        });
        charCount.textContent = textInput.value.length + '/150';
    }

    function showModal(modal) {
        modal.classList.add('show');
    }
    function hideModal(modal) {
        modal.classList.remove('show');
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
        }, 250);
    }
    // 统一模态框打开/关闭事件绑定
    function bindModalOpenClose(openBtn, modal, closeBtn) {
        if (openBtn && modal && closeBtn) {
            openBtn.onclick = () => {
                if (openBtn === colorCirclePreview && mode === 'image' && !imgModeMono.checked) return;
                modal.style.display = 'flex';
                setTimeout(() => modal.classList.add('show'), 10);
                if (openBtn === textGenBtn && modal === textModal) {
                    mode = 'text';
                    const newParticles = textToParticles(displayText);
                    smoothTransitionToParticles(newParticles, false);
                }
                else if (openBtn === imgGenBtn && modal === imgModal) {
                    if (mode !== 'image') {
                        mode = 'image';
                        if (lastImg) {
                            generateImageParticles(lastImg);
                        }
                    } 
                }

            };
            closeBtn.onclick = () => {
                modal.classList.remove('show');
                modal.classList.add('fade-out');
                setTimeout(() => {
                    modal.style.display = 'none';
                    modal.classList.remove('fade-out');
                }, 250);
            };
        }
    }
    bindModalOpenClose(helpBtn, helpModal, closeHelpModal);
    bindModalOpenClose(textGenBtn, textModal, closeTextModal);
    bindModalOpenClose(imgGenBtn, imgModal, closeImgModal);
    bindModalOpenClose(exportBtn, exportModal, closeExportModal);
    bindModalOpenClose(colorCirclePreview, gradientModal, closeGradientModal);

    // 点击文字生成按钮关闭模态框
    if (textGenDoBtn) {
        textGenDoBtn.onclick = function () {
            hideModal(textModal);
        };
    }

    // 图片预览
    if (imgInput && imgPreview) {
        imgInput.addEventListener('change', function () {
            const file = imgInput.files && imgInput.files[0];
            if (file && file.type.startsWith('image/')) {
                imgPreview.innerHTML = '';
                previewStack = document.createElement('div');
                previewStack.className = 'preview-stack';
                imgPreview.appendChild(previewStack);
                imgElem = document.createElement('img');
                const reader = new FileReader();
                reader.onload = function (e) {
                    imgElem.src = e.target.result;
                    previewStack.appendChild(imgElem);
                    setPreviewElementStyle(imgElem);
                    lastImg = imgElem;
                    resetPreviewBtn();
                };
                reader.readAsDataURL(file);
            } else if (file) {
                alert('请选择有效的图片文件');
                imgInput.value = '';
            }
        });
    }

    // 图片生成按钮
    if (imgGenDoBtn) {
        imgGenDoBtn.onclick = function () {
            manualCanvasData = null;
            manualCanvasParticlePositions = [];
            imageParticles = [];
            generateImageParticles(lastImg);
            mode = 'image';
            hideModal(imgModal);
        };
    }

    // 密度滑动条逻辑
    function handleDensityChange(val) {
        const density = parseInt(val, 10);
        const gap = 9 - density;
        particleGap = gap;
        if (densitySlider) densitySlider.value = density;
        if (densitySliderMobile) densitySliderMobile.value = density;
        if (densityValue) densityValue.textContent = density;
        if (densityValueMobile) densityValueMobile.textContent = density;
        if (mode === 'image' && lastImg) {
            generateImageParticles(lastImg);
        } else {
            const newParticles = textToParticles(displayText);
            smoothTransitionToParticles(newParticles, false);
        }
    }

    // 缩放滑动条逻辑
    function handleZoomChange(val) {
        const zoom = parseFloat(val);
        latticeScale = zoom;
        if (zoomSlider) zoomSlider.value = zoom;
        if (zoomSliderMobile) zoomSliderMobile.value = zoom;
        if (zoomValue) zoomValue.textContent = zoom.toFixed(2);
        if (zoomValueMobile) zoomValueMobile.textContent = zoom.toFixed(2);
        if (mode === 'image' && lastImg) {
            generateImageParticles(lastImg);
        } else {
            const newParticles = textToParticles(displayText);
            smoothTransitionToParticles(newParticles, false);
        }
    }

    // 事件监听
    handleDensityChange(savedDensity);
    handleZoomChange(savedScale);
    handleElasticityChange(savedElasticity);
    handleForceChange(savedForce);

    if (densitySlider) densitySlider.addEventListener('input', e => handleDensityChange(e.target.value));
    if (densitySliderMobile) densitySliderMobile.addEventListener('input', e => {
        handleDensityChange(e.target.value);
        if (densitySlider) densitySlider.value = e.target.value;
    });
    if (zoomSlider) zoomSlider.addEventListener('input', e => handleZoomChange(e.target.value));
    if (zoomSliderMobile) zoomSliderMobile.addEventListener('input', e => {
        handleZoomChange(e.target.value);
        if (zoomSlider) zoomSlider.value = e.target.value;
    });

    // 自动加载示例图片并生成点阵
    const imgPath = 'NanoImg/logo_g.png';
    const preloadImg = new window.Image();
    preloadImg.src = imgPath;
    preloadImg.onload = function () {
        lastImg = preloadImg;
        mode = 'image';
        if (imgModeMono) imgModeMono.checked = true;
        updateModeGroups && updateModeGroups();
        generateImageParticles(preloadImg);

        // 自动填充图片生成模态框的预览
        if (imgPreview) {
            imgPreview.innerHTML = '';
            const previewStack = document.createElement('div');
            previewStack.className = 'preview-stack';
            imgPreview.appendChild(previewStack);
            const imgElem = document.createElement('img');
            imgElem.src = preloadImg.src;
            previewStack.appendChild(imgElem);
            setPreviewElementStyle(imgElem);
        }
    };


    // 移动端菜单逻辑
    menuToggle && menuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
    });

    // 同步按钮事件
    if (textGenBtn && textGenBtnMobile) {
        textGenBtnMobile.addEventListener('click', function () {
            textGenBtn.click();
            mobileMenu.classList.remove('show');
        });
    }
    if (imgGenBtn && imgGenBtnMobile) {
        imgGenBtnMobile.addEventListener('click', function () {
            imgGenBtn.click();
            mobileMenu.classList.remove('show');
        });
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }

        if (isPreviewed && imgModeMono && imgModeMono.checked && canvasElem && canvasElem.style.display !== 'none') {
            binarizeImage(lastImg, currentMonoThreshold, currentMonoInvert).then(newCanvas => {
                if (canvasElem && canvasElem.parentNode) {
                    canvasElem.parentNode.removeChild(canvasElem);
                }
                canvasElem = newCanvas;
                if (previewStack) {
                    previewStack.appendChild(canvasElem);
                    setPreviewElementStyle(canvasElem);
                }
                if (imgElem) imgElem.style.display = 'none';
                if (canvasElem) canvasElem.style.display = 'block';
            });
        }

        updateParticleColors();
    }

    themeToggleBtn.addEventListener('click', function () {
        const isCurrentlyDark = document.documentElement.classList.contains('dark-mode');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    applyTheme('light');

    function mapSliderToElasticity(sliderValue) {
        return 0.00084 * Math.pow(1.063, sliderValue);
    }

    function handleElasticityChange(sliderValue) {
        const value = parseInt(sliderValue, 10);
        elasticityFactor = mapSliderToElasticity(value);
        if (elasticitySlider) elasticitySlider.value = value;
        if (elasticitySliderMobile) elasticitySliderMobile.value = value;
        if (elasticityValue) elasticityValue.textContent = value;
        if (elasticityValueMobile) elasticityValueMobile.textContent = value;
    }

    if (elasticitySlider) {
        elasticitySlider.addEventListener('input', (e) => handleElasticityChange(e.target.value));
    }
    if (elasticitySliderMobile) {
        elasticitySliderMobile.addEventListener('input', (e) => handleElasticityChange(e.target.value));
    }

    function mapSliderToForce(sliderValue) {
        return 0.03 + 0.27 * Math.pow(sliderValue / 100, 1.7);
    }
    function handleForceChange(sliderValue) {
        const value = parseInt(sliderValue, 10);
        maxPushForce = mapSliderToForce(value);
        if (forceSlider) forceSlider.value = value;
        if (forceSliderMobile) forceSliderMobile.value = value;
        if (forceValue) forceValue.textContent = value;
        if (forceValueMobile) forceValueMobile.textContent = value;
    }
    if (forceSlider) {
        forceSlider.addEventListener('input', (e) => handleForceChange(e.target.value));
    }
    if (forceSliderMobile) {
        forceSliderMobile.addEventListener('input', (e) => handleForceChange(e.target.value));
    }

    // 导出点阵
    function exportReadonlySnapshotHTML() {
        const effect = window.mouseEffect || 'push';
        const templateMap = {
            push: 'export_template/particle_export_push.template',
            attract: 'export_template/particle_export_attract.template',
            orbit: 'export_template/particle_export_orbit.template'
        };
        const templateFile = templateMap[effect] || templateMap['push'];
        let ps = getCurrentParticles();
        const particleData = ps.map(p => ({
            x: p.x, y: p.y, baseX: p.baseX, baseY: p.baseY, cx: p.cx, cy: p.cy,
            vx: p.vx, vy: p.vy, offsetX: p.offsetX, offsetY: p.offsetY, size: p.size,
            color: p.color || null
        }));
        const cwidth = canvas.width;
        const cheight = canvas.height;
        const color = localStorage.getItem('particleColor') || '#000000';
        const elasticity = elasticityFactor;
        const force = maxPushForce;
        const gradientParams = JSON.stringify({
            type: gradientType,
            color1: gradientColor1,
            color2: gradientColor2,
            direction: gradientDirection,
            linearOffset,
            linearOffsetSize,
            linearCenterY,
            radialCenterX,
            radialCenterY,
            radialSize,
            radialShape,
            manualCanvasData: gradientType === 'manual' && manualCtx ? manualCtx.getImageData(0, 0, manualCanvas.width, manualCanvas.height).data : null,
            manualCanvasWidth: gradientType === 'manual' ? manualCanvas.width : null,
            manualCanvasHeight: gradientType === 'manual' ? manualCanvas.height : null
        });
        fetch(templateFile)
            .then(res => res.text())
            .then(template => {
                let html = template
                    .replace(/\{\{cwidth\}\}/g, cwidth)
                    .replace(/\{\{cheight\}\}/g, cheight)
                    .replace(/\{\{elasticityFactor\}\}/g, elasticity)
                    .replace(/\{\{maxPushForce\}\}/g, force)
                    .replace(/\{\{particles\}\}/g, JSON.stringify(particleData));
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `NanoFlowExport_${effect}.html`;
                document.body.appendChild(a);
                a.click();
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
            });
    }

    if (exportBtn) exportBtn.addEventListener('click', function () {
        exportModal.style.display = 'flex';
        setTimeout(() => showModal(exportModal), 10);
    });

    if (exportBtnMobile) exportBtnMobile.addEventListener('click', function () {
        exportModal.style.display = 'flex';
        setTimeout(() => showModal(exportModal), 10);
        if (mobileMenu) mobileMenu.classList.remove('show');
    });

    // 可拖拽模态框功能
    function enableModalDrag(modalId) {
        const modal = document.getElementById(modalId);
        const content = modal && modal.querySelector('.modal-content');
        const dragBar = content && content.querySelector('.modal-drag-bar');
        if (!modal || !content || !dragBar) return;
        let isDragging = false;
        let startX = 0, startY = 0;
        let origLeft = 0, origTop = 0;
        content.style.position = 'relative';
        dragBar.addEventListener('mousedown', function (e) {
            if (e.button !== 0) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = content.getBoundingClientRect();
            origLeft = rect.left;
            origTop = rect.top;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;
            let dx = e.clientX - startX;
            let dy = e.clientY - startY;
            content.style.left = (origLeft + dx) + 'px';
            content.style.top = (origTop + dy) + 'px';
            content.style.position = 'fixed';
        });
        document.addEventListener('mouseup', function () {
            isDragging = false;
            document.body.style.userSelect = '';
        });
    }
    enableModalDrag('textModal');
    enableModalDrag('imgModal');
    enableModalDrag('helpModal');
    enableModalDrag('exportModal');
    enableModalDrag('gradientModal');
    
    // 渐变相关函数（需要在二值化函数之前定义）
    function getParticleColor(x, y) {
        const isDark = document.documentElement.classList.contains('dark-mode');

        if (gradientType === 'solid') {
            return gradientColor1;
        } else if (gradientType === 'linear') {
            let progress = 0;
            if (gradientDirection === 'to-right') {
                progress = (x / canvas.width) - (linearOffset / 100 - 0.5) * 2;
            } else if (gradientDirection === 'to-bottom') {
                progress = (y / canvas.height) - (linearOffset / 100 - 0.5) * 2;
            } else if (gradientDirection === 'to-bottom-right') {
                progress = (x + y) / (canvas.width + canvas.height) - (linearOffset / 100 - 0.5) * 2;
            } else if (gradientDirection === 'to-bottom-left') {
                progress = ((canvas.width - x) + y) / (canvas.width + canvas.height) - (linearOffset / 100 - 0.5) * 2;
            }
            const transitionWidth = linearOffsetSize / 100;
            const center = linearOffset / 100;
            const halfWidth = transitionWidth / 2;

            if (progress < center - halfWidth) {
                progress = 0;
            } else if (progress > center + halfWidth) {
                progress = 1;
            } else {
                const normalizedProgress = (progress - (center - halfWidth)) / transitionWidth;
                progress = normalizedProgress;
            }
            progress = Math.max(0, Math.min(1, progress));
            return interpolateColor(gradientColor1, gradientColor2, progress);
        } else if (gradientType === 'radial') {
            const centerX = (radialCenterX / 100) * canvas.width;
            const centerY = (radialCenterY / 100) * canvas.height;
            let maxDist, dist;
            if (radialShape === 'rect') {
                const dx = Math.max(centerX, canvas.width - centerX);
                const dy = Math.max(centerY, canvas.height - centerY);
                maxDist = Math.max(dx, dy) * (radialSize / 100);
                dist = Math.max(Math.abs(x - centerX), Math.abs(y - centerY));
            } else if (radialShape === 'diamond') {
                const dx = Math.max(centerX, canvas.width - centerX);
                const dy = Math.max(centerY, canvas.height - centerY);
                maxDist = (dx + dy) * (radialSize / 100);
                dist = Math.abs(x - centerX) + Math.abs(y - centerY);
            } else if (radialShape === 'cross') {
                const dx = Math.max(centerX, canvas.width - centerX);
                const dy = Math.max(centerY, canvas.height - centerY);
                maxDist = Math.min(dx, dy) * (radialSize / 100);
                dist = Math.min(Math.abs(x - centerX), Math.abs(y - centerY));
            } else {
                maxDist = Math.min(canvas.width, canvas.height) * (radialSize / 100) / 2;
                dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            }
            const progress = Math.min(dist / maxDist, 1);
            return interpolateColor(gradientColor1, gradientColor2, progress);
        } else if (gradientType === 'manual') {
            return getManualColor(x, y);
        }

        if (mode === 'image' && imgModeMono && imgModeMono.checked) {
            return isDark ? '#ffffff' : '#000000';
        }

        return gradientColor1;
    }

    function interpolateColor(color1, color2, progress) {
        const rgb1 = hexToRgb(color1);
        const rgb2 = hexToRgb(color2);
        const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * progress);
        const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * progress);
        const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * progress);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
        const num = parseInt(hex, 16);
        return [num >> 16 & 255, num >> 8 & 255, num & 255];
    }

    async function binarizeImage(img, threshold, invert) {
        const maxW = 300, maxH = 220;
        let w = img.naturalWidth, h = img.naturalHeight;
        let scale = Math.min(maxW / w, maxH / h, 1);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const isDark = document.documentElement.classList.contains('dark-mode');
        const foregroundColor = isDark ? [255, 255, 255] : [0, 0, 0];
        for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3];
            if (alpha < 10) {
                data[i + 3] = 0;
                continue;
            }
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            let isForeground = !invert ? (gray < threshold) : (gray >= threshold);
            if (isForeground) {
                data[i] = foregroundColor[0];
                data[i + 1] = foregroundColor[1];
                data[i + 2] = foregroundColor[2];
                data[i + 3] = 255;
            } else {
                data[i + 3] = 0;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        return canvas;
    }

    async function removeBgPreviewImage(img, hex, threshold) {
        const [bgR, bgG, bgB] = hexToRgb(hex);
        const maxW = 300, maxH = 220;
        let w = img.naturalWidth, h = img.naturalHeight;
        let scale = Math.min(maxW / w, maxH / h, 1);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
            if (dist <= threshold) {
                data[i + 3] = 0;
            }
        }
        ctx.putImageData(imgData, 0, 0);
        return canvas;
    }

    function resetPreviewBtn() {
        isPreviewed = false;
        if (previewStack) {
            const img = previewStack.querySelector('img');
            if (img) img.style.display = 'block';
            const canvases = previewStack.querySelectorAll('canvas');
            canvases.forEach(c => c.parentNode && c.parentNode.removeChild(c));
        }
        if (binarizeBtn) {
            if (imgModeRemoveBg && imgModeRemoveBg.checked) {
                binarizeBtn.textContent = '去背景预览';
            } else if (imgModeMono && imgModeMono.checked) {
                binarizeBtn.textContent = '二值化预览';
            }
        }
    }

    if (binarizeBtn && imgPreview) {
        if (imgModeMono) imgModeMono.addEventListener('change', resetPreviewBtn);
        if (imgModeRemoveBg) imgModeRemoveBg.addEventListener('change', resetPreviewBtn);
    }

    if (binarizeBtn) {
        binarizeBtn.onclick = async function () {
            if (!previewStack) {
                imgPreview.innerHTML = '';
                previewStack = document.createElement('div');
                previewStack.className = 'preview-stack';
                imgPreview.appendChild(previewStack);
            }
            if (!imgElem) {
                imgElem = document.createElement('img');
                previewStack.appendChild(imgElem);
                setPreviewElementStyle(imgElem);
            }
            imgElem.src = lastImg.src;
            if (canvasElem && canvasElem.parentNode) canvasElem.parentNode.removeChild(canvasElem);
            if (imgModeMono && imgModeMono.checked) {
                canvasElem = await binarizeImage(lastImg, currentMonoThreshold, currentMonoInvert);
            } else if (imgModeRemoveBg && imgModeRemoveBg.checked) {
                canvasElem = await removeBgPreviewImage(lastImg, currentRemoveBgColor, currentRemoveBgThreshold);
            }
            if (canvasElem) {
                previewStack.appendChild(canvasElem);
                setPreviewElementStyle(canvasElem);
            }
            if (!isPreviewed) {
                imgElem.style.display = 'none';
                canvasElem.style.display = 'block';
                binarizeBtn.textContent = '显示原图';
                isPreviewed = true;
            } else {
                imgElem.style.display = 'block';
                if (canvasElem) canvasElem.style.display = 'none';
                binarizeBtn.textContent = (imgModeRemoveBg && imgModeRemoveBg.checked) ? '去背景预览' : '二值化预览';
                isPreviewed = false;
            }
        };
    }

    if (removeBgThreshold) {
        removeBgThreshold.addEventListener('input', async function () {
            if (binarizeBtn && binarizeBtn.style.display !== 'none' && imgModeRemoveBg && imgModeRemoveBg.checked && imgPreview && lastImg) {
                if (binarizeBtn.textContent === '显示原图') {
                    binarizeBtn.click();
                    binarizeBtn.click();
                }
            }
        });
    }
    if (removeBgColor) {
        removeBgColor.addEventListener('input', async function () {
            if (binarizeBtn && binarizeBtn.style.display !== 'none' && imgModeRemoveBg && imgModeRemoveBg.checked && imgPreview && lastImg) {
                if (binarizeBtn.textContent === '显示原图') {
                    binarizeBtn.click();
                    binarizeBtn.click();
                }
            }
        });
    }
    if (monoThreshold && monoThresholdValue) {
        monoThreshold.addEventListener('input', function () {
            currentMonoThreshold = parseInt(this.value, 10);
            monoThresholdValue.textContent = this.value;
            if (imgModeMono && imgModeMono.checked && isPreviewed && canvasElem && canvasElem.style.display !== 'none') {
                binarizeImage(lastImg, currentMonoThreshold, currentMonoInvert).then(newCanvas => {
                    if (canvasElem && canvasElem.parentNode) {
                        canvasElem.parentNode.removeChild(canvasElem);
                    }
                    canvasElem = newCanvas;
                    if (previewStack) {
                        previewStack.appendChild(canvasElem);
                        setPreviewElementStyle(canvasElem);
                    }
                    if (imgElem) imgElem.style.display = 'none';
                    if (canvasElem) canvasElem.style.display = 'block';
                });
            }
        });
    }
    if (monoInvert) {
        monoInvert.addEventListener('change', async function () {
            if (binarizeBtn && binarizeBtn.style.display !== 'none' && imgModeMono && imgModeMono.checked && imgPreview && lastImg) {
                if (binarizeBtn.textContent === '显示原图') {
                    binarizeBtn.click();
                    binarizeBtn.click();
                }
            }
        });
    }


    animate();



    if (exportHtmlBtn) {
        exportHtmlBtn.onclick = () => {
            exportReadonlySnapshotHTML();
            exportModal.classList.remove('show');
            setTimeout(() => { exportModal.style.display = 'none'; }, 250);
        };
    }

    if (exportImageBtn) {
        exportImageBtn.onclick = () => {
            const selectedFormat = document.querySelector('input[name="imageFormat"]:checked').value;
            if (selectedFormat === 'svg') {
                exportSVG();
            } else {
                exportImage();
            }
            exportModal.classList.remove('show');
            setTimeout(() => { exportModal.style.display = 'none'; }, 250);
        };
    }

    imageFormatOptions.forEach(option => {
        option.addEventListener('change', function () {
            if (this.value === 'jpg' || this.value === 'webp') {
                imageQualityOption.style.display = 'flex';
            } else {
                imageQualityOption.style.display = 'none';
            }
        });
    });

    if (imageQuality && imageQualityValue) {
        imageQuality.addEventListener('input', function () {
            const value = Math.round(this.value * 100);
            imageQualityValue.textContent = value + '%';
        });
    }

    function exportImage() {
        const selectedFormat = document.querySelector('input[name="imageFormat"]:checked').value;
        const quality = imageQuality ? parseFloat(imageQuality.value) : 0.8;
        if (selectedFormat === 'svg') {
            exportSVG();
            return;
        }
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.fillStyle = getComputedStyle(canvas).backgroundColor || '#f4f4f8';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        let ps = getCurrentParticles();
        for (let p of ps) {
            tempCtx.beginPath();
            tempCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            //图片模式下（且不是二值化）直接用粒子的 color
            if (mode === 'image' && !(imgModeMono && imgModeMono.checked)) {
                tempCtx.fillStyle = p.color;
            }
            else {
                const particleColor = getParticleColor(p.x, p.y);
                tempCtx.fillStyle = particleColor;
            }
            tempCtx.fill();
        }
        let mimeType = 'image/png';
        let fileName = `NanoFlowExport.${selectedFormat}`;
        if (selectedFormat === 'jpg') {
            mimeType = 'image/jpeg';
            tempCtx.globalCompositeOperation = 'destination-over';
            tempCtx.fillStyle = '#ffffff';
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        } else if (selectedFormat === 'webp') {
            mimeType = 'image/webp';
        }
        tempCanvas.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        }, mimeType, selectedFormat === 'jpg' ? quality : undefined);
    }

    function exportSVG() {
        let ps = getCurrentParticles();
        const bgColor = getComputedStyle(canvas).backgroundColor || '#f4f4f8';
        let svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${bgColor}"/>
`;
        for (let p of ps) {
            svgContent += `  <circle cx="${p.x}" cy="${p.y}" r="${p.size}" fill="${p.color}"/>
`;
        }
        svgContent += '</svg>';
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'NanoFlowExport.svg';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }



    function initGradientModal() {
        if (gradientColor1Input) gradientColor1Input.value = gradientColor1;
        if (gradientColor2Input) gradientColor2Input.value = gradientColor2;
        gradientTypeOptions.forEach(option => {
            if (option.value === gradientType) {
                option.checked = true;
            }
        });
        gradientDirectionOptions.forEach(option => {
            if (option.value === gradientDirection) {
                option.checked = true;
            }
        });
        if (linearOffsetInput) {
            linearOffsetInput.value = linearOffset;
            if (linearOffsetValue) linearOffsetValue.textContent = linearOffset + '%';
        }
        if (linearOffsetSizeInput) {
            linearOffsetSizeInput.value = linearOffsetSize;
            if (linearOffsetSizeValue) linearOffsetSizeValue.textContent = linearOffsetSize + '%';
        }
        updateGradientUI();
        updateGradientPreview();
        if (gradientType === 'manual') {
            initManualColorMode();
        }
    }

    function updateGradientUI() {
        if (gradientColor2Group) gradientColor2Group.style.display = 'none';
        if (gradientDirectionGroup) gradientDirectionGroup.style.display = 'none';
        if (radialGradientGroup) radialGradientGroup.style.display = 'none';
        if (manualColorGroup) manualColorGroup.style.display = 'none';
        const gradientColorsGroup = document.querySelector('.gradient-colors-group');
        if (gradientType === 'solid') {
            if (gradientColorsGroup) gradientColorsGroup.style.display = 'block';
        } else if (gradientType === 'linear') {
            if (gradientColor2Group) gradientColor2Group.style.display = 'flex';
            if (gradientDirectionGroup) gradientDirectionGroup.style.display = 'block';
            if (gradientColorsGroup) gradientColorsGroup.style.display = 'block';
        } else if (gradientType === 'radial') {
            if (gradientColor2Group) gradientColor2Group.style.display = 'flex';
            if (radialGradientGroup) radialGradientGroup.style.display = 'block';
            if (gradientColorsGroup) gradientColorsGroup.style.display = 'block';
        } else if (gradientType === 'manual') {
            if (manualColorGroup) manualColorGroup.style.display = 'block';
            if (gradientColorsGroup) gradientColorsGroup.style.display = 'none';
        }
    }

    function setGradientPreviewStyle(element, gradientCSS) {
        element.style.cssText = `
            width: 120px;
            height: 30px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
            margin: 12px auto;
            ${gradientCSS}
        `;
    }
    function updateGradientPreview() {
        if (gradientType === 'solid') {
            if (gradientPreview) gradientPreview.style.display = 'none';
            if (linearGradientPreview) linearGradientPreview.style.display = 'none';
            if (radialGradientPreview) radialGradientPreview.style.display = 'none';
        } else if (gradientType === 'linear') {
            if (gradientPreview) gradientPreview.style.display = 'none';
            if (linearGradientPreview) linearGradientPreview.style.display = 'block';
            if (radialGradientPreview) radialGradientPreview.style.display = 'none';
            let direction = 'to right';
            if (gradientDirection === 'to-bottom') direction = 'to bottom';
            else if (gradientDirection === 'to-bottom-right') direction = 'to bottom right';
            else if (gradientDirection === 'to-bottom-left') direction = 'to bottom left';
            const halfWidth = linearOffsetSize / 200;
            const startPos = Math.max(0, (linearOffset / 100) - halfWidth);
            const endPos = Math.min(1, (linearOffset / 100) + halfWidth);
            const gradientCSS = `background: linear-gradient(${direction}, ${gradientColor1} 0%, ${gradientColor1} ${startPos * 100}%, ${gradientColor2} ${endPos * 100}%, ${gradientColor2} 100%);`;
            setGradientPreviewStyle(linearGradientPreview, gradientCSS);
        } else if (gradientType === 'radial') {
            if (gradientPreview) gradientPreview.style.display = 'none';
            if (linearGradientPreview) linearGradientPreview.style.display = 'none';
            if (radialGradientPreview) radialGradientPreview.style.display = 'block';
            const centerX = radialCenterX;
            const centerY = radialCenterY;
            const size = radialSize;
            const gradientCSS = `background: radial-gradient(circle ${size}px at ${centerX}% ${centerY}%, ${gradientColor1} 0%, ${gradientColor2} 100%);`;
            setGradientPreviewStyle(radialGradientPreview, gradientCSS);
        }
    }

    gradientTypeOptions.forEach(option => {
        option.addEventListener('change', function () {
            gradientType = this.value;
            updateGradientUI();
            updateGradientPreview();
            if (gradientType === 'manual') {
                initManualColorMode();
            }
            updateParticleColors();
        });
    });

    if (gradientColor1Input) {
        gradientColor1Input.addEventListener('input', function () {
            gradientColor1 = this.value;
            updateGradientPreview();
            updateParticleColors();
        });
    }

    if (gradientColor2Input) {
        gradientColor2Input.addEventListener('input', function () {
            gradientColor2 = this.value;
            updateGradientPreview();
            updateParticleColors();
        });
    }

    gradientDirectionOptions.forEach(option => {
        option.addEventListener('change', function () {
            gradientDirection = this.value;
            updateGradientPreview();
            updateParticleColors();
        });
    });

    if (linearOffsetInput && linearOffsetValue) {
        linearOffsetInput.addEventListener('input', function () {
            linearOffset = parseInt(this.value);
            linearOffsetValue.textContent = linearOffset + '%';
            updateGradientPreview();
            updateParticleColors();
        });
    }

    if (linearOffsetSizeInput && linearOffsetSizeValue) {
        linearOffsetSizeInput.addEventListener('input', function () {
            linearOffsetSize = parseInt(this.value);
            linearOffsetSizeValue.textContent = linearOffsetSize + '%';
            updateGradientPreview();
            updateParticleColors();
        });
    }

    applyGradientBtn.addEventListener('click', function () {
        hideModal(gradientModal);
    });

    resetGradientBtn.addEventListener('click', function () {
        if (gradientType === 'manual') {
            clearManualCanvas(); 
        }
        const isDark = document.documentElement.classList.contains('dark-mode');
        if (isDark) {
            gradientColor1 = '#ffffff';
            gradientColor2 = '#000000';
        } else {
            gradientColor1 = '#000000';
            gradientColor2 = '#ffffff';
        }
        gradientDirection = 'to-right';
        radialCenterX = 50;
        radialCenterY = 50;
        radialSize = 100;
        radialShape = 'circle';
        linearOffset = 50;
        linearOffsetSize = 100;
        linearCenterY = 50;
        initGradientModal();
        updateColorCirclePreview();
        updateParticleColors();
    });

    initGradientModal();

    function updateColorCirclePreview() {
        if (!colorCirclePreview) return;
        if (mode === 'image' && !imgModeMono.checked) {
            colorCirclePreview.classList.remove('rainbow-border');
            colorCirclePreview.style.background = 'transparent';
            return;
        }
        if (gradientType === 'solid') {
            colorCirclePreview.classList.remove('rainbow-border');
            colorCirclePreview.style.background = gradientColor1;
        } else if (gradientType === 'linear') {
            colorCirclePreview.classList.remove('rainbow-border');
            let direction = 'to right';
            if (gradientDirection === 'to-bottom') direction = 'to bottom';
            else if (gradientDirection === 'to-bottom-right') direction = 'to bottom right';
            else if (gradientDirection === 'to-bottom-left') direction = 'to bottom left';
            colorCirclePreview.style.background = `linear-gradient(${direction}, ${gradientColor1}, ${gradientColor2})`;
        } else if (gradientType === 'radial') {
            colorCirclePreview.classList.remove('rainbow-border');
            colorCirclePreview.style.background = `radial-gradient(circle at 50% 50%, ${gradientColor1} 0%, ${gradientColor2} 100%)`;
        } else if (gradientType === 'manual') {
            colorCirclePreview.style.background = 'transparent';
            colorCirclePreview.classList.add('rainbow-border');
        }
    }
    updateColorCirclePreview();
    [gradientColor1Input, gradientColor2Input].forEach(input => {
        if (input) input.addEventListener('input', updateColorCirclePreview);
    });
    gradientTypeOptions.forEach(option => {
        option.addEventListener('change', updateColorCirclePreview);
    });
    gradientDirectionOptions.forEach(option => {
        option.addEventListener('change', updateColorCirclePreview);
    });


    //字体大小滑动条
    if (fontSizeSlider && fontSizeValue) {
        fontSizeSlider.addEventListener('input', function () {
            const size = parseInt(this.value, 10);
            fontSizeValue.textContent = size;
            currentFont = `${size}px ${fontSelect.value}`;
            ctx.font = currentFont;
            const newParticles = textToParticles(displayText);
            smoothTransitionToParticles(newParticles, false);
        });
        fontSizeValue.textContent = fontSizeSlider.value;
    }
    if (fontSelect) {
        fontSelect.addEventListener('change', function () {
            const size = fontSizeSlider ? fontSizeSlider.value : 80;
            currentFont = `${size}px ${fontSelect.value}`;
            ctx.font = currentFont;
        });
    }

    if (radialCenterXInput && radialCenterXValue) {
        radialCenterXInput.addEventListener('input', function () {
            radialCenterX = parseInt(this.value, 10);
            radialCenterXValue.textContent = this.value + '%';
            updateGradientPreview();
            updateParticleColors();
        });
    }
    if (radialCenterYInput && radialCenterYValue) {
        radialCenterYInput.addEventListener('input', function () {
            radialCenterY = parseInt(this.value, 10);
            radialCenterYValue.textContent = this.value + '%';
            updateGradientPreview();
            updateParticleColors();
        });
    }
    if (radialSizeInput && radialSizeValue) {
        radialSizeInput.addEventListener('input', function () {
            radialSize = parseInt(this.value, 10);
            radialSizeValue.textContent = this.value + '%';
            updateGradientPreview();
            updateParticleColors();
        });
    }
    if (radialShapeInput) {
        radialShapeInput.addEventListener('change', function () {
            radialShape = this.value;
            updateGradientPreview();
            updateParticleColors();
        });
    }

    const shapeRadios = document.querySelectorAll('input[name="radialShape"]');
    if (shapeRadios) {
        shapeRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    radialShape = this.value;
                    updateGradientPreview();
                    updateParticleColors();
                }
            });
        });
    }

    if (manualColorPicker) {
        manualColorPicker.addEventListener('input', function () {
            manualColor = this.value;
        });
    }

    if (brushSizeInput && brushSizeValue) {
        brushSizeInput.addEventListener('input', function () {
            brushSize = parseInt(this.value);
            brushSizeValue.textContent = brushSize;
        });
    }



    if (fillCanvasBtn) {
        fillCanvasBtn.addEventListener('click', fillManualCanvas);
    }

    const particleSizeText = ['小', '中', '大'];
    function setParticleSize(size) {
        currentParticleSize = size;
        let ps = getCurrentParticles();
        ps.forEach(p => p.size = size);
        if (particleSizeToggleBtn) particleSizeToggleBtn.textContent = particleSizeText[size - 1];
        if (particleSizeToggleBtnMobile) particleSizeToggleBtnMobile.textContent = particleSizeText[size - 1];
    }
    if (particleSizeToggleBtn) {
        particleSizeToggleBtn.addEventListener('click', function () {
            let nextSize = currentParticleSize % 3 + 1;
            setParticleSize(nextSize);
        });
    }
    if (particleSizeToggleBtnMobile) {
        particleSizeToggleBtnMobile.addEventListener('click', function () {
            let nextSize = currentParticleSize % 3 + 1;
            setParticleSize(nextSize);
        });
    }
    if (exportTxtBtn) {
        exportTxtBtn.addEventListener('click', function () {
            if (mode === 'image' && !imgModeMono.checked) {
                alert('图像生成的点阵仅支持二值化模式下导出TXT');
                return;
            }
            const fgSymbol = (txtExportSymbolFgInput && txtExportSymbolFgInput.value) ? txtExportSymbolFgInput.value : '.';
            const bgSymbol = (txtExportSymbolBgInput && txtExportSymbolBgInput.value) ? txtExportSymbolBgInput.value : ' ';
            let ps = getCurrentParticles();
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            ps.forEach(p => {
                if (p.x < minX) minX = p.x;
                if (p.y < minY) minY = p.y;
                if (p.x > maxX) maxX = p.x;
                if (p.y > maxY) maxY = p.y;
            });
            const step = particleGap > 0 ? particleGap : 1;
            let txt = '';
            for (let y = Math.round(minY); y <= Math.round(maxY); y += step) {
                for (let x = Math.round(minX); x <= Math.round(maxX); x += step) {
                    let found = ps.some(p => Math.abs(p.x - x) < step / 2 && Math.abs(p.y - y) < step / 2);
                    txt += found ? fgSymbol : bgSymbol;
                }
                txt += '\n';
            }
            const blob = new Blob([txt], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'NanoFlowExport.txt';
            document.body.appendChild(a);
            a.click();
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        });
    }

    function smoothTransitionToParticles(newParticles, isImageMode = false) {
        const currentParticles = getCurrentParticles();
        const currentCount = currentParticles.length;
        const newCount = newParticles.length;

        const particlesToReuse = Math.min(currentCount, newCount);

        for (let i = 0; i < particlesToReuse; i++) {
            const currentParticle = currentParticles[i];
            const newParticle = newParticles[i];
            currentParticle.baseX = newParticle.baseX;
            currentParticle.baseY = newParticle.baseY;
            currentParticle.destX = newParticle.destX;
            currentParticle.destY = newParticle.destY;
            currentParticle.cx = newParticle.cx;
            currentParticle.cy = newParticle.cy;
            currentParticle.size = newParticle.size;
            currentParticle.color = newParticle.color;
            currentParticle.alpha = 1.0;
            currentParticle.targetAlpha = 1.0;
            currentParticle.isFadingOut = false;
            currentParticle.isFadingIn = false;
        }

        for (let i = particlesToReuse; i < currentCount; i++) {
            currentParticles[i].isFadingOut = true;
            currentParticles[i].targetAlpha = 0;
        }

        for (let i = particlesToReuse; i < newCount; i++) {
            const newParticle = newParticles[i];
            newParticle.alpha = 0;
            newParticle.targetAlpha = 1.0;
            newParticle.isFadingIn = true;
            newParticle.isFadingOut = false;

            if (isImageMode) {
                imageParticles.push(newParticle);
            } else {
                particles.push(newParticle);
            }
        }

        setTimeout(() => {
            const currentParticles = getCurrentParticles();
            for (let i = currentParticles.length - 1; i >= 0; i--) {
                if (currentParticles[i].alpha <= 0) {
                    currentParticles.splice(i, 1);
                }
            }
        }, 1000);
    }

    function updateParticleColors() {
        // 同时刷新图片和文字两种模式的粒子颜色
        [particles, imageParticles].forEach(particleArray => {
            particleArray.forEach(particle => {
                if (mode === 'image' && particle.color && particle.color.startsWith('rgba')) {
                    return;
                } else if (gradientType === 'manual') {
                    particle.color = getManualColor(particle.x, particle.y);
                } else {
                    particle.color = getParticleColor(particle.x, particle.y);
                }
            });
        });
    }

    function initManualColorMode() {
        if (!manualCanvasElement) return;
        manualCanvas = manualCanvasElement;
        manualCtx = manualCanvas.getContext('2d');
        if (manualCanvasData) {
            // 恢复上次的上色内容
            const imageData = new ImageData(
                new Uint8ClampedArray(manualCanvasData),
                manualCanvas.width,
                manualCanvas.height
            );
            manualCtx.putImageData(imageData, 0, 0);
        } else {
            // 没有上色内容时才绘制灰色点阵
            manualCtx.clearRect(0, 0, manualCanvas.width, manualCanvas.height);
            let arr = (mode === 'image' && imageParticles.length) ? imageParticles : particles;
            manualCtx.fillStyle = '#e0e0e0';
            arr.forEach(particle => {
                const canvasWidth = manualCanvas.width;
                const canvasHeight = manualCanvas.height;
                const canvasX = (particle.baseX / canvas.width) * canvasWidth;
                const canvasY = (particle.baseY / canvas.height) * canvasHeight;
                manualCtx.beginPath();
                manualCtx.arc(canvasX, canvasY, 2, 0, Math.PI * 2);
                manualCtx.fill();
            });
        }
        manualCanvasParticlePositions = getCurrentParticles().map(p => ({ baseX: p.baseX, baseY: p.baseY }));
        manualCanvasWidth = manualCanvas.width;
        manualCanvasHeight = manualCanvas.height;
        manualCanvas.addEventListener('mousedown', startDrawing);
        manualCanvas.addEventListener('mousemove', draw);
        manualCanvas.addEventListener('mouseup', stopDrawing);
        manualCanvas.addEventListener('mouseleave', stopDrawing);
        manualCanvas.addEventListener('touchstart', handleTouchStart);
        manualCanvas.addEventListener('touchmove', handleTouchMove);
        manualCanvas.addEventListener('touchend', stopDrawing);
        updateParticleColors();
    }

    function drawParticlePositions() {
        if (!manualCtx) return;

        const particles = getCurrentParticles();
        if (particles.length === 0) return;

        const canvasWidth = manualCanvas.width;
        const canvasHeight = manualCanvas.height;

        manualCtx.fillStyle = '#e0e0e0';
        particles.forEach(particle => {
            const canvasX = (particle.baseX / canvas.width) * canvasWidth;
            const canvasY = (particle.baseY / canvas.height) * canvasHeight;
            manualCtx.beginPath();
            manualCtx.arc(canvasX, canvasY, 2, 0, Math.PI * 2);
            manualCtx.fill();
        });
    }


    function startDrawing(e) {
        isDrawing = true;
        const rect = manualCanvas.getBoundingClientRect();
        lastDrawX = e.clientX - rect.left;
        lastDrawY = e.clientY - rect.top;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = manualCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        manualCtx.fillStyle = manualColor;
        if (lastDrawX !== null && lastDrawY !== null) {
            const dx = x - lastDrawX;
            const dy = y - lastDrawY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const steps = Math.ceil(distance / (brushSize / 2));
            for (let i = 0; i <= steps; i++) {
                const ix = lastDrawX + (dx * i) / steps;
                const iy = lastDrawY + (dy * i) / steps;
                manualCtx.beginPath();
                manualCtx.arc(ix, iy, brushSize, 0, Math.PI * 2);
                manualCtx.fill();
            }
        } else {
            manualCtx.beginPath();
            manualCtx.arc(x, y, brushSize, 0, Math.PI * 2);
            manualCtx.fill();
        }
        lastDrawX = x;
        lastDrawY = y;
        saveManualCanvasState();
        updateParticleColors();
    }

    function saveManualCanvasState() {
        if (!manualCtx) return;

        const imageData = manualCtx.getImageData(0, 0, manualCanvas.width, manualCanvas.height);
        manualCanvasData = imageData.data;
        // 保存快照
        lastManualCanvasData = new Uint8ClampedArray(manualCanvasData);
        lastManualCanvasParticlePositions = manualCanvasParticlePositions.slice();
    }

    function stopDrawing() {
        isDrawing = false;
        lastDrawX = null;
        lastDrawY = null;
    }

    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        startDrawing(mouseEvent);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        draw(mouseEvent);
    }

    function clearManualCanvas() {
        if (!manualCtx) return;
        manualCtx.fillStyle = '#ffffff';
        manualCtx.fillRect(0, 0, manualCanvas.width, manualCanvas.height);
        drawParticlePositions();
        const imageData = manualCtx.getImageData(0, 0, manualCanvas.width, manualCanvas.height);
        manualCanvasData = imageData.data;
        updateParticleColors();
    }

    function fillManualCanvas() {
        if (!manualCtx) return;
        manualCtx.fillStyle = '#ffffff';
        manualCtx.fillRect(0, 0, manualCanvas.width, manualCanvas.height);
        const particles = getCurrentParticles();
        const canvasWidth = manualCanvas.width;
        const canvasHeight = manualCanvas.height;
        manualCtx.fillStyle = manualColor;
        particles.forEach(particle => {
            const canvasX = (particle.baseX / canvas.width) * canvasWidth;
            const canvasY = (particle.baseY / canvas.height) * canvasHeight;
            manualCtx.beginPath();
            manualCtx.arc(canvasX, canvasY, 8, 0, Math.PI * 2);
            manualCtx.fill();
        });
        saveManualCanvasState();
        updateParticleColors();
    }

    function getManualColor(x, y) {
        if (!manualCtx) return '#ffffff';
        const canvasX = (x / canvas.width) * manualCanvas.width;
        const canvasY = (y / canvas.height) * manualCanvas.height;
        const imageData = manualCtx.getImageData(canvasX, canvasY, 1, 1);
        const data = imageData.data;
        const r = data[0];
        const g = data[1];
        const b = data[2];
        const a = data[3];
        if (a === 0) return '#ffffff';
        return `rgb(${r}, ${g}, ${b})`;
    }

    // 鼠标效果切换
    const mouseEffects = [
        { value: 'push', label: '推开' },
        { value: 'attract', label: '吸引' },
        { value: 'orbit', label: '环绕' }
    ];
    function updateMouseEffectBtn() {
        const effect = mouseEffects.find(e => e.value === mouseEffect) || mouseEffects[0];
        if (mouseEffectBtn) mouseEffectBtn.textContent = effect.label;
        if (mouseEffectBtnMobile) mouseEffectBtnMobile.textContent = effect.label;
        window.mouseEffect = mouseEffect;
    }
    function toggleMouseEffect() {
        let idx = mouseEffects.findIndex(e => e.value === mouseEffect);
        idx = (idx + 1) % mouseEffects.length;
        mouseEffect = mouseEffects[idx].value;
        updateMouseEffectBtn();
    }
    if (mouseEffectBtn) mouseEffectBtn.addEventListener('click', toggleMouseEffect);
    if (mouseEffectBtnMobile) mouseEffectBtnMobile.addEventListener('click', toggleMouseEffect);

    const gradientModalBtnMobile = document.getElementById('gradientModalBtnMobile');
    if (gradientModalBtnMobile) {
        gradientModalBtnMobile.addEventListener('click', function () {
            if (gradientModal) {
                gradientModal.classList.add('show');
                gradientModal.style.display = 'flex';
            }
        });
    }

    const restoreCanvasBtn = document.getElementById('restoreCanvasBtn');
    if (restoreCanvasBtn) {
        restoreCanvasBtn.addEventListener('click', function () {
            if (!lastManualCanvasData || lastManualCanvasParticlePositions.length === 0) return;
            manualCanvasData = new Uint8ClampedArray(lastManualCanvasData);
            manualCanvasParticlePositions = lastManualCanvasParticlePositions.slice();
            if (manualCtx && manualCanvasData) {
                const imageData = new ImageData(new Uint8ClampedArray(manualCanvasData), manualCanvas.width, manualCanvas.height);
                manualCtx.putImageData(imageData, 0, 0);
                saveManualCanvasState();
            }
            updateParticleColors();
        });
    }


    if (manualCanvas) {
        manualCanvas.addEventListener('mousedown', startDrawing);
        manualCanvas.addEventListener('mousemove', draw);
        manualCanvas.addEventListener('mouseup', stopDrawing);
        manualCanvas.addEventListener('mouseleave', stopDrawing);
        manualCanvas.addEventListener('touchstart', handleTouchStart);
        manualCanvas.addEventListener('touchmove', handleTouchMove);
        manualCanvas.addEventListener('touchend', stopDrawing);
    }
    if (manualColorPicker) {
        manualColorPicker.addEventListener('input', function () {
            manualColor = this.value;
        });
    }
    if (brushSizeInput && brushSizeValue) {
        brushSizeInput.addEventListener('input', function () {
            brushSize = parseInt(this.value);
            brushSizeValue.textContent = brushSize;
        });
    }
});
