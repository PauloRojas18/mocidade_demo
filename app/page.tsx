'use client'
// LOCALIZAÇÃO: app/page.tsx

import Link from 'next/link'

const JOVENS = [
  { id: 1,  nome: 'Ana Lima',            curso_atual: 'Escola de Líderes' },
  { id: 2,  nome: 'Bruno Souza',         curso_atual: 'Formação Bíblica' },
  { id: 3,  nome: 'Camila Rocha',        curso_atual: 'Escola de Líderes' },
  { id: 4,  nome: 'Daniel Ferreira',     curso_atual: 'Discipulado Avançado' },
  { id: 5,  nome: 'Eduarda Martins',     curso_atual: 'Escola de Líderes' },
  { id: 6,  nome: 'Felipe Gomes',        curso_atual: 'Oratória Cristã' },
  { id: 7,  nome: 'Gabriela Neves',      curso_atual: 'Missões e Evangelismo' },
  { id: 8,  nome: 'Henrique Costa',      curso_atual: 'Formação Bíblica' },
  { id: 9,  nome: 'Isabela Cardoso',     curso_atual: 'Discipulado Avançado' },
  { id: 10, nome: 'João Pedro Alves',    curso_atual: 'Escola de Líderes' },
  { id: 11, nome: 'Karen Oliveira',      curso_atual: 'Formação Bíblica' },
  { id: 12, nome: 'Lucas Mendes',        curso_atual: 'Oratória Cristã' },
  { id: 13, nome: 'Mariana Pereira',     curso_atual: 'Discipulado Avançado' },
  { id: 14, nome: 'Nicolas Batista',     curso_atual: 'Missões e Evangelismo' },
  { id: 15, nome: 'Olivia Torres',       curso_atual: 'Escola de Líderes' },
  { id: 16, nome: 'Pedro Henrique',      curso_atual: 'Formação Bíblica' },
  { id: 17, nome: 'Rafaela Cunha',       curso_atual: 'Escola de Líderes' },
  { id: 18, nome: 'Samuel Ribeiro',      curso_atual: 'Discipulado Avançado' },
  { id: 19, nome: 'Tatiane Moura',       curso_atual: 'Missões e Evangelismo' },
  { id: 20, nome: 'Vinícius Lopes',      curso_atual: 'Oratória Cristã' },
  { id: 21, nome: 'Yasmin Freitas',      curso_atual: 'Escola de Líderes' },
  { id: 22, nome: 'André Nascimento',    curso_atual: 'Formação Bíblica' },
  { id: 23, nome: 'Beatriz Alves',       curso_atual: 'Formação Bíblica' },
  { id: 24, nome: 'Caio Duarte',         curso_atual: 'Discipulado Avançado' },
  { id: 25, nome: 'Débora Pinto',        curso_atual: 'Escola de Líderes' },
  { id: 26, nome: 'Elias Carvalho',      curso_atual: 'Missões e Evangelismo' },
  { id: 27, nome: 'Fernanda Araújo',     curso_atual: 'Oratória Cristã' },
  { id: 28, nome: 'Gustavo Silveira',    curso_atual: 'Escola de Líderes' },
  { id: 29, nome: 'Helena Campos',       curso_atual: 'Formação Bíblica' },
  { id: 30, nome: 'Igor Teixeira',       curso_atual: 'Discipulado Avançado' },
  { id: 31, nome: 'Juliana Ramos',       curso_atual: 'Escola de Líderes' },
  { id: 32, nome: 'Kaique Braga',        curso_atual: 'Missões e Evangelismo' },
  { id: 33, nome: 'Letícia Vieira',      curso_atual: 'Oratória Cristã' },
  { id: 34, nome: 'Matheus Santos',      curso_atual: 'Escola de Líderes' },
  { id: 35, nome: 'Natália Barros',      curso_atual: 'Formação Bíblica' },
  { id: 36, nome: 'Otávio Farias',       curso_atual: 'Discipulado Avançado' },
  { id: 37, nome: 'Patrícia Melo',       curso_atual: 'Escola de Líderes' },
  { id: 38, nome: 'Rafael Mendes',       curso_atual: 'Escola de Líderes' },
]

const CURSOS = [
  { id: 1, nome: 'Escola de Líderes',      matriculados: 12 },
  { id: 2, nome: 'Formação Bíblica',       matriculados: 10 },
  { id: 3, nome: 'Discipulado Avançado',   matriculados: 8  },
  { id: 4, nome: 'Oratória Cristã',        matriculados: 5  },
  { id: 5, nome: 'Missões e Evangelismo',  matriculados: 3  },
]

