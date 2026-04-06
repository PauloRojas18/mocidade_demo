'use client'
// LOCALIZAÇÃO: app/praticas/page.tsx

import Link from 'next/link'

type Jovem = { id: number; nome: string }

type Pratica = {
  id: number
  nome: string
  descricao: string | null
  pratica_membros: { jovem_id: number; jovens: Jovem }[]
}

const COLORS = [
  { header: '#D4537E', light: '#FBEAF0', text: '#72243E', border: '#F4C0D1' },
  { header: '#BA7517', light: '#FAEEDA', text: '#633806', border: '#FAC775' },
  { header: '#7F77DD', light: '#EEEDFE', text: '#3C3489', border: '#CECBF6' },
  { header: '#1D9E75', light: '#E1F5EE', text: '#085041', border: '#9FE1CB' },
  { header: '#378ADD', light: '#E6F1FB', text: '#0C447C', border: '#B5D4F4' },
  { header: '#E24B4A', light: '#FCEBEB', text: '#A32D2D', border: '#F7C1C1' },
]

const PRATICAS: Pratica[] = [
  {
    id: 1,
    nome: 'Louvor e Adoração',
    descricao: 'Ministério de música e adoração que lidera os momentos de culto nos cultos e eventos da Mocidade.',
    pratica_membros: [
      { jovem_id: 1,  jovens: { id: 1,  nome: 'Ana Lima'         } },
      { jovem_id: 3,  jovens: { id: 3,  nome: 'Camila Rocha'     } },
      { jovem_id: 5,  jovens: { id: 5,  nome: 'Eduarda Martins'  } },
      { jovem_id: 8,  jovens: { id: 8,  nome: 'Henrique Costa'   } },
      { jovem_id: 10, jovens: { id: 10, nome: 'João Pedro Alves' } },
      { jovem_id: 15, jovens: { id: 15, nome: 'Olivia Torres'    } },
      { jovem_id: 17, jovens: { id: 17, nome: 'Rafaela Cunha'    } },
      { jovem_id: 21, jovens: { id: 21, nome: 'Yasmin Freitas'   } },
      { jovem_id: 25, jovens: { id: 25, nome: 'Débora Pinto'     } },
      { jovem_id: 28, jovens: { id: 28, nome: 'Gustavo Silveira' } },
      { jovem_id: 31, jovens: { id: 31, nome: 'Juliana Ramos'    } },
      { jovem_id: 34, jovens: { id: 34, nome: 'Matheus Santos'   } },
      { jovem_id: 37, jovens: { id: 37, nome: 'Patrícia Melo'    } },
      { jovem_id: 38, jovens: { id: 38, nome: 'Rafael Mendes'    } },
    ],
  },
  {
    id: 2,
    nome: 'Teatro e Drama',
    descricao: 'Grupo de teatro cristão que apresenta esquetes e peças com mensagens de fé e transformação.',
    pratica_membros: [
      { jovem_id: 2,  jovens: { id: 2,  nome: 'Bruno Souza'      } },
      { jovem_id: 6,  jovens: { id: 6,  nome: 'Felipe Gomes'     } },
      { jovem_id: 9,  jovens: { id: 9,  nome: 'Isabela Cardoso'  } },
      { jovem_id: 11, jovens: { id: 11, nome: 'Karen Oliveira'   } },
      { jovem_id: 16, jovens: { id: 16, nome: 'Pedro Henrique'   } },
      { jovem_id: 18, jovens: { id: 18, nome: 'Samuel Ribeiro'   } },
      { jovem_id: 22, jovens: { id: 22, nome: 'André Nascimento' } },
      { jovem_id: 24, jovens: { id: 24, nome: 'Caio Duarte'      } },
      { jovem_id: 29, jovens: { id: 29, nome: 'Helena Campos'    } },
      { jovem_id: 33, jovens: { id: 33, nome: 'Letícia Vieira'   } },
      { jovem_id: 35, jovens: { id: 35, nome: 'Natália Barros'   } },
    ],
  },
  {
    id: 3,
    nome: 'Dança',
    descricao: 'Grupo de dança que expressa adoração através do movimento e coreografias em eventos e cultos.',
    pratica_membros: [
      { jovem_id: 3,  jovens: { id: 3,  nome: 'Camila Rocha'    } },
      { jovem_id: 5,  jovens: { id: 5,  nome: 'Eduarda Martins' } },
      { jovem_id: 13, jovens: { id: 13, nome: 'Mariana Pereira' } },
      { jovem_id: 19, jovens: { id: 19, nome: 'Tatiane Moura'   } },
      { jovem_id: 21, jovens: { id: 21, nome: 'Yasmin Freitas'  } },
      { jovem_id: 23, jovens: { id: 23, nome: 'Beatriz Alves'   } },
      { jovem_id: 27, jovens: { id: 27, nome: 'Fernanda Araújo' } },
      { jovem_id: 31, jovens: { id: 31, nome: 'Juliana Ramos'   } },
      { jovem_id: 37, jovens: { id: 37, nome: 'Patrícia Melo'   } },
    ],
  },
  {
    id: 4,
    nome: 'Comunicação e Mídia',
    descricao: 'Equipe responsável pela cobertura fotográfica, vídeos, redes sociais e design da Mocidade.',
    pratica_membros: [
      { jovem_id: 4,  jovens: { id: 4,  nome: 'Daniel Ferreira'  } },
      { jovem_id: 12, jovens: { id: 12, nome: 'Lucas Mendes'      } },
      { jovem_id: 20, jovens: { id: 20, nome: 'Vinícius Lopes'    } },
      { jovem_id: 22, jovens: { id: 22, nome: 'André Nascimento'  } },
      { jovem_id: 26, jovens: { id: 26, nome: 'Elias Carvalho'    } },
      { jovem_id: 28, jovens: { id: 28, nome: 'Gustavo Silveira'  } },
      { jovem_id: 30, jovens: { id: 30, nome: 'Igor Teixeira'     } },
      { jovem_id: 32, jovens: { id: 32, nome: 'Kaique Braga'      } },
      { jovem_id: 34, jovens: { id: 34, nome: 'Matheus Santos'    } },
      { jovem_id: 36, jovens: { id: 36, nome: 'Otávio Farias'     } },
      { jovem_id: 38, jovens: { id: 38, nome: 'Rafael Mendes'     } },
      { jovem_id: 14, jovens: { id: 14, nome: 'Nicolas Batista'   } },
    ],
  },
  {
    id: 5,
    nome: 'Intercessão',
    descricao: 'Grupo de oração que intercede pela Mocidade, pela igreja e pela cidade semanalmente.',
    pratica_membros: [
      { jovem_id: 1,  jovens: { id: 1,  nome: 'Ana Lima'         } },
      { jovem_id: 7,  jovens: { id: 7,  nome: 'Gabriela Neves'   } },
      { jovem_id: 15, jovens: { id: 15, nome: 'Olivia Torres'    } },
      { jovem_id: 17, jovens: { id: 17, nome: 'Rafaela Cunha'    } },
      { jovem_id: 25, jovens: { id: 25, nome: 'Débora Pinto'     } },
      { jovem_id: 29, jovens: { id: 29, nome: 'Helena Campos'    } },
      { jovem_id: 33, jovens: { id: 33, nome: 'Letícia Vieira'   } },
      { jovem_id: 35, jovens: { id: 35, nome: 'Natália Barros'   } },
    ],
  },
  {
    id: 6,
    nome: 'Evangelismo de Rua',
    descricao: 'Time que realiza ações evangelísticas nas ruas, praças e eventos públicos da cidade.',
    pratica_membros: [
      { jovem_id: 7,  jovens: { id: 7,  nome: 'Gabriela Neves'  } },
      { jovem_id: 14, jovens: { id: 14, nome: 'Nicolas Batista'  } },
      { jovem_id: 19, jovens: { id: 19, nome: 'Tatiane Moura'   } },
      { jovem_id: 26, jovens: { id: 26, nome: 'Elias Carvalho'  } },
      { jovem_id: 32, jovens: { id: 32, nome: 'Kaique Braga'    } },
      { jovem_id: 36, jovens: { id: 36, nome: 'Otávio Farias'   } },
      { jovem_id: 2,  jovens: { id: 2,  nome: 'Bruno Souza'     } },
    ],
  },
]

