interface CodingTimeResponse {
  status: number
  data?: {
    dailyAverage: string
    total: string
    bestDay: {
      date: string
      total: string
    }
  }
}
