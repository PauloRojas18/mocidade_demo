'use client'
// LOCALIZAÇÃO: app/jovens/page.tsx

import { useState } from 'react'
import Link from 'next/link'
import { Plus, X, User, Mail, Phone, ExternalLink } from 'lucide-react'
import { CustomSelect } from '@/components/CustomSelect'

type Jovem = {
  id: number; nome: string; email: string | null; telefone: string | null
  ano_entrada: number; curso_atual: string | null; pratica_atual: string | null
}
type FreqJovem = { total: number; presentes: number; pct: number }

// ── Dados estáticos ────────────────────────────────────────────────────
const STATIC_JOVENS: Jovem[] = [
  { id: 1,  nome: 'Ana Lima',            email: 'ana.lima@email.com',        telefone: '(67) 9 9812-3401', ano_entrada: 2022, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 2,  nome: 'Bruno Souza',         email: 'bruno.souza@email.com',     telefone: '(67) 9 9823-4502', ano_entrada: 2021, curso_atual: 'Formação Bíblica',      pratica_atual: 'Teatro e Drama'      },
  { id: 3,  nome: 'Camila Rocha',        email: 'camila.rocha@email.com',    telefone: '(67) 9 9834-5603', ano_entrada: 2023, curso_atual: 'Escola de Líderes',     pratica_atual: 'Dança'               },
  { id: 4,  nome: 'Daniel Ferreira',     email: null,                        telefone: '(67) 9 9845-6704', ano_entrada: 2022, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Comunicação e Mídia' },
  { id: 5,  nome: 'Eduarda Martins',     email: 'eduarda.m@email.com',       telefone: '(67) 9 9856-7805', ano_entrada: 2020, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 6,  nome: 'Felipe Gomes',        email: 'felipe.gomes@email.com',    telefone: null,               ano_entrada: 2023, curso_atual: 'Oratória Cristã',       pratica_atual: 'Teatro e Drama'      },
  { id: 7,  nome: 'Gabriela Neves',      email: 'gabi.neves@email.com',      telefone: '(67) 9 9878-9007', ano_entrada: 2021, curso_atual: 'Missões e Evangelismo', pratica_atual: 'Evangelismo de Rua'  },
  { id: 8,  nome: 'Henrique Costa',      email: null,                        telefone: '(67) 9 9889-0108', ano_entrada: 2022, curso_atual: 'Formação Bíblica',      pratica_atual: 'Louvor e Adoração'   },
  { id: 9,  nome: 'Isabela Cardoso',     email: 'isa.cardoso@email.com',     telefone: '(67) 9 9890-1209', ano_entrada: 2023, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Teatro e Drama'      },
  { id: 10, nome: 'João Pedro Alves',    email: 'joaop.alves@email.com',     telefone: '(67) 9 9901-2310', ano_entrada: 2021, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 11, nome: 'Karen Oliveira',      email: 'karen.oli@email.com',       telefone: '(67) 9 9912-3411', ano_entrada: 2022, curso_atual: 'Formação Bíblica',      pratica_atual: 'Teatro e Drama'      },
  { id: 12, nome: 'Lucas Mendes',        email: null,                        telefone: '(67) 9 9923-4512', ano_entrada: 2023, curso_atual: 'Oratória Cristã',       pratica_atual: 'Comunicação e Mídia' },
  { id: 13, nome: 'Mariana Pereira',     email: 'mari.pereira@email.com',    telefone: '(67) 9 9934-5613', ano_entrada: 2020, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Dança'               },
  { id: 14, nome: 'Nicolas Batista',     email: 'nico.batista@email.com',    telefone: '(67) 9 9945-6714', ano_entrada: 2022, curso_atual: 'Missões e Evangelismo', pratica_atual: 'Evangelismo de Rua'  },
  { id: 15, nome: 'Olivia Torres',       email: 'olivia.t@email.com',        telefone: '(67) 9 9956-7815', ano_entrada: 2021, curso_atual: 'Escola de Líderes',     pratica_atual: 'Intercessão'         },
  { id: 16, nome: 'Pedro Henrique',      email: null,                        telefone: '(67) 9 9967-8916', ano_entrada: 2023, curso_atual: 'Formação Bíblica',      pratica_atual: 'Teatro e Drama'      },
  { id: 17, nome: 'Rafaela Cunha',       email: 'rafa.cunha@email.com',      telefone: '(67) 9 9978-9017', ano_entrada: 2022, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 18, nome: 'Samuel Ribeiro',      email: 'samuel.r@email.com',        telefone: '(67) 9 9989-0118', ano_entrada: 2021, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Teatro e Drama'      },
  { id: 19, nome: 'Tatiane Moura',       email: null,                        telefone: '(67) 9 9990-1219', ano_entrada: 2023, curso_atual: 'Missões e Evangelismo', pratica_atual: 'Dança'               },
  { id: 20, nome: 'Vinícius Lopes',      email: 'vini.lopes@email.com',      telefone: '(67) 9 9901-2320', ano_entrada: 2022, curso_atual: 'Oratória Cristã',       pratica_atual: 'Comunicação e Mídia' },
  { id: 21, nome: 'Yasmin Freitas',      email: 'yasmin.f@email.com',        telefone: '(67) 9 9912-3421', ano_entrada: 2020, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 22, nome: 'André Nascimento',    email: null,                        telefone: '(67) 9 9923-4522', ano_entrada: 2022, curso_atual: 'Formação Bíblica',      pratica_atual: 'Comunicação e Mídia' },
  { id: 23, nome: 'Beatriz Alves',       email: 'bea.alves@email.com',       telefone: '(67) 9 9934-5623', ano_entrada: 2023, curso_atual: 'Formação Bíblica',      pratica_atual: 'Dança'               },
  { id: 24, nome: 'Caio Duarte',         email: 'caio.d@email.com',          telefone: '(67) 9 9945-6724', ano_entrada: 2021, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Teatro e Drama'      },
  { id: 25, nome: 'Débora Pinto',        email: 'debora.p@email.com',        telefone: '(67) 9 9956-7825', ano_entrada: 2022, curso_atual: 'Escola de Líderes',     pratica_atual: 'Intercessão'         },
  { id: 26, nome: 'Elias Carvalho',      email: null,                        telefone: '(67) 9 9967-8926', ano_entrada: 2023, curso_atual: 'Missões e Evangelismo', pratica_atual: 'Evangelismo de Rua'  },
  { id: 27, nome: 'Fernanda Araújo',     email: 'fer.araujo@email.com',      telefone: '(67) 9 9978-9027', ano_entrada: 2021, curso_atual: 'Oratória Cristã',       pratica_atual: 'Dança'               },
  { id: 28, nome: 'Gustavo Silveira',    email: 'gus.silveira@email.com',    telefone: '(67) 9 9989-0128', ano_entrada: 2022, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 29, nome: 'Helena Campos',       email: 'helena.c@email.com',        telefone: '(67) 9 9990-1229', ano_entrada: 2020, curso_atual: 'Formação Bíblica',      pratica_atual: 'Intercessão'         },
  { id: 30, nome: 'Igor Teixeira',       email: null,                        telefone: '(67) 9 9901-2330', ano_entrada: 2023, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Comunicação e Mídia' },
  { id: 31, nome: 'Juliana Ramos',       email: 'ju.ramos@email.com',        telefone: '(67) 9 9912-3431', ano_entrada: 2022, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 32, nome: 'Kaique Braga',        email: 'kaique.b@email.com',        telefone: '(67) 9 9923-4532', ano_entrada: 2021, curso_atual: 'Missões e Evangelismo', pratica_atual: 'Evangelismo de Rua'  },
  { id: 33, nome: 'Letícia Vieira',      email: null,                        telefone: '(67) 9 9934-5633', ano_entrada: 2023, curso_atual: 'Oratória Cristã',       pratica_atual: 'Intercessão'         },
  { id: 34, nome: 'Matheus Santos',      email: 'matheus.s@email.com',       telefone: '(67) 9 9945-6734', ano_entrada: 2022, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 35, nome: 'Natália Barros',      email: 'nati.barros@email.com',     telefone: '(67) 9 9956-7835', ano_entrada: 2021, curso_atual: 'Formação Bíblica',      pratica_atual: 'Intercessão'         },
  { id: 36, nome: 'Otávio Farias',       email: null,                        telefone: '(67) 9 9967-8936', ano_entrada: 2022, curso_atual: 'Discipulado Avançado',  pratica_atual: 'Comunicação e Mídia' },
  { id: 37, nome: 'Patrícia Melo',       email: 'pat.melo@email.com',        telefone: '(67) 9 9978-9037', ano_entrada: 2020, curso_atual: 'Escola de Líderes',     pratica_atual: 'Louvor e Adoração'   },
  { id: 38, nome: 'Rafael Mendes',       email: 'rafa.mendes@email.com',     telefone: '(67) 9 9989-0138', ano_entrada: 2023, curso_atual: 'Escola de Líderes',     pratica_atual: 'Comunicação e Mídia' },
]

const STATIC_CURSOS = [
  { id: 1, nome: 'Escola de Líderes'     },
  { id: 2, nome: 'Formação Bíblica'      },
  { id: 3, nome: 'Discipulado Avançado'  },
  { id: 4, nome: 'Oratória Cristã'       },
  { id: 5, nome: 'Missões e Evangelismo' },
]

const STATIC_PRATICAS = [
  { id: 1, nome: 'Louvor e Adoração'   },
  { id: 2, nome: 'Teatro e Drama'      },
  { id: 3, nome: 'Dança'               },
  { id: 4, nome: 'Comunicação e Mídia' },
  { id: 5, nome: 'Intercessão'         },
  { id: 6, nome: 'Evangelismo de Rua'  },
]

const STATIC_FREQ_MAP: Record<number, FreqJovem> = {
  1:  { total: 16, presentes: 16, pct: 100 },
  2:  { total: 16, presentes: 15, pct: 94  },
  3:  { total: 16, presentes: 16, pct: 100 },
  4:  { total: 16, presentes: 14, pct: 88  },
  5:  { total: 16, presentes: 16, pct: 100 },
  6:  { total: 16, presentes: 13, pct: 81  },
  7:  { total: 16, presentes: 10, pct: 63  },
  8:  { total: 16, presentes: 16, pct: 100 },
  9:  { total: 16, presentes: 14, pct: 88  },
  10: { total: 16, presentes: 16, pct: 100 },
  11: { total: 16, presentes: 15, pct: 94  },
  12: { total: 16, presentes: 11, pct: 69  },
  13: { total: 16, presentes: 11, pct: 69  },
  14: { total: 16, presentes: 16, pct: 100 },
  15: { total: 16, presentes: 16, pct: 100 },
  16: { total: 16, presentes: 13, pct: 81  },
  17: { total: 16, presentes: 16, pct: 100 },
  18: { total: 16, presentes: 14, pct: 88  },
  19: { total: 16, presentes: 10, pct: 63  },
  20: { total: 16, presentes: 11, pct: 69  },
  21: { total: 16, presentes: 16, pct: 100 },
  22: { total: 16, presentes: 15, pct: 94  },
  23: { total: 16, presentes: 11, pct: 69  },
  24: { total: 16, presentes: 14, pct: 88  },
  25: { total: 16, presentes: 16, pct: 100 },
  26: { total: 16, presentes: 13, pct: 81  },
  27: { total: 16, presentes: 10, pct: 63  },
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
  38: { total: 16, presentes: 10, pct: 63  },
}

// Presenças individuais por aula para o detalhe do jovem
const STATIC_PRESENCAS: Record<number, { id: number; presente: boolean; aulas: { id: number; curso_nome: string; data: string; descricao: string } | null }[]> = {
  1:  [
    { id: 101, presente: true,  aulas: { id: 1, curso_nome: 'Escola de Líderes', data: '2026-02-05', descricao: 'Aula 1' } },
    { id: 102, presente: true,  aulas: { id: 2, curso_nome: 'Escola de Líderes', data: '2026-02-12', descricao: 'Aula 2' } },
    { id: 103, presente: true,  aulas: { id: 3, curso_nome: 'Escola de Líderes', data: '2026-02-19', descricao: 'Aula 3' } },
    { id: 104, presente: true,  aulas: { id: 4, curso_nome: 'Escola de Líderes', data: '2026-02-26', descricao: 'Aula 4' } },
  ],
  7:  [
    { id: 201, presente: true,  aulas: { id: 5, curso_nome: 'Missões e Evangelismo', data: '2026-02-05', descricao: 'Aula 1' } },
    { id: 202, presente: false, aulas: { id: 6, curso_nome: 'Missões e Evangelismo', data: '2026-02-12', descricao: 'Aula 2' } },
    { id: 203, presente: false, aulas: { id: 7, curso_nome: 'Missões e Evangelismo', data: '2026-02-19', descricao: 'Aula 3' } },
    { id: 204, presente: false, aulas: { id: 8, curso_nome: 'Missões e Evangelismo', data: '2026-02-26', descricao: 'Aula 4' } },
  ],
  12: [
    { id: 301, presente: true,  aulas: { id: 9,  curso_nome: 'Oratória Cristã', data: '2026-02-06', descricao: 'Aula 1' } },
    { id: 302, presente: false, aulas: { id: 10, curso_nome: 'Oratória Cristã', data: '2026-02-13', descricao: 'Aula 2' } },
    { id: 303, presente: true,  aulas: { id: 11, curso_nome: 'Oratória Cristã', data: '2026-02-20', descricao: 'Aula 3' } },
    { id: 304, presente: false, aulas: { id: 12, curso_nome: 'Oratória Cristã', data: '2026-02-27', descricao: 'Aula 4' } },
  ],
  13: [
    { id: 401, presente: true,  aulas: { id: 13, curso_nome: 'Discipulado Avançado', data: '2026-02-07', descricao: 'Aula 1' } },
    { id: 402, presente: false, aulas: { id: 14, curso_nome: 'Discipulado Avançado', data: '2026-02-14', descricao: 'Aula 2' } },
    { id: 403, presente: true,  aulas: { id: 15, curso_nome: 'Discipulado Avançado', data: '2026-02-21', descricao: 'Aula 3' } },
    { id: 404, presente: false, aulas: { id: 16, curso_nome: 'Discipulado Avançado', data: '2026-02-28', descricao: 'Aula 4' } },
  ],
}

// Presença de hoje (simulada — IDs com presença marcada)
const HOJE_PRESENTES = new Set([1,2,3,5,8,10,11,14,15,17,18,21,22,24,25,28,29,31,33,34,35,36,37])

export default function JovensPage() {
  const [jovens,    setJovens]    = useState<Jovem[]>(STATIC_JOVENS)
  const [cursos]                  = useState(STATIC_CURSOS)
  const [praticas]                = useState(STATIC_PRATICAS)
  const [freqMap]                 = useState<Record<number, FreqJovem>>(STATIC_FREQ_MAP)
  const [busca,     setBusca]     = useState('')
  const [filtro,    setFiltro]    = useState<'todos'|'alerta'|'ok'>('todos')
  const [modal,     setModal]     = useState(false)
  const [salvando,  setSalvando]  = useState(false)
  const [selecionado,     setSelecionado]     = useState<Jovem | null>(null)
  const [sheetAberto,     setSheetAberto]     = useState(false)
  const [presencasDetalhe, setPresencasDetalhe] = useState<typeof STATIC_PRESENCAS[number]>([])

  // Form
  const [nome,         setNome]         = useState('')
  const [email,        setEmail]        = useState('')
  const [telefone,     setTelefone]     = useState('')
  const [anoEntrada,   setAnoEntrada]   = useState(String(new Date().getFullYear()))
  const [cursoAtual,   setCursoAtual]   = useState('')
  const [praticaAtual, setPraticaAtual] = useState('')
  const [erroNome,     setErroNome]     = useState(false)

  const selecionarJovem = (j: Jovem) => {
    setSelecionado(j)
    setSheetAberto(true)
    setPresencasDetalhe(STATIC_PRESENCAS[j.id] ?? [])
  }

  const fecharSheet = () => {
    setSheetAberto(false)
    setSelecionado(null)
    setPresencasDetalhe([])
  }

  const fecharModal = () => {
    setModal(false); setNome(''); setEmail(''); setTelefone('')
    setAnoEntrada(String(new Date().getFullYear()))
    setCursoAtual(''); setPraticaAtual(''); setErroNome(false)
  }

  const salvarJovem = async () => {
    if (!nome.trim()) { setErroNome(true); return }
    setSalvando(true)
    // Simulação — substitua pelo fetch('/api/jovens', ...) quando reativar a API
    await new Promise(r => setTimeout(r, 600))
    const novoJovem: Jovem = {
      id: jovens.length + 1,
      nome: nome.trim(),
      email: email || null,
      telefone: telefone || null,
      ano_entrada: Number(anoEntrada),
      curso_atual: cursoAtual || null,
      pratica_atual: praticaAtual || null,
    }
    setJovens(prev => [...prev, novoJovem].sort((a, b) => a.nome.localeCompare(b.nome)))
    setSalvando(false)
    fecharModal()
  }

  let filtrado = busca ? jovens.filter(j => j.nome.toLowerCase().includes(busca.toLowerCase())) : jovens
  if (filtro === 'alerta') filtrado = filtrado.filter(j => { const f = freqMap[j.id]; return f && f.total > 0 && f.pct < 75 })
  if (filtro === 'ok')     filtrado = filtrado.filter(j => { const f = freqMap[j.id]; return !f || f.total === 0 || f.pct >= 75 })

  const alertaCount = jovens.filter(j => { const f = freqMap[j.id]; return f && f.total > 0 && f.pct < 75 }).length

  const freqSel   = selecionado ? freqMap[selecionado.id] : undefined
  const freqPct   = freqSel?.pct ?? 100
  const temAlerta = (freqSel?.total ?? 0) > 0 && freqPct < 75
  const foiRegistradoHoje = selecionado ? (HOJE_PRESENTES.has(selecionado.id) || !HOJE_PRESENTES.has(selecionado.id)) : false
  const presenteHoje = selecionado ? HOJE_PRESENTES.has(selecionado.id) : false

  // ── Painel de detalhe ─────────────────────────────────────────────────
  const detalheJSX = selecionado ? (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 px-4 py-4 border-b border-slate-200" style={{ background: '#F8FAFC' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
            style={{ background: temAlerta ? '#FCEBEB' : '#EEF2FF', color: temAlerta ? '#A32D2D' : '#4B7BF5' }}>
            {selecionado.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900 truncate">{selecionado.nome}</p>
            <p className="text-xs text-slate-500 mt-0.5">Mocidade desde {selecionado.ano_entrada}</p>
          </div>
        </div>
        {(freqSel?.total ?? 0) > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
              <div className="h-full rounded-full transition-all"
                style={{ background: temAlerta ? '#E24B4A' : '#1D9E75', width: `${freqPct}%` }} />
            </div>
            <span className="text-xs font-bold flex-shrink-0"
              style={{ color: temAlerta ? '#E24B4A' : '#1D9E75' }}>{freqPct}%</span>
          </div>
        )}
      </div>

      {temAlerta && (
        <div className="mx-4 mt-3 px-3 py-2.5 rounded-lg flex-shrink-0"
          style={{ background: '#FCEBEB', border: '0.5px solid #F09595' }}>
          <p className="text-xs font-semibold" style={{ color: '#A32D2D' }}>Atenção!</p>
          <p className="text-xs mt-0.5" style={{ color: '#793F3F' }}>{freqPct}% de presença — abaixo do mínimo de 75%.</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {(selecionado.email || selecionado.telefone) && (
          <div className="px-4 py-3 border-b border-slate-100 flex flex-col gap-1.5">
            {selecionado.email && (
              <a href={`mailto:${selecionado.email}`} className="flex items-center gap-2 text-xs"
                style={{ color: '#4B7BF5', textDecoration: 'none' }}>
                <Mail size={11} /><span className="truncate">{selecionado.email}</span>
              </a>
            )}
            {selecionado.telefone && (
              <span className="flex items-center gap-2 text-xs text-slate-500">
                <Phone size={11} />{selecionado.telefone}
              </span>
            )}
          </div>
        )}

        <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-2 gap-2">
          <div className="rounded-lg p-2.5" style={{ background: '#fff', border: '0.5px solid #E2E8F0' }}>
            <p className="text-xs text-slate-400 mb-0.5">Curso</p>
            <p className="text-xs font-medium text-slate-800 truncate">{selecionado.curso_atual ?? '—'}</p>
          </div>
          <div className="rounded-lg p-2.5" style={{ background: '#fff', border: '0.5px solid #E2E8F0' }}>
            <p className="text-xs text-slate-400 mb-0.5">Prática</p>
            <p className="text-xs font-medium text-slate-800 truncate">{selecionado.pratica_atual ?? '—'}</p>
          </div>
        </div>

        <div className="px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Hoje</p>
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl"
            style={{
              background: presenteHoje ? '#E1F5EE' : '#FEF2F2',
              border: `1px solid ${presenteHoje ? '#9FE1CB' : '#FECACA'}`,
            }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: presenteHoje ? '#1D9E75' : '#E24B4A' }}>
              {presenteHoje
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              }
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: presenteHoje ? '#085041' : '#991B1B' }}>
                {presenteHoje ? 'Presente hoje' : 'Ausente hoje'}
              </p>
              <p className="text-xs mt-0.5" style={{ color: presenteHoje ? '#1D9E75' : '#E24B4A' }}>
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
              </p>
            </div>
          </div>
        </div>

        {presencasDetalhe.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Presenças em aulas</p>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {presencasDetalhe
                .filter(p => p.aulas)
                .sort((a, b) => (b.aulas?.data || '').localeCompare(a.aulas?.data || ''))
                .map(p => {
                  const data = p.aulas?.data ? new Date(p.aulas.data + 'T00:00') : null
                  const dataStr = data
                    ? data.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })
                    : 'Data desconhecida'
                  const tipo = p.aulas?.descricao === 'Chamada de prática' ? 'prática' : 'curso'
                  return (
                    <div key={p.id} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs text-slate-700 truncate max-w-[100px]">{dataStr}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                          style={{ background: tipo === 'prática' ? '#FBEAF0' : '#EEF2FF', color: tipo === 'prática' ? '#D4537E' : '#4B7BF5', fontSize: 10 }}>
                          {tipo}
                        </span>
                        <span className="text-xs text-slate-500 truncate max-w-[80px]">{p.aulas?.curso_nome}</span>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2"
                        style={{ background: p.presente ? '#E1F5EE' : '#FEF2F2', color: p.presente ? '#085041' : '#991B1B' }}>
                        {p.presente ? 'Presente' : 'Ausente'}
                      </span>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 p-3 border-t border-slate-200" style={{ background: '#F8FAFC' }}>
        <Link href={`/jovens/${selecionado.id}`}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold hover:opacity-90"
          style={{ background: '#4B7BF5', color: '#fff', textDecoration: 'none' }}>
          <ExternalLink size={13} /> Ver análise completa
        </Link>
      </div>
    </div>
  ) : null

  return (
    <div className="flex flex-col h-full md:h-screen overflow-hidden">
      <div className="flex-shrink-0 px-4 md:px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">Jovens cadastrados</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: '#EEF2FF', color: '#4B7BF5' }}>
            {filtrado.length} jovens
          </span>
          <button onClick={() => setModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90"
            style={{ background: '#4B7BF5', color: '#fff' }}>
            <Plus size={13} strokeWidth={2.5} /> Novo jovem
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden p-3 md:p-4 min-w-0">
          <div className="flex gap-2 mb-3 flex-wrap flex-shrink-0">
            {([
              { key: 'todos',  label: `Todos (${jovens.length})` },
              { key: 'alerta', label: alertaCount > 0 ? `Com alerta (${alertaCount})` : 'Com alerta' },
              { key: 'ok',     label: 'Frequência ok' },
            ] as { key: typeof filtro; label: string }[]).map(f => (
              <button key={f.key} onClick={() => setFiltro(f.key)}
                className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                style={{
                  background:  filtro === f.key ? '#EEF2FF' : 'transparent',
                  color:       filtro === f.key ? '#4B7BF5' : '#64748B',
                  borderColor: filtro === f.key ? '#4B7BF5' : '#CBD5E1',
                }}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="mb-3 flex-shrink-0">
            <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar pelo nome..."
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-400"
              style={{ color: '#1A2340' }} />
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-0.5">
            {filtrado.map(j => {
              const freq     = freqMap[j.id]
              const pct      = freq?.pct ?? 100
              const temFalta = (freq?.total ?? 0) > 0 && pct < 75
              const ativo    = selecionado?.id === j.id
              return (
                <button key={j.id} onClick={() => selecionarJovem(j)} className="w-full text-left">
                  <div className="bg-white rounded-xl p-3 transition-all"
                    style={{
                      borderTop:    (temFalta && ativo) ? '1.5px solid #E24B4A' : ativo ? '1.5px solid #4B7BF5' : '0.5px solid #E2E8F0',
                      borderRight:  (temFalta && ativo) ? '1.5px solid #E24B4A' : ativo ? '1.5px solid #4B7BF5' : '0.5px solid #E2E8F0',
                      borderBottom: (temFalta && ativo) ? '1.5px solid #E24B4A' : ativo ? '1.5px solid #4B7BF5' : '0.5px solid #E2E8F0',
                      borderLeft:   temFalta ? '3px solid #E24B4A' : '3px solid #4B7BF5',
                      borderRadius: '0 10px 10px 0',
                      background:   ativo ? '#F5F8FF' : '#fff',
                    }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                          style={{
                            background: temFalta ? (ativo ? '#E24B4A' : '#FCEBEB') : (ativo ? '#4B7BF5' : '#EEF2FF'),
                            color:      temFalta ? (ativo ? '#fff' : '#A32D2D')    : (ativo ? '#fff' : '#4B7BF5'),
                          }}>
                          {j.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{j.nome}</p>
                          <p className="text-xs text-slate-400 truncate">{j.curso_atual ?? '—'}</p>
                        </div>
                      </div>
                      {temFalta && (
                        <span className="flex-shrink-0 ml-2 px-2 py-0.5 rounded-full"
                          style={{ background: '#FCEBEB', color: '#A32D2D', fontSize: 10 }}>
                          Frequência baixa
                        </span>
                      )}
                    </div>
                    {(freq?.total ?? 0) > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs" style={{ color: '#64748B', minWidth: 28, textAlign: 'right' }}>{pct}%</span>
                        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: '#F1F5F9', maxWidth: 80 }}>
                          <div className="h-full rounded-full" style={{ background: pct >= 75 ? '#1D9E75' : '#E24B4A', width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-400">frequência</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
            {filtrado.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <User size={18} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-500">Nenhum jovem encontrado</p>
              </div>
            )}
          </div>
        </div>

        {/* Painel lateral — desktop only */}
        <div className="hidden lg:flex flex-col w-72 xl:w-80 border-l border-slate-200 flex-shrink-0 overflow-hidden"
          style={{ background: '#F8FAFC' }}>
          {selecionado ? detalheJSX : (
            <div className="flex flex-col items-center justify-center h-full px-6 gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                <User size={20} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 text-center leading-relaxed">Selecione um jovem para ver o resumo aqui</p>
              <button onClick={() => setModal(true)}
                className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg"
                style={{ background: '#EEF2FF', color: '#4B7BF5', border: '0.5px solid #B5D4F4' }}>
                <Plus size={13} /> Novo jovem
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom sheet — mobile only */}
      {sheetAberto && selecionado && (
        <>
          <div className="fixed inset-0 z-40 lg:hidden" style={{ background: 'rgba(15,23,42,0.5)' }} onClick={fecharSheet} />
          <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl overflow-hidden flex flex-col"
            style={{ background: '#F8FAFC', maxHeight: '85vh', boxShadow: '0 -4px 24px rgba(0,0,0,0.18)' }}>
            <div className="flex-shrink-0 pt-3 pb-2 px-4 flex flex-col items-center gap-2" style={{ background: '#F8FAFC' }}>
              <div className="w-10 h-1 rounded-full" style={{ background: '#CBD5E1' }} />
              <div className="w-full flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Detalhes</p>
                <button onClick={fecharSheet} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200">
                  <X size={15} />
                </button>
              </div>
            </div>
            {detalheJSX}
          </div>
        </>
      )}

      {/* Modal cadastro */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,0.45)' }}
          onClick={e => { if (e.target === e.currentTarget) fecharModal() }}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden" style={{ border: '0.5px solid #E2E8F0' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-900">Cadastrar novo jovem</p>
                <p className="text-xs text-slate-400 mt-0.5">Preencha os dados abaixo</p>
              </div>
              <button onClick={fecharModal} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100">
                <X size={15} />
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: '65vh' }}>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Nome completo <span style={{ color: '#E24B4A' }}>*</span></label>
                <input autoFocus value={nome} onChange={e => { setNome(e.target.value); setErroNome(false) }} placeholder="Ex: Maria Silva"
                  className="w-full px-3 py-2.5 text-sm border rounded-lg bg-white outline-none"
                  style={{ borderColor: erroNome ? '#E24B4A' : '#E2E8F0', color: '#1A2340' }} />
                {erroNome && <p className="text-xs mt-1" style={{ color: '#E24B4A' }}>Nome é obrigatório</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">E-mail</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@exemplo.com"
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none" style={{ color: '#1A2340' }} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 mb-1.5 block">Telefone</label>
                  <input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(67) 9 9999-0000"
                    className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none" style={{ color: '#1A2340' }} />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Ano de entrada</label>
                <input value={anoEntrada} onChange={e => setAnoEntrada(e.target.value)} type="number" min="2010" max="2035"
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none" style={{ color: '#1A2340' }} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Curso atual</label>
                <CustomSelect
                  value={cursoAtual}
                  onChange={v => setCursoAtual(String(v))}
                  placeholder="Sem curso"
                  options={cursos.map(c => ({ value: c.nome, label: c.nome }))}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Prática</label>
                <CustomSelect
                  value={praticaAtual}
                  onChange={v => setPraticaAtual(String(v))}
                  placeholder="Sem prática"
                  options={praticas.map(p => ({ value: p.nome, label: p.nome }))}
                />
              </div>
            </div>
            <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button onClick={fecharModal} className="text-xs font-medium px-4 py-2 rounded-lg border border-slate-200 text-slate-600">Cancelar</button>
              <button onClick={salvarJovem} disabled={salvando}
                className="text-xs font-medium px-5 py-2 rounded-lg"
                style={{ background: '#4B7BF5', color: '#fff', opacity: salvando ? 0.7 : 1 }}>
                {salvando ? 'Salvando...' : 'Cadastrar jovem'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}