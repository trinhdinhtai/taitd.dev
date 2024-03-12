export interface ContributionCalendar {
  weeks: ContributionWeeks[]
}

export interface ContributionWeeks {
  contributionDays: ContributionsDay[]
}

export interface ContributionsDay {
  contributionCount: number
  date: string
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar
}
