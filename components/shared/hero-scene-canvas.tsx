"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Star } from "lucide-react";
import type { Group } from "three";

import { cards } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

function HeroCardFace({
  bankName,
  name,
  bestFor,
  annualFee,
  rating,
  image
}: {
  bankName: string;
  name: string;
  bestFor: string;
  annualFee: number;
  rating: number;
  image: string;
}) {
  return (
    <div
      className="relative h-[190px] w-[310px] overflow-hidden rounded-[28px] border border-white/20 bg-[#0c1426] text-white shadow-[0_30px_90px_rgba(0,0,0,.38)]"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(8,13,26,.88), rgba(16,30,56,.64)), url("${image}")`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(110,201,255,.22),transparent_32%)]" />
      <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/75">
        {bankName}
      </div>
      <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full border border-white/15 bg-black/20 px-2.5 py-1 text-xs text-white/85">
        <Star className="h-3 w-3 fill-current text-amber-300" />
        {rating}
      </div>
      <div className="absolute inset-x-5 bottom-5">
        <div className="rounded-[24px] border border-white/10 bg-slate-950/30 p-4 backdrop-blur-md">
          <div className="text-xl font-semibold leading-tight">{name}</div>
          <div className="mt-2 text-sm text-white/70">{bestFor}</div>
          <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-white/55">
            <span>Annual Fee</span>
            <span>{formatCurrency(annualFee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroCard({
  position,
  rotation,
  bankName,
  name,
  bestFor,
  annualFee,
  rating,
  image
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  bankName: string;
  name: string;
  bestFor: string;
  annualFee: number;
  rating: number;
  image: string;
}) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.12;
    groupRef.current.rotation.x = rotation[0] + Math.cos(state.clock.elapsedTime * 0.45 + position[1]) * 0.04;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={groupRef} position={position} rotation={rotation}>
        <RoundedBox args={[3.2, 2, 0.12]} radius={0.16} smoothness={6}>
          <meshStandardMaterial color="#0d1629" metalness={0.35} roughness={0.42} />
        </RoundedBox>
        <Html transform position={[0, 0, 0.075]} distanceFactor={1.35} style={{ pointerEvents: "none" }}>
          <HeroCardFace
            bankName={bankName}
            name={name}
            bestFor={bestFor}
            annualFee={annualFee}
            rating={rating}
            image={image}
          />
        </Html>
      </group>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<Group>(null);
  const heroCards = useMemo(
    () => [
      cards.find((card) => card.slug === "hdfc-bank-millennia-credit-card"),
      cards.find((card) => card.slug === "sbi-cashback-card"),
      cards.find((card) => card.slug === "icici-bank-amazon-pay-icici-bank-credit-card")
    ].filter(Boolean),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const pointerX = state.pointer.x * 0.18;
    const pointerY = state.pointer.y * 0.12;
    groupRef.current.rotation.y += (pointerX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-pointerY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} color="#d8f7ff" />
      <pointLight position={[-5, -2, 2]} intensity={2.4} color="#49d9ff" />
      {heroCards[0] ? (
        <HeroCard
          position={[-2.35, 0.15, -0.8]}
          rotation={[-0.3, 0.8, -0.38]}
          bankName={heroCards[0].bankName}
          name={heroCards[0].name}
          bestFor={heroCards[0].bestFor}
          annualFee={heroCards[0].annualFee}
          rating={heroCards[0].rating}
          image={heroCards[0].image}
        />
      ) : null}
      {heroCards[1] ? (
        <HeroCard
          position={[0, 0.65, 0.4]}
          rotation={[-0.18, -0.1, 0.02]}
          bankName={heroCards[1].bankName}
          name={heroCards[1].name}
          bestFor={heroCards[1].bestFor}
          annualFee={heroCards[1].annualFee}
          rating={heroCards[1].rating}
          image={heroCards[1].image}
        />
      ) : null}
      {heroCards[2] ? (
        <HeroCard
          position={[2.45, -0.05, -0.95]}
          rotation={[-0.28, -0.82, 0.34]}
          bankName={heroCards[2].bankName}
          name={heroCards[2].name}
          bestFor={heroCards[2].bestFor}
          annualFee={heroCards[2].annualFee}
          rating={heroCards[2].rating}
          image={heroCards[2].image}
        />
      ) : null}
      <Environment preset="city" />
    </group>
  );
}

export function HeroSceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 6.3], fov: 34 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <Scene />
    </Canvas>
  );
}