export default function PraticasPage() {
  const praticas = [...PRATICAS].sort(
    (a, b) => (b.pratica_membros?.length ?? 0) - (a.pratica_membros?.length ?? 0)
  )

  return (
    <div className="flex flex-col h-full md:h-screen overflow-hidden">

      <div className="flex-shrink-0 px-4 md:px-5 py-3 bg-white border-b border-slate-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">Práticas</span>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: '#EEF2FF', color: '#4B7BF5' }}>
          1º sem / 2026
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 md:p-5">
        {praticas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-sm text-slate-500">Nenhuma prática cadastrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {praticas.map((p, i) => {
              const color  = COLORS[i % COLORS.length]
              const alunos = p.pratica_membros?.map(m => m.jovens).filter(Boolean) ?? []

              return (
                <div key={p.id} className="bg-white rounded-xl overflow-hidden" style={{ border: `0.5px solid ${color.border}` }}>
                  <div className="p-4" style={{ background: color.header }}>
                    <p className="text-sm font-semibold text-white">{p.nome}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>1º sem / 2026</p>
                    {p.descricao && (
                      <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        {p.descricao}
                      </p>
                    )}
                  </div>

                  <div className="p-3.5">
                    <div className="mb-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: color.light, color: color.text }}>
                        {alunos.length} jovem{alunos.length !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {alunos.length > 0 && (
                      <div className={`flex flex-col gap-1 ${alunos.length > 8 ? 'max-h-40 overflow-y-auto pr-1' : ''}`}>
                        {alunos.map(j => (
                          <Link
                            key={j.id}
                            href={`/jovens/${j.id}`}
                            className="flex items-center gap-2 py-1 rounded-lg px-1 hover:bg-slate-50 transition-colors"
                            style={{ textDecoration: 'none' }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center font-semibold flex-shrink-0"
                              style={{ background: color.light, color: color.text, fontSize: 9 }}
                            >
                              {j.nome.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                            </div>
                            <span className="text-xs text-slate-700 truncate">{j.nome}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}