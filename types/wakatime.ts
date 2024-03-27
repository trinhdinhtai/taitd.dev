export interface Percentage {
  name: string
  percent: number
}

export interface CodingTimeResponse {
  status: number
  data?: {
    dailyAverage: string
    total: string
    bestDay: {
      date: string
      total: string
    }
    languages: Percentage[]
    operatingSystems: Percentage[]
  }
}
