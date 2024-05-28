export const calculateReadingTime = (content: string) => {
  const wordsPerMinute = 200
  const numberOfWords = content.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}
