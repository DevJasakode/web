// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import { useRef, useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Crown,
//   ExternalLink,
// } from "lucide-react";
// import * as THREE from "three";
// import { getTeams } from '@api/about';
// import { Team } from '@api/models/about';
// import { Pagination } from '@api/models/models';
// import { TeamCardInteractive } from "./Card";


// function OrbitalGlow() {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

//   useEffect(() => {
//     const el = ref.current!;
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 50);
//     camera.position.z = 6;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(el.clientWidth, el.clientHeight);
//     el.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     const geo = new THREE.IcosahedronGeometry(2.4, 2);
//     const mat = new THREE.MeshStandardMaterial({ color: 0x4f46e5, wireframe: true, transparent: true, opacity: 0.15 });
//     const mesh = new THREE.Mesh(geo, mat);
//     scene.add(mesh);
//     scene.add(new THREE.PointLight(0xffffff, 1.2, 20));
//     scene.add(new THREE.AmbientLight(0xffffff, 0.5));

//     const animate = () => {
//       mesh.rotation.x += 0.002;
//       mesh.rotation.y += 0.001;
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     };
//     animate();
//   }, []);

//   return <div ref={ref} className="fixed top-0 bottom-0 left-0 right-0 inset-0 -z-10 opacity-70" aria-hidden />;
// }

// export function ExecShowcase() {
//   const [raw, setRaw] = useState<Pagination<Team>>({ count: 0 });

//   useEffect(() => {
//     getTeams().then(res => {
//       if(res.status >= 200 && res.status <= 201) setRaw(res.data);
//     });
//   }, []);

//   return (
//     <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-transparent p-5 md:p-8">
//       <OrbitalGlow />
//       <div className="relative z-0 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl dark:text-white">
//             <Crown className="h-7 w-7 text-amber-500 dark:text-amber-300" /> Leadership Team
//           </h2>
//           <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-200/80">Direksi dan C-Level yang mengarahkan strategi, teknologi, produk, dan operasional Studio.</p>
//         </div>
//         <a
//           href="/about/governance"
//           className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 h-10 text-sm font-semibold text-white transition hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 dark:focus-visible:ring-2 dark:focus-visible:ring-cyan-200"
//         >
//           Jasakode Governance<ExternalLink className="w-4 h-4" />
//         </a>
//       </div>
//       <motion.div layout className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 z-0">
//         {
//           raw.raws?.map((item, i) => (<TeamCardInteractive key={i} data={item} hrefBase="/about" />))
//         }
//       </motion.div>
//     </section>
//   );
// };


// async function app() {
//   createRoot(document.getElementById("app")!).render(
//     <StrictMode>
//       <ExecShowcase />
//     </StrictMode>
//   );
// };


// // Event ini dipicu setelah SEMUA resource halaman sudah siap, 
// // termasuk CSS, JS, gambar, font, dan iframe. 
// // Biasanya dipakai kalau aplikasi butuh memastikan semua asset berat sudah selesai dimuat.
// // window.addEventListener("load", app);

// // // Event ini dipicu segera setelah struktur DOM selesai dibangun dari HTML, 
// // // tanpa menunggu gambar, font, atau iframe. 
// // // Biasanya dipakai untuk mulai manipulasi DOM atau inisialisasi UI lebih cepat.
// document.addEventListener("DOMContentLoaded", app);




"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, ExternalLink } from "lucide-react";
import * as THREE from "three";
import { TeamCardInteractive } from "./Card";

/* ======================
   Dummy Types (Inline)
====================== */

interface Job {
  id: number;
  name: string;
  code: string;
}

interface SocialMedia {
  id: number;
  name: string;
  code: string;
  link: string;
}

interface Team {
  id: number;
  name: string;
  bio?: string;
  picture?: string;
  focus?: string[];
  job?: Job;
  social_media?: SocialMedia[];
}

interface Pagination<T> {
  count: number;
  raws?: T[];
}

/* ======================
   Dummy Data
====================== */

const dummyTeams: Pagination<Team> = {
  count: 6,
  raws: [
    {
      id: 1,
      name: "Andi Pratama",
      bio: "CEO & Co-Founder. Fokus pada visi bisnis dan pertumbuhan strategis.",
      focus: ["Leadership", "Business"],
      job: { id: 1, name: "Chief Executive Officer", code: "ceo" },
      social_media: [
        { id: 1, name: "LinkedIn", code: "linkedin", link: "https://linkedin.com" },
      ],
    },
    {
      id: 2,
      name: "Sinta Mahendra",
      bio: "CTO. Mengarahkan arsitektur teknologi dan engineering culture.",
      focus: ["Technology", "Engineering"],
      job: { id: 2, name: "Chief Technology Officer", code: "cto" },
      social_media: [
        { id: 2, name: "GitHub", code: "github", link: "https://github.com" },
      ],
    },
    {
      id: 3,
      name: "Rizky Fauzan",
      bio: "CPO. Menjembatani kebutuhan bisnis dan pengalaman pengguna.",
      focus: ["Product", "UX"],
      job: { id: 3, name: "Chief Product Officer", code: "cpo" },
    },
    {
      id: 4,
      name: "Dewi Larasati",
      bio: "COO. Operasional, proses, dan eksekusi lintas tim.",
      focus: ["Operation"],
      job: { id: 4, name: "Chief Operating Officer", code: "coo" },
    },
    {
      id: 5,
      name: "Bima Saputra",
      bio: "Head of Engineering. Skala tim dan kualitas sistem.",
      focus: ["Backend", "Scalability"],
      job: { id: 5, name: "Head of Engineering", code: "hoe" },
    },
    {
      id: 6,
      name: "Nadia Putri",
      bio: "Head of Design. Design system & brand experience.",
      focus: ["Design", "UX"],
      job: { id: 6, name: "Head of Design", code: "hod" },
    },
  ],
};

/* ======================
   3D Background
====================== */

function OrbitalGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      el.clientWidth / el.clientHeight,
      0.1,
      50
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2.4, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    scene.add(new THREE.PointLight(0xffffff, 1.2, 20));
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const animate = () => {
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      el.innerHTML = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 opacity-70"
      aria-hidden
    />
  );
}

/* ======================
   Main Component
====================== */

export default function ExecShowcase() {
  const [data, setData] = useState<Pagination<Team>>({ count: 0 });

  useEffect(() => {
    // simulasi fetch
    setData(dummyTeams);
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-transparent p-5 md:p-8 min-h-svh">
      <OrbitalGlow />

      <div className="relative z-10 mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl dark:text-white">
            <Crown className="h-7 w-7 text-amber-500 dark:text-amber-300" />
            Leadership Team
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-200/80">
            Direksi dan C-Level yang mengarahkan strategi, teknologi, produk, dan operasional Studio.
          </p>
        </div>

        <a
          href="/about/governance"
          className="inline-flex items-center gap-2 rounded-md h-10 bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-800 dark:bg-cyan-400 dark:text-slate-950"
        >
          Jasakode Governance <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <motion.div
        layout
        className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4"
      >
        {data.raws?.map((item) => (
          <TeamCardInteractive
            key={item.id}
            data={item}
            hrefBase="/about"
          />
        ))}
      </motion.div>
    </section>
  );
}