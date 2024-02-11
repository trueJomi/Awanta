export interface HttpResponseWrapper<T> {
  status: boolean
  message: string
  body: T
}
