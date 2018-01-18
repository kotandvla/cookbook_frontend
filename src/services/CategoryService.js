
import Api from '@/services/Api'

export default {
  GetCategory (id) {
    return Api().get('category')
  }
}
