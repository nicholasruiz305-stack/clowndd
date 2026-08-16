"use client";

import type { CSSProperties, FormEvent, MouseEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

const artifacts = [
  "EST. 2026",
];

const socials = [
  { platform: "Instagram", handle: "@clowndd_", href: "https://www.instagram.com/clowndd_/" },
  { platform: "YouTube", handle: "@certified-clowndd", href: "https://www.youtube.com/@certified-clowndd" },
  { platform: "TikTok", handle: "@clowndd_", href: "https://www.tiktok.com/@clowndd_" },
];

export function ClownddPage() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const shopRef = useRef<HTMLElement | null>(null);

  const floatStyle = useMemo(
    () => ({
      "--mx": pointer.x.toFixed(3),
      "--my": pointer.y.toFixed(3),
    }) as CSSProperties,
    [pointer],
  );

  useEffect(() => {
    const updateShopShift = () => {
      const shop = shopRef.current;

      if (!shop) {
        return;
      }

      const rect = shop.getBoundingClientRect();
      const progress = Math.min(
        Math.max((window.innerHeight - rect.top) / (window.innerHeight + rect.height), 0),
        1,
      );

      shop.style.setProperty("--shop-shift", progress.toFixed(3));
    };

    updateShopShift();
    window.addEventListener("scroll", updateShopShift, { passive: true });
    window.addEventListener("resize", updateShopShift);

    return () => {
      window.removeEventListener("scroll", updateShopShift);
      window.removeEventListener("resize", updateShopShift);
    };
  }, []);

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setSubmitError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/nicholasruiz305@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          piece: formData.get("piece") || "Not specified",
          _subject: "New clowned website signup",
          _template: "table",
          _captcha: "false",
          _honey: formData.get("_honey"),
        }),
      });

      if (!response.ok) {
        throw new Error("The form could not be sent.");
      }

      form.reset();
      setSent(true);
    } catch {
      setSubmitError("Something did not send. Try again in a minute.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <nav className="topbar" aria-label="Main navigation">
        <a className="brandmark" href="#top" aria-label="clowned home">
          clowned
        </a>
        <div className="navlinks">
          <a href="#story">Our story</a>
          <a href="#labs">Shop now</a>
          <a href="#connect">Connect</a>
        </div>
      </nav>

      <section
        className="hero"
        id="top"
        onMouseMove={handlePointerMove}
        style={floatStyle}
      >
        <ProductWorld />

        <div className="artifact-labels" aria-hidden="true">
          {artifacts.map((artifact, index) => (
            <span className={`artifact-${index + 1}`} key={artifact}>
              {artifact}
            </span>
          ))}
        </div>

        <div className="hero-socials" aria-label="Find clowned on social media">
          {socials.map((social) => (
            <a href={social.href} key={social.platform} rel="noreferrer" target="_blank">
              <SocialIcon platform={social.platform} />
              <span>{social.platform}</span>
              <strong>{social.handle}</strong>
            </a>
          ))}
        </div>
        <a className="scroll-cue" href="#story" aria-label="Scroll to story">
          Scroll
        </a>
      </section>

      <section className="manifesto reveal" id="story">
        <div className="about-orbit" aria-hidden="true" />
        <span className="about-label">ABOUT</span>
        <h1>
          Clowned is not a clothing brand, it is not a business, it is not
          fashion, it is not art, it is a heartfelt message to everyone out
          there that you are to be yourself no matter what.
        </h1>
        <div className="about-rule" aria-hidden="true" />
        <div className="about-copy">
          <h2>
            WE DESIGN TO SHOW THAT DREAMS ARE MORE THAN CAPABLE OF REACHING IF
            YOU REALLY WANT TO.
          </h2>
          <p>
            Clowned originated in a time of need for my family. For a specific
            period of time, both my parents were unemployed and we were
            desperately in need of money, and I needed to support them. But, I
            did not know how to. One night, while scrolling through Instagram
            looking at art, one phrase ran through my mind. "Why don't I wear
            everything I see?" A feeling inside me grew that this was what
            would allow me to help and support my family, while also being able
            to prove that everyone can make their dreams come true. We are
            Clowned.
          </p>
          <a href="#labs">MORE ABOUT US <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section
        className="shop-now reveal"
        id="labs"
        ref={shopRef}
        aria-label="clowned shop coming soon"
      >
        <div className="shop-grid" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="shop-topline">
          <span>Drop 001</span>
          <span>Clowned shop</span>
        </div>
        <div className="shop-stage">
          <h2>Shop Now</h2>
          <div className="shop-card">
            <span>COMING SOON.</span>
          </div>
        </div>
        <div className="shop-footer" aria-hidden="true">
          <span>??/??/2026</span>
        </div>
      </section>

      <section className="connect reveal" id="connect">
        {sent ? (
          <div className="thanks" role="status">
            <h2>Thank you</h2>
            <p>You&apos;re on the clowned list.</p>
          </div>
        ) : (
          <>
            <h2>
              If the story hits you, leave your name. The next drop is being
              built one piece at a time.
            </h2>
            <div className="contact-grid">
              <p>From zero to a real brand.</p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  aria-hidden="true"
                  className="form-honey"
                  name="_honey"
                  tabIndex={-1}
                  type="text"
                />
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" type="text" required />
                <label htmlFor="email">Your email</label>
                <input id="email" name="email" type="email" required />
                <label htmlFor="piece">The piece you&apos;re watching</label>
                <input id="piece" name="piece" type="text" />
                {submitError ? <p className="form-error">{submitError}</p> : null}
                <button type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send ↓"}
                </button>
              </form>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  if (platform === "Instagram") {
    return (
      <svg className="social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
        <circle cx="12" cy="12" r="4.25" />
        <circle cx="17.15" cy="6.85" r="1.2" />
      </svg>
    );
  }

  if (platform === "YouTube") {
    return (
      <svg className="social-logo" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2.5" y="6.2" width="19" height="11.6" rx="3.6" />
        <path d="M10.4 9.1v5.8l5.2-2.9-5.2-2.9Z" />
      </svg>
    );
  }

  return (
    <svg className="social-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.8 3.6c.55 2.85 2.15 4.55 4.9 4.78v3.38c-1.7.06-3.24-.48-4.74-1.55v5.64c0 3.54-2.18 5.95-5.42 5.95-3.08 0-5.24-2.08-5.24-4.94 0-3.1 2.45-5.13 5.98-4.82v3.5c-1.42-.2-2.46.34-2.46 1.43 0 .92.7 1.52 1.72 1.52 1.15 0 1.84-.72 1.84-2.02V3.6h3.42Z" />
    </svg>
  );
}

function ProductWorld({ journey = false }: { journey?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    async function init() {
      const THREE = await import("three");
      const mount = mountRef.current;

      if (!mount || disposed) {
        return;
      }

      const mountElement = mount;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0.15, 8.2);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mountElement.appendChild(renderer.domElement);

      const world = new THREE.Group();
      scene.add(world);

      const ambient = new THREE.AmbientLight(0xffffff, 1.2);
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(2.8, 4.2, 5.8);
      const rimLight = new THREE.DirectionalLight(0x7da2ff, 1.4);
      rimLight.position.set(-3.8, -1.2, 3);
      scene.add(ambient, keyLight, rimLight);

      const loader = new THREE.TextureLoader();
      const frontTexture = loader.load("/clowned-jorts-front-v2-cutout.png");
      const backTexture = loader.load("/clowndd-jorts-back-cutout.png");
      const hoodieFrontTexture = loader.load("/clowned-hoodie-front-cutout.png");
      const hoodieBackTexture = loader.load("/clowned-hoodie-back-cutout.png");
      frontTexture.colorSpace = THREE.SRGBColorSpace;
      backTexture.colorSpace = THREE.SRGBColorSpace;
      hoodieFrontTexture.colorSpace = THREE.SRGBColorSpace;
      hoodieBackTexture.colorSpace = THREE.SRGBColorSpace;

      function curvedProductGeometry(width: number, height: number, curve: number) {
        const geometry = new THREE.PlaneGeometry(width, height, 48, 48);
        const position = geometry.attributes.position;

        for (let i = 0; i < position.count; i += 1) {
          const x = position.getX(i) / width;
          const y = position.getY(i) / height;
          const z = Math.sin(x * Math.PI) * curve + Math.cos(y * Math.PI * 2) * curve * 0.18;
          position.setZ(i, z);
        }

        position.needsUpdate = true;
        geometry.computeVertexNormals();
        return geometry;
      }

      function productPlane(texture: any, width: number, height: number, curve = 0.18) {
        const product = new THREE.Mesh(
          curvedProductGeometry(width, height, curve),
          new THREE.MeshBasicMaterial({
            alphaTest: 0.08,
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
          }),
        );

        const shadow = new THREE.Mesh(
          curvedProductGeometry(width, height, curve * 0.7),
          new THREE.MeshBasicMaterial({
            color: 0x020203,
            opacity: 0.2,
            alphaTest: 0.04,
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
          }),
        );
        shadow.position.set(0.16, -0.18, -0.18);
        shadow.rotation.set(0.025, -0.045, 0.012);
        shadow.scale.setScalar(1.03);
        product.add(shadow);

        const depth = new THREE.Mesh(
          curvedProductGeometry(width, height, curve * 0.9),
          new THREE.MeshBasicMaterial({
            color: 0x3b155f,
            opacity: 0.18,
            alphaTest: 0.04,
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
          }),
        );
        depth.position.set(-0.08, 0.06, -0.105);
        depth.rotation.set(-0.02, 0.08, -0.01);
        depth.scale.setScalar(1.015);
        product.add(depth);

        return product;
      }

      const front = productPlane(frontTexture, 2.05, 2.55, 0.2);
      front.position.set(journey ? 0.68 : 1.45, journey ? 0.08 : -0.36, journey ? 0.16 : -0.68);
      front.rotation.set(-0.08, journey ? -0.22 : -0.52, 0.11);
      front.scale.setScalar(journey ? 1 : 0.92);
      world.add(front);

      const back = productPlane(backTexture, 1.45, 1.82, -0.16);
      back.position.set(journey ? -0.98 : -1.64, journey ? -0.2 : -0.34, -0.86);
      back.rotation.set(0.06, journey ? 0.34 : 0.48, -0.13);
      back.scale.setScalar(journey ? 1 : 0.84);
      world.add(back);

      const hoodieFront = productPlane(hoodieFrontTexture, 1.9, 2.05, 0.14);
      hoodieFront.position.set(journey ? 1.95 : 0.05, journey ? -0.04 : 0.02, journey ? -0.72 : 0.18);
      hoodieFront.rotation.set(-0.07, journey ? -0.55 : -0.18, -0.05);
      hoodieFront.scale.setScalar(journey ? 0.58 : 1.58);
      world.add(hoodieFront);

      const hoodieBack = productPlane(hoodieBackTexture, 1.78, 1.95, -0.12);
      hoodieBack.position.set(journey ? -2.12 : -1.28, journey ? -0.18 : -0.2, journey ? -0.92 : -0.64);
      hoodieBack.rotation.set(0.07, journey ? 0.58 : 0.4, 0.08);
      hoodieBack.scale.setScalar(journey ? 0.5 : 0.94);
      world.add(hoodieBack);

      const pointer = { x: 0, y: 0 };
      const scrollProgress = { current: 0 };

      function resize() {
        const width = mountElement.clientWidth;
        const height = mountElement.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      function handleMove(event: PointerEvent) {
        const rect = mountElement.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
        pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
      }

      function updateScrollProgress() {
        if (!journey) {
          scrollProgress.current = 0;
          return;
        }

        const section = mountElement.closest(".product-journey");
        const rect = section?.getBoundingClientRect();
        const travel = (rect?.height ?? 1) - window.innerHeight;
        scrollProgress.current = Math.min(
          1,
          Math.max(0, (-(rect?.top ?? 0)) / Math.max(1, travel)),
        );
      }

      let frame = 0;
      function animate() {
        frame = requestAnimationFrame(animate);
        const time = performance.now() * 0.001;
        updateScrollProgress();
        const progress = scrollProgress.current;
        const frontFocus = Math.max(0, 1 - progress * 1.7);
        const backFocus = Math.min(1, Math.max(0, (progress - 0.22) * 1.55));
        const finale = Math.min(1, Math.max(0, (progress - 0.62) * 2.6));

        camera.position.z += ((journey ? 7.4 - progress * 1.15 : 7.25) - camera.position.z) * 0.035;
        camera.position.x += (pointer.x * 0.42 - camera.position.x) * 0.035;
        camera.position.y += ((journey ? 0.2 + progress * 0.16 : 0.15) - pointer.y * 0.22 - camera.position.y) * 0.035;
        world.rotation.y += ((pointer.x * 0.34) + progress * 0.74 - world.rotation.y) * 0.045;
        world.rotation.x += ((-pointer.y * 0.2) - progress * 0.1 - world.rotation.x) * 0.045;
        front.position.x += ((journey ? -0.75 + finale * 0.55 : 1.45) - front.position.x) * 0.045;
        front.position.y = (journey ? 0.08 : -0.36) + Math.sin(time * 0.9) * 0.08 + (journey ? progress * 0.42 : 0);
        front.position.z += ((journey ? 0.3 - progress * 0.95 : -0.68) - front.position.z) * 0.045;
        front.rotation.y += ((journey ? -0.55 + progress * 1.38 : -0.52) - front.rotation.y) * 0.045;
        front.scale.setScalar(journey ? 0.82 + frontFocus * 0.2 - finale * 0.16 : 0.92);
        back.position.x += ((journey ? 0.78 - finale * 0.9 : -1.64) - back.position.x) * 0.045;
        back.position.y = -0.2 + Math.cos(time * 0.82) * 0.06 - (journey ? progress * 0.18 : 0);
        back.position.z += ((journey ? -0.36 + backFocus * 0.62 : -0.86) - back.position.z) * 0.045;
        back.rotation.y += ((journey ? 0.62 - progress * 1.2 : 0.48) - back.rotation.y) * 0.045;
        back.scale.setScalar(journey ? 0.76 + backFocus * 0.38 : 0.84);
        hoodieFront.position.x += ((journey ? 1.15 - finale * 1.05 : 0.05) - hoodieFront.position.x) * 0.045;
        hoodieFront.position.y = (journey ? -0.04 : 0.02) + Math.sin(time * 0.72) * 0.07 + (journey ? finale * 0.12 : 0);
        hoodieFront.position.z += ((journey ? -0.55 + finale * 0.52 : 0.18) - hoodieFront.position.z) * 0.045;
        hoodieFront.rotation.y += ((journey ? -0.7 + finale * 0.82 : -0.18) - hoodieFront.rotation.y) * 0.045;
        hoodieFront.scale.setScalar(journey ? 0.52 + finale * 0.4 : 1.58);
        hoodieBack.position.x += ((journey ? -1.05 + finale * 0.8 : -1.28) - hoodieBack.position.x) * 0.045;
        hoodieBack.position.y = -0.18 + Math.cos(time * 0.66) * 0.06 - (journey ? finale * 0.08 : 0);
        hoodieBack.position.z += ((journey ? -0.82 + finale * 0.44 : -0.64) - hoodieBack.position.z) * 0.045;
        hoodieBack.rotation.y += ((journey ? 0.68 - finale * 0.62 : 0.4) - hoodieBack.rotation.y) * 0.045;
        hoodieBack.scale.setScalar(journey ? 0.46 + finale * 0.32 : 0.94);
        (front.material as any).opacity = journey ? 0.48 + frontFocus * 0.52 : 1;
        (back.material as any).opacity = journey ? 0.36 + backFocus * 0.64 : 1;
        (hoodieFront.material as any).opacity = journey ? 0.24 + finale * 0.76 : 0.86;
        (hoodieBack.material as any).opacity = journey ? 0.18 + finale * 0.62 : 0.72;
        renderer.render(scene, camera);
      }

      resize();
      animate();
      window.addEventListener("resize", resize);
      window.addEventListener("scroll", updateScrollProgress, { passive: true });
      mountElement.addEventListener("pointermove", handleMove);

      cleanup = () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", updateScrollProgress);
        mountElement.removeEventListener("pointermove", handleMove);
        frontTexture.dispose();
        backTexture.dispose();
        hoodieFrontTexture.dispose();
        hoodieBackTexture.dispose();
        renderer.dispose();
        mountElement.removeChild(renderer.domElement);
      };
    }

    init();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      className={journey ? "product-world product-world-journey" : "product-world"}
      ref={mountRef}
      aria-hidden="true"
    />
  );
}
