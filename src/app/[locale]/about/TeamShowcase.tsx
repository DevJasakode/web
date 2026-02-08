"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users2,
  Search,
  Filter,
  ChevronDown,
  Code2,
  ExternalLink,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import * as THREE from "three";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n/config";
import { SmartLink } from "@/components/link";

interface Pagination<T = any> {
  count: number;
  raws?: Array<T> | null;
};

interface Job {
  id: number;
  name: string;
  code: string;
  logo?: string;
  desc?: string;
  created_at?: number;
  created_by?: number;
  updated_at?: number;
  updated_by?: number;
  deleted_at?: number;
  deleted_by?: number;
}

interface SocialMedia {
  id: number;
  team_id?: number;
  profile_id?: number;
  name: string;
  code?: string;
  logo?: string;
  link?: string;
  created_at?: number;
  created_by?: number;
  updated_at?: number;
  updated_by?: number;
  deleted_at?: number;
  deleted_by?: number;
}

interface Team {
  id: number;
  name: string;
  bio?: string;
  picture?: string;
  profile?: string;
  focus: string[]; // ArrayString dari Go diwakili array of string di TS
  job_id?: number;
  job?: Job | null;
  social_media?: SocialMedia[];
  created_at?: number;
  created_by?: number;
  updated_at?: number;
  updated_by?: number;
  deleted_at?: number;
  deleted_by?: number;
}

interface Expertise {
  id: number;
  icon: string;
  name: string;
  desc: string;
  skills: Array<string>;
  teams: Array<Team> | null | undefined;
}

// ===== 3D Background Canvas (Three.js) =====
function WavyMeshBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(6, 6, 80, 80);
    const material = new THREE.MeshStandardMaterial({ color: 0x4f46e5, metalness: 0.1, roughness: 0.8, wireframe: true, transparent: true, opacity: 0.2 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.6;
    scene.add(mesh);
    meshRef.current = mesh;

    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(2, 3, 4);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const clock = new THREE.Clock();

    function animate() {
      const t = clock.getElapsedTime();
      const pos = (mesh.geometry as THREE.PlaneGeometry).attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, Math.sin(x * 1.2 + t * 0.8) * 0.2 + Math.cos(y * 1.4 + t * 0.6) * 0.2);
      }
      pos.needsUpdate = true;
      mesh.rotation.z = Math.sin(t * 0.1) * 0.1;
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    }

    animate();

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    const obs = new ResizeObserver(onResize);
    obs.observe(container);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      obs.disconnect();
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
        (rendererRef.current as any) = null;
      }
      mesh.geometry.dispose();
      (material as any).dispose?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10 opacity-70 [mask-image:linear-gradient(to_bottom,white,transparent_82%)]"
      aria-hidden
    />
  );
}

const sorters = [
  { key: "featured", label: "Featured" },
  { key: "teams", label: "Terbanyak Tim" },
  { key: "name", label: "Nama (A–Z)" },
];



