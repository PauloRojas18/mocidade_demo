'use client'
// LOCALIZAÇÃO: app/frequencia/page.tsx

import { useState } from 'react'
import { Check, Plus, X, ArrowLeft } from 'lucide-react'
import { CustomSelect } from '@/components/CustomSelect'

type Tab      = 'cursos' | 'praticas' | 'dia'
type View     = 'lista'  | 'chamada'
type Jovem    = { id: number; nome: string; curso_atual?: string | null }
type Curso    = { id: number; nome: string; color_idx: number }
type Pratica  = { id: number; nome: string; descricao: string | null }
type Aula     = { id: number; cursoNome: string; data: string; descricao: string; colorIdx: number; alunos: Jovem[] }

const COLORS = [
  { header: '#4B7BF5', light: '#EEF2FF', text: '#185FA5', pill: '#B5D4F4' },
  { header: '#594de1', light: '#EEEDFE', text: '#3C3489', pill: '#CECBF6' },
  { header: '#1D9E75', light: '#E1F5EE', text: '#085041', pill: '#9FE1CB' },
  { header: '#BA7517', light: '#FAEEDA', text: '#633806', pill: '#FAC775' },
  { header: '#D4537E', light: '#FBEAF0', text: '#72243E', pill: '#F4C0D1' },
  { header: '#378ADD', light: '#E6F1FB', text: '#0C447C', pill: '#85B7EB' },
]
const PRATICA_COLORS = [
  { header: '#D4537E', light: '#FBEAF0', text: '#72243E', pill: '#F4C0D1' },
  { header: '#1D9E75', light: '#E1F5EE', text: '#085041', pill: '#9FE1CB' },
  { header: '#378ADD', light: '#E6F1FB', text: '#0C447C', pill: '#85B7EB' },
  { header: '#BA7517', light: '#FAEEDA', text: '#633806', pill: '#FAC775' },
  { header: '#594de1', light: '#EEEDFE', text: '#3C3489', pill: '#CECBF6' },
  { header: '#E24B4A', light: '#FCEBEB', text: '#A32D2D', pill: '#F7C1C1' },
]

// ── Dados estáticos ────────────────────────────────────────────────────
const TODOS_JOVENS: Jovem[] = [
  { id: 1,  nome: 'Ana Lima',            curso_atual: 'Escola de Líderes'     },
  { id: 2,  nome: 'Bruno Souza',         curso_atual: 'Formação Bíblica'      },
  { id: 3,  nome: 'Camila Rocha',        curso_atual: 'Escola de Líderes'     },
  { id: 4,  nome: 'Daniel Ferreira',     curso_atual: 'Discipulado Avançado'  },
  { id: 5,  nome: 'Eduarda Martins',     curso_atual: 'Escola de Líderes'     },
  { id: 6,  nome: 'Felipe Gomes',        curso_atual: 'Oratória Cristã'       },
  { id: 7,  nome: 'Gabriela Neves',      curso_atual: 'Missões e Evangelismo' },
  { id: 8,  nome: 'Henrique Costa',      curso_atual: 'Formação Bíblica'      },
  { id: 9,  nome: 'Isabela Cardoso',     curso_atual: 'Discipulado Avançado'  },
  { id: 10, nome: 'João Pedro Alves',    curso_atual: 'Escola de Líderes'     },
  { id: 11, nome: 'Karen Oliveira',      curso_atual: 'Formação Bíblica'      },
  { id: 12, nome: 'Lucas Mendes',        curso_atual: 'Oratória Cristã'       },
  { id: 13, nome: 'Mariana Pereira',     curso_atual: 'Discipulado Avançado'  },
  { id: 14, nome: 'Nicolas Batista',     curso_atual: 'Missões e Evangelismo' },
  { id: 15, nome: 'Olivia Torres',       curso_atual: 'Escola de Líderes'     },
  { id: 16, nome: 'Pedro Henrique',      curso_atual: 'Formação Bíblica'      },
  { id: 17, nome: 'Rafaela Cunha',       curso_atual: 'Escola de Líderes'     },
  { id: 18, nome: 'Samuel Ribeiro',      curso_atual: 'Discipulado Avançado'  },
  { id: 19, nome: 'Tatiane Moura',       curso_atual: 'Missões e Evangelismo' },
  { id: 20, nome: 'Vinícius Lopes',      curso_atual: 'Oratória Cristã'       },
  { id: 21, nome: 'Yasmin Freitas',      curso_atual: 'Escola de Líderes'     },
  { id: 22, nome: 'André Nascimento',    curso_atual: 'Formação Bíblica'      },
  { id: 23, nome: 'Beatriz Alves',       curso_atual: 'Formação Bíblica'      },
  { id: 24, nome: 'Caio Duarte',         curso_atual: 'Discipulado Avançado'  },
  { id: 25, nome: 'Débora Pinto',        curso_atual: 'Escola de Líderes'     },
  { id: 26, nome: 'Elias Carvalho',      curso_atual: 'Missões e Evangelismo' },
  { id: 27, nome: 'Fernanda Araújo',     curso_atual: 'Oratória Cristã'       },
  { id: 28, nome: 'Gustavo Silveira',    curso_atual: 'Escola de Líderes'     },
  { id: 29, nome: 'Helena Campos',       curso_atual: 'Formação Bíblica'      },
  { id: 30, nome: 'Igor Teixeira',       curso_atual: 'Discipulado Avançado'  },
  { id: 31, nome: 'Juliana Ramos',       curso_atual: 'Escola de Líderes'     },
  { id: 32, nome: 'Kaique Braga',        curso_atual: 'Missões e Evangelismo' },
  { id: 33, nome: 'Letícia Vieira',      curso_atual: 'Oratória Cristã'       },
  { id: 34, nome: 'Matheus Santos',      curso_atual: 'Escola de Líderes'     },
  { id: 35, nome: 'Natália Barros',      curso_atual: 'Formação Bíblica'      },
  { id: 36, nome: 'Otávio Farias',       curso_atual: 'Discipulado Avançado'  },
  { id: 37, nome: 'Patrícia Melo',       curso_atual: 'Escola de Líderes'     },
  { id: 38, nome: 'Rafael Mendes',       curso_atual: 'Escola de Líderes'     },
]

