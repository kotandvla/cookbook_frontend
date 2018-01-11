
import Api from '@/services/Api'

export default {
  fetchPosts (id) {
    return Api().get('recipe/' + id)
  }
}