function ExpertiseCard({ data }: { data: Expertise }) {
  const teams = data.teams ?? [];
  const skills = data.skills ?? [];
  const iconIsUrl = /^https?:\/\//i.test(data.icon ?? "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative w-full text-left rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-lg backdrop-blur transition dark:border-white/10 dark:bg-slate-900/60 dark:shadow-2xl"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-cyan-400/10 dark:text-cyan-200">
          {data.icon ? (
            iconIsUrl ? (
              <img src={data.icon} alt="" className="h-6 w-6 object-contain" />
            ) : (
              <span className="text-lg font-semibold">{data.icon}</span>
            )
          ) : (
            <Users2 className="h-5 w-5" />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold md:text-lg">{data.name}</h3>
          <p className="mt-1 text-xs text-slate-600 line-clamp-2 md:text-sm dark:text-slate-200/80">
            {data.desc}
          </p>
          {(skills.length > 0 || teams.length > 0) && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
              {teams.length ? (
                <Badge icon={<Users2 className="h-3.5 w-3.5" />}>{teams.length} tim</Badge>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {teams.length ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mt-4 grid grid-cols-1 gap-3"
        >
          {teams.slice(0, 2).map((team) => (
            <div
              key={team.id}
              className="rounded-xl border border-slate-200/70 bg-slate-50/90 p-3 shadow-sm dark:border-white/10 dark:bg-white/5"
            >
              <p className="mb-1 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-200/70">{team.job?.name ?? "Tim"}</p>
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-indigo-100 text-[10px] font-semibold text-indigo-700 dark:bg-cyan-300/20 dark:text-cyan-100">
                  {(team.name ?? "").split(" ").map((s) => s.slice(0, 1)).join("").slice(0, 2) || "T"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700 dark:text-white">{team.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-200/70">{team.bio ?? team.focus?.join(", ") ?? ""}</p>
                </div>
                {team.social_media?.length ? (
                  <div className="ml-auto flex items-center gap-2">
                    {team.social_media.slice(0, 3).map((soc) => (
                      soc.link ? (
                        <IconLink key={soc.id} href={soc.link}>
                          {renderSocialIcon(soc.code)}
                        </IconLink>
                      ) : null
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          {teams.length > 2 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-transparent p-3 text-xs font-medium text-slate-500 dark:border-slate-600/70 dark:text-slate-300">
              +{teams.length - 2} tim lainnya dalam expertise ini
            </div>
          )}
        </motion.div>
      ) : null}
    </motion.article>
  );
}

function Badge({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80">
      {icon}
      {children}
    </span>
  );
}

function IconLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(e) => e.stopPropagation()}
      className="text-slate-500 transition hover:text-indigo-500 dark:text-slate-200/80 dark:hover:text-cyan-200"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Open external link"
    >
      {children}
    </a>
  );
}

function renderSocialIcon(code?: string) {
  const key = (code ?? "").toLowerCase();
  switch (key) {
    case "linkedin":
      return <Linkedin className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    case "email":
    case "mail":
      return <Mail className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
}

function resolveTeamCategory(team: Team): string | null {
  if (team.job?.name?.trim()) return team.job.name.trim();
  if (team.job?.code?.trim()) return team.job.code.trim();
  if (team.focus?.length) {
    const firstFocus = team.focus.find((f) => f?.trim());
    if (firstFocus) return firstFocus.trim();
  }
  return null;
}

const dummyExpertises: Expertise[] = [
  {
    id: 1,
    icon: "🧠",
    name: "Artificial Intelligence",
    desc: "Pengembangan sistem cerdas berbasis data dan machine learning.",
    skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision"],
    teams: [
      {
        id: 1,
        name: "AI Research Team",
        bio: "Riset dan eksperimen model AI generasi terbaru.",
        focus: ["AI", "Research"],
        job_id: 1,
        job: {
          id: 1,
          name: "Research Engineer",
          code: "research_engineer",
        },
        social_media: [
          {
            id: 1,
            name: "LinkedIn",
            code: "linkedin",
            link: "https://linkedin.com/company/ai-research",
          },
          {
            id: 2,
            name: "GitHub",
            code: "github",
            link: "https://github.com/ai-research",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    icon: "💻",
    name: "Frontend Engineering",
    desc: "Membangun antarmuka web yang cepat, modern, dan interaktif.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind"],
    teams: [
      {
        id: 2,
        name: "Web Platform Team",
        bio: "Mengembangkan UI dan design system internal.",
        focus: ["Frontend", "UI"],
        job: {
          id: 2,
          name: "Frontend Engineer",
          code: "frontend_engineer",
        },
        social_media: [
          {
            id: 3,
            name: "GitHub",
            code: "github",
            link: "https://github.com/web-platform",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: "⚙️",
    name: "Backend Engineering",
    desc: "Fondasi sistem backend yang aman dan scalable.",
    skills: ["Go", "Node.js", "PostgreSQL", "Redis"],
    teams: [
      {
        id: 3,
        name: "Core API Team",
        bio: "Mengelola layanan inti dan integrasi data.",
        focus: ["Backend", "API"],
        job: {
          id: 3,
          name: "Backend Engineer",
          code: "backend_engineer",
        },
      },
    ],
  },
  {
    id: 4,
    icon: "☁️",
    name: "Cloud & DevOps",
    desc: "Automasi infrastruktur dan deployment berkelanjutan.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    teams: [
      {
        id: 4,
        name: "Infrastructure Team",
        bio: "Menjaga sistem tetap stabil dan scalable.",
        focus: ["DevOps", "Cloud"],
        job: {
          id: 4,
          name: "DevOps Engineer",
          code: "devops_engineer",
        },
      },
    ],
  },
  {
    id: 5,
    icon: "🎨",
    name: "Product Design",
    desc: "Merancang pengalaman pengguna yang intuitif dan estetis.",
    skills: ["UI Design", "UX Research", "Figma"],
    teams: [
      {
        id: 5,
        name: "Design System Team",
        bio: "Menjaga konsistensi visual dan UX.",
        focus: ["Design", "UX"],
        job: {
          id: 5,
          name: "Product Designer",
          code: "product_designer",
        },
      },
    ],
  },
  {
    id: 6,
    icon: "📱",
    name: "Mobile Development",
    desc: "Aplikasi mobile performa tinggi lintas platform.",
    skills: ["React Native", "Flutter", "Android", "iOS"],
    teams: [
      {
        id: 6,
        name: "Mobile App Team",
        bio: "Membangun aplikasi Android dan iOS.",
        focus: ["Mobile"],
        job: {
          id: 6,
          name: "Mobile Engineer",
          code: "mobile_engineer",
        },
      },
    ],
  },
  {
    id: 7,
    icon: "🔐",
    name: "Cyber Security",
    desc: "Perlindungan sistem dan data dari ancaman digital.",
    skills: ["Security Audit", "Penetration Testing", "OWASP"],
    teams: [
      {
        id: 7,
        name: "Security Team",
        bio: "Audit keamanan dan mitigasi risiko.",
        focus: ["Security"],
        job: {
          id: 7,
          name: "Security Engineer",
          code: "security_engineer",
        },
      },
    ],
  },
  {
    id: 8,
    icon: "📊",
    name: "Data Analytics",
    desc: "Mengubah data menjadi insight yang dapat ditindaklanjuti.",
    skills: ["SQL", "Python", "Data Visualization"],
    teams: [
      {
        id: 8,
        name: "Data Insight Team",
        bio: "Analisis performa bisnis dan produk.",
        focus: ["Data"],
        job: {
          id: 8,
          name: "Data Analyst",
          code: "data_analyst",
        },
      },
    ],
  },
  {
    id: 9,
    icon: "🧪",
    name: "Quality Assurance",
    desc: "Menjamin kualitas produk sebelum rilis.",
    skills: ["Manual Testing", "Automation", "Cypress"],
    teams: [
      {
        id: 9,
        name: "QA Team",
        bio: "Testing dan validasi sistem.",
        focus: ["QA"],
        job: {
          id: 9,
          name: "QA Engineer",
          code: "qa_engineer",
        },
      },
    ],
  },
  {
    id: 10,
    icon: "📈",
    name: "Business & Strategy",
    desc: "Menghubungkan teknologi dengan tujuan bisnis.",
    skills: ["Product Strategy", "Market Research"],
    teams: [
      {
        id: 10,
        name: "Strategy Team",
        bio: "Perencanaan dan pengembangan bisnis.",
        focus: ["Business"],
        job: {
          id: 10,
          name: "Business Strategist",
          code: "business_strategist",
        },
      },
    ],
  },
];

// ===== Main Component =====
export function TeamShowcase() {
  const { locale } = useParams<{ locale: Locale }>();
  const [q, setQ] = useState("");
  const [org, setOrg] = useState<string>("All");
  const [sort, setSort] = useState<string>("featured");
  const [pagination, setPagination] = useState<Pagination<Expertise> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    return () => {
      active = false;
    };
  }, []);

  const expertises = useMemo(() => {
    if (!pagination?.raws) return [] as Expertise[];
    return pagination.raws;
  }, [pagination]);

  const orgOptions = useMemo(() => {
    const categories = new Set<string>();

    expertises.forEach((exp) => {
      exp.teams?.forEach((team) => {
        const label = resolveTeamCategory(team);
        if (label) categories.add(label);
      });
    });

    return ["All", ...Array.from(categories).sort((a, b) => a.localeCompare(b, "id"))];
  }, [expertises]);

  useEffect(() => {
    if (org !== "All" && !orgOptions.includes(org)) {
      setOrg("All");
    }
  }, [orgOptions, org]);

  const filteredExpertises = useMemo(() => {
    if (!expertises.length) return [] as Expertise[];

    const search = q.trim().toLowerCase();

    const matchesSearch = (value?: string | null) => {
      return typeof value === "string" && value.toLowerCase().includes(search);
    };

    const filtered = expertises.filter((exp) => {
      const teams = exp.teams ?? [];

      const matchesOrg =
        org === "All" ||
        teams.some((team) => {
          const category = resolveTeamCategory(team);
          return category ? category === org : false;
        });

      if (!matchesOrg) return false;
      if (!search) return true;

      if (matchesSearch(exp.name) || matchesSearch(exp.desc)) return true;

      if (exp.skills?.some((skill) => matchesSearch(skill))) return true;

      return teams.some((team) => {
        return (
          matchesSearch(team.name) ||
          matchesSearch(team.bio) ||
          matchesSearch(team.job?.name) ||
          team.focus?.some((focus) => matchesSearch(focus))
        );
      });
    });

    if (sort === "name") {
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name, "id"));
    }

    if (sort === "teams") {
      return [...filtered].sort((a, b) => (b.teams?.length ?? 0) - (a.teams?.length ?? 0));
    }

    return filtered;
  }, [expertises, org, q, sort]);


  // Hooks
  useEffect(() => {
    setPagination({
      count: dummyExpertises.length,
      raws: dummyExpertises,
    });
    setLoading(false);
  }, []);

  return (
    <section className="relative overflow-hidden md:p-8 dark:from z-0">
      <WavyMeshBackground />

      {/* Header */}
      <div className="relative z-10 mb-6 md:mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl dark:text-white">
            <Users2 className="h-7 w-7 text-indigo-500 dark:text-cyan-300" />
            Our Teams
          </h2>
          <p className="mt-1 max-w-2xl text-[1rem] text-slate-600 dark:text-slate-200/80">
            Kenali semua unit yang membangun Studio kami—dari platform, aplikasi, riset, hingga operasi bisnis.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/5">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-200/80" />
            <input
              aria-label="Cari tim"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari tim, teknologi, misi…"
              className="w-full bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-400/70"
            />
          </div>

          {/* Org Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Filter className="h-4 w-4 text-slate-400 dark:text-slate-200/80" />
              <select
                aria-label="Filter organisasi"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full appearance-none bg-transparent pr-5 text-sm text-slate-600 outline-none dark:text-slate-100"
              >
                {orgOptions.map((o) => (
                  <option key={o} value={o} className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none -ml-4 h-4 w-4 text-slate-400 dark:text-slate-200/80" />
            </div>
          </div>

          {/* Sort */}
          <div className="relative">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/5">
              <Code2 className="h-4 w-4 text-slate-400 dark:text-slate-200/80" />
              <select
                aria-label="Urutkan"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full appearance-none bg-transparent pr-5 text-sm text-slate-600 outline-none dark:text-slate-100"
              >
                {sorters.map((s) => (
                  <option key={s.key} value={s.key} className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none -ml-4 h-4 w-4 text-slate-400 dark:text-slate-200/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 md:gap-4"
      >
        {loading ? (
          <div className="col-span-full rounded-xl border border-dashed border-slate-300/70 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-300">
            Sedang memuat data expertise…
          </div>
        ) : filteredExpertises.length ? (
          <AnimatePresence>
            {filteredExpertises.map((item) => (
              <ExpertiseCard key={item.id} data={item} />
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-full rounded-xl border border-dashed border-slate-300/70 bg-white/70 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-300">
            {error ?? "Tidak ada data yang cocok dengan pencarian Anda."}
          </div>
        )}
      </motion.div>

      {/* Footer CTA */}
      <div className="relative z-10 mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-600 dark:text-slate-200/80">Ingin bergabung? Kami selalu mencari talenta terbaik di engineering, desain, dan riset.</p>
        <div className="flex items-center gap-3">
          <SmartLink
            href={{
              pathname: "/[locale]/about/careers",
              query: { locale: locale }
            }}
            className="inline-flex items-center gap-2 rounded-md h-10 bg-indigo-700 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 dark:focus-visible:ring-2 dark:focus-visible:ring-cyan-200"
          >
            Lihat Lowongan <ExternalLink className="w-4 h-4" />
          </SmartLink>
          <SmartLink
            href={{
              pathname: "/[locale]/about/team",
              query: { locale: locale }
            }}
            className="inline-flex items-center gap-2 rounded-md h-10 bg-green-600 px-4 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 dark:focus-visible:ring-2 dark:focus-visible:ring-cyan-200"
          >
            Show All Team <ExternalLink className="w-4 h-4" />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

// ===== Notes =====
// - Integrasi: cukup import dan render <TeamShowcase />; data diambil via API getExpertise.
// - Styling: Tailwind kelas utilitas, serta latar gradasi gelap.
// - A11y: kartu tetap dapat diakses, link eksternal diberi aria-label.
// - Performant: Three.js hanya 1 canvas, ringan karena wireframe dan update sederhana.