const STATIC_CURSOS: Curso[] = [
  { id: 1, nome: 'Escola de Líderes',     color_idx: 0 },
  { id: 2, nome: 'Formação Bíblica',      color_idx: 1 },
  { id: 3, nome: 'Discipulado Avançado',  color_idx: 2 },
  { id: 4, nome: 'Oratória Cristã',       color_idx: 3 },
  { id: 5, nome: 'Missões e Evangelismo', color_idx: 4 },
]

const jovensDosCurso = (nomeDosCurso: string) =>
  TODOS_JOVENS.filter(j => j.curso_atual === nomeDosCurso)

const STATIC_AULAS: Aula[] = [
  { id: 1, cursoNome: 'Escola de Líderes',     data: '2026-04-02', descricao: 'Aula 8',  colorIdx: 0, alunos: jovensDosCurso('Escola de Líderes')     },
  { id: 2, cursoNome: 'Escola de Líderes',     data: '2026-03-26', descricao: 'Aula 7',  colorIdx: 0, alunos: jovensDosCurso('Escola de Líderes')     },
  { id: 3, cursoNome: 'Formação Bíblica',      data: '2026-04-03', descricao: 'Aula 8',  colorIdx: 1, alunos: jovensDosCurso('Formação Bíblica')      },
  { id: 4, cursoNome: 'Discipulado Avançado',  data: '2026-04-01', descricao: 'Aula 7',  colorIdx: 2, alunos: jovensDosCurso('Discipulado Avançado')  },
  { id: 5, cursoNome: 'Oratória Cristã',       data: '2026-04-04', descricao: 'Aula 6',  colorIdx: 3, alunos: jovensDosCurso('Oratória Cristã')       },
  { id: 6, cursoNome: 'Missões e Evangelismo', data: '2026-04-05', descricao: 'Aula 5',  colorIdx: 4, alunos: jovensDosCurso('Missões e Evangelismo') },
]

const STATIC_PRATICAS: Pratica[] = [
  { id: 1, nome: 'Louvor e Adoração',   descricao: 'Ministério de música e adoração nos cultos da Mocidade.'       },
  { id: 2, nome: 'Teatro e Drama',      descricao: 'Grupo de teatro cristão com esquetes e peças de fé.'           },
  { id: 3, nome: 'Dança',               descricao: 'Adoração através do movimento e coreografias.'                 },
  { id: 4, nome: 'Comunicação e Mídia', descricao: 'Cobertura fotográfica, vídeos e redes sociais da Mocidade.'   },
  { id: 5, nome: 'Intercessão',         descricao: 'Grupo de oração semanal pela Mocidade, igreja e cidade.'       },
  { id: 6, nome: 'Evangelismo de Rua',  descricao: 'Ações evangelísticas nas ruas e praças da cidade.'            },
]

const STATIC_MEMBROS: Record<number, Jovem[]> = {
  1: TODOS_JOVENS.filter(j => [1,3,5,8,10,15,17,21,25,28,31,34,37,38].includes(j.id)),
  2: TODOS_JOVENS.filter(j => [2,6,9,11,16,18,22,24,29,33,35].includes(j.id)),
  3: TODOS_JOVENS.filter(j => [3,5,13,19,21,23,27,31,37].includes(j.id)),
  4: TODOS_JOVENS.filter(j => [4,12,20,22,26,28,30,32,34,36,38,14].includes(j.id)),
  5: TODOS_JOVENS.filter(j => [1,7,15,17,25,29,33,35].includes(j.id)),
  6: TODOS_JOVENS.filter(j => [7,14,19,26,32,36,2].includes(j.id)),
}

