import { mat4, vec3 } from "wgpu-matrix";
import { Water } from "./water-engine/water";
import { Cubemap } from "./water-engine/cubemap";

export async function initPortfolioWater(canvas: HTMLCanvasElement | null): Promise<void> {
  if (!canvas || !navigator.gpu) return;
  try {
    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) return;
    const requiredFeatures: GPUFeatureName[] = [];
    if (adapter.features.has("float32-filterable")) requiredFeatures.push("float32-filterable");
    const device = await adapter.requestDevice({ requiredFeatures });
    const context = canvas.getContext("webgpu");
    if (!context) return;
    const format = navigator.gpu.getPreferredCanvasFormat();
    context.configure({ device, format, alphaMode: "premultiplied" });

    const loadTexture = async (url: string): Promise<GPUTexture> => {
      const response = await fetch(url);
      const source = await createImageBitmap(await response.blob());
      const texture = device.createTexture({
        size: [source.width, source.height], format: "rgba8unorm",
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
      });
      device.queue.copyExternalImageToTexture({ source, flipY: true }, { texture }, [source.width, source.height]);
      return texture;
    };

    const tileTexture = await loadTexture("/water-assets/ypos.jpg");
    const tileSampler = device.createSampler({ magFilter: "linear", minFilter: "linear", addressModeU: "repeat", addressModeV: "repeat" });
    const cubemap = new Cubemap(device);
    const skyTexture = await cubemap.load({
      xpos: "/water-assets/xpos.jpg", xneg: "/water-assets/xneg.jpg",
      ypos: "/water-assets/ypos.jpg", yneg: "/water-assets/yneg.jpg",
      zpos: "/water-assets/zpos.jpg", zneg: "/water-assets/zneg.jpg",
    });
    const skySampler = device.createSampler({ magFilter: "linear", minFilter: "linear" });

    const uniformBuffer = device.createBuffer({ size: 80, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const lightUniformBuffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const sphereUniformBuffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const shadowUniformBuffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const waterUniformBuffer = device.createBuffer({ size: 16, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    device.queue.writeBuffer(lightUniformBuffer, 0, new Float32Array([.5, .8, -.3, 0]));
    device.queue.writeBuffer(sphereUniformBuffer, 0, new Float32Array([0, -10, 0, .001]));
    device.queue.writeBuffer(shadowUniformBuffer, 0, new Float32Array([0, 0, 0, 0]));

    const water = new Water(device, 256, 256, uniformBuffer, lightUniformBuffer, sphereUniformBuffer,
      shadowUniformBuffer, waterUniformBuffer, tileTexture, tileSampler, skyTexture, skySampler);
    water.updateWaterParameters(0, 0, 1.333, .16);
    for (let index = 0; index < 18; index += 1) {
      water.addDrop(Math.random()*2-1, Math.random()*2-1, .035, index%2 ? .008 : -.008);
    }

    let depthTexture: GPUTexture;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.65);
    const updateUniforms = () => {
      const aspect = canvas.width / canvas.height;
      const projection = mat4.perspective(Math.PI/2.65, aspect, .01, 20);
      const view = mat4.lookAt([0,-.57,.04], [0,0,0], [0,0,-1]);
      const viewProjection = mat4.multiply(projection, view);
      const eye = vec3.transformMat4([0,0,0], mat4.invert(view));
      const data = new Float32Array(20);
      data.set(viewProjection,0); data.set(eye,16);
      device.queue.writeBuffer(uniformBuffer,0,data);
    };
    const resize = () => {
      const width = Math.max(canvas.clientWidth,1), height = Math.max(canvas.clientHeight,1);
      canvas.width = Math.floor(width*ratio); canvas.height = Math.floor(height*ratio);
      depthTexture?.destroy();
      depthTexture = device.createTexture({ size:[canvas.width,canvas.height], format:"depth24plus", usage:GPUTextureUsage.RENDER_ATTACHMENT });
      updateUniforms();
    };
    new ResizeObserver(resize).observe(canvas); resize();

    let dragging = false, lastDrop = 0;
    const addDrop = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((event.clientX-rect.left)/rect.width)*2-1;
      const z = 1-((event.clientY-rect.top)/rect.height)*2;
      water.addDrop(x,z,.045,.018); lastDrop = performance.now();
    };
    canvas.addEventListener("pointerdown", event => { dragging=true; canvas.setPointerCapture(event.pointerId); addDrop(event); });
    canvas.addEventListener("pointermove", event => { if (dragging && performance.now()-lastDrop>55) addDrop(event); });
    canvas.addEventListener("pointerup", () => { dragging=false; });
    canvas.addEventListener("pointercancel", () => { dragging=false; });

    const render = () => {
      water.stepSimulation(); water.stepSimulation(); water.updateNormals(); updateUniforms();
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments:[{ view:context.getCurrentTexture().createView(), clearValue:{r:.18,g:.58,b:.78,a:1}, loadOp:"clear", storeOp:"store" }],
        depthStencilAttachment:{ view:depthTexture.createView(), depthClearValue:1, depthLoadOp:"clear", depthStoreOp:"store" },
      });
      water.renderSurface(pass); pass.end(); device.queue.submit([encoder.finish()]);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  } catch (error) {
    console.warn("WebGPU water model unavailable", error);
  }
}
