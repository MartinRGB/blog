import './list.js'
import ListView from './list.vue'
export default function createPost (name) {
  return {
    name: `${name}-view`,
    render (h) {
      return h(ListView)
    }
  }
}
