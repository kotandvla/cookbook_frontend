
import Api from '@/services/Api'

export default {
  GetCategory () {
    return Api().get('categories')
  },
  SetCategory (categories) {
    return Api().post('categories', categories)
  }
}
