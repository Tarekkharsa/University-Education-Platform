import {faker} from '@faker-js/faker'
import {sample} from 'lodash'
// utils
import {mockImgAvatar} from '../utils/mockImages'

// ----------------------------------------------------------------------

const categories = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  category_name: faker.name.findName(),
  Parent_category: faker.name.findName(),
  category_id: faker.datatype.uuid(),
  description: faker.name.findName(),
}))

export default categories
