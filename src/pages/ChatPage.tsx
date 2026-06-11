import { useEffect, useMemo, useRef, useState } from 'react'
import { UserTopNav } from '../components/UserNavigation'
import { sendChatMessage, type ChatResponse } from '../lib/api'

type ChatMessageItem = {
  id: string
  role: 'assistant' | 'user'
  content: string
  resources?: ChatResponse['resources']
}

const suggestedQuestions = [
  {
    icon: 'help',
    desktop: '¿Qué se considera violencia familiar?',
    mobile: 'Tipos de violencia',
    value: '¿Qué se considera violencia familiar?',
  },
  {
    icon: 'security',
    desktop: '¿Qué son las medidas de protección?',
    mobile: '¿Qué es una medida de protección?',
    value: '¿Qué son las medidas de protección?',
  },
  {
    icon: 'location_on',
    desktop: '¿Dónde puedo denunciar?',
    mobile: 'Línea 100',
    value: '¿Dónde puedo denunciar?',
  },
  {
    icon: 'description',
    desktop: '¿Qué documentos necesito?',
    mobile: 'Contactar CEM',
    value: '¿Qué documentos necesito?',
  },
]

function SafetyNotice() {
  return (
    <div className="mt-4 hidden items-center justify-center gap-2 text-on-surface-variant md:flex">
      <span className="material-symbols-outlined text-[16px]">privacy_tip</span>
      <span className="font-label-lg text-label-lg">
        Tu información no se guarda y la consulta es completamente anónima.
      </span>
    </div>
  )
}

function SuggestedQuestion({
  icon,
  label,
  compact = false,
  onSelect,
}: {
  icon?: string
  label: string
  compact?: boolean
  onSelect: (question: string) => void
}) {
  return (
    <button
      type="button"
      className={
        compact
          ? 'inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full border border-outline-variant/30 bg-surface-container px-3 font-label-lg text-[13px] leading-none text-on-surface transition-colors hover:bg-surface-container-high'
          : 'inline-flex h-9 max-w-full items-center gap-1.5 whitespace-nowrap rounded-full border border-outline-variant/40 bg-surface px-3 text-left font-label-lg text-[13px] leading-none text-on-surface-variant transition-colors hover:border-primary/50 hover:bg-surface-container-low hover:text-on-surface'
      }
      onClick={() => onSelect(label)}
    >
      {icon ? (
        <span className="material-symbols-outlined text-[16px] text-primary">
          {icon}
        </span>
      ) : null}
      {label}
    </button>
  )
}

function SuggestedQuestionCarousel({
  compact = false,
  onSuggestionSelect,
}: {
  compact?: boolean
  onSuggestionSelect: (question: string) => void
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  function updateScrollState() {
    const element = scrollContainerRef.current

    if (!element) {
      return
    }

    setCanScrollLeft(element.scrollLeft > 0)
    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    )
  }

  function scrollSuggestions(direction: 'left' | 'right') {
    scrollContainerRef.current?.scrollBy({
      left: direction === 'left' ? -260 : 260,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    updateScrollState()

    const element = scrollContainerRef.current
    if (!element) {
      return
    }

    element.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      element.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <button
        type="button"
        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant/40 bg-surface text-primary transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-35 md:flex"
        onClick={() => scrollSuggestions('left')}
        disabled={!canScrollLeft}
        aria-label="Ver sugerencias anteriores"
      >
        <span className="material-symbols-outlined text-[20px]">
          chevron_left
        </span>
      </button>
      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth pb-1"
      >
        {suggestedQuestions.map((question) => (
          <SuggestedQuestion
            key={compact ? question.mobile : question.desktop}
            icon={compact ? undefined : question.icon}
            label={compact ? question.mobile : question.desktop}
            compact={compact}
            onSelect={() => onSuggestionSelect(question.value)}
          />
        ))}
      </div>
      <button
        type="button"
        className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant/40 bg-surface text-primary transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-35 md:flex"
        onClick={() => scrollSuggestions('right')}
        disabled={!canScrollRight}
        aria-label="Ver más sugerencias"
      >
        <span className="material-symbols-outlined text-[20px]">
          chevron_right
        </span>
      </button>
    </div>
  )
}

function ResourceCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="mt-2 flex flex-col gap-2 rounded-xl border border-outline-variant/50 bg-surface p-3 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="shrink-0 rounded-full bg-secondary-container p-2 text-on-secondary-container">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <span className="block font-label-lg text-label-lg text-on-surface">
            {title}
          </span>
          <span className="block font-body-md text-sm text-on-surface-variant">
            {description}
          </span>
        </div>
      </div>
    </div>
  )
}

