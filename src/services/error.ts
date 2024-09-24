type ApiResponseError = {
  message: string
}

export const catchResponseErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && !('message' in error))
    return 'Ocorreu um erro desconhecido.'

  console.error(error)

  return (error as ApiResponseError).message
}
