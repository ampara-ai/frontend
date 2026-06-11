export type MockUser = {
  id: string
  displayName: string
  role: 'anonymous' | 'admin'
}

export type SystemStatus = {
  status: 'ok' | 'degraded'
  message: string
}

export type ChatRequest = {
  message: string
}

export type ChatResponse = {
  id: string
  message: string
  resources?: Array<{
    icon: string
    title: string
    description: string
  }>
}

const anonymousUser: MockUser = {
  id: 'anonymous-user',
  displayName: 'Anonimo',
  role: 'anonymous',
}

export async function getCurrentUser(): Promise<MockUser> {
  return anonymousUser
}

export async function getSystemStatus(): Promise<SystemStatus> {
  return {
    status: 'ok',
    message: 'Servicio mock disponible.',
  }
}

export async function sendChatMessage({
  message,
}: ChatRequest): Promise<ChatResponse> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 700)
  })

  const normalizedMessage = message.toLowerCase()

  if (
    normalizedMessage.includes('denunciar') ||
    normalizedMessage.includes('comisaria') ||
    normalizedMessage.includes('donde')
  ) {
    return {
      id: crypto.randomUUID(),
      message:
        'Puedes acudir a una comisaría, a un Centro Emergencia Mujer o al juzgado de familia. Si estás en peligro inmediato, prioriza llamar a una línea de emergencia o buscar un lugar seguro.',
      resources: [
        {
          icon: 'local_police',
          title: 'Comisaría',
          description: 'Puedes pedir atención en la sección familia.',
        },
        {
          icon: 'support_agent',
          title: 'Centro Emergencia Mujer',
          description: 'Brinda orientación psicológica, social y legal.',
        },
      ],
    }
  }

  if (
    normalizedMessage.includes('proteccion') ||
    normalizedMessage.includes('protección') ||
    normalizedMessage.includes('medida')
  ) {
    return {
      id: crypto.randomUUID(),
      message:
        'Las medidas de protección pueden solicitarse para reducir el riesgo y ordenar acciones urgentes de resguardo. Puedes presentarlas ante una comisaría o juzgado de familia.',
      resources: [
        {
          icon: 'local_police',
          title: 'Comisaría (Sección Familia)',
          description: 'Atención para recibir denuncias y derivar el caso.',
        },
        {
          icon: 'gavel',
          title: 'Juzgado de Familia',
          description: 'Puede dictar medidas de protección.',
        },
      ],
    }
  }

  return {
    id: crypto.randomUUID(),
    message:
      'Gracias por contarme. Puedo orientarte con información legal general sobre violencia familiar, medidas de protección, denuncia y servicios de apoyo en Perú. No reemplazo la asesoría profesional ni la atención de emergencia.',
  }
}
