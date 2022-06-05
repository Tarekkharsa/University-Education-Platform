// ----------------------------------------------------------------------
const courseIndexs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export const mockImgCover = index =>
  `/static/mock-images/covers/cover_${index}.jpg`
export const mockImgProduct = index =>
  `/images/courses/course_${getRandomNumberBetween(1, 12)}.jpg`
export const mockImgCourse = index =>
  `/images/courses/course_${getRandomNumberBetween(1, 12)}.jpg`
export const mockImgAvatar = index =>
  `/static/mock-images/avatars/avatar_${index}.jpg`