const PRATICAS = [
  { id: 1, nome: 'Louvor e Adoração',     pratica_membros: Array(14).fill({ jovem_id: 0 }) },
  { id: 2, nome: 'Teatro e Drama',        pratica_membros: Array(11).fill({ jovem_id: 0 }) },
  { id: 3, nome: 'Dança',                 pratica_membros: Array(9).fill({ jovem_id: 0 })  },
  { id: 4, nome: 'Comunicação e Mídia',   pratica_membros: Array(12).fill({ jovem_id: 0 }) },
  { id: 5, nome: 'Intercessão',           pratica_membros: Array(8).fill({ jovem_id: 0 })  },
  { id: 6, nome: 'Evangelismo de Rua',    pratica_membros: Array(7).fill({ jovem_id: 0 })  },
]

// Frequência geral por jovem (chamada_dia)
const FREQ_DIA: Record<number, { total: number; presentes: number; pct: number }> = {
  1:  { total: 16, presentes: 16, pct: 100 },
  2:  { total: 16, presentes: 15, pct: 94  },
  3:  { total: 16, presentes: 16, pct: 100 },
  4:  { total: 16, presentes: 14, pct: 88  },
  5:  { total: 16, presentes: 16, pct: 100 },
  6:  { total: 16, presentes: 13, pct: 81  },
  7:  { total: 16, presentes: 10, pct: 63  }, // alerta
  8:  { total: 16, presentes: 16, pct: 100 },
  9:  { total: 16, presentes: 14, pct: 88  },
  10: { total: 16, presentes: 16, pct: 100 },
  11: { total: 16, presentes: 15, pct: 94  },
  12: { total: 16, presentes: 11, pct: 69  }, // alerta
  13: { total: 16, presentes: 11, pct: 69  }, // alerta
  14: { total: 16, presentes: 16, pct: 100 },
  15: { total: 16, presentes: 16, pct: 100 },
  16: { total: 16, presentes: 13, pct: 81  },
  17: { total: 16, presentes: 16, pct: 100 },
  18: { total: 16, presentes: 14, pct: 88  },
  19: { total: 16, presentes: 10, pct: 63  }, // alerta
  20: { total: 16, presentes: 11, pct: 69  }, // alerta
  21: { total: 16, presentes: 16, pct: 100 },
  22: { total: 16, presentes: 15, pct: 94  },
  23: { total: 16, presentes: 11, pct: 69  }, // alerta
  24: { total: 16, presentes: 14, pct: 88  },
  25: { total: 16, presentes: 16, pct: 100 },
  26: { total: 16, presentes: 13, pct: 81  },
  27: { total: 16, presentes: 10, pct: 63  }, // alerta
  28: { total: 16, presentes: 16, pct: 100 },
  29: { total: 16, presentes: 15, pct: 94  },
  30: { total: 16, presentes: 14, pct: 88  },
  31: { total: 16, presentes: 16, pct: 100 },
  32: { total: 16, presentes: 13, pct: 81  },
  33: { total: 16, presentes: 15, pct: 94  },
  34: { total: 16, presentes: 16, pct: 100 },
  35: { total: 16, presentes: 14, pct: 88  },
  36: { total: 16, presentes: 16, pct: 100 },
  37: { total: 16, presentes: 15, pct: 94  },
  38: { total: 16, presentes: 10, pct: 63  }, // alerta
}

// Frequência por curso (presencas/relatorio)
const FREQ_CURSOS = [
  { nome: 'Escola de Líderes',     pct: 88 },
  { nome: 'Formação Bíblica',      pct: 82 },
  { nome: 'Discipulado Avançado',  pct: 76 },
  { nome: 'Oratória Cristã',       pct: 68 },
  { nome: 'Missões e Evangelismo', pct: 61 },
]

const CURSO_COLORS   = ['#4B7BF5', '#7F77DD', '#1D9E75', '#BA7517', '#E24B4A']
const PRATICA_COLORS = ['#D4537E', '#BA7517', '#1D9E75', '#594de1', '#378ADD', '#E24B4A']

