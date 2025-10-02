// Shader Animation using Three.js
(function() {
    'use strict';

    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
    script.onload = initShaderAnimation;
    document.head.appendChild(script);

    function initShaderAnimation() {
        const container = document.querySelector('.shader-canvas-container');
        if (!container) return;

        const THREE = window.THREE;

        // Vertex shader
        const vertexShader = `
            void main() {
                gl_Position = vec4( position, 1.0 );
            }
        `;

        // Fragment shader
        const fragmentShader = `
            #define TWO_PI 6.2831853072
            #define PI 3.14159265359

            precision highp float;
            uniform vec2 resolution;
            uniform float time;

            void main(void) {
                vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
                float t = time*0.05;
                float lineWidth = 0.002;

                vec3 color = vec3(0.0);
                for(int j = 0; j < 3; j++){
                    for(int i=0; i < 5; i++){
                        color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
                    }
                }

                gl_FragColor = vec4(color[0],color[1],color[2],1.0);
            }
        `;

        // Initialize Three.js scene
        const camera = new THREE.Camera();
        camera.position.z = 1;

        const scene = new THREE.Scene();
        const geometry = new THREE.PlaneGeometry(2, 2);

        const uniforms = {
            time: { type: "f", value: 1.0 },
            resolution: { type: "v2", value: new THREE.Vector2() }
        };

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);

        container.appendChild(renderer.domElement);

        // Handle window resize
        function onWindowResize() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            renderer.setSize(width, height);
            uniforms.resolution.value.x = renderer.domElement.width;
            uniforms.resolution.value.y = renderer.domElement.height;
        }

        // Initial resize
        onWindowResize();
        window.addEventListener('resize', onWindowResize, false);

        // Animation loop
        let animationId;
        function animate() {
            animationId = requestAnimationFrame(animate);
            uniforms.time.value += 0.05;
            renderer.render(scene, camera);
        }

        // Start animation
        animate();

        // Cleanup on page unload
        window.addEventListener('beforeunload', function() {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onWindowResize);
            if (container && renderer.domElement) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        });
    }
})();
