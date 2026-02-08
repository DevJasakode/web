"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Crown, ExternalLink } from "lucide-react";
import * as THREE from "three";
import { CardTeam } from "./CardTeam";
import { ResponsePagination, AboutTeam as AboutTeamData } from "@/api/about/team/models";
import axios, { AxiosError } from "axios";


// 3D Background
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
};

interface Filter {
  limit: number;
  page: number;
};

const initialFilter: Filter = {
  limit: 25,
  page: 0,
}

export default function AboutTeam() {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  const [team, setTeam] = useState<ResponsePagination<AboutTeamData>>({ meta: { total: 0, limit: 25, offset: 0 }, data: [] });

  const loadTeam = useCallback(async () => {
    try {
      const res = await axios.get<ResponsePagination<AboutTeamData>>(`/api/about/team`, { withCredentials: true });
      if (res.status >= 200 && res.status <= 201) {
        setTeam(res.data);
      }
    } catch (error) {
      console.error(error)
    }
  }, [filter]);


  // Hooks
  useEffect(() => { loadTeam(); }, [filter]);

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
        {
          team.data?.map((item, i) => (
            <CardTeam key={i} team={item} />
          ))
        }
      </motion.div>
    </section>
  );
};