function ChatMessage({ message }: { message: ChatMessageItem }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`mx-auto flex w-full max-w-3xl ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={
          isUser
            ? 'flex w-full flex-col gap-2 rounded-2xl rounded-tr-sm bg-primary-container p-4 text-on-primary-container shadow-[0_4px_12px_rgba(93,123,147,0.15)] md:w-3/4'
            : 'flex w-full flex-col gap-3 rounded-2xl rounded-tl-sm border border-outline-variant/30 bg-surface-container-low p-4 text-on-surface shadow-[0_4px_12px_rgba(93,123,147,0.1)] md:w-3/4'
        }
      >
        {!isUser ? (
          <div className="mb-1 flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">support_agent</span>
            <span className="font-label-lg text-label-lg">
              Asistente Legal Seguro
            </span>
          </div>
        ) : null}
        <p className="m-0 font-body-md text-body-md">{message.content}</p>
        {message.resources?.map((resource) => (
          <ResourceCard key={resource.title} {...resource} />
        ))}
        {message.id === 'welcome' ? (
          <div className="mt-2 flex items-center gap-1 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Tu sesión es anónima y no se guardará.</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="mx-auto mt-2 flex w-full max-w-3xl justify-start">
      <div className="flex w-auto items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low px-4 py-2 shadow-sm">
        <span className="material-symbols-outlined animate-pulse text-sm text-primary">
          more_horiz
        </span>
        <span className="font-label-lg text-sm text-on-surface-variant">
          Escribiendo...
        </span>
      </div>
    </div>
  )
}

function ChatInput({
  value,
  isLoading,
  showSuggestions,
  mode = 'all',
  onChange,
  onSubmit,
  onSuggestionSelect,
}: {
  value: string
  isLoading: boolean
  showSuggestions: boolean
  mode?: 'all' | 'desktop' | 'mobile'
  onChange: (value: string) => void
  onSubmit: () => void
  onSuggestionSelect: (question: string) => void
}) {
  const canSend = value.trim().length > 0 && !isLoading

  return (
    <>
      <div
        className={
          mode === 'mobile'
            ? 'hidden'
            : 'hidden w-full border-t border-outline-variant/30 bg-surface-container-lowest shadow-[0_-4px_16px_rgba(65,95,118,0.06)] md:block'
        }
      >
        {showSuggestions ? (
          <div className="mx-auto max-w-3xl px-container-padding pt-3">
            <div className="mb-2 flex items-center gap-2">
              <p className="shrink-0 font-label-lg text-[13px] leading-none text-on-surface-variant">
                Sugerencias
              </p>
              <SuggestedQuestionCarousel
                onSuggestionSelect={onSuggestionSelect}
              />
            </div>
          </div>
        ) : null}
        <form
          className={`mx-auto flex max-w-3xl items-center gap-3 px-container-padding pb-4 ${
            showSuggestions ? 'pt-1' : 'pt-4'
          }`}
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <textarea
            className="h-[64px] max-h-20 min-h-[56px] w-full resize-none rounded-lg border-2 border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface transition-colors focus:border-secondary focus:outline-none focus:ring-0"
            placeholder="Escribe tu consulta en palabras simples..."
            rows={2}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="flex h-[56px] shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-button text-button text-on-primary shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enviar
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>

      <div
        className={
          mode === 'desktop'
            ? 'hidden'
            : 'flex w-full shrink-0 flex-col border-t border-outline-variant/20 bg-surface shadow-[0_-4px_12px_rgba(65,95,118,0.08)] md:hidden'
        }
      >
        {showSuggestions ? (
          <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto border-b border-outline-variant/20 bg-surface-container-lowest px-container-padding py-2.5">
            <SuggestedQuestionCarousel
              compact
              onSuggestionSelect={onSuggestionSelect}
            />
          </div>
        ) : null}
        <form
          className="pb-safe mx-auto flex w-full max-w-3xl items-center gap-2 px-container-padding py-3"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit()
          }}
        >
          <textarea
            className="max-h-[120px] w-full resize-none rounded-[16px] border border-outline-variant/50 bg-surface-container-low px-4 py-3 font-body-md text-body-md text-on-surface shadow-inner transition-all placeholder:text-on-surface-variant/70 focus:border-[#cceacf] focus:outline-none focus:ring-1 focus:ring-[#cceacf]"
            placeholder="Escribe tu consulta aquí..."
            rows={1}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          <button
            type="submit"
            disabled={!canSend}
            className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-primary text-on-primary shadow-md transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              send
            </span>
          </button>
        </form>
      </div>
    </>
  )
}

export function ChatPage() {
  const initialMessages = useMemo<ChatMessageItem[]>(
    () => [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Hola. Estoy aquí para brindarte orientación legal segura y confidencial. ¿En qué te puedo ayudar hoy?',
      },
    ],
    [],
  )
  const [messages, setMessages] = useState<ChatMessageItem[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit() {
    const trimmedDraft = draft.trim()

    if (!trimmedDraft || isLoading) {
      return
    }

    const userMessage: ChatMessageItem = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedDraft,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setDraft('')
    setIsLoading(true)

    try {
      const response = await sendChatMessage({ message: trimmedDraft })

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: response.id,
          role: 'assistant',
          content: response.message,
          resources: response.resources,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleSuggestionSelect(question: string) {
    setDraft(question)
  }

  function handleClear() {
    setMessages(initialMessages)
    setDraft('')
    setIsLoading(false)
  }

  return (
    <div className="chat-page flex h-dvh min-h-dvh flex-col overflow-hidden bg-background font-body-md text-body-md text-on-background antialiased">
      <UserTopNav active="orientation" onClear={handleClear} />

      <main className="min-h-0 flex-1 overflow-y-auto px-container-padding py-stack-md">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-stack-md">
          {messages.length === 1 ? (
            <section className="hidden pb-2 pt-4 text-center md:block">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-fixed">
                <span
                  className="material-symbols-outlined text-3xl text-primary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  shield_person
                </span>
              </div>
              <h1 className="m-0 font-headline-lg text-headline-lg text-primary">
                ¿Cómo podemos ayudarte hoy?
              </h1>
              <p className="mx-auto mt-3 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                Este es un espacio seguro y anónimo. Puedes escribir tu consulta
                sobre violencia familiar en tus propias palabras. Te guiaremos
                con información legal clara y opciones de apoyo.
              </p>
            </section>
          ) : null}

          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading ? <TypingIndicator /> : null}
          <SafetyNotice />
          <div className="h-4" />
        </div>
      </main>

      <ChatInput
        value={draft}
        isLoading={isLoading}
        showSuggestions={messages.length === 1}
        onChange={setDraft}
        onSubmit={handleSubmit}
        onSuggestionSelect={handleSuggestionSelect}
      />
    </div>
  )
}