const CHAMADA_DIA_INICIAL = TODOS_JOVENS.map(j => ({
  id: j.id,
  nome: j.nome,
  presente: [1,2,3,5,8,10,11,14,15,17,18,21,22,24,25,28,29,31,33,34,35,36,37].includes(j.id),
}))

export default function FrequenciaPage() {
  const [aba,      setAba]      = useState<Tab>('cursos')
  const [view,     setView]     = useState<View>('lista')
  const [cursos]               = useState<Curso[]>(STATIC_CURSOS)
  const [aulas,    setAulas]    = useState<Aula[]>(STATIC_AULAS)
  const [membros,  setMembros]  = useState<Record<number, Jovem[]>>(STATIC_MEMBROS)

  // Cursos — chamada
  const [aulaAtiva,   setAulaAtiva]   = useState<Aula | null>(null)
  const [presencas,   setPresencas]   = useState<Record<number, boolean>>({})
  const [salvou,      setSalvou]      = useState(false)
  const [gerenc,      setGerenc]      = useState<number | null>(null)
  const [criando,     setCriando]     = useState(false)
  const [novoCursoId, setNovoCursoId] = useState<number | ''>('')
  const [novaData,    setNovaData]    = useState('')
  const [novoDesc,    setNovoDesc]    = useState('')
  const [alunosSel,   setAlunosSel]   = useState<number[]>([])

  // Práticas — chamada
  const [aulaAtivaP,  setAulaAtivaP]  = useState<Pratica | null>(null)
  const [viewP,       setViewP]       = useState<'lista' | 'chamada'>('lista')
  const [presencasP,  setPresencasP]  = useState<Record<number, boolean>>({})
  const [salvouP,     setSalvouP]     = useState(false)
  const [gerencP,     setGerencP]     = useState<number | null>(null)
  const [criandoPratica, setCriandoPratica] = useState(false)
  const [nomePratica, setNomePratica] = useState('')
  const [descPratica, setDescPratica] = useState('')

  // Chamada do dia
  const [chamadaDia, setChamadaDia] = useState(CHAMADA_DIA_INICIAL)
  const [salvouDia,  setSalvouDia]  = useState(false)
  const dataHoje = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })

  // ── Helpers cursos ──────────────────────────────────────────────────────
  const abrirChamada = (aula: Aula) => {
    const init: Record<number, boolean> = {}
    aula.alunos.forEach(a => { init[a.id] = false })
    setAulaAtiva(aula); setPresencas(init); setSalvou(false); setView('chamada')
  }
  const toggle = (id: number) => setPresencas(p => ({ ...p, [id]: !p[id] }))
  const marcarTodos = () => {
    if (!aulaAtiva) return
    const todos = aulaAtiva.alunos.every(a => presencas[a.id])
    const novo: Record<number, boolean> = {}
    aulaAtiva.alunos.forEach(a => { novo[a.id] = !todos })
    setPresencas(novo)
  }
  const salvarChamada = () => {
    // Simulação — substitua pelo fetch('/api/presencas', ...) quando reativar a API
    setSalvou(true)
    setTimeout(() => { setView('lista'); setAulaAtiva(null) }, 1400)
  }
  const criarAula = () => {
    if (!novoCursoId || !novaData) return
    const cursoSel = cursos.find(c => c.id === novoCursoId)
    if (!cursoSel) return
    const novaAula: Aula = {
      id: aulas.length + 100,
      cursoNome: cursoSel.nome,
      data: novaData,
      descricao: novoDesc || 'Nova aula',
      colorIdx: cursoSel.color_idx,
      alunos: TODOS_JOVENS.filter(j => alunosSel.includes(j.id)),
    }
    setAulas(prev => [novaAula, ...prev])
    setNovoCursoId(''); setNovaData(''); setNovoDesc(''); setAlunosSel([]); setCriando(false)
  }
  const removerAluno = (aulaId: number, jovemId: number) => {
    setAulas(prev => prev.map(a => a.id === aulaId ? { ...a, alunos: a.alunos.filter(al => al.id !== jovemId) } : a))
  }
  const adicionarAluno = (aulaId: number, jovemId: number) => {
    const jovem = TODOS_JOVENS.find(j => j.id === jovemId)
    if (jovem) setAulas(prev => prev.map(a => a.id === aulaId ? { ...a, alunos: [...a.alunos, jovem] } : a))
  }

  // Pré-seleciona alunos ao escolher curso no modal
  const handleCursoChange = (v: number | '') => {
    setNovoCursoId(v)
    if (!v) { setAlunosSel([]); return }
    const cursoSel = cursos.find(c => c.id === v)
    if (!cursoSel) return
    setAlunosSel(TODOS_JOVENS.filter(j => j.curso_atual === cursoSel.nome).map(j => j.id))
  }

  // ── Helpers práticas ───────────────────────────────────────────────────
  const abrirChamadaPratica = (p: Pratica) => {
    const ms = membros[p.id] ?? []
    const init: Record<number, boolean> = {}
    ms.forEach(m => { init[m.id] = false })
    setAulaAtivaP(p); setPresencasP(init); setSalvouP(false); setViewP('chamada')
  }
  const toggleP = (id: number) => setPresencasP(p => ({ ...p, [id]: !p[id] }))
  const marcarTodosP = () => {
    if (!aulaAtivaP) return
    const ms = membros[aulaAtivaP.id] ?? []
    const todos = ms.every(m => presencasP[m.id])
    const novo: Record<number, boolean> = {}
    ms.forEach(m => { novo[m.id] = !todos })
    setPresencasP(novo)
  }
  const salvarChamadaPratica = () => {
    setSalvouP(true)
    setTimeout(() => { setViewP('lista'); setAulaAtivaP(null) }, 1400)
  }
  const removerMembroPratica = (praticaId: number, jovemId: number) => {
    setMembros(prev => ({ ...prev, [praticaId]: (prev[praticaId] ?? []).filter(m => m.id !== jovemId) }))
  }
  const adicionarMembroPratica = (praticaId: number, jovemId: number) => {
    const jovem = TODOS_JOVENS.find(j => j.id === jovemId)
    if (jovem) setMembros(prev => ({ ...prev, [praticaId]: [...(prev[praticaId] ?? []), jovem] }))
  }
  const salvarNovaPratica = () => {
    if (!nomePratica.trim()) return
    // Simulação — substitua pelo fetch('/api/praticas', ...) quando reativar a API
    setNomePratica(''); setDescPratica(''); setCriandoPratica(false)
  }

  const presentesDia = chamadaDia.filter(j => j.presente).length

  // ════ TELA CHAMADA CURSOS ══════════════════════════════════════════════
  if (view === 'chamada' && aulaAtiva) {
    const c         = COLORS[aulaAtiva.colorIdx % COLORS.length]
    const presentes = aulaAtiva.alunos.filter(a => presencas[a.id]).length
    const total     = aulaAtiva.alunos.length
    const pct       = total > 0 ? Math.round((presentes / total) * 100) : 0
    return (
      <div className="flex flex-col h-full md:h-screen overflow-hidden">
        <div className="flex-shrink-0 px-4 md:px-5 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
          <button onClick={() => setView('lista')} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"><ArrowLeft size={15} /></button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{aulaAtiva.cursoNome}</p>
            <p className="text-xs text-slate-400">{aulaAtiva.descricao} · {new Date(aulaAtiva.data + 'T00:00').toLocaleDateString('pt-BR')}</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: c.light, color: c.text }}>{presentes}/{total}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 md:p-5">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-4 mb-4" style={{ border: `0.5px solid ${c.pill}` }}>
              <div className="flex items-center justify-between mb-3">
                <div><p className="text-2xl font-bold" style={{ color: c.header }}>{presentes}</p><p className="text-xs text-slate-400">de {total} presente{total !== 1 ? 's' : ''}</p></div>
                <div className="text-right"><p className="text-2xl font-bold text-slate-900">{pct}%</p><p className="text-xs text-slate-400">frequência</p></div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ background: c.header, width: `${pct}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Alunos</p>
              <button onClick={marcarTodos} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: c.light, color: c.text }}>
                {aulaAtiva.alunos.every(a => presencas[a.id]) ? 'Desmarcar todos' : 'Marcar todos'}
              </button>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              {aulaAtiva.alunos.map(aluno => {
                const presente = presencas[aluno.id]
                return (
                  <button key={aluno.id} onClick={() => toggle(aluno.id)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl w-full text-left transition-all"
                    style={{ border: presente ? `2px solid ${c.header}` : '0.5px solid #E2E8F0', background: presente ? c.light : '#fff' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                        style={{ background: presente ? c.header : '#F1F5F9', color: presente ? '#fff' : '#64748B' }}>
                        {aluno.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: presente ? c.text : '#1A2340' }}>{aluno.nome}</p>
                        <p className="text-xs" style={{ color: presente ? c.text : '#94A3B8', opacity: 0.8 }}>{presente ? 'Presente ✓' : 'Toque para marcar'}</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ border: presente ? `2px solid ${c.header}` : '1.5px solid #CBD5E1', background: presente ? c.header : 'transparent' }}>
                      {presente && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </button>
                )
              })}
            </div>
            {salvou ? (
              <div className="w-full py-3.5 rounded-2xl text-center text-sm font-semibold" style={{ background: '#E1F5EE', color: '#085041' }}>✓ Frequência salva!</div>
            ) : (
              <button onClick={salvarChamada} className="w-full py-3.5 rounded-2xl text-white text-sm font-semibold hover:opacity-90" style={{ background: c.header }}>
                Salvar chamada · {presentes} presente{presentes !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ════ TELA CHAMADA PRÁTICAS ════════════════════════════════════════════
  if (viewP === 'chamada' && aulaAtivaP) {
    const pi        = STATIC_PRATICAS.findIndex(p => p.id === aulaAtivaP.id)
    const c         = PRATICA_COLORS[pi % PRATICA_COLORS.length]
    const ms        = membros[aulaAtivaP.id] ?? []
    const presentes = ms.filter(m => presencasP[m.id]).length
    const total     = ms.length
    const pct       = total > 0 ? Math.round((presentes / total) * 100) : 0
    return (
      <div className="flex flex-col h-full md:h-screen overflow-hidden">
        <div className="flex-shrink-0 px-4 md:px-5 py-3 bg-white border-b border-slate-200 flex items-center gap-3">
          <button onClick={() => setViewP('lista')} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"><ArrowLeft size={15} /></button>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900">{aulaAtivaP.nome}</p>
            <p className="text-xs text-slate-400">Chamada de presença</p>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: c.light, color: c.text }}>{presentes}/{total}</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 md:p-5">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-4 mb-4" style={{ border: `0.5px solid ${c.pill}` }}>
              <div className="flex items-center justify-between mb-3">
                <div><p className="text-2xl font-bold" style={{ color: c.header }}>{presentes}</p><p className="text-xs text-slate-400">de {total}</p></div>
                <div className="text-right"><p className="text-2xl font-bold text-slate-900">{pct}%</p><p className="text-xs text-slate-400">frequência</p></div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#F1F5F9' }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ background: c.header, width: `${pct}%` }} />
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Jovens</p>
              <button onClick={marcarTodosP} className="text-xs font-medium px-3 py-1.5 rounded-lg" style={{ background: c.light, color: c.text }}>
                {ms.every(m => presencasP[m.id]) ? 'Desmarcar todos' : 'Marcar todos'}
              </button>
            </div>
            <div className="flex flex-col gap-2 mb-5">
              {ms.map(m => {
                const presente = presencasP[m.id]
                return (
                  <button key={m.id} onClick={() => toggleP(m.id)}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl w-full text-left transition-all"
                    style={{ border: presente ? `2px solid ${c.header}` : '0.5px solid #E2E8F0', background: presente ? c.light : '#fff' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: presente ? c.header : '#F1F5F9', color: presente ? '#fff' : '#64748B' }}>
                        {m.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: presente ? c.text : '#1A2340' }}>{m.nome}</p>
                        <p className="text-xs" style={{ color: presente ? c.text : '#94A3B8', opacity: 0.8 }}>{presente ? 'Presente ✓' : 'Toque para marcar'}</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ border: presente ? `2px solid ${c.header}` : '1.5px solid #CBD5E1', background: presente ? c.header : 'transparent' }}>
                      {presente && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    </div>
                  </button>
                )
              })}
            </div>
            {salvouP ? (
              <div className="w-full py-3.5 rounded-2xl text-center text-sm font-semibold" style={{ background: '#E1F5EE', color: '#085041' }}>✓ Frequência salva!</div>
            ) : (
              <button onClick={salvarChamadaPratica} className="w-full py-3.5 rounded-2xl text-white text-sm font-semibold hover:opacity-90" style={{ background: c.header }}>
                Salvar chamada · {presentes} presente{presentes !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ════ LISTA PRINCIPAL ══════════════════════════════════════════════════
  return (
    <div className="flex flex-col h-full md:h-screen overflow-hidden">
      <div className="flex-shrink-0 px-4 md:px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-sm font-semibold text-slate-900">Frequência</span>
          <p className="text-xs text-slate-400 mt-0.5">1º sem / 2026</p>
        </div>
        <div className="flex items-center gap-2">
          {aba === 'cursos' && (
            <button onClick={() => setCriando(true)} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90" style={{ background: '#4B7BF5', color: '#fff' }}>
              <Plus size={12} strokeWidth={2.5} /> Nova aula
            </button>
          )}
          {aba === 'praticas' && (
            <button onClick={() => setCriandoPratica(true)} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg hover:opacity-90" style={{ background: '#D4537E', color: '#fff' }}>
              <Plus size={12} strokeWidth={2.5} /> Nova prática
            </button>
          )}
        </div>
      </div>

      {/* Abas */}
      <div className="flex-shrink-0 flex border-b border-slate-200 bg-white px-4 md:px-5">
        {([
          { key: 'cursos',   label: 'Cursos'        },
          { key: 'praticas', label: 'Práticas'       },
          { key: 'dia',      label: 'Chamada do Dia' },
        ] as { key: Tab; label: string }[]).map(t => (
          <button key={t.key} onClick={() => setAba(t.key)} className="text-xs font-medium px-4 py-3 border-b-2 transition-colors -mb-px"
            style={{ borderBottomColor: aba === t.key ? '#4B7BF5' : 'transparent', color: aba === t.key ? '#4B7BF5' : '#64748B' }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-4">

        {/* ── CURSOS ── */}
        {aba === 'cursos' && (
          <>
            {criando && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.45)' }} onClick={e => { if (e.target === e.currentTarget) setCriando(false) }}>
                <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden" style={{ border: '0.5px solid #E2E8F0' }}>
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">Nova aula</p>
                    <button onClick={() => setCriando(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"><X size={15} /></button>
                  </div>
                  <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: '65vh' }}>
                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-1.5 block">Curso <span style={{ color: '#E24B4A' }}>*</span></label>
                      <CustomSelect
                        value={novoCursoId}
                        onChange={v => handleCursoChange(v === '' ? '' : Number(v))}
                        placeholder="Selecione um curso..."
                        options={cursos.map(c => ({ value: c.id, label: c.nome }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-700 mb-1.5 block">Data da Aula <span style={{ color: '#E24B4A' }}>*</span></label>
                        <input type="date" value={novaData} onChange={e => setNovaData(e.target.value)}
                          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-400" style={{ color: '#1A2340' }} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-700 mb-1.5 block">Descrição</label>
                        <input value={novoDesc} onChange={e => setNovoDesc(e.target.value)} placeholder="Ex: Aula 9"
                          className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-400" style={{ color: '#1A2340' }} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-700 mb-1.5 block">
                        Alunos
                        {novoCursoId && (
                          <span className="ml-2 font-normal text-slate-400">
                            ({alunosSel.length} selecionado{alunosSel.length !== 1 ? 's' : ''} automaticamente)
                          </span>
                        )}
                      </label>
                      <div className="flex flex-col gap-1.5 max-h-44 overflow-y-auto rounded-lg border border-slate-100 p-1">
                        {TODOS_JOVENS.map(j => {
                          const sel = alunosSel.includes(j.id)
                          return (
                            <button key={j.id} onClick={() => setAlunosSel(prev => sel ? prev.filter(id => id !== j.id) : [...prev, j.id])}
                              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors w-full text-left"
                              style={{ background: sel ? '#EEF2FF' : '#F8FAFC', color: sel ? '#185FA5' : '#1A2340', border: sel ? '0.5px solid #4B7BF5' : '0.5px solid transparent' }}>
                              <div className="flex items-center gap-2.5">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                                  style={{ background: sel ? '#4B7BF5' : '#E2E8F0', color: sel ? '#fff' : '#64748B' }}>
                                  {j.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                                </div>
                                <span>{j.nome}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                {j.curso_atual === cursos.find(c => c.id === novoCursoId)?.nome && (
                                  <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: '#EEF2FF', color: '#4B7BF5', fontSize: 10 }}>do curso</span>
                                )}
                                {sel && <Check size={13} strokeWidth={2.5} style={{ color: '#4B7BF5' }} />}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3.5 border-t border-slate-100 flex gap-2.5 justify-end">
                    <button onClick={() => setCriando(false)} className="text-xs font-medium px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Cancelar</button>
                    <button onClick={criarAula} disabled={!novoCursoId || !novaData}
                      className="text-xs font-medium px-5 py-2 rounded-lg"
                      style={{ background: novoCursoId && novaData ? '#4B7BF5' : '#E2E8F0', color: novoCursoId && novaData ? '#fff' : '#94A3B8' }}>
                      Criar aula
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {aulas.map(aula => {
                const c        = COLORS[aula.colorIdx % COLORS.length]
                const isGerenc = gerenc === aula.id
                const disponiveis = TODOS_JOVENS.filter(j => !aula.alunos.find(a => a.id === j.id))
                return (
                  <div key={aula.id} className="bg-white rounded-2xl overflow-hidden" style={{ border: `0.5px solid ${c.pill}` }}>
                    <div className="p-4" style={{ background: c.header }}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate">{aula.cursoNome}</p>
                          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{new Date(aula.data + 'T00:00').toLocaleDateString('pt-BR')} · {aula.descricao}</p>
                        </div>
                        <button onClick={() => setAulas(prev => prev.filter(a => a.id !== aula.id))}
                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                          <X size={12} />
                        </button>
                      </div>
                      <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>{aula.alunos.length} aluno{aula.alunos.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="px-3.5 pt-3 pb-1 min-h-12">
                      <div className="flex flex-wrap gap-1.5">
                        {aula.alunos.map(a => (
                          <span key={a.id} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: c.light, color: c.text }}>
                            {a.nome.split(' ')[0]}
                            {isGerenc && <button onClick={() => removerAluno(aula.id, a.id)} className="ml-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ color: c.text }}><X size={9} /></button>}
                          </span>
                        ))}
                        {aula.alunos.length === 0 && <span className="text-xs text-slate-400">Nenhum aluno</span>}
                      </div>
                      {isGerenc && disponiveis.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                          <p className="text-xs text-slate-400 mb-1.5">Adicionar:</p>
                          <div className="flex flex-wrap gap-1">
                            {disponiveis.map(j => (
                              <button key={j.id} onClick={() => adicionarAluno(aula.id, j.id)} className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#F1F5F9', color: '#64748B', border: '0.5px solid #E2E8F0' }}>
                                + {j.nome.split(' ')[0]}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 px-3.5 pb-3.5 pt-2">
                      <button onClick={() => abrirChamada(aula)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white hover:opacity-90" style={{ background: c.header }}>
                        <Check size={13} strokeWidth={2.5} /> Fazer chamada
                      </button>
                      <button onClick={() => setGerenc(isGerenc ? null : aula.id)} className="px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                        style={{ background: isGerenc ? c.light : '#F8FAFC', color: isGerenc ? c.text : '#64748B', border: isGerenc ? `0.5px solid ${c.pill}` : '0.5px solid #E2E8F0' }}>
                        +/−
                      </button>
                    </div>
                  </div>
                )
              })}
              {aulas.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 gap-3">
                  <p className="text-sm text-slate-500">Nenhuma aula registrada ainda</p>
                  <button onClick={() => setCriando(true)} className="text-xs font-medium px-4 py-2 rounded-lg" style={{ background: '#EEF2FF', color: '#4B7BF5' }}>Criar primeira aula</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── PRÁTICAS ── */}
        {aba === 'praticas' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {[...STATIC_PRATICAS]
              .sort((a, b) => (membros[b.id]?.length || 0) - (membros[a.id]?.length || 0))
              .map((pratica, pi) => {
                const c           = PRATICA_COLORS[pi % PRATICA_COLORS.length]
                const ms          = membros[pratica.id] ?? []
                const isGerencP   = gerencP === pratica.id
                const disponiveis = TODOS_JOVENS.filter(j => !ms.find(m => m.id === j.id))
                return (
                  <div key={pratica.id} className="bg-white rounded-2xl overflow-hidden" style={{ border: `0.5px solid ${c.pill}` }}>
                    <div className="p-4" style={{ background: c.header }}>
                      <p className="text-sm font-bold text-white">{pratica.nome}</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{pratica.descricao}</p>
                      <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.65)' }}>{ms.length} jovem{ms.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="px-3.5 pt-3 pb-1 min-h-12">
                      <div className="flex flex-wrap gap-1.5">
                        {ms.map(m => (
                          <span key={m.id} className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: c.light, color: c.text }}>
                            {m.nome.split(' ')[0]}
                            {isGerencP && <button onClick={() => removerMembroPratica(pratica.id, m.id)} className="ml-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ color: c.text }}><X size={9} /></button>}
                          </span>
                        ))}
                        {ms.length === 0 && <span className="text-xs text-slate-400">Nenhum jovem</span>}
                      </div>
                      {isGerencP && disponiveis.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-100">
                          <p className="text-xs text-slate-400 mb-1.5">Adicionar:</p>
                          <div className="flex flex-wrap gap-1">
                            {disponiveis.map(j => (
                              <button key={j.id} onClick={() => adicionarMembroPratica(pratica.id, j.id)} className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#F1F5F9', color: '#64748B', border: '0.5px solid #E2E8F0' }}>
                                + {j.nome.split(' ')[0]}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 px-3.5 pb-3.5 pt-2">
                      <button onClick={() => abrirChamadaPratica(pratica)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white hover:opacity-90" style={{ background: c.header }}>
                        <Check size={13} strokeWidth={2.5} /> Fazer chamada
                      </button>
                      <button onClick={() => setGerencP(isGerencP ? null : pratica.id)} className="px-3.5 py-2.5 rounded-xl text-xs font-semibold"
                        style={{ background: isGerencP ? c.light : '#F8FAFC', color: isGerencP ? c.text : '#64748B', border: isGerencP ? `0.5px solid ${c.pill}` : '0.5px solid #E2E8F0' }}>
                        +/−
                      </button>
                    </div>
                  </div>
                )
              })}
          </div>
        )}

        {/* ── CHAMADA DO DIA ── */}
        {aba === 'dia' && (
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl overflow-hidden mb-4" style={{ border: '0.5px solid #B5D4F4' }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #4B7BF5 0%, #2a1cbe 100%)' }}>
                <div>
                  <p className="text-sm font-semibold text-white capitalize">{dataHoje}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Chamada geral do dia</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{presentesDia}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>presentes</p>
                </div>
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-100 bg-white">
                {[
                  { label: 'Total',     value: chamadaDia.length,                     color: '#4B7BF5' },
                  { label: 'Presentes', value: presentesDia,                           color: '#1D9E75' },
                  { label: 'Ausentes',  value: chamadaDia.length - presentesDia,       color: '#E24B4A' },
                ].map(s => (
                  <div key={s.label} className="px-4 py-3 text-center">
                    <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                    <p className="text-xs text-slate-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <button onClick={() => setChamadaDia(prev => prev.map(j => ({ ...j, presente: true })))} className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg" style={{ background: '#E1F5EE', color: '#085041', border: '0.5px solid #9FE1CB' }}>
                <Check size={12} strokeWidth={2.5} /> Marcar todos
              </button>
              <button onClick={() => setChamadaDia(prev => prev.map(j => ({ ...j, presente: false })))} className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg" style={{ background: '#F8FAFC', color: '#64748B', border: '0.5px solid #E2E8F0' }}>
                <X size={12} /> Limpar
              </button>
            </div>

            <div className="bg-white rounded-2xl overflow-y-auto mb-4 max-h-[50vh]" style={{ border: '0.5px solid #E2E8F0' }}>
              {chamadaDia.map((jovem, i) => (
                <button key={jovem.id}
                  onClick={() => setChamadaDia(prev => prev.map(j => j.id === jovem.id ? { ...j, presente: !j.presente } : j))}
                  className="flex items-center justify-between px-4 py-3.5 w-full text-left transition-all"
                  style={{ borderBottom: i < chamadaDia.length - 1 ? '0.5px solid #F1F5F9' : 'none', background: jovem.presente ? '#F0F7FF' : '#fff' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                      style={{ background: jovem.presente ? '#4B7BF5' : '#F1F5F9', color: jovem.presente ? '#fff' : '#64748B' }}>
                      {jovem.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                    </div>
                    <p className="text-sm font-medium" style={{ color: jovem.presente ? '#185FA5' : '#1A2340' }}>{jovem.nome}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ border: jovem.presente ? '2px solid #4B7BF5' : '1.5px solid #CBD5E1', background: jovem.presente ? '#4B7BF5' : 'transparent' }}>
                    {jovem.presente && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            {salvouDia ? (
              <div className="w-full py-3.5 rounded-2xl text-center text-sm font-semibold" style={{ background: '#E1F5EE', color: '#085041' }}>✓ Chamada do dia salva!</div>
            ) : (
              <button onClick={() => { setSalvouDia(true); setTimeout(() => setSalvouDia(false), 2500) }}
                className="w-full py-3.5 rounded-2xl text-white text-sm font-semibold hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #4B7BF5, #2a1cbe)' }}>
                Salvar chamada · {presentesDia} presente{presentesDia !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Modal Nova Prática */}
      {criandoPratica && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,0.45)' }}
          onClick={e => { if (e.target === e.currentTarget) { setCriandoPratica(false); setNomePratica(''); setDescPratica('') } }}>
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden" style={{ border: '0.5px solid #E2E8F0' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div>
                <p className="text-sm font-semibold text-slate-900">Nova prática</p>
                <p className="text-xs text-slate-400 mt-0.5">Adicione jovens pelo botão +/− após criar</p>
              </div>
              <button onClick={() => { setCriandoPratica(false); setNomePratica(''); setDescPratica('') }}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100"><X size={15} /></button>
            </div>
            <div className="px-5 py-4 flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Nome da prática <span style={{ color: '#E24B4A' }}>*</span></label>
                <input autoFocus value={nomePratica} onChange={e => setNomePratica(e.target.value)} placeholder="Ex: Alta de Souza"
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-pink-400" style={{ color: '#1A2340' }} />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1.5 block">Descrição</label>
                <input value={descPratica} onChange={e => setDescPratica(e.target.value)} placeholder="Breve descrição..."
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:border-pink-400" style={{ color: '#1A2340' }} />
              </div>
            </div>
            <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button onClick={() => { setCriandoPratica(false); setNomePratica(''); setDescPratica('') }}
                className="text-xs font-medium px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">Cancelar</button>
              <button onClick={salvarNovaPratica} disabled={!nomePratica.trim()}
                className="text-xs font-medium px-5 py-2 rounded-lg hover:opacity-90"
                style={{ background: nomePratica.trim() ? '#D4537E' : '#E2E8F0', color: nomePratica.trim() ? '#fff' : '#94A3B8' }}>
                Criar prática
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}