export default function DashboardPage() {
  const alertas   = JOVENS.filter(j => FREQ_DIA[j.id] && FREQ_DIA[j.id].pct < 75)
  const semFaltas = JOVENS.filter(j => FREQ_DIA[j.id] && FREQ_DIA[j.id].pct === 100)
  const totalMembros = PRATICAS.reduce((a, p) => a + (p.pratica_membros?.length ?? 0), 0)

  return (
    <div className="flex flex-col h-full md:h-screen overflow-hidden">
      <div className="flex-shrink-0 px-5 md:px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-semibold text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">1º semestre / 2026</p>
        </div>
        <Link href="/frequencia" className="text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90"
          style={{ background: '#4B7BF5', color: '#fff' }}>
          + Marcar chamada
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">

        {/* Stats principais */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Jovens ativos',    value: JOVENS.length,    color: '#4B7BF5' },
            { label: 'Cursos ativos',    value: CURSOS.length,    color: '#7F77DD' },
            { label: 'Práticas ativas',  value: PRATICAS.length,  color: '#1D9E75' },
            { label: 'Alertas de falta', value: alertas.length,   color: '#E24B4A' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #E2E8F0' }}>
              <div className="w-7 h-0.5 rounded-full mb-3" style={{ background: s.color }} />
              <p className="text-2xl font-semibold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #E2E8F0' }}>
            <p className="text-xs text-slate-400 mb-1">Frequência plena</p>
            <p className="text-xl font-semibold" style={{ color: '#1D9E75' }}>{semFaltas.length}</p>
            <p className="text-xs text-slate-400 mt-1">sem nenhuma falta</p>
          </div>
          <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #E2E8F0' }}>
            <p className="text-xs text-slate-400 mb-1">Membros nas práticas</p>
            <p className="text-xl font-semibold text-slate-900">{totalMembros}</p>
            <p className="text-xs text-slate-400 mt-1">total</p>
          </div>
          <div className="bg-white rounded-xl p-4" style={{ border: '0.5px solid #E2E8F0' }}>
            <p className="text-xs text-slate-400 mb-1">Com alertas</p>
            <p className="text-xl font-semibold" style={{ color: '#E24B4A' }}>{alertas.length}</p>
            <p className="text-xs text-slate-400 mt-1">abaixo de 75%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* Frequência por curso */}
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '0.5px solid #E2E8F0' }}>
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-800">Frequência por curso</p>
              <Link href="/relatorios" className="text-xs" style={{ color: '#4B7BF5' }}>Ver mais</Link>
            </div>
            <div className="p-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: 240 }}>
              {FREQ_CURSOS.map(c => (
                <div key={c.nome}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs text-slate-700 truncate mr-2" style={{ maxWidth: '75%' }}>{c.nome}</span>
                    <span className="text-xs font-semibold flex-shrink-0"
                      style={{ color: c.pct >= 75 ? '#1D9E75' : '#E24B4A' }}>{c.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ background: c.pct >= 75 ? '#1D9E75' : '#E24B4A', width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alertas de falta */}
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '0.5px solid #E2E8F0' }}>
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-800">Alertas de falta</p>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: '#FCEBEB', color: '#A32D2D' }}>{alertas.length}</span>
            </div>
            <div className="divide-y divide-slate-100 overflow-y-auto" style={{ maxHeight: 240 }}>
              {alertas.map(j => {
                const f = FREQ_DIA[j.id]
                return (
                  <Link key={j.id} href={`/jovens/${j.id}`}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 transition-colors"
                    style={{ textDecoration: 'none' }}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                        style={{ background: '#FCEBEB', color: '#A32D2D' }}>
                        {j.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-800 truncate">{j.nome}</p>
                        <p className="text-xs text-slate-400 truncate">{j.curso_atual ?? '—'}</p>
                      </div>
                    </div>
                    <span className="text-xs flex-shrink-0 ml-2 px-2 py-0.5 rounded-full font-medium"
                      style={{ background: '#FCEBEB', color: '#A32D2D' }}>
                      {f?.pct ?? 0}%
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Cursos + Práticas */}
          <div className="bg-white rounded-xl overflow-hidden" style={{ border: '0.5px solid #E2E8F0' }}>
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-800">Cursos deste semestre</p>
              <Link href="/cursos" className="text-xs" style={{ color: '#4B7BF5' }}>Ver todos</Link>
            </div>
            <div className="divide-y divide-slate-100">
              {CURSOS.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3 px-4 py-2.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: CURSO_COLORS[i % CURSO_COLORS.length] }} />
                  <p className="text-xs text-slate-700 flex-1 truncate">{c.nome}</p>
                  <span className="text-xs text-slate-400 flex-shrink-0">{c.matriculados}</span>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-800 mb-2">Práticas</p>
              {PRATICAS.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: PRATICA_COLORS[i % PRATICA_COLORS.length] }} />
                  <p className="text-xs text-slate-700 flex-1 truncate">{p.nome}</p>
                  <span className="text-xs text-slate-400 flex-shrink-0">{p.pratica_membros?.length ?? 0}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}